var express = require('express');
const DBConnection = require('./dbconnection.js');
const Phrase = require('./phrase.js');

const CommandManager = require('./commands/commandmanager.js');

var app = express();
app.get('/evesswearjar', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var dbConnection = new DBConnection();
    var phrase = new Phrase(req.query.phrase);

    /*Command code starts here*/
    var commandManager = new CommandManager(phrase.getPhraseArray());
    commandManager.runCommand()
        .then((value) => {
            res.end(value);
        })
        .catch((err) => {
            res.end(err.message);
        });
})
app.listen();