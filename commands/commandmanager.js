const Command = require('./command.js');

const Add = require('./add.js');
const List = require('./list.js');
const Remove = require('./remove.js');
const Random = require('./random.js');
const Count = require('./count.js');
const Help = require('./help.js');

class CommandManager {
    constructor() {
        this.commands = {
            ADD: "add",
            LIST: "list",
            REMOVE: "remove",
            HELP: "help",
            RANDOM: "random",
            COUNT: "count"
        };
    }

    runCommand(input) {
        var command;
        var output = "";

        switch (input) {
            case this.commands.ADD:
                command = new Add(input);
                break;
            case this.commands.LIST:
                command = new List(input);
                break;
            case this.commands.REMOVE:
                command = new Remove(input);
                break;
            case this.commands.RANDOM:
                command = new Random(input);
                break;
            case this.commands.COUNT:
                command = new Count(input);
                break;
            case this.commands.HELP:
                command = new Help(input);
                break;
            default:
                command = new Command(input);
                break;
        }

        command.run();
    }
}

module.exports = CommandManager;