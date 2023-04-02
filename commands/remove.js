const Command = require('./command.js');

class Remove extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            var removedSquats = parseInt(this.commandArray[1]);

            dbConnection.select("squats", "params")
                .then((value) => {
                    var currentValue = value[0].squats;
                    var newValue = parseInt(currentValue) - removedSquats;

                    //Ensure that squat values cannot go below 0
                    if (newValue < 0)
                        newValue = 0;

                    dbConnection.update("params", ["squats"], [newValue.toString()], "squats", currentValue.toString());

                    if (removedSquats == 1)
                        resolve(`${removedSquats.toString()} squat has been removed from the counter. There are still ${newValue} remaining`);
                    else if (removedSquats > 1)
                        resolve(`${removedSquats.toString()} squats have been removed from the counter. There are still ${newValue} remaining`)
                    else reject(new Error("You can't remove a negative number of squats!"))
                })
                .catch((err) => {
                    reject(err.message);
                });
        });
    }
}

module.exports = Remove;