var http = require("http");
var url = process.argv[2];

http.get(url, (resp)=>{
    let data = "";
    resp.setEncoding('utf8');
    resp.on('data', (chunk) => {
    data += chunk;
  });
    
    resp.on('end', function(){
       console.log(data.length);
        console.log(data);
    });
    
});