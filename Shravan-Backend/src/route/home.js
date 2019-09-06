const express =  require('express');
const router  =  express.Router({strict : true, mergeParams : true});

const { isAuthenticated } = require('../middleware/verify');

router.get('/', (req, res) => {

    res.render('home');
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.logout();
    req.session.destroy(() => {
        console.log("logged out");
        res.clearCookie("Interrupt_session");
        res.redirect('/');
    });
})

module.exports = router;
