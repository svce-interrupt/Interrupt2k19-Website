const express =  require('express');
const router  =  express.Router({strict : true, mergeParams : true});

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
