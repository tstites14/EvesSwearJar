const Command = require('./command.js');

class Count extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            const category = this.commandArray[1];

            dbConnection.select("COUNT(*) as 'wordCount'", "swears", "category", category)
            .then((value) => {
                const count = parseInt(value[0].wordCount);

                resolve(`Eve has said ${category} ${count} times!`);
            })
            .catch((err) => {
                reject(err.message)
            })
        });
    }
}

module.exports = Count;