const express = require('express');
const User = require('../models/User');
const { checkAuth, redirectIfAuthenticated } = require('../middlewares/auth.middleware');

const router = express.Router();

const AuthController = require('../controllers/admin/auth.controller');
const UserController = require('../controllers/admin/dashboard.controller');
const LeaderBoardService = require('../services/leaderboard.service');
const leaderBoardService = new LeaderBoardService();

router.get('/login', redirectIfAuthenticated, async(req, res) => {
    res.render('login');
})
router.post('/login', (req, res) => AuthController.login(req, res))

router.get('/dashboard', checkAuth,  async(req, res) => {
    const leaderBoards = await leaderBoardService.getTopPredictionUserScore();
    let ranksWithName = leaderBoards.inter.map((user, index)=> {
        return {
            name: user['5751']===''?'Unknown':user['5751'],
            phone: user['5752'],
            scores: user['5755']
        }
    })
    res.render('dashboard', {
        leaderboards: ranksWithName.slice(0,5)
    })
})

// Logout route
router.get('/logout', (req, res) => {
    console.log("calling logout")
    req.session.destroy();
    res.redirect('/admin/login');
});

router.get('/user-data', async(req, res) => {
    const userData = await UserController.userData()
    res.status(200).json(userData)
})

// router.get('/leader-boards', async(req, res) => {
//     const leaderBoards = await leaderBoardService.getTopPredictionUserScore();
//     let ranksWithName = leaderBoards.inter.map((user, index)=> {
//         console.log(index===10477?user['5751']:"")
//         return {
//             name: user['5751']===''?'Unknown':user['5751'],
//             phone: user['5752'],
//             scores: user['5755']
//         }
//     })
//     res.json(ranksWithName.sli)
// })

module.exports = router;