const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = 8888;

express()
    .use(express.static("files"))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', function (req, response){
        fs.readFile("./files/math.html", function (err, data) {
            if (err) throw err;
             response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(data);  
        response.end(); 
        });
})
    .get('/compute',function(req, response){
        var result = compute(req.query.operand1, req.query.operand2, req.query.operator);
        response.locals.result = result;
        response.render("results.ejs");
})
    .get('/math-service', function(req, response){
        var result = compute(req.query.operand1, req.query.operand2, req.query.operator);
        var jsonResult = `{"result" : "${result}"}`
        console.log(`result=${result}`);
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(jsonResult);  
        response.end();
} )
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

function compute(op1, op2, operator){
    console.log(op1);
    console.log(op2);
    console.log(operator);
    if (operator == 'Add') return Number(op1) + Number(op2);
    if (operator == 'Subtract') return op1 - op2;
    if (operator == 'Multiply') return op1 * op2;
    if (operator == 'Divide') return op1 / op2;
    else return "Undefined";
}