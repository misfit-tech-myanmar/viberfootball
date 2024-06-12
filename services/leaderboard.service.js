const { axiosInstance } = require('../libs/axios.instance');
const redisClient = require('../libs/redis');

let self;
function LeaderBoardService() {
    self = this;
    self.Axios = axiosInstance;
    self.RedisClient = redisClient;
}



LeaderBoardService.prototype = {
    getTopPredictionUserScore : () => {
        return new Promise(async(resolve, reject)=> {
            try{
                // const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
                // const users = userResponse.data.dataSource;
                const userResponse = await self.RedisClient.get('users');
                const users = JSON.parse(userResponse);
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
                // const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
                // const users = userResponse.data.dataSource;
                const userResponse = await self.RedisClient.get('users');
                const users = JSON.parse(userResponse);
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