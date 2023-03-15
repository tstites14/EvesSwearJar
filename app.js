var express = require('express');
const DBConnection = require('./dbconnection.js');
const Phrase = require('./phrase.js');
const Dictionary = require('./dictionary.js');

var app = express();
app.get('/evesswearjar', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var dbConnection = new DBConnection();
    var dictionary = new Dictionary();
    var phrase = new Phrase(req.query.phrase);

    var wordArray = new Array();
    
    //Search submission for matching words in dict array
    wordArray = dictionary.getMatchingArray(phrase.getPhraseArray());

    //If there is data, connect to DB and insert data
    if (wordArray.length > 0) {
        for (var i = 0; i < wordArray.length; i++) {
            dbConnection.insert("swears", ["category", "phrase", "quantity"], [wordArray[i][0], phrase.getPhrase(), wordArray[i][1]]);
        }
    }

    //If there is a successful connection, note how many times Eve has cursed this stream (maybe her most used word too?)
    var response = phrase.getPhrase() + " :)"
    res.end(response);
})
app.listen();