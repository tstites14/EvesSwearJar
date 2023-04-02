const Command = require('./command.js');
const Dictionary = require('../dictionary.js');

class Add extends Command {
    run(dbConnection) {
        var dictionary = new Dictionary();
        var uniqueWords = dictionary.getMatchingArray(this.commandArray);

        return new Promise((resolve, reject) => {
            if (uniqueWords.length > 0) {
                var newSquats = 0;

                for (var i = 0; i < uniqueWords.length; i++) {
                    //dbConnection.insert("swears", ["category", "phrase", "quantity"], [wordArray[i][0], phrase.getPhrase(), wordArray[i][1]]);
                    newSquats += parseInt(uniqueWords[i][1]);
                }

                //Add squat counter increase
                dbConnection.select("squats", "params")
                .then((value) => {
                    var currentValue = value[0].squats;

                    dbConnection.update("params", ["squats"], [(parseInt(currentValue) + newSquats).toString()], "squats", currentValue.toString());
                    resolve((parseInt(currentValue) + newSquats).toString());
                })
                .catch((err) => {
                    reject(err.message);
                });
            }
        });
    }
}

module.exports = Add;