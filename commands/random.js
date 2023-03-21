const Command = require('./command.js');

class Random extends Command {
    run() {
        return new Promise((resolve, reject) => {
            resolve(this.command);
        });
    }
}

module.exports = Random;