class Command {
    constructor(array) {
        this.command = array[0];
    }

    run() {
        return new Promise((resolve, reject) => {
            reject(new Error("This is not a valid command! Use !COMMAND help to see a list of commands!"));
        })
    }
}

module.exports = Command;