const Command = require('./command.js');

class List extends Command {
    run() {
        var returnVal = "";

        var commonWord = "";
        var commonCount = 0;
    
        return dbConnection.select("quantity, category", "swears", "DATE_FORMAT(datetime, '%Y-%m-%d')", 'CURDATE()')
            .then((value) => {
                var totalCount = value.length;
                returnVal = "TotalCount: " + totalCount.toString();
    
                dbConnection.selectGroup("category, COUNT(category) AS catCount", "swears", "category", "DATE_FORMAT(datetime, '%Y-%m-%d')", "CURDATE()", "catCount DESC", true)
                    .then((value) => {
                        return `Eve has cursed ${totalCount} times today. The word of the day is ${value[0].category}!`;
                    })
                    .catch((err) => {
                        return err.message;
                    });
            })
            .catch((err) => {
                return err.message;
            });
    }
}

module.exports = List;