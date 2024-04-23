const express = require('express');
const axios = require('axios');

const router = express.Router();
const FootballService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');
const QuizService = require('../services/quiz.service');
const TeamService = require('../services/team.services');
const HistoryService = require('../services/history.service');
const ProfileService = require('../services/profile.service');
const NotificationService = require('../services/notification.service');
const LeaderBoardService = require('../services/leaderboard.service');
const footballService = new FootballService();
const predictionService = new PredictionService();
const quizService = new QuizService();
const teamService = new TeamService();
const historyService = new HistoryService();
const profileService = new ProfileService();
const notiService = new NotificationService();
const leaderboardService = new LeaderBoardService();


/**Make Prediction */
router.get('/first-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("first", req.query.customer_id);
    // console.log("fixture::::", fixtures.more)
    const proceedData = Promise.all(fixtures.result.map(async (fixture,index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']} (UTC +6:30)`,
            "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": teams.getHomeTeam['5848'], 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=W1&p_team=${fixture['5780']}`,
                    "value": "136555",
                },
                {
                    "title": "Draw", 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=Draw&p_team=Draw`,
                    "value": "136566",
                },
                {
                    "title": teams.getAwayTeam['5848'], 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=W2&p_team=${fixture['5782']}`,
                    "value": "136565",
                }
            ]

        }
        
    }))
    proceedData.then(response=>{
        // if(fixtures.more){
        //     response.push({
        //         "title": `‎`,
        //         "subtitle": `‎ `,
        //         "image": '',
        //         "url": '',
        //         "buttons": [
        //             {
        //                 "title": `More`, 
        //                 "type": "sequence", 
        //                 "extra": ``,
        //                 "value": "138227",
        //             }
        //         ]
    
        //     })
        // }
        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
                previousFixtures: "2",
                nextFixtures: fixtures.total > 5?"1":"2"
            },
            "status": 200
        })
    })
})

router.get('/second-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("second",req.query.customer_id);

    const proceedData = Promise.all(fixtures.result.map(async (fixture,index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']} (UTC +6:30)`,
            "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": teams.getHomeTeam['5848'], 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=W1&p_team=${fixture['5780']}`,
                    "value": "136555",
                },
                {
                    "title": "Draw", 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=Draw&p_team=Draw`,
                    "value": "136566",
                },
                {
                    "title": teams.getAwayTeam['5848'], 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=W2&p_team=${fixture['5782']}`,
                    "value": "136565",
                }
            ]

        }
        
    }))
    proceedData.then(response=>{
        // if(fixtures.more){
        //     response.push({
        //         "title": `‎`,
        //         "subtitle": `‎ `,
        //         "image": '',
        //         "url": '',
        //         "buttons": [
        //             {
        //                 "title": `More`, 
        //                 "type": "sequence", 
        //                 "extra": ``,
        //                 "value": "138228",
        //             }
        //         ]
    
        //     })
        // }

        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
                previousFixtures: "1",
                nextFixtures: fixtures.total > 10?"1":"2"
            },
            "status": 200
        })
    })
})

router.get('/third-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("third",req.query.customer_id);

    const proceedData = Promise.all(fixtures.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']} (UTC +6:30)`,
            "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": teams.getHomeTeam['5848'], 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=W1&p_team=${fixture['5780']}`,
                    "value": "136555",
                },
                {
                    "title": "Draw", 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=Draw&p_team=Draw`,
                    "value": "136566",
                },
                {
                    "title": teams.getAwayTeam['5848'], 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=W2&p_team=${fixture['5782']}`,
                    "value": "136565",
                }
            ]

        }
        
    }))
    proceedData.then(response=>{
        // if(fixtures.more){
        //     response.push({
        //         "title": `‎`,
        //         "subtitle": `‎ `,
        //         "image": '',
        //         "url": '',
        //         "buttons": [
        //             {
        //                 "title": `More`, 
        //                 "type": "sequence", 
        //                 "extra": ``,
        //                 "value": "138229",
        //             }
        //         ]
    
        //     })
        // }
        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
                previousFixtures: "1",
                nextFixtures: fixtures.total > 15?"1":"2"
            },
            "status": 200
        })
    })
})

router.get('/fourth-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("fourth",req.query.customer_id);

    const proceedData = Promise.all(fixtures.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']} (UTC +6:30)`,
            "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": teams.getHomeTeam['5848'], 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=W1&p_team=${fixture['5780']}`,
                    "value": "136555",
                },
                {
                    "title": "Draw", 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=Draw&p_team=Draw`,
                    "value": "136566",
                },
                {
                    "title": teams.getAwayTeam['5848'], 
                    "type": "sequence", 
                    "extra": `match_id=${fixture['5766']}&predict=W2&p_team=${fixture['5782']}`,
                    "value": "136565",
                }
            ]

        }
        
    }))
    proceedData.then(response=>{
        console.log("fourth",response)

        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
                previousFixtures: "1",
                nextFixtures: "2"
            },
            "status": 200
        })
    })
})

router.post('/store-user-prediction', async(req, res, next)=> {
    predictionService.storeUserPrediction(req.body)
    res.json({
        success: true
    })
})

router.post('/check-prediction', async(req, res, next)=> {
    console.log("calling check prediction")
    console.log(req.body)
    const isPredict= await predictionService.checkPredict(req.body.uid, req.body.match_id)
    console.log(isPredict)
    res.json({
        "data": "",
        "success": true,
        "message": "Successful", 
        "attributes": {
           isPredicted: isPredict?1:2
        },
        "status": 200
    })
})

/**Favorite Team */
router.get('/first-fav-teams', async(req, res, next) => {
    const teams = await teamService.getTeams('first');
    console.log(teams)
    const proceedData = Promise.all(teams.map(team=> {
        return {
            "title": `${team['5810']}`, 
            "type": "sequence",
            "extra": `fav_team=${team['5810']}&fav_team_id=${team['5811']}`,
            "value": 137758, 
        }
    }))
    
    proceedData.then(response=> {
        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
               
            },
            "status": 200
        })
    })
})

// router.get('/last-fav-teams', async(req, res, next) => {
//     console.log("calling last 10 fav teams api");
//     const teams = await teamService.getTeams('last');
//     console.log(teams)
//     const proceedData = Promise.all(teams.map(team=> {
//         return {
//             "title": `${team['5810']}`, 
//             "type": "sequence",
//             "extra": `team_id=${team['3089']}`,
//             "value": 136565, 
//         }
//     }))
    
//     proceedData.then(response=> {
//         response.push({
//             "title": `Back`, 
//             "type": "sequence",
//             "extra": ``,
//             "value": 137684,
//         })
//         response.push({
//             "title": `Main Menu`, 
//             "type": "sequence",
//             "extra": ``,
//             "value": 131605,
//         })
//         res.json({
//             "data": response,
//             "success": true,
//             "message": "Successful", 
//             "attributes": {
               
//             },
//             "status": 200
//         })
//     })
// })


/**History */
const theActiveHistory = (histories, sequence)=> {
    const data = [];
    for (const key in histories) {
        if (Object.hasOwnProperty.call(histories, key)) {
        const value = histories[key];
            data.push({
                "title": `${key}  \nYou are predicted ${value.length} matches.`, 
                "type": "sequence",
                "extra": `date_history=${key}`,
                "value": 138247,
            })
        }
    }
    return data;
}

const theInActiveHistory = (histories, sequence)=> {
    const data = [];
    for (const key in histories) {
        if (Object.hasOwnProperty.call(histories, key)) {
        const value = histories[key];
            data.push({
                "title": `${key}  \nYou are predicted ${value.length} matches.`, 
                "type": "sequence",
                "extra": `date_history=${key}`,
                "value": 138188,
            })
        }
    }
    return data;
}

router.get('/active-histories', (async(req, res, next)=> {
    const active = true;
    const histories = await historyService.histories(req.query.customer_id, active);
    // Loop through the groupedData object by keys
    console.log("Active Histories =>>>", histories)
    const proceedData = Promise.all(theActiveHistory(histories))
    
    if(Object.keys(histories).length > 0){
        proceedData.then(response=> {
            response.unshift({
                "title": `Main Menu`, 
                "type": "sequence",
                "extra": ``,
                "value": 131605,
            })
            res.json({
                "data": response,
                "success": true,
                "message": "Successful", 
                "attributes": {
                   activeHistory: "1"
                },
                "status": 200
            })
        })
    }else{
        res.json({
            "data": [],
            "success": true,
            "message": "Successful", 
            "attributes": {
                activeHistory: "2"
            },
            "status": 200
        })
    }
}))

router.get('/inactive-histories', async(req, res, next)=> {
    const active = false;
    const histories = await historyService.histories(req.query.customer_id, active);
    // Loop through the groupedData object by keys
    console.log("calling inactive histories")
    const proceedData = Promise.all(theInActiveHistory(histories))
    if(Object.keys(histories).length > 0){
        proceedData.then(response=> {
            response.unshift({
                "title": `Main Menu`, 
                "type": "sequence",
                "extra": ``,
                "value": 131605,
            })
            res.json({
                "data": response,
                "success": true,
                "message": "Successful", 
                "attributes": {
                    inactiveHistory: "1"
                },
                "status": 200
            })
        })
    }else{
        res.json({
            "data": [],
            "success": true,
            "message": "Successful", 
            "attributes": {
                inactiveHistory: "2"
            },
            "status": 200
        })
    }
   
})

router.post('/active-histories-by-date-first', async(req, res,next)=> {
    const active=true;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "first");
    console.log("history length",histories.result.length, histories.total)
    // console.log("histories", histories)
    let proceedData=[];
    if(histories.result.length>0){
         proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
            const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
            const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
            console.log("predicteeeeed : ", fixture.predict)
            return {
                "title": `${fixture['5780']}  -  ${fixture['5782']}`,
                "subtitle": `${fixture['5769']} - You are predicted <font color="blue">${guest}</font>`,
                "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
                "url": '',
                "buttons": [
                    {
                        "title": 'Edit Prediction', 
                        "type": "sequence", 
                        "extra": `predicted_match_id=${fixture['5766']}`,
                        "value": 138083,
                        "Columns": 6
                    }
                ]
    
            }
        }))
        proceedData.then(response=>{
            console.log("active prediction response", response)
            res.json({
                "data": response,
                "success": true,
                "message": "Successful", 
                "attributes": {
                    previousFixturesActive: "2",
                    nextFixturesActive: histories.total > 5?"1":"2"
                },
                "status": 200
            })
        })
    }else{
        res.json({
            "data": [],
            "success": true,
            "message": "Successful", 
            "attributes": {
                
            },
            "status": 200
        })
    }
})
router.post('/active-histories-by-date-second', async(req, res,next)=> {
    const active=true;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "second");
    console.log("history length",histories.result.length, histories.total)
    // console.log("histories", histories)
    let proceedData=[];
    if(histories.result.length>0){
         proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
            const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
            const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
            console.log("predicteeeeed : ", fixture.predict)
            return {
                "title": `${fixture['5780']}  -  ${fixture['5782']}`,
                "subtitle": `${fixture['5769']} - You are predicted <font color="blue">${guest}</font>`,
                "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
                "url": '',
                "buttons": [
                    {
                        "title": 'Edit Prediction', 
                        "type": "sequence", 
                        "extra": `predicted_match_id=${fixture['5766']}`,
                        "value": 138083,
                        "Columns": 6
                    }
                ]
    
            }
        }))
        proceedData.then(response=>{
            console.log("active prediction response", response)
            res.json({
                "data": response,
                "success": true,
                "message": "Successful", 
                "attributes": {
                    previousFixturesActive: "2",
                    nextFixturesActive: histories.total > 10?"1":"2"
                },
                "status": 200
            })
        })
    }else{
        res.json({
            "data": [],
            "success": true,
            "message": "Successful", 
            "attributes": {
                
            },
            "status": 200
        })
    }
})
router.post('/active-histories-by-date-third', async(req, res,next)=> {
    const active=true;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "third");
    console.log("history length",histories.result.length, histories.total)
    // console.log("histories", histories)
    let proceedData=[];
    if(histories.result.length>0){
         proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
            const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
            const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
            console.log("predicteeeeed : ", fixture.predict)
            return {
                "title": `${fixture['5780']}  -  ${fixture['5782']}`,
                "subtitle": `${fixture['5769']} - You are predicted <font color="blue">${guest}</font>`,
                "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
                "url": '',
                "buttons": [
                    {
                        "title": 'Edit Prediction', 
                        "type": "sequence", 
                        "extra": `predicted_match_id=${fixture['5766']}`,
                        "value": 138083,
                        "Columns": 6
                    }
                ]
    
            }
        }))
        proceedData.then(response=>{
            console.log("active prediction response", response)
            res.json({
                "data": response,
                "success": true,
                "message": "Successful", 
                "attributes": {
                    previousFixturesActive: "1",
                    nextFixturesActive: histories.total > 15?"1":"2"
                },
                "status": 200
            })
        })
    }else{
        res.json({
            "data": [],
            "success": true,
            "message": "Successful", 
            "attributes": {
                
            },
            "status": 200
        })
    }
})
router.post('/active-histories-by-date-fourth', async(req, res,next)=> {
    const active=true;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "fourth");
    console.log("history length",histories.result.length, histories.total)
    // console.log("histories", histories)
    let proceedData=[];
    if(histories.result.length>0){
         proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
            const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
            const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
            console.log("predicteeeeed : ", fixture.predict)
            return {
                "title": `${fixture['5780']}  -  ${fixture['5782']}`,
                "subtitle": `${fixture['5769']} - You are predicted <font color="blue">${guest}</font>`,
                "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
                "url": '',
                "buttons": [
                    {
                        "title": 'Edit Prediction', 
                        "type": "sequence", 
                        "extra": `predicted_match_id=${fixture['5766']}`,
                        "value": 138083,
                        "Columns": 6
                    }
                ]
    
            }
        }))
        proceedData.then(response=>{
            console.log("active prediction response", response)
            res.json({
                "data": response,
                "success": true,
                "message": "Successful", 
                "attributes": {
                    previousFixturesActive: "1",
                    nextFixturesActive: "2"
                },
                "status": 200
            })
        })
    }else{
        res.json({
            "data": [],
            "success": true,
            "message": "Successful", 
            "attributes": {
                
            },
            "status": 200
        })
    }
})
router.post('/inactive-histories-by-date-first', async(req, res,next)=> {
    console.log("calling inactive history")
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "first");
    console.log("inactive histories =>>>", histories.result, histories.total)
    const proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} \n <font color="black">Result: ${fixture['5781']} - ${ fixture['5783'] }</font>`,
            "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": `You predicted <font color="blue">${guest}</font>`, 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "columns": 6
                },
                {
                    "title": fixture.winLose==='Win'?"✅":"❌", 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "columns": 6
                },
            ]

        }
        
    }))
    proceedData.then(response=>{
        console.log("inactive response", response)
        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
                previousFixturesInActive: "2",
                nextFixturesInActive: histories.total > 5?"1":"2"
            },
            "status": 200
        })
    })
})
router.post('/inactive-histories-by-date-second', async(req, res,next)=> {
    console.log("calling inactive history")
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "second");
    console.log("history length", histories.result.length, histories.total)
    const proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']}  \n <font color="black">Result: ${fixture['5781']} - ${ fixture['5783'] }</font>`,
            "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": `You predicted <font color="blue">${guest}</font>`, 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                },
                {
                    "title": fixture.winLose==='Win'?"✅":"❌", 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                },
            ]

        }
        
    }))
    proceedData.then(response=>{
        console.log("inactive response", response)
        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
                previousFixturesInActive: "1",
                nextFixturesInActive: histories.total > 10?"1":"2"
            },
            "status": 200
        })
    })
})
router.post('/inactive-histories-by-date-third', async(req, res,next)=> {
    console.log("calling inactive history")
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "third");
    console.log("history length", histories.result.length, histories.total)
    const proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} \n <font color="black">Result: ${fixture['5781']} - ${ fixture['5783'] }</font>`,
            "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": `You predicted <font color="blue">${guest}</font>`, 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                },
                {
                    "title": fixture.winLose==='Win'?"✅":"❌", 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                },
            ]

        }
        
    }))
    proceedData.then(response=>{
        console.log("inactive response", response)
        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
                previousFixturesInActive: "1",
                nextFixturesInActive: histories.total > 15?"1":"2"
            },
            "status": 200
        })
    })
})
router.post('/inactive-histories-by-date-fourth', async(req, res,next)=> {
    console.log("calling inactive history")
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "fourth");
    console.log("history length", histories.result.length, histories.total)
    const proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} \n <font color="black">Result: ${fixture['5781']} - ${ fixture['5783'] }</font>`,
            "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": `You predicted <font color="blue">${guest}</font>`, 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                },
                {
                    "title": fixture.winLose==='Win'?"✅":"❌", 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                },
            ]

        }
        
    }))
    proceedData.then(response=>{
        console.log("inactive response", response)
        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
                previousFixturesInActive: "1",
                nextFixturesInActive: "2"
            },
            "status": 200
        })
    })
})
router.post('/edit-prediction', async(req, res, next)=> {
    const fixture = await predictionService.predictedMatch(req.body.predicted_match_id, req.body.uid);
    console.log(fixture)
    const teams = await footballService.getTeamShortFormByTeamName(fixture.match_hometeam_id, fixture.match_awayteam_id)
    console.log(teams)
    res.json({
        "data": [
            {
                "title": `${fixture.match_hometeam_name}  -  ${fixture.match_awayteam_name}`,
                "subtitle": `${fixture.match_date} - You are predicted ${teams.getHomeTeam['5848']}`,
                "image": fixture.banner_image,
                "url": '',
                "buttons": [
                    {
                        "title": teams.getHomeTeam['5848'], 
                        "type": "sequence", 
                        "extra": `match_id=${fixture.match_id}&predict=W1&p_team=${fixture.match_hometeam_name}`,
                        "value": "138246",
                    },
                    {
                        "title": "Draw", 
                        "type": "sequence", 
                        "extra": `match_id=${fixture.match_id}&predict=Draw&p_team=Draw`,
                        "value": "138246",
                    },
                    {
                        "title": teams.getAwayTeam['5848'], 
                        "type": "sequence", 
                        "extra": `match_id=${fixture.match_id}&predict=W2&p_team=${fixture.match_awayteam_name}`,
                        "value": "138246",
                    }
                ]
            }
        ],
        "success": true,
        "message": "Successful", 
        "attributes": {
        },
        "status": 200
    })
})
router.post('/update-prediction', async(req, res, next) => {
    await predictionService.updatePredictedMatch(req.body)
    res.json({
        success: true
    })
})

/**Profile */
router.post('/profile', async(req, res, next)=> {
    console.log("calling profile")
    const profile = await profileService.profile(req.body);
    console.log(profile)
    res.json({
        "data": `${profile['5755']}`,
        "success": true,
        "message": "Successful", 
        "attributes": {
        },
        "status": 200
    })
})

//get update fixtures
router.get('/noti-message', async(req, res, next)=> {
    const fixture = await notiService.getPredictedAndFinishedMatchByUserId(req.query.customer_id)
    console.log(fixture)
   if(fixture!==null){
        res.json({
            "data": `Match Finished \n${fixture['5780']} - ${fixture['5782']} \nMatch Score: ${fixture['5781']}:${fixture['5783']} \nYou made the following prediction ${fixture['5862']} \n${fixture['5897']==="Win"?"Congratulations!":"Try Again!"} Your prediction was ${fixture['5897']==="Win"?"correct":"incorrect"}! ${fixture['5897']==="Win"?"\nPoints added to your balance 1":""}`,
            "success": true,
            "message": "Successful", 
            "attributes": {
            },
            "status": 200
        })
   }
})

/**Leaderboard */
router.get('/top-five-player', async(req, res, next)=>{
    const leaderboard = await leaderboardService.getTopPredictionUserScore();
    console.log(leaderboard)
    res.json({
        "data": `${leaderboard[0]['5751']} -  ${leaderboard[0]['5755']} \n${leaderboard[1]['5751']} -  ${leaderboard[1]['5755']} \n${leaderboard[2]['5751']} -  ${leaderboard[2]['5755']} \n${leaderboard[3]['5751']} -  ${leaderboard[3]['5755']} \n${leaderboard[4]['5751']} -  ${leaderboard[4]['5755']}`,
        "success": true,
        "message": "Successful", 
        "attributes": {
        },
        "status": 200
    })
})

router.get('/leaderboard', async(req, res)=> {
    const leaderboard = await leaderboardService.getTopPredictionUserScore();
    res.json(leaderboard.map((item, index)=> {
        return {
            "id": index+1,
            "name": item['5751'],
            "score": item['5755']
        }
    }))
})

/**Quizzes */
router.post('/quizzes', async(req, res)=> {
    
    const totalAnswer = req.body.totalAnswer?0:req.body.totalAnswer;
    console.log("total answer", req.body)
    const quizz = await quizService.getQuizzes(totalAnswer);
    res.json({
        "data": [
            {
                "title": `Profile`, 
                "type": "sequence",
                "extra": ``,
                "value": 138687,
            },
            {
                "title": `Next`, 
                "type": "sequence",
                "extra": `totalAnswer: ${totalAnswer+1}`,
                "value": 138872,
            },
            {
                "title": `${quizz['6007']}`, 
                "type": "sequence",
                "extra": `answer=Option 1&answerValue=${quizz['6007']}&totalAnswer: ${totalAnswer}`,
                "value": 138873,
            },
            {
                "title": `${quizz['6008']}`, 
                "type": "sequence",
                "extra": `answer=Option 2&answerValue=${quizz['6008']}&totalAnswer: ${totalAnswer}`,
                "value": 138873,
            },
            {
                "title": `${quizz['6009']}`, 
                "type": "sequence",
                "extra": `answer=Option 3&answerValue=${quizz['6009']}&totalAnswer: ${totalAnswer}`,
                "value": 138873,
            },
            {
                "title": `${quizz['6010']}`, 
                "type": "sequence",
                "extra": `answer=Option 4&answerValue=${quizz['6010']}&totalAnswer: ${totalAnswer}`,
                "value": 138873,
            },
        ],
        "success": true,
        "message": "Successful", 
        "attributes": {
        },
        "status": 200
    })
})
router.post('/question', (async(req, res) => {
    const totalAnswer = req.body.totalAnswer?0:req.body.totalAnswer;
    console.log("total answer2", totalAnswer)

    const quizz = await quizService.getQuizzes(totalAnswer);
    console.log(req.body)
    res.json({
        "data": `${req.body.language==='English'?quizz['6005']:quizz['6006']}`,
        "success": true,
        "message": "Successful", 
        "attributes": {
        },
        "status": 200
    })
}))

router.get('/send-noti-favteam', async(req, res) => {
    const users = await notiService.sentNotiUserFavouriteTeam();
    res.json({
        "data": users,
        "success": true,
        "message": "Successful", 
        "attributes": {
        },
        "status": 200
    })
})

router.get('/fixtures-results', async(req, res, next)=> {
    const fixtures = await footballService.getFixtureAndResult();
    res.json({
        "success": true,
        "statusCode": 200,
        "data": fixtures.sort((a, b)=> {
            if (a['5778'] === "Finished" && b['5778'] !== "Finished") {
                return -1; // a is Finished, b is not, move a to end
            } else if (a['5778'] !== "Finished" && b['5778'] === "Finished") {
                return 1; // a is not finished, b is finished, move b to end
            } else {
                return 0; // Both have same match_status or both are not finished
            }
        })
    })
})


module.exports = router;