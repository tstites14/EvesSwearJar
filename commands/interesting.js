const Command = require('./command.js');

class Interesting extends Command {
    run(dbConnection) {
        if (this.commandArray.length > 1) {
            return new Promise((resolve, reject) => {
                dbConnection.update("swears", ["interesting"], ["1"], "id", this.commandArray[1])
                    .then((value) => {
                        resolve("Noted Kappa");
                    })
                    .catch((err) => {
                        reject("That is not a valid ID! Please try a different number!");
                    });
            });
        } else {
            return new Promise((reject) => {
                reject("You have not entered an ID!");
            })
        }
    }
}

module.exports = Interesting;