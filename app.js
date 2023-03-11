var express = require('express');

var app = express();
app.get('/evesswearjar', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var response = "Hello Eve's chat! I'm a web app that saves and categorizes Eve's curses :) : " + req.query.phrase;
    res.end(response);
})
app.listen();