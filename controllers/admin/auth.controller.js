const User = require('../../models/User');
const passwordHash = require('password-hash');

const login = async (req, res) => {
    console.log("post login")
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if(!user || !passwordHash.verify(password, user.password)){
        return res.redirect('/admin/login');
    }
    req.session.userId = user._id;
    res.redirect('/admin/dashboard')
}

module.exports = {
    login
}