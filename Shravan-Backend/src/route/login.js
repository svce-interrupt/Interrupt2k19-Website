const express  =  require('express');
const passport =  require('passport');
const router   =  express.Router({mergeParams : true, strict : true});

const { isAuthenticated } = require('../middleware/verify');

router.route("/")
  .get((req, res) => {
    res.render('login');
  })
  .post(passport.authenticate('local', {failureRedirect : '/login', successRedirect: '/'}))


module.exports = router;