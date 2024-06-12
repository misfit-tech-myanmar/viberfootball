const { axiosInstance } = require('../libs/axios.instance');
const moment = require('moment-timezone');
moment().tz('Asia/Yangon');
const axios = require('axios')
const redisClient = require('../libs/redis');

let self;
function NotificationService(){
    self = this;
    self.Axios = axiosInstance;
    self.RedisClient = redisClient;
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
            // console.log("matching object", matchingObjects)
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
                predictionCache.forEach(item=> {
                    if(item.id === response.data.dataSource.id){
                        item["6002"]= 'Yes'
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
    // checkFixtureDate: (fixture) => {
    //     let today = new Date();
    //     // Extracting the day, month, and year
    //     const day = today.getDate() + 1;
    //     const month = today.getMonth() + 1; // January is 0, so we add 1
    //     const year = today.getFullYear();

    //     // Formatting the date as YYYY-MM-DD
    //     const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    //     console.log(formattedDate)
    // }
}

module.exports = NotificationService;