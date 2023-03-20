const Command = require('./command.js');

const Add = require('./add.js');
const List = require('./list.js');
const Remove = require('./remove.js');
const Random = require('./random.js');
const Count = require('./count.js');
const Help = require('./help.js');

class CommandManager {
    constructor(array) {
        this.commands = {
            ADD: "add",
            LIST: "list",
            REMOVE: "remove",
            HELP: "help",
            RANDOM: "random",
            COUNT: "count"
        };

        this.command = array[0][0];
    }

    runCommand() {
        var command;

        switch (String(this.command)) {
            case this.commands.ADD:
                command = new Add(this.command);
                break;
            case this.commands.LIST:
                command = new List(this.command);
                break;
            case this.commands.REMOVE:
                command = new Remove(this.command);
                break;
            case this.commands.RANDOM:
                command = new Random(this.command);
                break;
            case this.commands.COUNT:
                command = new Count(this.command);
                break;
            case this.commands.HELP:
                command = new Help(this.command);
                break;
            default:
                command = new Command(this.command);
                break;
        }

        return new Promise((resolve, reject) => {
        	command.run()
                .then((value) => {
                    resolve(value);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }
}

module.exports = CommandManager;