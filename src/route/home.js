const express =  require('express');
const router  =  express.Router({strict : false , mergeParams : true});

const { isAuthenticated } = require('../middleware/verify');

router.get('/', (req, res) => {
    res.render('home', {message : req.flash('success')});
});

router.get('/team', (req, res) => {
    res.render('sponsor');
});

router.get('/logout', isAuthenticated, (req, res) => {

    const redirectPath  =   req.user.isAdmin ? '/login/admin' : '/login' ;

    req.logout();
    req.session.destroy(() => {
        res.clearCookie();
        res.redirect(redirectPath);
    });
})

module.exports = router;
