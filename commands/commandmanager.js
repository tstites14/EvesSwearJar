const Command = require('./command.js');

const Add = require('./add.js');
const List = require('./list.js');
const Remove = require('./remove.js');
const Random = require('./random.js');
const Count = require('./count.js');
const Help = require('./help.js');
const Interesting = require('./interesting.js');

const DBConnection = require('../dbconnection.js');

class CommandManager {
    constructor(array) {
        this.commands = {
            ADD: "add",
            LIST: "list",
            REMOVE: "remove",
            HELP: "help",
            RANDOM: "random",
            COUNT: "count",
            INTERESTING: "interesting"
        };

        this.array = array;
        this.command = array[0];
    }

    runCommand() {
        var command;

        switch (String(this.command)) {
            case this.commands.ADD:
                command = new Add(this.array);
                break;
            case this.commands.LIST:
                command = new List(this.array);
                break;
            case this.commands.REMOVE:
                command = new Remove(this.array);
                break;
            case this.commands.RANDOM:
                command = new Random(this.array);
                break;
            case this.commands.COUNT:
                command = new Count(this.array);
                break;
            case this.commands.HELP:
                command = new Help(this.array);
                break;
            case this.commands.INTERESTING:
                command = new Interesting(this.array);
                break;
            default:
                command = new Command(this.array);
                break;
        }

        return new Promise((resolve, reject) => {
        	command.run(new DBConnection())
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