const multer = require('multer')
const express = require('express');

const User = require('../models/User');
const { checkAuth, redirectIfAuthenticated } = require('../middlewares/auth.middleware');

const router = express.Router();

const AuthController = require('../controllers/admin/auth.controller');
const UserController = require('../controllers/admin/dashboard.controller');
const LeaderBoardService = require('../services/leaderboard.service');
const leaderBoardService = new LeaderBoardService();

const upload = multer({ 
    dest: 'uploads/csv',
    limits: {
        fileSize: 50 * 1024 * 1024, // 10 MB
  },
});

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
    req.session.destroy();
    res.redirect('/admin/login');
});

router.get('/user-data', async(req, res) => {
    const userData = await UserController.userData()
    res.status(200).json(userData)
})

router.post('/upload-csv', upload.single('file'), async (req, res) => {
    await UserController.importCustomerCSV(req, res)
})
router.get('/subscribers', checkAuth, async(req, res) => {
    const beforeTenDayAgoCustomersCount = await UserController.beforeTenDayAgo()
    console.log(beforeTenDayAgoCustomersCount)
    res.render('customer', {
        beforeTenDay: beforeTenDayAgoCustomersCount.beforeTendayCount,
        countBySequence: beforeTenDayAgoCustomersCount.groupBySequenceBeforeTenDay
    })
})
router.get('/subscribers-monthly', async(req, res) => {
    const monthly = await UserController.monthlyUsers(req, res)
    const weekly = await UserController.weeklyUsers(req, res)
    const daily = await UserController.dailyUsers(req, res)
    res.status(200).json({
        monthly,
        weekly,
        daily
    })
})
// router.get('/befo', async(req, res) => {
//     const customers = await UserController.getAllCustomer(req, res)
//     res.status(200).json({data: customers})
// })

module.exports = router;