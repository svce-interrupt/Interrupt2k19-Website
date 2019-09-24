const express = require('express');
const router = express.Router({mergeParams : true, strict : true});

const Student  = require('../database/models/Student');
const EventList    = require('../database/models/EventList');
const Workshop  =   require('../database/models/Workshop');

const { isAuthenticated, checkEmptyData } = require('../middleware/verify');

router.get("/", (req, res) => {
    res.render('events');
});

router.route('/add')
    .post(isAuthenticated, checkEmptyData, async (req, res) => {

        const events = req.query;
        const {workshop} = req.body;

        const count = await Workshop.count({
            where :{
                workshop : true
            }
        });

        const eventlist = await EventList.findOne({where : {studentId : req.user.id}});
        const workshoplist = await Workshop.findOne({where : {studentId : req.user.id}});

        if(count > 10 && workshop) workshop = false;

        if(eventlist){
            eventlist.update(events).then(() => {
              if(!res.headersSent) res.sendStatus(200);
            }).catch(err => console.log(err));
	    }
        else{
            req.user.createEventList(events).then(event => {
              if(!res.headersSent) res.sendStatus(200);
            }).catch(err => console.log(err));
        }

    
        if(workshoplist){
            workshoplist.update({workshop}).then((work) => {
                if(!res.headersSent) res.sendStatus(200);
            }).catch(err => console.log(err));
        }
        else{
            Workshop.create({
                workshop,
                studentId : req.user.id,
                name : req.user.student_name,
                email : req.user.email
            }).then(event => {
                if(!res.headersSent) res.sendStatus(200);
            }).catch(err => console.log(err));
        }
        

    })
module.exports = router;
