const express   =   require('express');
const router    =   express.Router({mergeParams : true, strict : true});

const db        =   require('../database/config/connection');
const Student   =   require('../database/models/Student');

const {isLoggedin, verifyData} = require(__dirname + '/../middleware/verify');

router.route('/')
    .get(isLoggedin, (req, res) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render('register');
    })
    .post(isLoggedin, verifyData, (req, res) => {

        const {name, email, number, password, college, year} = req.body.student;

        Student.create({
            student_name : name,
            year : year,
            college : college,
            email : email,
            ph_number : number,
            password : password
        })
        .then((student) => {
            console.log(student);
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.redirect("/");
        })
        .catch((err) => {
            console.log("Something went wrong");
        })
    });


module.exports = router;
