const Command = require('./command.js');

class Remove extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            resolve(this.command);
        });
    }
}

module.exports = Remove;