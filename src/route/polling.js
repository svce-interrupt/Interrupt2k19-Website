const express =  require('express');
const router  =  express.Router({strict : true , mergeParams : true});

const { isAuthenticated, hasNotVoted } = require('../middleware/verify');

const Poll      =   require('../database/models/Poll');

router.get('/', (req, res) => {
    res.render('polling/vote');
});

// user 1
router.get('/1', (req, res) => {
    res.sendFile('/1/index.html', {root : __dirname + '/../../public/gametags'});
});

// user 2
router.get('/2', (req, res) => {
    res.sendFile('gametags/2/index.html', {root : __dirname + '/../../public'});
});

router.get('/2/:id', (req, res) => {
    res.sendFile(`gametags/2/${req.params.id}`, {root : __dirname + '/../../public'});
});

// user 3
router.get('/3', (req, res) => {
    res.render('polling/');
});

// user 4
router.get('/4', (req, res) => {
    res.render('polling/');
});

// user 5
router.get('/5', (req, res) => {
    res.render('polling/');
});

// user 6
router.get('/6', (req, res) => {
    res.render('polling/');
});

// user 7
router.get('/7', (req, res) => {
    res.render('polling/');
});

// user 8
router.get('/8', (req, res) => {
    res.render('polling/');
});

// user 9
router.get('/9', (req, res) => {
    res.render('polling/');
});

// user 10
router.get('/10', (req, res) => {
    res.render('polling/');
});

// user 11
router.get('/11', (req, res) => {
    res.render('polling/');
});

// user 12
router.get('/12', (req, res) => {
    res.render('polling/');
});

// user 13
router.get('/13', (req, res) => {
    res.render('polling/');
});

// user 14
router.get('/14', (req, res) => {
    res.render('polling/');
});

// user 15
router.get('/15', (req, res) => {
    res.render('polling/');
});

// user 16
router.get('/16', (req, res) => {
    res.render('polling/');
});

// user 17
router.get('/17', (req, res) => {
    res.render('polling/');
});

// user 18
router.get('/18', (req, res) => {
    res.render('polling/');
});

// user 19
router.get('/19', (req, res) => {
    res.render('polling/');
});

// user 20
router.get('/20', (req, res) => {
    res.render('polling/');
});

// user 21
router.get('/21', (req, res) => {
    res.render('polling/');
});

// user 22
router.get('/22', (req, res) => {
    res.render('polling/');
});

// user 23
router.get('/23', (req, res) => {
    res.render('polling/');
});

// user 24
router.get('/24', (req, res) => {
    res.render('polling/');
});

// user 25
router.get('/25', (req, res) => {
    res.render('polling/');
});

// user 26
router.get('/26', (req, res) => {
    res.render('polling/');
});

// user 27
router.get('/27', (req, res) => {
    res.render('polling/');
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

module.exports = router;
