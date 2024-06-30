const { axiosInstance } = require('../libs/axios.instance');
const moment = require('moment-timezone');
moment().tz('Asia/Yangon');
const axios = require('axios')
const redisClient = require('../libs/redis');
const Customer = require('../models/Customer');

let self;
function NotificationService(){
    self = this;
    self.Axios = axiosInstance;
    self.RedisClient = redisClient;
    self.Customer = Customer;
}

NotificationService.prototype = {
    sendNotiToPredictUsers: () => {
        return new Promise( async(resolve, reject)=> {
            const getFinishedFixtures = await self.getFinishedFixtures();
            const getBetweenToday5AmAndYesterday5Pm = await self.getBetweenToday5AmAndYesterday5Pm(getFinishedFixtures);
            getBetweenToday5AmAndYesterday5Pm.forEach( async item=> {
                const userPredictions = await self.getUserPredictionsByMatchId(item['5766'])
                if(userPredictions.length > 0){
                    userPredictions.forEach(async predicted=> {
                        await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                            "sequence_id":"138700",
                            "customer_id": `${predicted['5861']}`
                        }, {
                            headers: {
                                'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                            }
                        })
                    })
                }
            })
            // let response = await self.Axios.get('/stable/bots/labs/2268/entries');
            // if(response.data.dataSource.length > 0){
            //     response.data.dataSource.forEach(async item=> {
            //         await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
            //                 "sequence_id":"138700",
            //                 "customer_id": `${}`
            //             }, {
            //                 headers: {
            //                     'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
            //                 }
            //             })
            //     })
            // }
            // resolve(getBetweenToday5pmAndNextDay5AM)
            resolve()
        })
    },
    getFinishedFixtures: () => {
        return new Promise(async(resolve, reject)=> {
            try{
                // const result = 
                // let response = await self.Axios.get(`/stable/bots/labs/2247/entries`);
                const fixtureResponse = await self.RedisClient.get('fixtures');
                let fixtureCache = JSON.parse(fixtureResponse)
                resolve(fixtureCache.filter(item=> {
                    if(item['5778'] === "Finished"){
                        return item;
                    }
                }))
            }catch(err){
                console.log(err)
            }
        })
    },
    getBetweenToday5AmAndYesterday5Pm: (data) => {
        return new Promise(async(resolve, reject)=> {
            try{
                const today6AM = moment().set({ hour: 6, minute: 0, second: 0, millisecond: 0 }) 
                const yesterday5PM = moment().subtract(2, 'day').set({hour: 17, minute: 0, second: 0, millisecond: 0})
                resolve(data.filter(item=> {
                    const matchDateTime = moment(`${item['5769']} ${item['5779']}`, "YYYY-MM-DD HH:mm");
                    return matchDateTime.isSameOrAfter(yesterday5PM) && matchDateTime.isBefore(today6AM)
                }))
                
            }catch(err){
                console.log(err)
            }
        })
    },
    getUserPredictionsByMatchId: (matchId) => {
        return new Promise(async(resolve, reject) => {
            try{
                const predictionResponse = await self.RedisClient.get('user-predictions');
                let predictionCache = JSON.parse(predictionResponse)
                resolve(predictionCache.filter(item=> item['5860'] === matchId))
            }catch(err){
                console.log(err)
            }
        })
    },
    getUserPredictionsByUserId: (userId) => {
        return new Promise(async(resolve, reject) => {
            try{
                // let response = await self.Axios.get(`/stable/bots/labs/2268/entries`);
                const predictionResponse = await self.RedisClient.get('user-predictions');
                let predictionCache = JSON.parse(predictionResponse)
                resolve(predictionCache.filter(item=> item['5861'] == userId))
            }catch(err){
                console.log(err)
            }
        })
    },
    getUsersAndPredictedFixtures: (arr1 , arr2) => {
        return new Promise(async(resolve, reject)=> {
            var matchingObjects = arr1.filter(obj1 => {
                var matchingObj2 = arr2.find(obj2 => obj2['5766'] === obj1['5860']);
                return matchingObj2;
            }).map(obj1 => {
                var matchingObj2 = arr2.find(obj2 =>obj2['5766'] === obj1['5860']);
                return { ...obj1,predictId: obj1.id, ...matchingObj2 };
            });
            resolve(matchingObjects)
        })
    },
    updateUserPredict: (predictId) => {
        return new Promise(async(resolve, reject)=> {
            self.Axios.put(`/stable/bots/labs/2268/entries/${predictId}`, {
                "6002": 'Yes'
            }).then(async response => {
                const predictionResponse = await self.RedisClient.get('user-predictions');
                let predictionCache = JSON.parse(predictionResponse)
                predictionCache.map(item=> {
                    if(item.id === response.data.dataSource.id){
                        return {...item, "6002": "Yes"}
                    }
                })
                await self.RedisClient.set('user-predictions', JSON.stringify(predictionCache))
                resolve()
            }).catch(err=> {
                console.log('Error updating data: ')
            })
        })
    },
    filterNoSentNotiUserPredict: (data) => {
        return new Promise(async(resolve, reject) => {
            resolve(data.filter(predict=> predict['6002'] === 'No' && predict['5897'] !== undefined)[0])
        })
    },
    filterMatchByMatchId: (matchId, data)=> {
        return new Promise(async(resolve, reject)=> {
            resolve(data.filter(item=> item['5766'] === matchId))
        })
    },
    getPredictedAndFinishedMatchByUserId: (userId) => {
        return new Promise(async(resolve, reject) => {
            const testUserId = '92906985';
            const finishedFixtures = await self.getFinishedFixtures();
            const userPredicts = await self.getUserPredictionsByUserId(userId)
            const singlePredict = await self.filterNoSentNotiUserPredict(userPredicts);
            if(singlePredict){
                const fixture = await self.filterMatchByMatchId(singlePredict['5860'], finishedFixtures);
                await self.updateUserPredict(singlePredict.id)
                resolve({...singlePredict, ...fixture[0]})
            }else{
                resolve(null)
            }
        })
    },
    sentNotiUserFavouriteTeam: () => {
        return new Promise(async(resolve, reject)=> {
            const users = await self.getAllUsers();
            const fixtures = await self.getAllUnfinishedFixtures();
            users.forEach( async user=> {
                const checkUserFavTeam = await self.checkFavTeamMatchForUser(user, fixtures)
                if(checkUserFavTeam.length > 0){
                    await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                    "sequence_id":"138918",
                    "customer_id": `${user.creator_id}`
                }, {
                    headers: {
                        'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                    }
                })
                }
            })
            resolve()
        })
    },
    getAllUsers: () => {
        return new Promise(async(resolve, reject) => {
            // const users = await self.Axios.get(`/stable/bots/labs/2241/entries`);
            const userResponse = await self.RedisClient.get('users');
            let userCache = JSON.parse(userResponse)
            resolve(userCache)
        })
    },
    getAllUnfinishedFixtures: () => {
        return new Promise(async(resolve, reject)=> {
            // let response = await self.Axios.get(`/stable/bots/labs/2247/entries`);
            const fixtureResponse = await self.RedisClient.get('fixtures');
            let fixtureCache = JSON.parse(fixtureResponse)
            resolve(fixtureCache.filter(fixture=> fixture['5781'] === '' ))
        })
    },
    checkFavTeamMatchForUser: (user, fixtures) => {
        return new Promise(async(resolve, reject) => {
            resolve(fixtures.filter(fixture=> (fixture['5956'] === user['6012'] || fixture['5957'] === user['6012'])))
        })
    },
    findNotificationByUserId: (userId) => {
        return new Promise(async(resolve, reject) => {
            try{
                const response = await self.RedisClient.get('notifications');
                let data = JSON.parse(response);
                const result = await self.filterByUserIdInNotification(data, userId);
                if (result.length === 0) {
                    throw new Error('No data found for the user');
                }
                const singleData = result[0];
                data = data.filter(item => item.creatorId !== singleData.creatorId);
                await self.RedisClient.set('notifications', JSON.stringify(data));
                resolve(singleData)
            }catch(err){
                console.log(err)
                throw err;
            }
        })
    },
    filterByUserIdInNotification: (data, userId) => {
        return new Promise(async(resolve, reject)=> {
            // console.log("data", data)
            resolve(data.filter(item => item.creatorId == userId))
        })
    },
    sentNotificationBefore30MinutesMatchStart: () => {
        return new Promise(async(resolve, reject) => {
            // Get current datetime in UTC
            const currentDatetime = moment.utc();
            //add current time to 30 minutes
            const datetimeAfter30Minutes  = currentDatetime.add(30, 'minutes')
            // Convert to a specific timezone (Asia/Yangon for Myanmar time)
            const formattedDatetime = datetimeAfter30Minutes.tz('Asia/Yangon').format('YYYY-MM-DD HH:mm');
            const response = await self.RedisClient.get('fixtures');
            let fixtures = JSON.parse(response)
            console.log(formattedDatetime)
            const matchHave = fixtures.find(fixture=>  `${fixture['5769']} ${fixture['5779']}`=== formattedDatetime);
            if(matchHave !== undefined){
                const users = await self.getAllUsers();
                for(const user of users){
                    await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                        "sequence_id":"147158",
                        "customer_id": `${user.creator_id}`
                    }, {
                        headers: {
                            'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                        }
                    })
                }
                
            }else{
                console.log("There is no matches after 30 minutes of current time")
            }
            resolve()
        })
    },
    sentNotificationBefore30MinutesMatchStartManual: () => {
        return new Promise(async(resolve, reject) => {
            const users = await self.getAllUsers();
            for(const user of users){
                await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                    "sequence_id":"147158",
                    "customer_id": `${user.creator_id}`
                }, {
                    headers: {
                        'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                    }
                })
            }
            resolve()
        })
    },
    sentNotiPredictMore: () =>{
        return new Promise(async(resolve, reject)=> {
            try{
                console.log("Sending at leaset predict once customer")
                const customers = await self.Customer.find({});
                for(const customer of customers){
                    if(parseInt(customer.total_prediction) > 0){
                        await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                            "sequence_id":"147172",
                            "customer_id": `${customer.customer_id}`
                        }, {
                            headers: {
                                'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                            }
                        })
                    }
                }
                resolve(customers);
            }catch(err){
                console.log("sending no point noti error")
            }
        })
    },
    sentNotiNoPointUser: () => {
        return new Promise(async(resolve, reject)=> {
            try{
                const customers = await self.Customer.find({});
                for(const customer of customers){
                    if(parseInt(customer.total_prediction) > 0 && customer.customer_id === "92906985" && parseInt(customer.score) > 0){
                        await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                            "sequence_id":"147172",
                            "customer_id": `${customer.customer_id}`
                        }, {
                            headers: {
                                'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                            }
                        })
                    }
                }
                resolve(customers);
            }catch(err){
                console.log("sending no point noti error")
            }
        })
    },
    sentNotiByDate: (sequence) => {
        return new Promise(async(resolve, reject)=> {
            try{
                console.log("Sending round 16")
                const customers = await self.Customer.find({});
                for(const customer of customers){
                    await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                        "sequence_id":sequence,
                        "customer_id": `${customer.customer_id}`
                    }, {
                        headers: {
                            'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                        }
                    })
                }
                resolve(customers);
            }catch(err){
                console.log("sending no point noti error")
            }
        })
    }
}

module.exports = NotificationService;