const Command = require('./command.js');
const CommandList = require('./commandlist.js');

class Help extends Command {
    run(dbConnection) {
        var commandList = new CommandList().getCommands();

        return new Promise((resolve, reject) => {
            switch(this.commandArray[1]) {
                case commandList.ADD:
                    resolve('Usage: !command add "Thing Eve said here". Results: Adds curse to the jar and squat counter');
                    break;
                case commandList.COUNT:
                    resolve('Usage: !command count "Curse". Results: Shows the number of time Eve has said that word today and all time');
                    break;
                case commandList.INTERESTING:
                    resolve('Usage: !command interesting "ID of funny thing Eve said". Results: Marks something Eve said as funny');
                    break;
                case commandList.RANDOM:
                    resolve("Usage: !command random. Results: Gives you a random interesting thing Eve has said");
                    break;
                case commandList.REMOVE:
                    resolve('Usage: !command remove "Number of squats". Results: Removes the given number of squats');
                    break;
                case commandList.LIST:
                    resolve('Usage: !command list. Results: Shows the number of times Eve has cursed today and all time');
                    break;
                default:
                    resolve("The available commands are Add, Count, Help, Interesting, List, Random, and Remove.");
                    break;
            }
        });
    }
}

module.exports = Help;