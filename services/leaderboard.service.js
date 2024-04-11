const { axiosInstance } = require('../libs/axios.instance');

let self;
function LeaderBoardService() {
    self = this;
    self.Axios = axiosInstance;
}

LeaderBoardService.prototype = {
    getTopFivePlayerScore : () => {
        return new Promise(async(resolve, reject)=> {
            try{
                const userResponse = await self.Axios.get(`/stable/bots/labs/2241/entries`);
                const users = userResponse.data.dataSource;
                resolve(users.sort((a,b) =>  b['5755'] - a['5755'] ))
            }catch(err){
                console.log(err)
            }
        })
    }
}

module.exports = LeaderBoardService;