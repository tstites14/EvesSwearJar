const Command = require('./command.js');
const Dictionary = require('../dictionary.js');

class Add extends Command {
    run(dbConnection) {
        var dictionary = new Dictionary();
        var uniqueWords = dictionary.getMatchingArray(this.commandArray);

        return new Promise((resolve, reject) => {
            if (uniqueWords.length > 0) {
                for (var i = 0; i < uniqueWords.length; i++) {
                    //dbConnection.insert("swears", ["category", "phrase", "quantity"], [wordArray[i][0], phrase.getPhrase(), wordArray[i][1]]);
                }
            }

            resolve(this.command);
        });
    }
}

module.exports = Add;