const express =  require('express');
const passport =  require('passport');
const router  =  express.Router({strict : false, mergeParams : true});

const { isAuthenticated, hasAdminAccess } = require('../middleware/verify');

router.get('/', hasAdminAccess, (req, res) => {
    res.render('home');
});

router.get('/display', hasAdminAccess, (req, res) => {
    res.render('home');
})

module.exports = router;
