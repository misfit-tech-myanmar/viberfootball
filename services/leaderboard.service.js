const { axiosInstance } = require('../libs/axios.instance');

let self;
function LeaderBoardService() {
    self = this;
    self.Axios = axiosInstance;
}



LeaderBoardService.prototype = {
    getTopPredictionUserScore : () => {
        return new Promise(async(resolve, reject)=> {
            try{
                const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
                const users = userResponse.data.dataSource;
                console.log(users.length)
                resolve({
                    inter: users.sort((a,b) =>  b['5755'] - a['5755'] ),
                    myanmar: users.sort((a,b) =>  b['5755'] - a['5755'] ).filter(item=> item['5754'] === 'en_MM')
                })
            }catch(err){
                console.log(err)
            }
        })
    },
    getQuizScores: () => {
        return new Promise(async(resolve, reject) => {
            try{
                const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
                const users = userResponse.data.dataSource;
                resolve({
                    inter: users.sort((a,b) =>  b['6137'] - a['6137'] ),
                    myanmar: users.sort((a,b) =>  b['6137'] - a['6137'] ).filter(item=> item['5754'] === 'en_MM')
                })
            }catch(err){
                console.log(err)
            }
        })
    }
}

module.exports = LeaderBoardService;