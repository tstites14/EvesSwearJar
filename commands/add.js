const Command = require('./command.js');
const List = require('./list.js');
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
                    var oldValue = value[0].squats;
                    var currentValue = parseInt(oldValue) + newSquats;

                    dbConnection.update("params", ["squats"], [currentValue.toString()], "squats", oldValue.toString())

                    //Send signal to add coin to client jar
                    dbConnection.update("params", ["newEvent"], ["1"], "1", "1");

                    //Run the List command for output
                    new List(this.commandArray).run(dbConnection)
                    .then((value) => {
                        resolve(value);
                    })
                    .catch((err) => {
                        reject(err.message);
                    })
                })
                .catch((err) => {
                    reject(err.message);
                });
            } else {
                reject("There were no swears in that submission!");
            }
        });
    }
}

module.exports = Add;