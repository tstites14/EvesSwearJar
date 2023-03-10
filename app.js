var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = "Hello Eve's chat! I'm a web app that saves and categorizes Eve's curses :)" ,
        response = [message].join('\n');
    res.end(response);
});
server.listen();
