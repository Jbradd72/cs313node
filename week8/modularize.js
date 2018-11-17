var mymodule = require("./filteredls.js");

var path = process.argv[2];
var ext = process.argv[3];

mymodule(path, ext, function(err, fList){
    fList.forEach(function(item){
        console.log(item);
    });
});