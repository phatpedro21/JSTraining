var http = require('http');
var fs = require('fs');

var options = {
    host: "www.google.com",
    port: 80,
    path: '/',
    method: 'GET'
}

console.log("Making request...");

var req = http.request(options, function(response){
    console.log(response.statusCode);
    response.pipe(process.stdout);
});

req.end();

var server = http.createServer(function(req, res) {
    //process request
    res.writeHead(200, {'Content-Type':'text/plain'});
    if(req.url === '/file.txt'){
        fs.createReadStream(__dirname + '/file.txt').pipe(res);
    }else{
        res.end("Hello World");
    }
}).listen(3000);

console.log("up and running");

