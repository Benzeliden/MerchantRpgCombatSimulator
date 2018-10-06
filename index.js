var static = require('node-static');
var port = process.env.PORT || 5000;

var startPath = "./public";

gzipPrep(startPath);
// 
// Create a node-static server instance to serve the './public' folder 
// 
var file = new static.Server(startPath, {
    gzip: true,
    cache: 60 * 60 * 24 * 30 // 30 days
});

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(port);

console.log("server started on port", port)

function gzipPrep(startPath) {
    var gzipme = require('gzipme')
    var fs = require('fs')
    var path = require('path')
    var files = fs.readdirSync(startPath);
    var filterToGzip = /(\.js|\.css|\.html)$/;
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        //console.log("test", filename)
        if (stat.isDirectory()) {
            gzipPrep(filename, filterToGzip)
        }
        else if (filterToGzip.test(filename)) {
            //console.log('-- found: ', filename);
            gzipme(filename, false)
        };
    };
}