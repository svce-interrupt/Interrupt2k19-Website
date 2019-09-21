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


});

router.get('/1', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/2', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/3', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/4', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/5', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/6', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/7', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/8', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/9', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/10', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/11', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/12', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/13', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/14', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/15', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/16', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/17', (req, res) => {
    res.render('polling/participant/1/1')
});

router.get('/18', (req, res) => {
    res.render('polling/participant/1/1')
});



module.exports = router;
