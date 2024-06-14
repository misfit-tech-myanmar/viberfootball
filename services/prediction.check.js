const { axiosInstance } = require('../libs/axios.instance');
const redisClient = require('../libs/redis');
const axios = require('axios')

let self;
function CheckPredictionService(){
    self = this;
    self.Axios = axiosInstance;
    self.RedisClient = redisClient;
}

CheckPredictionService.prototype = {
    checkPrediction: () => {
        return new Promise(async(resolve, reject) => {
            let fixturesCache = await self.getDataFromRedis('fixtures');
            let startedFixturesCache = await self.getDataFromRedis('started-fixtures')
            let userPredictionsCache = await self.getDataFromRedis('user-predictions');
            let userCache = await self.getDataFromRedis('users');
            const matchStarted = await self.checkStartMatch(fixturesCache, startedFixturesCache);
            startedFixturesCache = startedFixturesCache===null?matchStarted:startedFixturesCache.concat(matchStarted)
            if(matchStarted.length > 0){
                await self.setDataToRedis('started-fixtures', startedFixturesCache)
            }
            if(startedFixturesCache.length > 0 ){
                startedFixturesCache.forEach(async fixture => {
                    const resultFixture = await self.findResultFixtureById(fixture.id, fixturesCache)
                    if(resultFixture['5778'] === "Finished"){
                        const userPredictions = await self.getUserPredictionByFixture(userPredictionsCache, fixture);
                        if(userPredictions.length > 0){
                            for(const predict of userPredictions){
                                if(predict['5897'] === undefined){
                                    if(resultFixture['5778'] == 'Finished'){
                                        const result = await self.checkW1W2D(resultFixture, predict)
                                        const user = await self.getUserByUserId(predict['5861'], userCache)
                                        if((result==="Draw" || result==="W1" || result==="W2")){
                                            if(user !== undefined){
                                                if(result === predict['5862']){
                                                    userPredictionsCache = await self.filterAndMapForUpdatePrediction('Win', predict, userPredictionsCache)
                                                    userCache = await self.updateUserScore((parseInt(user['5755']===''?0:user['5755']) + 1), user.id, userCache)
                                                }else{
                                                    userPredictionsCache = await self.filterAndMapForUpdatePrediction('Lose', predict, userPredictionsCache)
                                                }
                                                
                                            }
                                        }
                                        // await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                                        //     "sequence_id":"138700",
                                        //     "customer_id": `92906985`
                                        // }, {
                                        //     headers: {
                                        //         'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                                        //     }
                                        // })
                                    }
                                }else{
                                    console.log("Already update result")
                                }
                            }
                            await self.setDataToRedis('user-predictions', userPredictionsCache)
                            await self.setDataToRedis('users', userCache)
                            await self.removeFixtureAfterFinished(resultFixture.id, startedFixturesCache);
                        }else{
                            console.log("No user prediction for : ", `${resultFixture['5780']} - ${resultFixture['5782']}`)
                        }
                    }else{
                        console.log("Fixture not finished")
                    }

                })
            }else{
                console.log("no fixture start")
            }
            // resolve(fixturesCache)
        })
    },
    checkStartMatch:(fixures, startedFixtures)=> {
        return new Promise(async(resolve, reject)=> {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(',', '');

            resolve(fixures.filter(fixture=> {
                const matchDateTime = `${fixture['5769']} ${fixture['5779']}`;
                const isStarted = startedFixtures !== null && startedFixtures.find(item=> item.id === fixture.id)
                if(matchDateTime === formattedDate && !isStarted){
                    return fixture;
                }
            }))
        })
    },
    getUserPredictionByFixture: (userPrediction, fixture)=> {
        return new Promise(async(resolve, reject)=> {
            resolve(userPrediction.filter(item => item['5860'] === fixture['5766']))
        })
    },
    findResultFixtureById: (fixtureId, fixtures) => {
        return new Promise(async(resolve, reject) => {
            resolve(fixtures.find(fixture=> fixture.id === fixtureId))
        })
    }, 
    checkW1W2D: (fixture, userPredict) => {
        return new Promise(async(resolve, reject)=>{
            try{
                if(fixture.match_id === userPredict.match_id){
                    if(fixture['5778'] === "Finished"){
                        const homeScore = parseInt(fixture['5781']);
                        const awayScore = parseInt(fixture['5783']);
                        let  result;
                        if(homeScore===awayScore){
                            result="Draw";
                        }else if(homeScore > awayScore){
                            result="W1";
                        }else if(homeScore < awayScore){
                            result="W2";
                        }
                        resolve(result);
                    }else{
                         return "match not finished yet."
                    }
                }else{
                    return 'no prediction.'
                }
            }catch(err){
                return err;
            }
        })
    },
    filterAndMapForUpdatePrediction: (result, userPredict, allUserPredicts) => {
        return new Promise(async(resolve, reject)=> {
            try{
                // await self.Axios.put(`/stable/bots/labs/2268/entries/${userPredict.id}`, {
                //     "5897": result
                // })
                resolve(allUserPredicts.map(item=> {
                    if(item.id === userPredict.id){
                        return {...item, "5897": result}
                    }else{
                        return item
                    }
                }))
            }catch(err){
                reject(err)
            }
        })
    },
    updateUserScore: (scores, userId, users) => {
        return new Promise(async(resolve, reject)=> {
            // await self.Axios.put(`/stable/bots/labs/2241/entries/${userId}`, {
            //     "5755": scores
            // })
            resolve(users.map(item=> {
                if(item.id === userId){
                    return {...item, "5755": scores}
                }else{
                    return item
                }
            }))
        })
    },
    removeFixtureAfterFinished: (fixtureId, fixtures) => {
        return new Promise(async(resolve, reject) => {
            const updatedStartedFixtures = fixtures.filter(item => item.id !== fixtureId);
            await self.setDataToRedis('started-fixtures', updatedStartedFixtures)
        })
    },
    getUserByUserId: (userId, users) => {
        return new Promise(async(resolve, reject)=> {
            resolve(users.find(user=> user.creator_id === userId))
        })
    },
    getDataFromRedis: (key)=> {
        return new Promise(async(resolve, reject)=> {
            const response = await self.RedisClient.get(key);
            let data = JSON.parse(response);
            resolve(data)
        })
    },
    setDataToRedis: (key, value) => {
        return new Promise(async(resolve, reject)=> {
            await self.RedisClient.set(key, JSON.stringify(value))
            resolve()
        })
    },
    getFormattedDate:() =>{
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

module.exports = CheckPredictionService;