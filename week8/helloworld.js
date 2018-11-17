var fs = require('fs');
var path = process.argv[2];
var file = fs.readFile(path, function(err, data){
    var count = data.toString().split("\n").length - 1;

console.log(count);
});
