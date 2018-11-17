const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = 80;

express()
    .use(express.static("files"))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/week9', function (req, response){
        fs.readFile("./week9/index.js", function (err, data) {
            if (err) throw err;
             response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(data);  
        response.end(); 
        });
})
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));