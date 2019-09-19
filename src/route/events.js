const express = require('express');
const router = express.Router({mergeParams : true, strict : true});

const Student  = require('../database/models/Student');
const EventList    = require('../database/models/EventList');

const { isAuthenticated, checkEmptyData } = require('../middleware/verify');

router.get("/", (req, res) => {
    res.render('events');
});

router.route('/add')
    .post(isAuthenticated, checkEmptyData, (req, res) => {

        const events = req.query;

        EventList.findOne({where : {studentId : req.user.id}})
          .then(eventlist => {

            if(eventlist){

       	        eventlist.update(events).then(() => {
                    console.log("updated");
                    res.redirect('/');
                }).catch(err => console.log(err));
	    }
            else{
		console.log(req.user.student_name);

                req.user.createEventList(events).then(event => {
                    console.log("Added");
                    res.redirect('/');
                }).catch(err => console.log(err));
	    }
          })
          .catch(err => console.log(err))

    })
module.exports = router;
