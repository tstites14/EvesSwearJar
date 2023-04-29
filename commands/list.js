const Command = require('./command.js');

class List extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            dbConnection.select("quantity, category", "swears", "DATE_FORMAT(datetime, '%Y-%m-%d')", "CURDATE()", "DESC")
            .then((value) => {
                const todayCount = value.length;
    
                dbConnection.select("COUNT(*) AS 'total'", "swears")
                .then((value) => {
                    const allTime = value[0].total;

                    dbConnection.selectGroup("category, COUNT(category) AS catCount", "swears", "category", "DATE_FORMAT(datetime, '%Y-%m-%d')", "CURDATE()", "catCount DESC", true)
                    .then((value) => {
                        let output = `Eve has cursed ${todayCount} `;

                        if (value[0] != undefined && value[0] != null) {
                            output = this.#formatOutput(output, todayCount, allTime, value[0].category);

                            resolve(output);
                        } else {
                            output = this.#formatOutput(output, todayCount, allTime);

                            resolve(output);
                        }
                    })
                    .catch((err) => {
                        reject(err.message);
                    });
                }).catch((err) => {
                    reject(err.message);
                })

            })
            .catch((err) => {
                reject(err.message);
            });
        });
    }

    #formatOutput(output, todayCount, allTimeCount, category = null) {
        if (todayCount != 1)
            output += `times today. `
        else
            output += `time today. `
        
        if (allTimeCount != 1)
            output += `She has cursed ${allTimeCount} times since INSERT FIRST DAY HERE. `
        else
            output += `She has cursed ${allTimeCount} time since INSERT FIRST DAY HERE. `

        if (todayCount != 0 && category != null)
            output += `The word of the day is ${category}`;

        return output;
    }
}

module.exports = List;