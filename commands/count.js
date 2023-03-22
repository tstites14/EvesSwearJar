const Command = require('./command.js');

class Count extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            resolve(this.command);
        });
    }
}

module.exports = Count;