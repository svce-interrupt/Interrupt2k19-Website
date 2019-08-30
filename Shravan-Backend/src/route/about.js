const express = require('express');
const router = express.Router({strict : true, mergeParams : true});

router.get('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;


