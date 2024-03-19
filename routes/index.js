const express = require('express');
const axios = require('axios');

const router = express.Router();
const FootballService = require('../services/football.service');
const footballService = new FootballService();

/** Get Home Page */
router.get('/fixtures', async(req, res, next) => {
    console.log("calling this api")
    
    const fixtures = await footballService.getFixtures();
    let data = fixtures.map(fixture=> {
        return {
            "title": `${fixture['5780']}  -  ${fixture['5782']}`,
            "subtitle": `${fixture['5768']}`,
            "image": "https://s3-ap-southeast-1.amazonaws.com/myalice-live-public-bucket/misc/c7a1f39ee2a411ee99d812372ed6f352.jpeg",
            "url": '',
            "buttons": [
                {
                    "title": "W1", 
                    "type": "url", 
                    "extra": `match_id=${fixture['5766']}`,
                    "value": "https://getalice.ai/",
                },
                {
                    "title": "Draw", 
                    "type": "url", 
                    "extra": `match_id=${fixture['5766']}`,
                    "value": "https://getalice.ai/",
                },
                {
                    "title": "W2", 
                    "type": "url", 
                    "extra": `match_id=${fixture['5766']}`,
                    "value": "https://getalice.ai/",
                }
            ]

        }
    })

    res.json({
        "data": data,
        "success": true,
        "message": "Successful", 
        "attributes": {
           match_id: 123 
        },
        "status": 200
    })
})

module.exports = router;