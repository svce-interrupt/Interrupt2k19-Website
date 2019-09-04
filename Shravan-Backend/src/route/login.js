const express  =  require('express');
const passport =  require('passport');
const router   =  express.Router({mergeParams : true, strict : true});

const { authenticate } = require('../middleware/authenticate');
const { isLoggedin } = require('../middleware/verify');

router.route("/")
  .get(isLoggedin, (req, res) => {
    res.render('login');
  })
  .post(passport.authenticate('local', {failureRedirect : '/login', successRedirect: '/'}), (req, res) => {
    res.redirect('/');
  })


module.exports = router;