const checkAuth = (req, res, next) => {
    if(!req.session.userId){
        return res.redirect('/admin/login');
    }
    next();
}

// Middleware to redirect logged-in users to the dashboard
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return res.redirect('/admin/dashboard');
    }
    next();
  };

module.exports = {
    checkAuth,
    redirectIfAuthenticated
}