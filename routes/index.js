const express = require('express');
const axios = require('axios');

const router = express.Router();

/** Get Home Page */
router.get('/fixtures', async(req, res, next) => {
    
    const response = await axios("https://apiv3.apifootball.com/?action=get_events&from=2024-02-24&to=2024-02-27&league_id=152&APIkey=c2bc49cee81e8a76bd939c1741aa9f67002beb8dca1d40b1d883f815ef9027a5");

    console.log(response.data)

    res.json(response.data)
})

module.exports = router;