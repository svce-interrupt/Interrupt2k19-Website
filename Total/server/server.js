const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use("/static",express.static("../public"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/hang_thug/data',(req,res)=>{
    fs.readFile(path.join(__dirname,"data","hang_thug","data.json"),(err,data)=>{
        if(err)throw err;
        res.send(data.toString());
    });
});

app.get('/hang_thug',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","hang_thug","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get("/connect_4",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","connect_4","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get('/connect_4/data',(req,res)=>{
    fs.readFile(path.join(__dirname,"data","connect_4","data.json"),(err,data)=>{
        if(err)throw err;
        res.send(data.toString());
    });
});

app.get("/dark_house",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","dark_house","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get('/dark_house/data',(req,res)=>{
    fs.readFile(path.join(__dirname,"data","dark_house","data.json"),(err,data)=>{
        if(err)throw err;
        res.send(data.toString());
    });
});

app.get("/ctp",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","ctp","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get('/ctp/data', (req, res) => {
    fs.readFile(path.join(__dirname,"data","ctp","data.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data);
        res.end();
    });
})
app.get('/ctp/result', (req, res) => {
    fs.readFile(path.join(__dirname,"data","ctp","result.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data);
        res.end();
    });
})
app.get('/ctp/answers',(req,res)=>{
    fs.readFile(path.join(__dirname,"data","ctp","answers.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data);
        res.end();
    });    
});

app.get("/tetris",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","tetris","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get("/maze",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","maze","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get("/mtb",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","mtb","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get("/coderoll",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","coderoll","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get("/ror",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","ror","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get("/caesar",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","window","caesar","index.html"),(err)=>{
        if(err) throw err;
    });
});

app.get('/caesar/data', (req, res) => {
    fs.readFile(path.join(__dirname,"data","caesar","data.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data);
        res.end();
    });
})

app.get('/coderoll/data',(req,res)=>{
    fs.readFile(path.join(__dirname,"data","coderoll","data.json"),(err,data)=>{
        if(err)console.log(err)
        res.send(data.toString());
        res.end();
    });    
});

app.listen(80,'localhost',()=>{
    console.log('Listening');
});

