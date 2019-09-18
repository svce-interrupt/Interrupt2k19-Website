const express =  require('express');
const router  =  express.Router({strict : true, mergeParams : true});

const { isAuthenticated, hasNotVoted } = require('../middleware/verify');

const Poll    =   require('../database/models/Poll');

router.get('/', (req, res) => {
    res.render('polling/vote');
});

router.post('/vote', isAuthenticated, hasNotVoted, (req, res) => {
    
    Poll.findOrCreate({
        where :  {
            id : req.body.vote.id
        },
        defaults : {
            votes : 1
        }
    })
    .then(([website, created]) => {
        
        req.user.update({hasVoted : true})
            .then(student => res.status(202).send({"Message" : "You have successfully voted", "Status" : 1}));

        if(!created)
            website.increment(['votes'], {by : 1});

    });


})


module.exports = router;
