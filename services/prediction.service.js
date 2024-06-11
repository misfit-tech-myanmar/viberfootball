const { response } = require('express');
const { axiosInstance } = require('../libs/axios.instance');
const axios = require('axios')

let self;
function PredictionService(){
    self = this;
    self.Axios = axiosInstance;
}

PredictionService.prototype = {
    singlePredict: (userId) => {
        return new Promise(async(resolve, reject) => {
            const user = await self.getUserInfoByUserId(userId);
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
                const userPredicts = await self.Axios.get(`/stable/bots/labs/2268/entries`);
                const predicts = [];
                userPredicts.data.dataSource.forEach(predict => {
                    // console.log(predict)
                    if(predict['5861'] === userId && predict['5897'] === undefined){
                        predicts.push({
                            id: predict.id,
                            user_id: predict['5861'],
                            match_id: predict['5860'],
                            win_lose: predict['5897'],
                            predict: predict['5862'],
                        })
                    }
                })
                resolve(predicts)
            }catch(err){
                reject(err)
            }
        })
    },
    getFixtureByMatchId: (matchId)=> {
        return new Promise(async(resolve, reject) => {
            try{
                const fixture = await self.Axios.get(`/stable/bots/labs/2247/entries`);
                if(fixture.data.dataSource.length > 0){
                    fixture.data.dataSource.forEach( fixture => {
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
                }).then(response => {
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
                }).then(response=> {
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
                const response = await self.Axios.get(`/stable/bots/labs/2241/entries/${userId}`);
                const user = await self.Axios.get(`/stable/bots/labs/2241/entries/${userId}`);
                resolve(user.data.dataSource)
            }catch(err){
                reject(err)
            }
        })
    },
    predict: () => {
        return new Promise( async(resolve, reject)=> {
            try{
                const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
                userResponse.data.dataSource.forEach(async user=> {
                    await self.singlePredict(user.id)
                })
            }catch(err){
                reject(err)
            }
        })
    },
    storeUserPrediction: (data) => {
        return new Promise(async(resolve, reject)=> {
            try{
                await self.Axios.post('/stable/bots/labs/2268/entries', {
                    "5861": data.uid,
                    "5860": data.match_id,
                    "5862": data.predict,
                    "6002": "No"
                });
            }catch(err){
                console.log(err)
            }
        })
    },
    checkPredict: (userId, matchId) => {
        return new Promise(async(resolve, reject)=> {
            try{
                const userHistories = await self.Axios.get(`/stable/bots/labs/2268/entries`);
                console.log(userHistories)
                const isPredicted = self.checkUserPredictByMatchIdAndUserId(userHistories.data.dataSource, matchId, userId)
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
            }).then(response=> {
                resolve(true)
            }).catch(err=> {
                console.log(err)
            }) 
        })
    },
    
    
}

module.exports = PredictionService;