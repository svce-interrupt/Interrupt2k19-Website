const express = require('express');
const router = express.Router({mergeParams : true, strict : true});

router.get("/", (req, res) => {
    res.sendStatus(200);
});

module.exports = router;