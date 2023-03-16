class DBConnection {
    constructor() {
        this.mysql = require('mysql');
    }

    #connect() {
        return this.mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
    }

    #queryDB(query) {
        var conn = this.#connect();
        var queryResult;

        try {
            conn.connect();
            conn.query(query, function(err, result) {
                if (err) throw err;

                queryResult = result;
            });
        } catch (err) {
            console.log(err);
        } finally {
            conn.end();
        }

        return queryResult;
    }

    select(select, from, where = null, whereCondition = null, orderBy = "'desc'") {
        var query = 'SELECT ' + select + ' FROM ' + from;

        if (where != null && whereCondition != null)
            query += ' WHERE ' + where + ' = "' + whereCondition + '"'
        
        query += ' ORDER BY ' + orderBy

        return this.#queryDB(query);
    }

    insert(into, fields, values) {
        if (fields.length != values.length) {
            console.log("Incorrect values in either fields or values");
            return;
        }

        var fieldString = "";
        fields.forEach((i) => {
            fieldString += i + ", ";
        });
        fieldString = fieldString.substring(0, fieldString.length - 2);

        var valuesString = "";
        values.forEach((i) => {
            valuesString += "'" + i + "', ";
        });
        valuesString = valuesString.substring(0, valuesString.length - 2);
        return this.#queryDB("INSERT INTO " + into + " (" + fieldString + ") VALUES (" + valuesString + ");");
    }
}

module.exports = DBConnection;