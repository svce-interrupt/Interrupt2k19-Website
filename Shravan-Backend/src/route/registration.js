const express   =   require('express');
const router    =   express.Router({mergeParams : true, strict : true});

const {isLoggedin, verifyData} = require(__dirname + '/../middleware/verify');

router.route('/')
    .get(isLoggedin, (req, res) => {
        res.sendStatus(200);
    })
    .post(isLoggedin, verifyData, (req, res) => {
        res.sendStatus(200);
    });


module.exports = router;
