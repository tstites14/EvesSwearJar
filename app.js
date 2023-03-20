var express = require('express');
const DBConnection = require('./dbconnection.js');
const Phrase = require('./phrase.js');
const Dictionary = require('./dictionary.js');

const CommandManager = require('./commands/commandmanager.js');

var app = express();
app.get('/evesswearjar', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var dbConnection = new DBConnection();
    var dictionary = new Dictionary();
    var phrase = new Phrase(req.query.phrase);

    var wordArray = new Array();
    
    //Search submission for matching words in dict array
    wordArray = dictionary.getMatchingArray(phrase.getPhraseArray());

    /*Command code starts here*/
    var commandManager = new CommandManager([["add", '1'], ["fuck", "1"]]);
    commandManager.runCommand()
        .then((value) => {
            res.end(value);
        })
        .catch((err) => {
            res.end(err.message);
        });

    //If there is data, connect to DB and insert data
    /*if (wordArray.length > 0) {
        for (var i = 0; i < wordArray.length; i++) {
            //dbConnection.insert("swears", ["category", "phrase", "quantity"], [wordArray[i][0], phrase.getPhrase(), wordArray[i][1]]);
        }
    }

    var returnVal = "";

    var commonWord = "";
    var commonCount = 0;

    var response = dbConnection.select("quantity, category", "swears", "DATE_FORMAT(datetime, '%Y-%m-%d')", 'CURDATE()')
        .then((value) => {
            var totalCount = value.length;
            returnVal = "TotalCount: " + totalCount.toString();

            //Get the 
            dbConnection.selectGroup("category, COUNT(category) AS catCount", "swears", "category", "DATE_FORMAT(datetime, '%Y-%m-%d')", "CURDATE()", "catCount DESC", true)
                .then((value) => {
                    returnVal = `Eve has cursed ${totalCount} times today. The word of the day is ${value[0].category}!`;
                    res.end(returnVal);
                })
                .catch((err) => {
                    returnVal = err.message;
                    res.end(returnVal);
                });
        })
        .catch((err) => {
            returnVal = err.message;
            res.end(returnVal);
        });*/
})
app.listen();