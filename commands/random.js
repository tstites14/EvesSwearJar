const Command = require('./command.js');

class Random extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            dbConnection.select("COUNT(*) AS 'iCounter'", "swears", "interesting", "1")
            .then((value) => {
                const count = parseInt(value[0].iCounter);
                const rand = Math.floor(Math.random() * count) + 1;

                dbConnection.select("*", "swears", "id", rand.toString())
                .then((value) => {
                    const timestamp = value[0].datetime;
                    const monthName = timestamp.toLocaleString('default', { month: 'long' });
    
                    resolve(`"${value[0].phrase}" - Eve (${monthName}, ${timestamp.getFullYear()})`);
                })
                .catch((err) => {
                    reject(err.message);
                })
            })
            .catch((err) => {
                reject(err.message);
            });
        })
    }
}

module.exports = Random;