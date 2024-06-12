const { response } = require('express');
const { axiosInstance } = require('../libs/axios.instance');
const redisClient = require('../libs/redis');
const axios = require('axios')

let self;
function PredictionService(){
    self = this;
    self.Axios = axiosInstance;
    self.RedisClient = redisClient;
}

PredictionService.prototype = {
    singlePredict: (user) => {
        return new Promise(async(resolve, reject) => {
            const userPredicts = await self.getUserPredictionsByUserId(user.creator_id);
            if(userPredicts.length > 0) {
                userPredicts.forEach(async userPredict => {
                    if(userPredict.win_lose === undefined){
                        const fixture = await self.getFixtureByMatchId(userPredict.match_id);
                        if(fixture.match_status === 'Finished'){
                            const result = await self.checkW1W2D(fixture, userPredict);
                            if((result==="Draw" || result==="W1" || result==="W2")){
                                if(result === userPredict.predict){
                                    await self.updateUserPredict('Win', userPredict)
                                    await self.updateUserScore((parseInt(user['5755']===''?0:user['5755']) + 1), user.id)
                                }else{
                                    await self.updateUserPredict('Lose', userPredict)
                                }
                            }else{
                                console.log(result)
                            }
                            await axios.post('https://api.myalice.ai/stable/open/customers/send-sequence',{
                                "sequence_id":"138700",
                                "customer_id": `${userPredict.user_id}`
                            }, {
                                headers: {
                                    'X-Myalice-API-Key': '90831a00d45811eeb99e7ac917b1fec3'
                                }
                            })
                        }else{
                            console.log("Fixture finished not yet!")
                        }
                    }else{
                        console.log("already determine user predict.")
                    }
                })
            }else{
                console.log(user['5751'],"no user predict")
            }
        })
    },
    getUserPredictionsByUserId: (userId) => {
        return new Promise(async(resolve, reject) => {
            try{
                // const userPredicts = await self.Axios.get(`/stable/bots/labs/2268/entries`);
                const predictionResponse = await self.RedisClient.get('user-predictions');
                let predictionCache = JSON.parse(predictionResponse)
                predictionCache = predictionCache.map(predict=> {
                    return {
                        id: predict.id,
                        user_id: predict['5861'],
                        match_id: predict['5860'],
                        win_lose: predict['5897'],
                        predict: predict['5862'],
                    }
                })
                resolve(predictionCache.filter(predict=> predict.user_id === userId && predict.win_lose === undefined))
            }catch(err){
                reject(err)
            }
        })
    },
    getFixtureByMatchId: (matchId)=> {
        return new Promise(async(resolve, reject) => {
            try{
                // const fixture = await self.Axios.get(`/stable/bots/labs/2247/entries`);
                const fixturesResponse = await self.RedisClient.get('fixtures');
                let fixturesCache = JSON.parse(fixturesResponse)
                if(fixturesCache.length > 0){
                    fixturesCache.forEach( fixture => {
                        if(fixture['5766'] === matchId){
                            const singleFixture = {
                                "match_id": fixture['5766'],
                                "country_id": fixture['5767'],
                                "league_name": fixture['5768'],
                                "match_date": fixture['5769'],
                                "match_status": fixture['5778'],
                                "match_time": fixture['5779'],
                                "match_hometeam_name": fixture['5780'],
                                "match_hometeam_score": fixture['5781'],
                                "match_awayteam_name": fixture['5782'],
                                "match_awayteam_score": fixture['5783'],
                                "match_hometeam_id": fixture['5956'],
                                "match_awayteam_id": fixture['5957'],
                                "banner_image": fixture['5899']
                            }
                            resolve(singleFixture)
                        }
                    })
                }else{
                    resolve('There is no fixture')
                }
            }catch(err){
                reject(err)
            }
        })
    },
    checkW1W2D: (fixture, userPredict) => {
        return new Promise(async(resolve, reject)=>{
            try{
                if(fixture.match_id === userPredict.match_id){
                    if(fixture.match_status === "Finished"){
                        const homeScore = parseInt(fixture.match_hometeam_score);
                        const awayScore = parseInt(fixture.match_awayteam_score);
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
    updateUserPredict: (result, userPredict) => {
        return new Promise(async(resolve, reject)=> {
            try{
                self.Axios.put(`/stable/bots/labs/2268/entries/${userPredict.id}`, {
                    "5897": result
                }).then(async response => {
                    const predictionResponse = await self.RedisClient.get('user-predictions');
                    let predictionCache = JSON.parse(predictionResponse)
                    predictionCache.forEach(item => {
                        if(item.id === userPredict.id){
                            item['5897'] = result
                        }
                    })
                    await self.RedisClient.set('fixtures', JSON.stringify(fixturesCache))
                    resolve()
                }).catch(err=> {
                    console.log('Error updating data: ')
                })
            }catch(err){
                reject(err)
            }
        })
    },
    updateUserScore: (scores, userId) => {
        return new Promise(async(resolve, reject)=> {
            try{
                self.Axios.put(`/stable/bots/labs/2241/entries/${userId}`, {
                    "5755": scores
                }).then(async response=> {
                    const userResponse = await self.RedisClient.get('users');
                    let userCache = JSON.parse(userResponse)
                    userCache.forEach(item=> {
                        if(item.id === userId){
                            item['5755'] = scores
                        }
                    })
                    await self.RedisClient.set('users', JSON.stringify(userCache))
                    resolve()
                })
            }catch(err){
                reject(err)
            }
        })
    },
    getUserInfoByUserId: (userId) => {
        return new Promise(async(resolve, reject)=>{
            try{
                // const response = await self.Axios.get(`/stable/bots/labs/2241/entries/${userId}`);
                // const user = await self.Axios.get(`/stable/bots/labs/2241/entries/${userId}`);
                const userResponse = await self.RedisClient.get('users');
                let userCache = JSON.parse(userResponse)
                resolve(userCache.filter(item=> item.id === userId))
            }catch(err){
                reject(err)
            }
        })
    },
    predict: () => {
        return new Promise( async(resolve, reject)=> {
            try{
                // const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
                const userResponse = await self.RedisClient.get('users');
                let userCache = JSON.parse(userResponse)
                userCache.forEach(async user=> {
                    await self.singlePredict(user)
                })
            }catch(err){
                reject(err)
            }
        })
    },
    storeUserPrediction: (data) => {
        return new Promise(async(resolve, reject)=> {
            try{
                const userPredictionStore = await self.Axios.post('/stable/bots/labs/2268/entries', {
                    "5861": data.uid,
                    "5860": data.match_id,
                    "5862": data.predict,
                    "6002": "No"
                });
                const userPredictions = await self.RedisClient.get('user-predictions');
                let predictions = JSON.parse(userPredictions)
                predictions.push(userPredictionStore.data.dataSource)
                await self.RedisClient.set('user-predictions', JSON.stringify(predictions))
                resolve()
            }catch(err){
                console.log(err)
            }
        })
    },
    checkPredict: (userId, matchId) => {
        return new Promise(async(resolve, reject)=> {
            try{
                // const userHistories = await self.Axios.get(`/stable/bots/labs/2268/entries`);
                const userPredictions = await self.RedisClient.get('user-predictions');
                let predictionCache = JSON.parse(userPredictions)
                console.log(predictionCache)
                const isPredicted = self.checkUserPredictByMatchIdAndUserId(predictionCache, matchId, userId)
                console.log(isPredicted)
                resolve(isPredicted)
            }catch(err){
                console.log(err)
            }
        })
    },
    checkUserPredictByMatchIdAndUserId: (arr, matchId, userId)=> {
        for (let obj of arr) {
            if (obj['5860'] === matchId && obj['5861'] === userId) {
                return true;
            }
        }
        return false;
    },
    getSinglePrediction: (obj , predictedFixture) => {
        return new Promise(async(resolve, reject)=> {
            const predictedFilter = predictedFixture.filter(item=> item.match_id === obj.match_id)
            resolve({...obj, ...predictedFilter[0]})
        })
    },
    predictedMatch:(matchId, userId) => {
        return new Promise(async(resolve, reject) => {
            const fixtureByMatchId = await self.getFixtureByMatchId(matchId);
            const predictedFixture = await self.getUserPredictionsByUserId(userId);
            const singlePrediction = await self.getSinglePrediction(fixtureByMatchId, predictedFixture)
            resolve(singlePrediction)
        })
    },
    updatePredictedMatch: (data) => {
        return new Promise(async(resolve, reject) => {
            const singlePrediction = await self.predictedMatch(data.match_id, data.uid);
            self.Axios.put(`https://api.myalice.ai/stable/bots/labs/2268/entries/${singlePrediction.id}`, {
                '5862': data.predict
            }).then(async response=> {
                const userPredictions = await self.RedisClient.get('user-predictions');
                let predictionCache = JSON.parse(userPredictions)
                predictionCache.forEach(item=> {
                    if(item.id === singlePrediction.id){
                        item['5862'] = data.predict
                    }
                })
                await self.RedisClient.set('user-predictions', JSON.stringify(predictionCache))
                resolve(true)
            }).catch(err=> {
                console.log(err)
            }) 
        })
    },
    
    
}

module.exports = PredictionService;