const express = require('express');
const User = require('../models/User');
const { checkAuth, redirectIfAuthenticated } = require('../middlewares/auth.middleware');

const router = express.Router();

const AuthController = require('../controllers/admin/auth.controller');

router.get('/login', redirectIfAuthenticated, async(req, res) => {
    console.log("renderrrrr")
    res.render('login');
})
router.post('/login', (req, res) => AuthController.login(req, res))

router.get('/dashboard', checkAuth,  (req, res) => {
    res.render('dashboard')
})

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;