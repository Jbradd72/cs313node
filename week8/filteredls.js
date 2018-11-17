var fs = require('fs');
var p = require('path');


module.exports = function (folder, ext, callback){
var dir = fs.readdir(folder, function(err, list){
    if (err) return callback(err);
   var filtered = list.filter(function(item){
   return p.extname(item) == "." + ext;
}   );
    return callback(null, filtered);
});
}
