// const redisClient = require('../libs/redis');
const axiosInstance = require('../libs/axios.instance');
const axios = require('axios')
let self;
function FootBallService(){
    self = this;
    // self.RedisClient = redisClient;
    self.Axios = axiosInstance;
}

FootBallService.prototype = {
    getFixtureFromApiAndPostToMyaliceDataLab: async(from, to) => {
        const footballResponse = await axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=152&APIkey=9c92778893a39c04bed8c7404628dbbae2cd9ed5923ded9c192121f28a643a70`);

        let fixtures = footballResponse.data.map( fixture => {
            return {
                match_id: fixture.match_id,
                country_id: fixture.country_id,
                league_name: fixture.league_name,
                match_date: fixture.match_date,
                match_status: fixture.match_status,
                match_time: fixture.match_time,
                match_hometeam_id: fixture.match_hometeam_id,
                match_hometeam_name: fixture.match_hometeam_name,
                match_hometeam_score: fixture.match_hometeam_score,
                match_awayteam_id: fixture.match_awayteam_id,
                match_awayteam_name: fixture.match_awayteam_name,
                match_awayteam_score: fixture.match_awayteam_score,
                match_stadium:fixture.match_stadium,
                match_referee: fixture.match_referee,
                league_logo: fixture.league_logo,
                team_home_badge: fixture.team_home_badge,
                team_away_badge: fixture.team_away_badge
            }
        });

        fixtures.forEach(async fixture=> {
            const response = await self.Axios.post('/stable/bots/labs/2247/entries', {
                    "5766": fixture.match_id, //match_id
                    "5767": fixture.country_id, //country_id
                    "5768": fixture.league_name, //league_name
                    "5769": fixture.match_date, //match_date
                    "5778": fixture.match_status, //match_status
                    "5779": fixture.match_time, //match_time
                    "5780": fixture.match_hometeam_name, //match_hometeam_name
                    "5781": fixture.match_hometeam_score, //match_hometeam_ft_score
                    "5782": fixture.match_awayteam_name, //match_awayteam_name
                    "5783": fixture.match_awayteam_score, //match_awayteam_ft_score
                    "5784":fixture.match_stadium, //match_stadium
                    "5785": fixture.match_referee, //match_referee
                    "5788":  fixture.league_logo, //league_logo
                    "5786": fixture.team_home_badge, //team_home_badge
                    "5787": fixture.team_away_badge //team_away_badge,
            });
            if(response.data.success){
                console.log("successful created fixtures.");
            }
        })
    },
    getFixtures: () => {
        return new Promise(async(resolve, reject) => {
            try{
                const response = await self.Axios.get('/stable/bots/labs/2247/entries');
                if(response.data.success){
                    resolve(response.data);
                }else{
                    reject("Something went wrong.")
                }
            }catch(err){
                reject(err)
            }
        })
    },
    getTeams: async() => {
        return new Promise(async(resolve, reject)=> {
            try{
                const teamResponses = await self.Axios.get('/stable/bots/labs/2261/entries')
                console.log(teamResponses.data)
            }catch(err){
                console.log(err)
            }
        })
    },
    addTeamToMyalice: async() => {
        return new Promise(async(resolve, reject)=> {
            try{
                const teamsResponse = await axios.get('https://apiv3.apifootball.com/?action=get_teams&league_id=152&APIkey=9c92778893a39c04bed8c7404628dbbae2cd9ed5923ded9c192121f28a643a70')
                if(teamsResponse.data.length > 0){
                    teamsResponse.data.forEach(async team=> {
                        await self.Axios.post('/stable/bots/labs/2261/entries',{
                            "5810": team.team_name,
                            "5811": team.team_key,
                            "5812": team.team_badge
                        })
                        console.log("completed")
                    })
                }
            }catch(err){
                console.log(err)
            }
        })
    }
}

module.exports = FootBallService;