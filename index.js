var static = require('node-static');
var port = process.env.PORT || 5000;
 
// 
// Create a node-static server instance to serve the './public' folder 
// 
var file = new static.Server('./public');
 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(port);
