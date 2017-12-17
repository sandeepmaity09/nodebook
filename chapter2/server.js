var http = require('http')
var fs = require('fs')

// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-type':'text/html'});
//     res.end('<h1>Hello World</h1>');
// }).listen(3000);
// console.log('Server started on localhost:3000')

// http.createServer((req,res)=>{
//     var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
//     switch(path){
//         case '':
//             res.writeHead(200,{'Content-type':'text/plain'});
//             res.end('HomePage');
//             break;
//         case '/about':
//             res.writeHead(200,{'Content-type':'text/plain'});
//             res.end('About');
//             break;
//         default:
//             res.writeHead(404,{'Content-type':'text/plain'});
//             res.end('Not found');
//     }
// }).listen(3000)

function serveStaticFile(res,path,contentType,responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname+path,function(err,data){
        if(err){
            res.writeHead(500,{'Content-type':'text/plain'});
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(responseCode,{'Content-type':contentType});
            res.end(data);
        }
    })
}

http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
    switch(path){
        case '':
            serveStaticFile(res,'/public/home.html','text/html');
            break;
        case '/about':
            serveStaticFile(res,'/public/about.html','text/html');
            break;
        case '/img/logo.png':
            serveStaticFile(res,'/public/img/logo.png','image/png');
            break;
        default:
            serveStaticFile(res,'/public/404.html','text/html',404);
    }
}).listen(3000);