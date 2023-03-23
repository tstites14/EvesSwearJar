const Command = require('./command.js');

class List extends Command {
    run(dbConnection) {
        return new Promise((resolve, reject) => {
            dbConnection.select("quantity, category", "swears", "DATE_FORMAT(datetime, '%Y-%m-%d')", 'CURDATE()', "DESC")
            .then((value) => {
                var totalCount = value.length;
    
                dbConnection.selectGroup("category, COUNT(category) AS catCount", "swears", "category", "DATE_FORMAT(datetime, '%Y-%m-%d')", "CURDATE()", "catCount DESC", true)
                    .then((value) => {

                        if (value[0] != undefined && value[0] != null) {
                            resolve(`Eve has cursed ${totalCount} times today. The word of the day is ${value[0].category}!`);
                        } else {
                            resolve(`Eve has cursed ${totalCount} times today.`);
                        }
                    })
                    .catch((err) => {
                        reject(err.message);
                    });
            })
            .catch((err) => {
                reject(err.message);
            });
        });
    }
}

module.exports = List;