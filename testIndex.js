const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

  .get('/getRates', (req,res)=> {
    res.locals.rate = calculate(req.query.types, req.query.weights);
    res.render("getRates.ejs")})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  function calculate(types, weights){
    console.log(types);
    console.log(weights);
    var mailArray = types.map(function(type){
        if(type === "stamped")
            return {
                "type": type,
                "weight":Number(weights[0])
            };
        if(type === "metered")
        return {
            "type": type,
            "weight":Number(weights[1])
        };
        if(type === "flat")
        return {
            "type": type,
            "weight":Number(weights[2])
        };
        if(type === "package")
            return {
                "type": type,
                "weight":Number(weights[3])
            };
    });
    console.log(mailArray);
    sum = 0;
    mailArray.forEach((x) => sum += getSingleRate(x));
    
    return mailArray.reduce((acc, currVal) => acc + getSingleRate(currVal), 0);
}
function getSingleRate(mail){
    
    if (mail.type === "stamped"){
        if (mail.weight <= 3.5 && mail.weight > 3) return 1.13;
        else if (mail.weight > 2 && mail.weight <= 3) return 0.92;
        else if (mail.weight > 1 && mail.weight <= 2) return 0.71;
        else if (mail.weight <= 1) return 0.5;

        else mail.type = "flat";
    }
    if (mail.type === "metered"){
        if (mail.weight <= 3.5 && mail.weight > 3) return 1.1;
        else if (mail.weight > 2 && mail.weight <= 3) return 0.89;
        else if (mail.weight > 1 && mail.weight <= 2) return 0.68;
        else if (mail.weight <= 1) return 0.47;

        else mail.type = "flat";
    }

    if (mail.type === "flat"){
        if (mail.weight <= 1)  return 1;
        else if (mail.weight <= 2) return 1.21;
        else if (mail.weight <= 3) return 1.42;
        else if (mail.weight <= 4) return 1.63;
        else if (mail.weight <= 5) return 1.84;
        else if (mail.weight <= 6) return 2.05;
        else if (mail.weight <= 7) return 2.26;
        else if (mail.weight <= 8) return 2.47;
        else if (mail.weight <= 9) return 2.68;
        else if (mail.weight <= 10) return 2.89;
        else if (mail.weight <= 11) return 3.1;
        else if (mail.weight <= 12) return 3.31;
        else return 3.52;

    }

    if (mail.type === "package"){
        if (mail.weight <= 4) return 3.5;
        else if (mail.weight <= 8) return 3.75;
        else if (mail.weight <= 9) return 4.1;
        else if (mail.weight <= 10) return 4.45;
        else if (mail.weight <= 11) return 4.8;
        else if (mail.weight <= 12) return 5.15;
        else return 5.5;

    }

}
