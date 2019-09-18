const express  =  require('express');
const passport =  require('passport');
const router   =  express.Router({mergeParams : true, strict : true});

const { isAuthenticated, notLoggedIn } = require('../middleware/verify');

router.route("/")
  .get(notLoggedIn , (req, res) => {
    res.render('login');
  })
  .post(passport.authenticate('local', {failureRedirect : '/login', successRedirect: '/'}))

router.route('/admin')
  .get(notLoggedIn, (req, res) => {
      res.render('login');
  })
  .post(passport.authenticate('admin-local', {failureRedirect : '/login', successRedirect: '/'}))

module.exports = router;