// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.write("hello");
    console.log("get received")
});

app.listen(8888);
console.log('8888 is the magic port');