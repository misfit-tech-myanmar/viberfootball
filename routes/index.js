const express = require('express');
const axios = require('axios');

const router = express.Router();
const FootballService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');
const QuizService = require('../services/quiz.service');
const TeamService = require('../services/team.services');
const HistoryService = require('../services/history.service');
const ProfileService = require('../services/profile.service');
const footballService = new FootballService();
const predictionService = new PredictionService();
const quizService = new QuizService();
const teamService = new TeamService();
const historyService = new HistoryService();
const profileService = new ProfileService();


/**Make Prediction */
router.get('/first-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("first", req.query.customer_id);
    // console.log("fixture::::", fixtures.more)
    const proceedData = Promise.all(fixtures.map(async fixture=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']} (UTC +6:30)`,
            "image": fixture['5899'],
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
               
            },
            "status": 200
        })
    })
})

router.get('/second-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("second",req.query.customer_id);

    const proceedData = Promise.all(fixtures.map(async fixture=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']} (UTC +6:30)`,
            "image": fixture['5899'],
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
               
            },
            "status": 200
        })
    })
})

router.get('/third-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("third",req.query.customer_id);

    const proceedData = Promise.all(fixtures.map(async fixture=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']} (UTC +6:30)`,
            "image": fixture['5899'],
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
               
            },
            "status": 200
        })
    })
})

router.get('/fourth-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("fourth",req.query.customer_id);

    const proceedData = Promise.all(fixtures.map(async fixture=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']} (UTC +6:30)`,
            "image": fixture['5899'],
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
        "data": " ",
        "success": true,
        "message": "Successful", 
        "attributes": {
           isPredicted: isPredict?1:2
        },
        "status": 200
    })
})

/**Quizzes */
router.get('/quizzes', async(req, res, next)=> {
    const quizzes = await quizService.getQuizzes();
    
})

/**Favorite Team */
router.get('/first-fav-teams', async(req, res, next) => {
    const teams = await teamService.getTeams('first');
    const proceedData = Promise.all(teams.map(team=> {
        return {
            "title": `${team['5810']}`, 
            "type": "sequence",
            "extra": `fav_team=${team['5810']}`,
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
    
    const proceedData = Promise.all(theActiveHistory(histories))
    
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
               
            },
            "status": 200
        })
    })
}))

router.get('/inactive-histories', async(req, res, next)=> {
    const active = false;
    const histories = await historyService.histories(req.query.customer_id, active);
    // Loop through the groupedData object by keys
    console.log("calling inactive histories")
    const proceedData = Promise.all(theInActiveHistory(histories))
    
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
               
            },
            "status": 200
        })
    })
})

router.post('/active-histories-by-date', async(req, res,next)=> {
    console.log("calling active history")
    const active=true;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active);
    // console.log("histories", histories)
    const proceedData = Promise.all(histories.map(async fixture=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        const guest = await footballService.getPredictedTeamName(teams, fixture.predict)
        console.log("predicteeeeed : ", fixture.predict)
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} - You are predicted ${guest}`,
            "image": fixture['5899'],
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

router.post('/inactive-histories-by-date', async(req, res,next)=> {
    console.log("calling inactive history")
    const active=false;
    const histories = await historyService.getHistoriesByDate(req.body.date_history, req.query.customer_id, active);
    const proceedData = Promise.all(histories.map(async fixture=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5956'], fixture['5957'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} - You are predicted ${teams.getHomeTeam['5848']}`,
            "image": fixture['5899'],
            "url": '',
            "buttons": [
                {
                    "title": teams.getHomeTeam['5848'], 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                },
                {
                    "title": "Draw", 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                },
                {
                    "title": teams.getAwayTeam['5848'], 
                    "type": "sequence", 
                    "extra": ``,
                    "value": "138113",
                    "Columns": 6
                }
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
    console.log(profile['5755'])
    res.json({
        "data": `${profile['5755']}`,
        "success": true,
        "message": "Successful", 
        "attributes": {
        },
        "status": 200
    })
})


module.exports = router;