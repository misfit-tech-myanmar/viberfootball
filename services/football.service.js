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
        const footballResponse = await axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=152&APIkey=c2bc49cee81e8a76bd939c1741aa9f67002beb8dca1d40b1d883f815ef9027a5`);

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
                match_awayteam_score: fixture.match_awayteam_score
            }
        });
        console.log(fixtures)

        // fixtures.forEach(async fixture=> {
        //     const response = await self.Axios.post('/fixtures', fixture);
        // })
    },
    getFixtures: () => {
        return new Promise(async(resolve, reject) => {
            try{
                const response = await self.Axios.get('fixtures');
                // console.log(response.data)
            }catch(err){
                reject(err)
            }
        })
    }
}

module.exports = FootBallService;