const express =  require('express');
const router  =  express.Router({strict : false, mergeParams : true});

const { isAuthenticated } = require('../middleware/verify');

router.get('/', (req, res) => {
    res.render
});

router.get('/one', (req, res) => {
    res.render('challenge/base');
});


module.exports = router;

