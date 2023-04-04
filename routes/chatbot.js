const express = require('express');

const Phrase = require('../phrase.js');
const CommandManager = require('../commands/commandmanager.js');

const router = express.Router();
router.get('/', function(req, res) {
    if (req.query.phrase == undefined && req.query.phrase == null) {
        res.end("No valid command has been entered. Please use the 'help' command to learn more.");
        return;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});

    var phrase = new Phrase(req.query.phrase);

    /*Command code starts here*/
    const phraseArray = phrase.getPhraseArray();
    const commandManager = new CommandManager(phraseArray);
    commandManager.runCommand()
        .then((value) => {
            res.end(value);
        })
        .catch((err) => {
            res.end(err.message);
        });
});

module.exports = router;