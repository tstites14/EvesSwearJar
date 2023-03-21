const Command = require('./command.js');

class Help extends Command {
    run() {
        return new Promise((resolve, reject) => {
            resolve(this.command);
        });
    }
}

module.exports = Help;