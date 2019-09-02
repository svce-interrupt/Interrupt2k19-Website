const express   =   require('express');
const router    =   express.Router({mergeParams : true, strict : true});

const db        =   require('../database/config/connection');
const Student   =   require('../database/models/Student');

const {isLoggedin, verifyData} = require(__dirname + '/../middleware/verify');

router.route('/')
    .get(isLoggedin, (req, res) => {
        res.sendStatus(200);
    })
    .post(isLoggedin, verifyData, (req, res) => {

        const {name, email, number, password, college, year} = req.body;

        Student.create({
            student_name : name,
            year : year,
            college : college,
            email : email,
            ph_number : number,
            password : password
        })
        .then((student) => {
            console.log("Student has been created");
            res.redirect("/");
        })
        .catch((err) => {
            console.log("Something went wrong");
        })
    });


module.exports = router;
