class Command {
    constructor(command) {
        this.command = command;
    }

    run() {
        return "This is not a valid command. Please use !COMMAND help to see a list of commands!";
    }
}

module.exports = Command;