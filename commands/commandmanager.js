const Command = require('./command.js')

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
        var command = new Command(input);
        var output = "";

        switch (input) {
            case this.commands.ADD:
                break;
            case this.commands.LIST:
                break;
            case this.commands.REMOVE:
                break;
            case this.commands.RANDOM:
                break;
            case this.commands.COUNT:
                break;
            case this.commands.HELP:
                break;
            default:
                break;
        }
    }
}

module.exports = CommandManager;