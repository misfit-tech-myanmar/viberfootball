// const redisClient = require('../libs/redis');
const {axiosInstance} = require('../libs/axios.instance');
const axios = require('axios')
let self;
function FootBallService(){
    self = this;
    // self.RedisClient = redisClient;
    self.Axios = axiosInstance;
}

FootBallService.prototype = {
    getFixtureFromApiAndPostToMyaliceDataLab: async(from, to) => {
        const footballResponse = await axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=152&APIkey=a0653eb09309447395a20432f0e99380da1fc84673efe92119bc121f1c82a07c`);

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
    getNotPredictedFixture: (arr1, arr2) => {
        const firstArr = arr1.map(item=>item['5766'])
        const secondArr = arr2.map(item=>item['5860']);
        let data = []
        for(const item of arr1){
            if(!secondArr.includes(item['5766'])){
                data.push(item)
            }
        }
        return data; // If no match is found
    },
    getFixtures: (call, userId) => {
        return new Promise(async(resolve, reject) => {
            try{
                const response = await self.Axios.get('/stable/bots/labs/2247/entries');
                const userPredicts = await self.userPredictionsByUserId(userId)
                const notPredictedFixtures = self.getNotPredictedFixture(response.data.dataSource, userPredicts)
                resolve(notPredictedFixtures.filter((item, index)=> {
                    if(item['5781'] === ''){
                        if(notPredictedFixtures.length >= 6){
                            if(call === "first"){
                                if(index <= notPredictedFixtures.length/2){
                                    return item;
                                }
                            }else{
                                if(index >notPredictedFixtures.length/2){
                                    return item;
                                }
                            }
                        }else{
                            if(call=="first"){
                                return item;
                            }else{
                                return null;
                            }
                        }
                    }
                }))
            }catch(err){
                reject(err)
            }
        })
    },
    userPredictionsByUserId: (userId)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                const response = await self.Axios.get('/stable/bots/labs/2268/entries');
                const data = response.data.dataSource.filter(item=> {
                    if(item['5861'] == userId){
                        return item;
                    }
                })
                resolve(data)
            }catch(err){
                console.log(err)
            }
        })
    },
    getTeamShortFormByTeamName: async(homeTeam, awayTeam) => {
        return new Promise(async(resolve, reject)=> {
            try{
                const teamResponses = await self.Axios.get('/stable/bots/labs/2261/entries');
                const getHomeTeam = teamResponses.data.dataSource.filter(team=>{
                    if(team['5810'] === homeTeam){
                        return team['5848'];
                    }
                })[0];
                const getAwayTeam = teamResponses.data.dataSource.filter(team=>{
                    if(team['5810'] === awayTeam){
                        return team['5848'];
                    }
                })[0];
                resolve({
                    getHomeTeam,
                    getAwayTeam
                })
            }catch(err){
                console.log(err)
            }
        })
    },
    addTeamToMyalice: async() => {
        return new Promise(async(resolve, reject)=> {
            try{
                const teamsResponse = await axios.get('https://apiv3.apifootball.com/?action=get_teams&league_id=152&APIkey=a0653eb09309447395a20432f0e99380da1fc84673efe92119bc121f1c82a07c')
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
    },
    addPredictionListTemaplate: async() => {
        return new Promise(async(resolve, reject)=>{
            const fixtures = await self.getFixtures();
            fixtures.forEach(async(fixture)=> {
               if(fixture['5778'] === ''){
                    console.log(fixture['5767'])
               }
            })
        })
    },
    updateFixtureAfterFinishedMatches: async(from, to) => {
        return new Promise(async(resolve, reject)=>{
            const footballResponse = await axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=152&APIkey=a0653eb09309447395a20432f0e99380da1fc84673efe92119bc121f1c82a07c`);
            if(footballResponse.data.length > 0){
                footballResponse.data.forEach(async match=>{
                    const singleMatch = await self.getSingleLabFixture(match.match_id)
                    console.log("url => ", `/stable/bots/labs/2247/entries/${singleMatch[0].id}`)
                    if(match.match_status === 'Finished'){
                        console.log("Match finisheeeed")
                        self.Axios.put(`/stable/bots/labs/2247/entries/${singleMatch[0].id}`, {
                            "5778": match.match_status,
                            "5781": match.match_hometeam_ft_score,
                            "5783": match.match_awayteam_ft_score
                        }).then(response => {
                            console.log("updated")
                            resolve()
                        }).catch(err=> {
                            console.log('Error updating data: ')
                        })
                    }else{
                        console.log("match not finished")
                    }
                })
            }else{
                console.log("There is no match this time.")
            }
            resolve(true)
        })
        
    },
    getSingleLabFixture: (matchId) => {
        return new Promise(async(resolve, reject)=>{
            const response = await self.Axios.get('/stable/bots/labs/2247/entries');
            const data = response.data.dataSource.filter(single=>{
                if(single['5778'] === '' && single['5766'] === matchId){
                    return single;
                }
            })
            resolve(data)
        })
    }
}

module.exports = FootBallService;