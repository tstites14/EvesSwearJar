var express = require('express');

const Phrase = require('../phrase.js');
const CommandManager = require('../commands/commandmanager.js');

var router = express.Router();
router.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

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
});

module.exports = router;