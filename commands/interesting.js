const Command = require('./command.js');
const DBConnection = require('../dbconnection.js');

class Interesting extends Command {
    run() {
        var dbConnection = new DBConnection();

        return new Promise((resolve, reject) => {
            dbConnection.update("swears", ["interesting"], ["1"], "id", this.commandArray[1])
                .then((value) => {
                    resolve("Noted Kappa");
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

module.exports = Interesting;