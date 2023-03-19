class Command {
    constructor(command) {
        this.command = command;
    }

    run() {
        return new Promise((resolve, reject) => {
            reject("This is not a valid command! Use !COMMAND help to see a list of commands!");
        })
    }
}

module.exports = Command;