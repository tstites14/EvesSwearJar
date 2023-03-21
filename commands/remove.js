const Command = require('./command.js');

class Remove extends Command {
    run() {
        return new Promise((resolve, reject) => {
            resolve(this.command);
        });
    }
}

module.exports = Remove;