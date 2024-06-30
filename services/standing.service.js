const axios = require('axios')
const {axiosInstance} = require('../libs/axios.instance');
const redisClient = require('../libs/redis');

let self;
function StandingService(){
    self=this;
    self.Axios = axiosInstance
    self.RedisClient = redisClient;
}

StandingService.prototype = {
    getStanding: ()=> {
        return new Promise(async(resolve, reject) => {
            const standings = await axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=1&APIkey=dcf5be038f4d51c638181d0de6d1fd1dfa442557194e39cdee3c4791501bc02b`);
            var mergedObj = await self.mergeObj(standings.data)
            let standingByLeagueRound = self.groupLeagueRound(mergedObj)
            resolve(standingByLeagueRound)
        })
    },
    groupLeagueRound: (data) => {
        const groupedData = {};
        data.forEach(async(item, index)=> {
            if(index < 24){
                const group = item.league_round;
                if (!groupedData[group]) {
                    // If not, create a new array for that date
                    groupedData[group] = [];
                }
                groupedData[group].push(item)
            }
        })
        return groupedData
    },
    getTeamByTeamId: (teamId) => {
        return new Promise(async(resolve, reject)=> {
            // let response = await self.Axios.get(`/stable/bots/labs/2261/entries`);
            const teamsResponse = await self.RedisClient.get('teams');
            const teamsCache = JSON.parse(teamsResponse)
            resolve(teamsCache.filter(item => item['5811'] == teamId)[0])
        })
    },
    mergeObj: (data)=> {
        return new Promise(async(resolve, reject)=> {
            var proceedData = Promise.all(data.map(async item=> {
                const getTeamById = await self.getTeamByTeamId(item.team_id)
                return {...item,logo: getTeamById['5812']}
            }))
            proceedData.then(data=> {
                resolve(data)
            })
        })
    }
}

module.exports = StandingService;