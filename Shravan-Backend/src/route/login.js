const express  =  require('express');
const router   =  express.Router({mergeParams : true, strict : true});

const { authenticate } = require('../middleware/authenticate');
const { isLoggedin } = require('../middleware/verify');

router.route("/")
  .get(isLoggedin, (req, res) => {
    res.sendStatus(200);
  })
  .post(authenticate, (req, res) => {
    res.redirect('/');
  })


module.exports = router;