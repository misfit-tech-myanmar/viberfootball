const express = require('express');
const axios = require('axios');

const router = express.Router();
const FootballService = require('../services/football.service');
const PredictionService = require('../services/prediction.service');
const QuizService = require('../services/quiz.service');
const TeamService = require('../services/team.services');
const HistoryService = require('../services/history.service');
const footballService = new FootballService();
const predictionService = new PredictionService();
const quizService = new QuizService();
const teamService = new TeamService();
const historyService = new HistoryService();

/** Get Home Page */
router.get('/first-fixtures', async(req, res, next) => {
    const fixtures = await footballService.getFixtures("first", req.query.customer_id);
    const proceedData = Promise.all(fixtures.map(async fixture=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5780'], fixture['5782'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']}`,
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
                    "extra": `match_id=${fixture['5766']}&predict=Draw`,
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
               
            },
            "status": 200
        })
    })
})
router.get('/second-fixtures', async(req, res, next) => {
    
    const fixtures = await footballService.getFixtures("second",req.query.customer_id);
    const proceedData = Promise.all(fixtures.map(async fixture=> {
        const teams = await footballService.getTeamShortFormByTeamName(fixture['5780'], fixture['5782'])
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5769']} | ${fixture['5779']}`,
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
                    "extra": `match_id=${fixture['5766']}&predict=Draw`,
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
               
            },
            "status": 200
        })
    })
})

router.post('/store-user-prediction', async(req, res, next)=> {
    console.log(req.body)
    predictionService.storeUserPrediction(req.body)
    res.json({
        success: true
    })
})

router.get('/quizzes', async(req, res, next)=> {
    console.log("calling quiz api");
    const quizzes = await quizService.getQuizzes();
    
})

router.get('/first-fav-teams', async(req, res, next) => {
    console.log("calling teams api");
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

const theHistory = (histories)=> {
    const data = [];
    for (const key in histories) {
        if (Object.hasOwnProperty.call(histories, key)) {
        const value = histories[key];
            data.push({
                "title": `${key}  ${value.length}`, 
                "type": "sequence",
                "extra": `date_history=${key}`,
                "value": 137758,
            })
        }
    }
    return data;
}

router.get('/histories', (async(req, res, next)=> {
    console.log("calling history api");
    const histories = await historyService.histories(req.query.customer_id);
    // Loop through the groupedData object by keys
    
    const proceedData = Promise.all(theHistory(histories))
    
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

module.exports = router;