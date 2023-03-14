var express = require('express');
const DBConnection = require('./dbconnection.js');

var dict = [["motherfucker", "fuck"], ["bullshit", "shit"], ["asshole", "ass"], ["damn", "dammit"], ["bitch"], ["tits"], ["dick"]];
var app = express();
app.get('/evesswearjar', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var dbConnection = new DBConnection();

    var phrase = req.query.phrase;
    var phraseArray = phrase.split(' ');

    var match = "";
    var wordArray = new Array();
    
    //Search submission for matching words in dict array
    phraseArray.forEach((phraseWord) => {
        dict.forEach((category) => {
            for (var i = 0; i < category.length; i++) {
                var word = category[i];

                if (phraseWord.match("^.*" + word)) {
                    match += word + ", ";
                    wordArray.push(word);
    
                    //Once a word in a category has been found, skip the rest of the category
                    break;
                }
            }
        });
    
    });
    //Delete remaining ", " from text
    match = match.substring(0, match.length - 2);

    //If there is data, connect to DB and insert data
    if (wordArray.length > 0) {
        wordArray.forEach ((word) => {
            dbConnection.insert("swears", ["category", "phrase"], [word, phrase]);
        });
    }
    //If there is a successful connection, note how many times Eve has cursed this stream (maybe her most used word too?)
    if (match != "")
        var response = match + " :)";
    else
        var response = phrase + " :)"
    res.end(response);
})
app.listen();