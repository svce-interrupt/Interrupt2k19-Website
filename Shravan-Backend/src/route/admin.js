const express =  require('express');
const router  =  express.Router({strict : false, mergeParams : true});

// Middlwares
const { isAuthenticated, hasAdminAccess } = require('../middleware/verify');

// Schemas
const Student       =   require('../database/models/Student');
const EventList     =   require('../database/models/EventList');
const Challenge     =   require('../database/models/Challenge');
const LeaderBoard   =   require('../database/models/LeaderBoard');

// Sequelize searching
const Op            =   require('sequelize').Op;


router.get('/', hasAdminAccess, (req, res) => {
    res.render('home');
});

router.route('/display')
    .get(hasAdminAccess, (req, res) => {

        Student.findAll({
            attributes : ["id", "student_name", "year", "email", "ph_number", "college"],
            where : {
                student_name : {
                    [Op.like] : `%%`
                }
            },
            include : [{
                model : EventList,
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {
            res.send(students);
        })

    })

module.exports = router;
