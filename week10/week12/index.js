const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

express()
.use(logRequest)
.use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    username: false,
    secret: "pitt123",
    resave: false,
    saveUninitialized: true
  }))
  .use('/getServerTime', verifyLogin)
  .get('/', (req,res)=>{
      console.log("yo");
      res.sendFile(path.join(__dirname, 'public/test.html'));
      
  })
  .get('/getServerTime', (req,res)=>{
      var response = {success:true, time: new Date()};
      res.send(response);
      res.end();
  })
  .post('/login', (req,res)=>{
    if ("admin" == req.body.username && "password" == req.body.password){
        
        var result = {success:true};
        session.username = req.body.username;
    }
    else{
        var result = {success:false};
    }
    console.log(result);
    res.send(result);
        res.end();
    console.log(req.body.password);
})
.post('/logout', (req,res)=>{
    if (session.username){
        session.username = false;
        res.send({success:true})
        res.end();
        
    }
    else{
        res.send({success:false})
        res.end();
    }
})
.listen(8888, ()=>console.log("Listening"));

function logRequest(req, res, next){
    console.log("Received a request for: " + req.url);
    next();
}

function verifyLogin(req,res,next){
    if (session.username) next();
    else{
        res.statusCode = 401;
        res.write("Unauthorized access, you must be logged in to access resource.")
        res.end();
    }
}