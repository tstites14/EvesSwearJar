const Command = require('./command.js');

class Add extends Command {
    run() {
        return new Promise((resolve, reject) => {
            resolve(this.command);
        });
    }
}

module.exports = Add;