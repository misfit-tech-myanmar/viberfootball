const axiosInstance = require('../libs/axios.instance');


let self;
function PredictionService(){
    self = this;
    self.Axios = axiosInstance;
}

PredictionService.prototype = {
    userPredict: (userId) => {
        return new Promise(async(resolve, reject) => {
            const userPredicts = await self.getUserPredictionsByUserId(userId);
            if(userPredicts.length > 0) {
                userPredicts.forEach(async userPredict => {
                    const fixture = await self.getFixtureByMatchId(userPredict.match_id);
                    const result = await self.checkW1W2D(fixture, userPredict)
                    const user = await self.getUserInfoByUserId(userId);
                    if((result==="Draw" || result==="W1" || result==="W2")){
                        if(result === userPredict.predict){
                            await self.updateUserPredict('Win', userPredict)
                            await self.updateUserScore((parseInt(user.scores) + 1), user.id)
                        }else{
                            await self.updateUserPredict('Lose', userPredict)
                        }
                    }else{
                        console.log(result)
                    }
                })
            }
        })
    },
    getUserPredictionsByUserId: (userId) => {
        return new Promise(async(resolve, reject) => {
            try{
                const userPredicts = await self.Axios.get(`/user-prediction-histories`);
                if(userPredicts.data.length > 0){
                    const predicts = [];
                    userPredicts.data.forEach(predict => {
                        if(predict.user_id === userId){
                            predicts.push({
                                id: predict.id,
                                user_id: predict.user_id,
                                match_id: predict.match_id,
                                win_lose:predict.win_lose,
                                date: predict.date,
                                predict: predict.predict,
                                match_finished: predict.match_finished
                            })
                        }
                    })
                    resolve(predicts)
                }else{
                    reject('There is no prediction for this user.')
                }
            }catch(err){
                reject(err)
            }
        })
    },
    getFixtureByMatchId: (matchId)=> {
        return new Promise(async(resolve, reject) => {
            try{
                const fixture = await self.Axios.get(`/fixtures`);
                if(fixture.data.length > 0){
                    fixture.data.forEach( fixture => {
                        if(fixture.match_id === matchId){
                           resolve({
                            "id": fixture.id,
                            "match_id": fixture.match_id,
                            "country_id": fixture.country_id,
                            "league_name": fixture.league_name,
                            "match_date": fixture.match_date,
                            "match_status": fixture.match_status,
                            "match_time": fixture.match_time,
                            "match_hometeam_id": fixture.match_hometeam_id,
                            "match_hometeam_name": fixture.match_hometeam_name,
                            "match_hometeam_score": fixture.match_hometeam_score,
                            "match_awayteam_id": fixture.match_awayteam_id,
                            "match_awayteam_name": fixture.match_awayteam_name,
                            "match_awayteam_score": fixture.match_awayteam_score
                          })
                        }
                    })
                }else{
                    reject('There is no fixture')
                }
            }catch(err){
                reject(err)
            }
        })
    },
    checkW1W2D: (fixture, userPredict) => {
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
                    return result;
                }else{
                     return "match not finished yet."
                }
            }else{
                return 'no prediction.'
            }
        }catch(err){
            return err;
        }
    },
    updateUserPredict: (result, userPredict) => {
        return new Promise(async(resolve, reject)=> {
            try{
                if(userPredict.match_finished === false){
                    console.log(userPredict.user_id)
                    self.Axios.patch(`/user-prediction-histories/${userPredict.id}`, {
                        win_lose: result,
                        match_finished: true
                    }).then(response => {
                        console.log(response.data)
                        resolve()
                    }).catch(err=> {
                        console.log('Error updating data: ')
                    })
                }
            }catch(err){
                reject(err)
            }
        })
    },
    updateUserScore: (scores, userId) => {
        return new Promise(async(resolve, reject)=> {
            try{
                self.Axios.patch(`/users/${userId}`, {
                    scores: scores
                }).then(response=> {
                    console.log(response.data)
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
                const user = await self.Axios.get(`/users/${userId}`);
                if(user.data){
                    resolve(user.data)
                }else{
                    reject('There is no user.')
                }
            }catch(err){
                reject(err)
            }
        })
    }
    
}

module.exports = PredictionService;