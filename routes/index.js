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
    const isPredict= await predictionService.checkPredict(req.body.uid, req.body.match_id)
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
//     const teams = await teamService.getTeams('last');
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
                "title": `${key}  \nPredicted:${value.length} \nmatches.`, 
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
                "title": `${key}  \nPredicted:${value.length} \nmatches.`, 
                "type": "sequence",
                "extra": `date_history=${key}`,
                "value": 138188,
            })
        }
    }
    return data;
}

router.get('/active-history-check', (async(req, res, next)=> {
    const active = true;
    const histories = await historyService.histories(req.query.customer_id, active);
    res.json({
        "data": "",
        "success": true,
        "message": "Successful", 
        "attributes": {
           activehistory: Object.keys(histories).length > 0?"1":"2"
        },
        "status": 200
    })
}))

router.get('/active-histories', (async(req, res, next)=> {
    const active = true;
    const histories = await historyService.histories(req.query.customer_id, active);
    // Loop through the groupedData object by keys
    const proceedData = Promise.all(theActiveHistory(histories))
    
    proceedData.then(response=> {
        response.unshift({
            "title": `${req.body.language === 'English'?'Main Menu':'ပင်မစာမျက်နှာ'}`, 
            "type": "sequence",
            "extra": ``,
            "value": 136297,
        })
        res.json({
            "data": response,
            "success": true,
            "message": "Successful", 
            "attributes": {
               
            },
            "status": 200
        })
    })
}))

router.get('/inactive-history-check', async(req, res, next)=> {
    const active = false;
    const histories = await historyService.histories(req.query.customer_id, active);
    res.json({
        "data": "",
        "success": true,
        "message": "Successful", 
        "attributes": {
            inactivehistory: Object.keys(histories).length > 0?"1":"2"
        },
        "status": 200
    })
})
router.get('/inactive-histories', async(req, res, next)=> {
    const active = false;
    const histories = await historyService.histories(req.query.customer_id, active);
    // Loop through the groupedData object by keys
    const proceedData = Promise.all(theInActiveHistory(histories))
    proceedData.then(response=> {
        response.unshift({
            "title": `${req.body.language === 'English'?'Main Menu':'ပင်မစာမျက်နှာ'}`, 
            "type": "sequence",
            "extra": ``,
            "value": 136297,
        })
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

function beforeOneHour(time){
    const [hours, minutes] = time.split(':').map(Number);
    const newHours  = (hours - 1 + 24) % 24;
    // Format the new time
    const newTimeString = `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return newTimeString;
}

router.post('/active-histories-by-date-first', async(req, res,next)=> {
    const active=true;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "first");
    let proceedData=[];
    console.log("active histories => ", histories)
    if(histories.result.length>0){
         proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
            const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
            const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
            
            return {
                "title": `${fixture['5780']}  -  ${fixture['5782']}`,
                "subtitle": `${fixture['5769']} - You are predicted <font color="blue">${guest}</font>`,
                "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
                "url": '',
                "buttons": [
                    {
                        "title": `<font color="red">Editable until ${beforeOneHour(fixture['5779'])}</font>`, 
                        "type": "basic", 
                        "extra": ``,
                        "value": '',
                    },
                    {
                        "title": 'Edit Prediction', 
                        "type": "sequence", 
                        "extra": `predicted_match_id=${fixture['5766']}`,
                        "value": 138083,
                    }
                ]
    
            }
        }))
        proceedData.then(response=>{
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
    let proceedData=[];
    if(histories.result.length>0){
         proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
            const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
            const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
            return {
                "title": `${fixture['5780']}  -  ${fixture['5782']}`,
                "subtitle": `${fixture['5769']} - You are predicted <font color="blue">${guest}</font>`,
                "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
                "url": '',
                "buttons": [
                    {
                        "title": `<font color="red">Editable until ${beforeOneHour(fixture['5779'])}</font>`, 
                        "type": "basic", 
                        "extra": ``,
                        "value": '',
                    },
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
    let proceedData=[];
    if(histories.result.length>0){
         proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
            const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
            const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
            return {
                "title": `${fixture['5780']}  -  ${fixture['5782']}`,
                "subtitle": `${fixture['5769']} - You are predicted <font color="blue">${guest}</font>`,
                "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
                "url": '',
                "buttons": [
                    {
                        "title": `<font color="red">Editable until ${beforeOneHour(fixture['5779'])}</font>`, 
                        "type": "basic", 
                        "extra": ``,
                        "value": '',
                    },
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
    let proceedData=[];
    if(histories.result.length>0){
         proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
            const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
            const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
            return {
                "title": `${fixture['5780']}  -  ${fixture['5782']}`,
                "subtitle": `${fixture['5769']} - You are predicted <font color="blue">${guest}</font>`,
                "image": index%2===0?"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg":"https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7fa81100008a11ef84942e018f279e4f.jpeg",
                "url": '',
                "buttons": [
                    {
                        "title": `<font color="red">Editable until ${beforeOneHour(fixture['5779'])}</font>`, 
                        "type": "basic", 
                        "extra": ``,
                        "value": '',
                    },
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
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "first");
    const proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        console.log(req.query.customer_id, " - ", fixture)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} <font color="black">Result: ${fixture['5781']} - ${ fixture['5783'] }</font>`,
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
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "second");
    const proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']}  <font color="black">Result: ${fixture['5781']} - ${ fixture['5783'] }</font>`,
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
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "third");
    const proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} <font color="black">Result: ${fixture['5781']} - ${ fixture['5783'] }</font>`,
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
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active, "fourth");
    const proceedData = Promise.all(histories.result.map(async (fixture, index)=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']}  <font color="black">Result: ${fixture['5781']} - ${ fixture['5783'] }</font>`,
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
    const teams = await footballService.getTeamShortFormByTeamName(fixture.match_hometeam_id, fixture.match_awayteam_id)
    const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
    res.json({
        "data": [
            {
                "title": `${fixture.match_hometeam_name}  -  ${fixture.match_awayteam_name}`,
                "subtitle": `${fixture.match_date} - You are predicted <font color="blue">${guest}</font>`,
                "image": "https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/7ae87132008a11ef8d0722b151a25f3a.jpeg",
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
    console.log("Calling profile")
    const profile = await profileService.profile(req.body);
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
    console.log("noti => ",fixture)
    var predict;
    if(fixture !== null){
        if(fixture['5862']==='W1'){
            predict=fixture['5780']
        }else if(fixture['5862']==='W2'){
            predict=fixture['5783']
        }else{
            predict=fixture['5862']
        }
    }
   if(fixture!==null){
        res.json({
            "data": `Match Finished \n${fixture['5780']} - ${fixture['5782']} \nMatch Score: ${fixture['5781']}:${fixture['5783']} \nYou made the following prediction ${predict} \n${fixture['5897']==="Win"?"Congratulations!":"Try Again!"} Your prediction was ${fixture['5897']==="Win"?"correct":"incorrect"}! ${fixture['5897']==="Win"?"\n1 point added to your balance":""}`,
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
    // const proceedData = Promise.all()
    res.json({
        "data": [
            {
                "title": "Myanmar",
                "subtitle": "dede",
                "image": null,
                "url": null,
                "buttons": [
                    //1
                    {
                        "title": "1",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[0]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[0]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    //2
                    {
                        "title": "2",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[1]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[1]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    }, 
                    //3
                    {
                        "title": "3",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[2]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[2]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    // //4
                    {
                        "title": "4",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[3]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[3]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    //5
                    {
                        "title": "5",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[4]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[4]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": "see more",
                        "type": "url",
                        "extra": "",
                        "value": "http://sport-news-dev.free.nf/leaderboard/",
                        "messenger_extensions": false
                    }
    
                ]
            },
            {
                "title": "International",
                "subtitle": "dede",
                "image": null,
                "url": null,
                "buttons": [
                    //1
                    {
                        "title": "1",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[0]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[0]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    //2
                    {
                        "title": "2",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[1]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[1]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    }, 
                    //3
                    {
                        "title": "3",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[2]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[2]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    // //4
                    {
                        "title": "4",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[3]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[3]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    //5
                    {
                        "title": "5",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[4]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[4]['5755'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": "see more",
                        "type": "url",
                        "extra": "",
                        "value": "http://sport-news-dev.free.nf/leaderboard/",
                        "messenger_extensions": false
                    }
    
                ]
            },
           
        ],
        "success": true,
        "message": "",
        "status": 200,
        "attributes": {}
    })
})

router.get('/myanmar-leaderboard', async(req, res)=> {
    const leaderboard = await leaderboardService.getTopPredictionUserScore();
    res.json(leaderboard.myanmar.map((item, index)=> {
        return {
            "id": index+1,
            "name": item['5751'],
            "score": item['5755']
        }
    }))
})
router.get('/myanmar-leaderboard', async(req, res)=> {
    const leaderboard = await leaderboardService.getTopPredictionUserScore();
    res.json(leaderboard.myanmar.map((item, index)=> {
        return {
            "id": index+1,
            "name": item['5751'],
            "score": item['5755']
        }
    }))
})
router.get('/international-leaderboard', async(req, res)=> {
    const leaderboard = await leaderboardService.getTopPredictionUserScore();
    res.json(leaderboard.inter.map((item, index)=> {
        return {
            "id": index+1,
            "name": item['5751'],
            "score": item['5755']
        }
    }))
})

router.get('/quiz-top-five-player', async(req, res) => {
    const leaderboard = await leaderboardService.getQuizScores();
    // const proceedData = Promise.all()
    res.json({
        "data": [
            {
                "title": "Myanmar",
                "subtitle": "dede",
                "image": null,
                "url": null,
                "buttons": [
                    //1
                    {
                        "title": "1",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[0]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[0]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    //2
                    {
                        "title": "2",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[1]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[1]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    }, 
                    //3
                    {
                        "title": "3",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[2]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[2]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    // //4
                    {
                        "title": "4",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[3]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[3]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    //5
                    {
                        "title": "5",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[4]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.myanmar[4]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": "see more",
                        "type": "url",
                        "extra": "",
                        "value": "http://sport-news-dev.free.nf/leaderboard/",
                        "messenger_extensions": false
                    }
    
                ]
            },
            {
                "title": "International",
                "subtitle": "dede",
                "image": null,
                "url": null,
                "buttons": [
                    //1
                    {
                        "title": "1",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[0]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[0]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    //2
                    {
                        "title": "2",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[1]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[1]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    }, 
                    //3
                    {
                        "title": "3",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[2]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[2]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    // //4
                    {
                        "title": "4",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[3]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[3]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    //5
                    {
                        "title": "5",
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[4]['5751'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": leaderboard.inter[4]['6137'],
                        "type": "basic",
                        "extra": "",
                        "value": "",
                        "messenger_extensions": false
                    },
                    {
                        "title": "see more",
                        "type": "url",
                        "extra": "",
                        "value": "http://sport-news-dev.free.nf/leaderboard/",
                        "messenger_extensions": false
                    }
    
                ]
            },
           
        ],
        "success": true,
        "message": "",
        "status": 200,
        "attributes": {}
    })
})

function checkAnswer(userAnwer, correctAnswer){
    if(userAnwer === correctAnswer) return true;
    return false;
}

/**Quizzes */
router.post('/quizzes', async(req, res)=> {
    console.log("calling quizzes api")
    const totalAnswer = req.body.totalAnswer===''?0:req.body.totalAnswer;
    const quizz = await quizService.getQuizzes(req.body.QuizDone===''?0:req.body.QuizDone);
    console.log("quizzz", quizz)
    if(quizz !== undefined ){
        res.json({
            "data": [
                {
                    "title": `${req.body.language === 'English'?'Main Menu':'ပင်မစာမျက်နှာ'}`, 
                    "type": "sequence",
                    "extra": ``,
                    "value": 136297,
                },
                {
                    "title": `‎`, 
                    "type": "basic",
                    "extra": ``,
                    "value": ''
                },
                {
                    "title": `${quizz['6007']}`, 
                    "type": "sequence",
                    "extra": `QuizDone=${parseInt(req.body.QuizDone) + 1}&QuizAnswer=Option 1&QuizId=${quizz.id}`,
                    "value": "142673",
                },
                {
                    "title": `${quizz['6008']}`, 
                    "type": "sequence",
                    "extra": `QuizDone=${parseInt(req.body.QuizDone) + 1}&QuizAnswer=Option 2&QuizId=${quizz.id}`,
                    "value": "142673",
                },
                {
                    "title": `${quizz['6009']}`, 
                    "type": "sequence",
                    "extra": `QuizDone=${parseInt(req.body.QuizDone) + 1}&QuizAnswer=Option 3&QuizId=${quizz.id}`,
                    "value": "142673",
                },
                {
                    "title": `${quizz['6010']}`, 
                    "type": "sequence",
                    "extra": `QuizDone=${parseInt(req.body.QuizDone) + 1}&QuizAnswer=Option 4&QuizId=${quizz.id}`,
                    "value": "142673",
                },
            ],
            "success": true,
            "message": "Successful", 
            "attributes": {
            },
            "status": 200
        })
    }else{
        res.json({
            "data": [
                
            ],
            "success": true,
            "message": "Successful", 
            "attributes": {
            },
            "status": 200
        })
    }
    
})
router.post('/question', (async(req, res) => {
    console.log("total answer => ", req.body)
    const totalAnswer = req.body.totalAnswer ===''?0:req.body.totalAnswer;
    const quizz = await quizService.getQuizzes(req.body.QuizDone===''?0:req.body.QuizDone);
    console.log("quizzz", quizz)

    if(quizz !== undefined){
        res.json({
            "data": `${req.body.language==='English'?quizz['6005']:quizz['6006']}`,
            "success": true,
            "message": "Successful", 
            "attributes": {
            },
            "status": 200
        })
    }else{
        res.json({
            "data": `There is no quiz left for this week.`,
            "success": true,
            "message": "Successful", 
            "attributes": {
                NoQuizLeft: 1
            },
            "status": 200
        })
    }
}))

router.post('/check-quiz-answer', (async(req, res)=> {
    console.log("calling check quiz answer", req.body)
    const quiz = await quizService.checkQuizAnswer(req.body.QuizId)
    if(quiz['6011'] === req.body.QuizAnswer){
        await quizService.updateQuizScoreUser(req.body.uid);
        res.json({
            "data": `${req.body.language==='English'?'Your answer is correct':'သင့်ရဲ့အဖြေမှန်ပါသည်'}`,
            "success": true,
            "message": "Successful", 
            "attributes": {
                QuizScore: parseInt(req.body.QuizScore) + 1,
                TotalQuizScore: parseInt(req.body.TotalQuizScore) + 1,
                QuizTotalAnswer: parseInt(req.body.QuizTotalAnswer) + 1
            },
            "status": 200
        })
    }else{
        res.json({
            "data": `${req.body.language==='English'?'Your answer is Wrong':'သင့်ရဲ့အဖြေမှားပါသည်'}`,
            "success": true,
            "message": "Successful", 
            "attributes": {
                QuizTotalAnswer: parseInt(req.body.QuizTotalAnswer) + 1
            },
            "status": 200
        })
    }
}))

router.get('/test-update-status', async(req, res) => {
    const sortedQuiz = await quizService.updateQuizEntryStatus();

    res.json({
        "data": sortedQuiz ,
        "message": "fuck you quizzzz"
    })
})

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
    console.log("calling fixture and result")
    const fixtures = await footballService.getFixtureAndResult();
    res.json(fixtures.sort((a, b)=> {
        if (a.status === "Finished" && b.status !== "Finished") {
            return 1; // a is Finished, b is not, move a to end
        } else if (a.status !== "Finished" && b.status === "Finished") {
            return -1; // a is not finished, b is finished, move b to end
        } else {
            return 0; // Both have same match_status or both are not finished
        }
    }))
})


module.exports = router;