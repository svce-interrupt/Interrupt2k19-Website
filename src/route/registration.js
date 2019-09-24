const express   =   require('express');
const router    =   express.Router({mergeParams : true, strict : true});

const db        =   require('../database/config/connection');
const Student   =   require('../database/models/Student');
const EventList =   require('../database/models/EventList');
const Workshop  =   require('../database/models/Workshop');

const {verifyData, notLoggedIn} = require(__dirname + '/../middleware/verify');

router.route('/')
    .get(async (req, res) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        
        if(req.isAuthenticated()){

        var count = await Workshop.count({
            where :{
                workshop : true
            }
        });

        if(count) console.log(count);
        count = (count <= 10)? 10 - count: 0;
        
         
        const events = await EventList.findOne({
                where : {
                    studentId : req.user.id
                }
            })

        const workshop = await Workshop.findOne({
                where : {
                    studentId : req.user.id
                }
            });

                if(events){

                    res.render('register', {
                        event1 : events.dataValues.ev1,
                        event2 : events.dataValues.ev2,
                        event3 : events.dataValues.ev3,
                        event4 : events.dataValues.ev4,
                        event5 : events.dataValues.ev5,
                        event6 : events.dataValues.ev6,
                        event7 : events.dataValues.ev7,
                        event8 : events.dataValues.ev8,
                        event9 : events.dataValues.ev9,
                        event10 : events.dataValues.ev10,
                        count : (count) ? count : 40,
                        event11 : (workshop) ? workshop.dataValues.workshop : 0 ,
                        button : true
                    });
                }else{
                    res.render('register');
                }
        }
        else 
            res.render('register', {message : req.flash('error')});
    })
    .post(verifyData, async(req, res) => {

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
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            req.flash('success', `hi ${student.dataValues.student_name}!`);
            res.redirect("/");
        })
        .catch((err) => {
            req.flash('error', 'hmm, is that a valid email?')
            res.redirect('/register');
        })
    });


module.exports = router;
