const Command = require('./command.js');

class Random extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            dbConnection.select("COUNT(*) AS 'iCounter'", "swears", "interesting", "1")
            .then((value) => {
                var count = parseInt(value[0].iCounter);
                var rand = Math.floor(Math.random() * count) + 1;

                dbConnection.select("*", "swears", "id", rand.toString())
                .then((value) => {
                    var timestamp = value[0].datetime;
                    var monthName = timestamp.toLocaleString('default', { month: 'long' });
    
                    resolve(`"${value[0].phrase}" - Eve ${monthName}, ${timestamp.getFullYear()}`);
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