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

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "Overall!"
            });
        })
    })

//Events

router.route('/display/challenge')
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
                where : {
                    ev1 : true
                },
                attributes : ['ev1'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "Challenge"
            });
        })

    })

router.route('/display/connoisseur')
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
                where : {
                    ev2 : true
                },
                attributes : ['ev2'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "Code Con thingy"
            });
        })

    })

router.route('/display/paper')
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
                where : {
                    ev3 : true
                },
                attributes : ['ev3'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "Paper presentation"
            });
        })

    })

router.route('/display/poster')
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
                where : {
                    ev4 : true
                },
                attributes : ['ev4'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count, 
                name : "Poster presentation"
            });
        })

    })

router.route('/display/stack')
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
                where : {
                    ev5 : true
                },
                attributes : ['ev5'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count, 
                name : "Stack market"
            });
        })

    })

router.route('/display/alt')
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
                where : {
                    ev6 : true
                },
                attributes : ['ev6'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "Alt + tab + tech"
            });
        })

    });

router.route('/display/mind')
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
                where : {
                    ev7 : true
                },
                attributes : ['ev7'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "Mind spar"
            });
        })


    })

router.route('/display/now')
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
                where : {
                    ev8 : true
                },
                attributes : ['ev8'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "Now u c me"
            });
        })

    })

router.route('/display/got')
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
                where : {
                    ev9 : true
                },
                attributes : ['ev9'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "Game of Tags"
            });
        })

    })

router.route('/display/win')
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
                where : {
                    ev10 : true
                },
                attributes : ['ev10'],
                as : "EventList"
            },{
                model : Challenge,
                as : "Challenge"
            }]
        })
        .then((students) => {

            const count =  students.length;

            res.render("table", {
                students,
                count,
                name : "win-code-ium"
            });
        })

    })


module.exports = router;
