const express = require('express');
const router = express.Router({mergeParams : true, strict : true});

const Student  = require('../database/models/Student');
const EventList    = require('../database/models/EventList');

const { isAuthenticated } = require('../middleware/verify');

router.get("/", (req, res) => {
    res.render('event');
});

router.route('/add')
    .post(isAuthenticated, (req, res) => {

        const events = req.body.events;
        console.log(req.user.dataValues.id);

        EventList.findOne({where : {studentId : req.user.dataValues.id}})
          .then(eventlist => {
            
            if(eventlist)
                eventlist.update(events).then(() => {
                    console.log("updated");
                    res.sendStatus(200);
                })
            else
                EventList.create(events).then(event => {
                    req.user.setEventList(event);
                    console.log("Added");
                    res.sendStatus(200);
                })
            
          })
          .catch(err => console.log(err))
       

    })
module.exports = router;