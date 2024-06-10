const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/login', async(req, res) => {
    console.log("renderrrrr")
    res.render('login');
})

module.exports = router;