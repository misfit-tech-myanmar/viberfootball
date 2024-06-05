const axios = require('axios')

let self;
function StandingService(){
    self=this;
}

StandingService.prototype = {
    getStanding: ()=> {
        return new Promise(async(resolve, reject) => {
            const standings = await axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=1&APIkey=c75f5e6c8341750bc05cddef05c6544f7bf5c3b97dcf7264da6f22cb8596e53f`);
            console.log(standings.data)
            let standingByLeagueRound = self.groupLeagueRound(standings.data)
            resolve(standingByLeagueRound)
        })
    },
    groupLeagueRound: (data) => {
        const groupedData = {};
        data.forEach((item, index)=> {
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
}

module.exports = StandingService;