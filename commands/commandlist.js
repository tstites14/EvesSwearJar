class CommandList {
    constructor() {
        this.commands = {
            ADD: "add",
            LIST: "list",
            REMOVE: "remove",
            HELP: "help",
            RANDOM: "random",
            COUNT: "count",
            INTERESTING: "interesting"
        };
    }

    getCommands() {
        return this.commands;
    }
}

module.exports = CommandList;