// const redisClient = require('../libs/redis');
const {axiosInstance} = require('../libs/axios.instance');
const axios = require('axios')
const moment = require('moment-timezone');
let self;
function FootBallService(){
    self = this;
    // self.RedisClient = redisClient;
    self.Axios = axiosInstance;
}

FootBallService.prototype = {
    getFixtureFromApiAndPostToMyaliceDataLab: async(from, to) => {
        const footballResponse = await axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=1&APIkey=c75f5e6c8341750bc05cddef05c6544f7bf5c3b97dcf7264da6f22cb8596e53f&timezone=Asia/Yangon`);
        if(footballResponse.data.length > 0){
            let response = await self.Axios.get(`/stable/bots/labs/2247/entries`);
            let fixtures = footballResponse.data.filter( fixture => {
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
                const checkFixtureExitByMatchId = await self.checkFixtureExitByMatchId(response.data.dataSource, fixture.match_id)
                if(checkFixtureExitByMatchId === undefined){
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
                            "5787": fixture.team_away_badge, //team_away_badge,
                            "5956": fixture.match_hometeam_id,
                            "5957": fixture.match_awayteam_id
                    });
                    if(response.data.success){
                        console.log("successful created fixtures.");
                    }
                }else{
                    console.log("Match Already exist")
                }
            })
        }else{
            console.log("no response data from football api.")
        }
    },
    checkFixtureExitByMatchId: (aliceFixtures, matchId) => {
        return new Promise(async(resolve, reject)=> {
            const check = aliceFixtures.filter(item=> item['5766'] === matchId)[0]
            resolve(check)
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
    checkPredictFixtures: () => {
        return new Promise(async(resolve, reject) => {
            let response = await self.Axios.get(`/stable/bots/labs/2247/entries`);
            response.data.dataSource = response.data.dataSource.sort((a,b)=> {
                return new Date(`${a['5769']} ${a['5779']}`) - new Date(`${b['5769']} ${b['5779']}`)
            })
            const unfinishedFixtures = await self.getUnfinishedFixtures(response.data.dataSource)
            const getFixtureBeforeOneHours = await self.getFixtureBeforeOneHour(unfinishedFixtures);
            resolve(getFixtureBeforeOneHours)
        })
    },
    getFixtures: (call, userId) => {
        return new Promise(async(resolve, reject) => {
            try{
                let response = await self.Axios.get(`/stable/bots/labs/2247/entries`);
                response.data.dataSource = response.data.dataSource.sort((a,b)=> {
                    return new Date(`${a['5769']} ${a['5779']}`) - new Date(`${b['5769']} ${b['5779']}`)
                })
                const userPredicts = await self.userPredictionsByUserId(userId)
                const notPredictedFixtures = self.getNotPredictedFixture(response.data.dataSource, userPredicts)
                const unfinishedFixtures = await self.getUnfinishedFixtures(response.data.dataSource)
                const getFixtureBeforeOneHours = await self.getFixtureBeforeOneHour(unfinishedFixtures);
                // if(unfinishedFixtures.length > 15 && call === 'third' ){
                //     result = {
                //         result: data,
                //         more: true
                //     }
                // }else{
                //     if(unfinishedFixtures.length > 10 && call === 'second'){
                //         result = {
                //             result: data,
                //             more: true
                //         }
                //     }else{
                //         if(unfinishedFixtures.length > 5 && call === 'first'){
                //             result = {
                //                 result: data,
                //                 more: true
                //             }
                //         }else{
                //             result = {
                //                 result: data,
                //                 more: false
                //             }
                //         }
                //     }
                // }
                resolve({
                    result: getFixtureBeforeOneHours.filter((item, index)=> {
                        if(item['5781'] === ''){
                            if(response.data.dataSource.length > 5){
                                if(call === "first"){
                                    if(index < 5){
                                        return item;
                                    }
                                }else if( call === 'second'){
                                    if(index > 4 && index < 10){
                                        return item;
                                    }else{
                                        return null;
                                    }
                                }else if( call === 'third'){
                                    if(index > 9 && index < 15){
                                        return item;
                                    }else{
                                        return null;
                                    }
                                }else if( call === 'fourth'){
                                    if(index > 14 && index < 20){
                                        return item;
                                    }else{
                                        return null
                                    }
                                }
                            }else{
                                return item
                            }
                        }
                    }),
                    total: getFixtureBeforeOneHours.length
                })
            }catch(err){
                reject(err)
            }
        })
    },
    getFixtureBeforeOneHour: (data) => {
        return new Promise(async(resolve, reject)=> {
            // Set the timezone to Myanmar
            const myanmarTime = moment().tz('Asia/Yangon');
            // Add one hour
            const myanmarTimePlusOneHour = myanmarTime.clone().add(1, 'hour');
            resolve(data.filter(item=>{
                const matchDateTime = moment(`${item['5769']} ${item['5779']}`, "YYYY-MM-DD HH:mm");
                return matchDateTime.isSameOrAfter(myanmarTimePlusOneHour);
            }))
            resolve()
        })
    },
    getUnfinishedFixtures: (data)=> {
        return new Promise(async(resolve, reject)=> {
            const unfinishedFixture = data.filter(item=> item['5781'] === '')
            resolve(unfinishedFixture)
        })
    },
    userPredictionsByUserId: (userId)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                const response = await self.Axios.get(`/stable/bots/labs/2268/entries`);
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
                const teamResponses = await self.Axios.get(`/stable/bots/labs/2261/entries`);
                const getHomeTeam = teamResponses.data.dataSource.filter(team=>{
                    if(team['5811'] === homeTeam){
                        return team['5848'];
                    }
                })[0];
                const getAwayTeam = teamResponses.data.dataSource.filter(team=>{
                    if(team['5811'] === awayTeam){
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
        console.log("calling add team")
        return new Promise(async(resolve, reject)=> {
            try{
                const teamsResponse = await axios.get('https://apiv3.apifootball.com/?action=get_teams&league_id=1&APIkey=c75f5e6c8341750bc05cddef05c6544f7bf5c3b97dcf7264da6f22cb8596e53f&timezone=Asia/Yangon')
                if(teamsResponse.data.length > 0){
                    teamsResponse.data.forEach(async team=> {
                        await self.Axios.post('/stable/bots/labs/2261/entries',{
                            "5810": team.team_name,
                            "5811": team.team_key,
                            "5812": team.team_badge
                        })
                        console.log("team created successful")
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
            const footballResponse = await axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=1&APIkey=c75f5e6c8341750bc05cddef05c6544f7bf5c3b97dcf7264da6f22cb8596e53f&timezone=Asia/Yangon`);
            if(footballResponse.data.length > 0){
                footballResponse.data.forEach(async match=>{
                    const singleMatch = await self.getSingleLabFixture(match.match_id)
                    if(match.match_status === 'Finished' && singleMatch.length >0){
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
            const response = await self.Axios.get(`/stable/bots/labs/2247/entries`);
            const data = response.data.dataSource.filter(single=>{
                if(single['5778'] === '' && single['5766'] === matchId){
                    return single;
                }
            })
            resolve(data)
        })
    },
    getPredictedTeamName: (match, predict)=> {
        return new Promise(async(resolve, reject)=> {
            let guest;
            if(predict === 'W1'){
                guest = match.getHomeTeam['5810']
            }else if(predict === 'W2'){
                guest = match.getAwayTeam['5810']
            }else{
                guest='Draw'
            }
            resolve(guest)
        })
    },
    fixtureResultSort: () => {
        return new Promise(async(resolve, reject)=> {
            let response = await self.Axios.get(`/stable/bots/labs/2247/entries`);
            let mergeObj = await self.mergeObj(response.data.dataSource)
            if(mergeObj.length > 0){
                resolve(mergeObj.sort((a,b)=> {
                    return new Date(`${a['5769']} ${a['5779']}`) - new Date(`${b['5769']} ${b['5779']}`)
                }))
            }else{
                resolve('There is no fixtures and result.')
            }
        })
    }, 
    getFixtureAndResult: () => {
        return new Promise(async(resolve, reject)=> {
            const fixtureResultSorted = await self.fixtureResultSort();
            resolve(fixtureResultSorted.map(fixture=> {
                console.log(fixture)
                return {
                    leagueName: fixture['5768'],
                    status: fixture['5778'],
                    home: fixture['5780'],
                    homeLogo: fixture.homeLogo,
                    away: fixture['5782'],
                    awayLogo: fixture.awayLogo,
                    homeScore: fixture['5781'],
                    awayScore: fixture['5783'],
                    matchDate: fixture['5769'],
                    matchTime: fixture['5779'],
                    leagueLogo: fixture['5788'],
                    statium: fixture['5784']
                }
            }))
        })
    },
    getTeamByTeamId: (teamId) => {
        return new Promise(async(resolve, reject)=> {
            let response = await self.Axios.get('/stable/bots/labs/2261/entries');
            resolve(response.data.dataSource.filter(item => item['5811'] == teamId)[0])
        })
    },
    mergeObj: (data)=> {
        // console.log(data)
        return new Promise(async(resolve, reject)=> {
            var proceedData = Promise.all(data.map(async item=> {
                const homeTeamById = await self.getTeamByTeamId(item['5956'])
                const awayTeamById = await self.getTeamByTeamId(item['5957'])
                return {...item,homeLogo: homeTeamById['5812'], awayLogo: awayTeamById['5812']}
            }))
            proceedData.then(data=> {
                resolve(data)
            })
        })
    }
    // storeFixtureToMatchDataLab: () => {
    //     return new Promise(async(resolve, reject) => {
    //     const footballResponse = await axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=1&APIkey=c75f5e6c8341750bc05cddef05c6544f7bf5c3b97dcf7264da6f22cb8596e53f&timezone=Asia/Yangon`);

    //     })
    // }
}

module.exports = FootBallService;