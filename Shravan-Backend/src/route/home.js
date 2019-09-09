const express =  require('express');
const router  =  express.Router({strict : true, mergeParams : true});

const { isAuthenticated } = require('../middleware/verify');

router.get('/', (req, res) => {

    res.render('home');
});

router.get('/logout', isAuthenticated, (req, res) => {

    const redirectPath  =   req.user.isAdmin ? '/login/admin' : '/login' ;

    req.logout();
    req.session.destroy(() => {
        res.clearCookie("Interrupt_session");
        res.redirect(redirectPath);
    });
})

module.exports = router;
