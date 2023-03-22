const Command = require('./command.js');

class Random extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            resolve(this.command);
        });
    }
}

module.exports = Random;