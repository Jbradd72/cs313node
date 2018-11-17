var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(onRequest).listen(8888);

function onRequest(req, res) {
    var u = url.parse(req.url, true);
    var path = u.pathname;
    var filename = "garbage.txt";
    if (path == '/home'){
        filename = "./home.html" ;}
    if (path == '/getData'){
     filename= 'getData.txt'
    }
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            return res.end("404 Not Found");
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(data);
        return res.end();
    });
}
