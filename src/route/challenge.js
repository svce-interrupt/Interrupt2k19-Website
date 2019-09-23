const express =  require('express');
const router  =  express.Router({strict : false, mergeParams : true});

const fs      = require('fs');
const path    = require('path');
const Challenge  =  require('../database/models/Challenge');

router.get('/', (req, res)=> {
    res.sendStatus(200);
});


router.get('/hang_thug/data', (req, res)=>{
    fs.readFile(path.resolve("src/data/hang_thug/data.json"),(err,data)=>{
        if(err)throw err;
        res.send(data.toString());
    });
});

router.get('/hang_thug',(req,res)=>{
    res.render('challenge/hang_thug/index');
});


router.get("/dark_house",(req,res)=>{
    res.render('challenge/dark_house/index');
});

router.get('/dark_house/data',(req,res)=>{
    fs.readFile(path.resolve("src/data/dark_house/data.json"),(err,data)=>{
        if(err)throw err;
        res.send(data.toString());
    });
});


router.get("/connect_4",(req,res)=>{
    res.render('challenge/connect_4/index');
});

router.get('/connect_4/data',(req,res)=>{
    fs.readFile(path.resolve('src/data/connect_4/data.json'),(err,data)=>{
        if(err)throw err;
        res.send(data.toString());
    });
});


router.get("/ctp",(req,res)=>{
    res.render('challenge/ctp/index');
});

router.get('/ctp/data', (req, res) => {
    fs.readFile(path.resolve("src/data/ctp/data.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data);
    });
})

router.get('/ctp/result', (req, res) => {
    fs.readFile(path.resolve("src/data/ctp/result.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data);
    });
})

router.get('/ctp/answers',(req,res)=>{
    fs.readFile(path.resolve("src/data/ctp/answers.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data);
    });    
});

router.get("/tetris",(req,res)=>{
    res.render('challenge/tetris/index');
});

router.get("/maze",(req,res)=>{
    res.render('challenge/maze/index');
});


router.get("/mtb",(req,res)=>{
    res.render('challenge/mtb/index');
});


router.get("/coderoll",(req,res)=>{
    res.render('challenge/coderoll/index');
});

router.get("/ror",(req,res)=>{
    res.render('challenge/ror/index');
});

router.get('/caesar', (req,res)=>{
    res.render('challenge/caesar/index');
});

router.get('/caesar/data', (req, res) => {
    fs.readFile(path.resolve("src/data/caesar/data.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data);
    });
});


router.post('/submit', async (req, res) => {

    const {score} = req.body;
    const addedScore = await req.user.getChallenge({ attribures : ['score']});

    var finalScore = addedScore.dataValues.score + score;

    const update1 = await Challenge.update({score : finalScore},{ where : {studentId : req.user.id}});    
    const update2 = await Challenge.increment(['level'],{ where : {studentId : req.user.id}});

    if(update1 && update2) res.sendStatus(200);
    else res.sendStatus(403);

});

router.get('/end', (req, res) => {
    res.render('challenge/completion');
})


module.exports = router;
