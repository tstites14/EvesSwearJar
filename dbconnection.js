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

    queryDB(query) {
        var conn = this.#connect();
        conn.connect();

        return new Promise((resolve, reject) => {
            conn.query(query, function(err, result) {
                if (result === undefined) {
                    conn.end();
                    reject(new Error(err.message));
                } else {
                    conn.end();
                    resolve(result);
                }
            });
        });
    }

    select(select, from, where = null, whereCondition = null, orderBy = null, orderByOrder = null) {
        var inputTester = /^[A-Za-z0-9*]+$/;

        if (select.match(inputTester) && from.match(inputTester)) {
            var query = `SELECT ${select} FROM ${from}`;

            if (where != null && whereCondition != null && where.match(inputTester) && whereCondition.match(inputTester))
                query += ` WHERE ${where} = '${whereCondition}'`;

            if (orderBy != null && orderByOrder != null && orderBy.match(inputTester) && orderByOrder.match(inputTester))
                query += ` ORDER BY ${orderBy} ${orderByOrder}`;

            return this.queryDB(query);
        } else {
            return new Promise((resolve, reject) => {
                reject(new Error("Invalid command entered"));
            })
        }
    }
    
    selectGroup(select, from, group, where = null, whereCondition = null, orderBy = null, limit = false) {
        var inputTester = /^[A-Za-z0-9*]+$/;

        if (select.match(inputTester) && from.match(inputTester) && group.match(inputTester)) {
            var query = `SELECT ${select} FROM ${from}`;

            if (where != null && whereCondition != null && where.match(inputTester) && whereCondition.match(inputTester))
                query += ` WHERE ${where} = '${whereCondition}'`
            
            query += ' GROUP BY ' + group;
            
            if (orderBy != null && orderBy.match(inputTester))
                query += ' ORDER BY ' + orderBy + ' DESC';

            if (limit)
                query += ' LIMIT 1';

            return this.queryDB(query);
        } else {
            return new Promise((resolve, reject) => {
                reject(new Error("Invalid command entered"));
            });
        }
    }

    insert(into, fields, values) {
        if (fields.length != values.length) {
            console.log("Incorrect values in either fields or values");
            return;
        }

        var inputTester = /^[A-Za-z0-9*]+$/;

        var fieldString = "";
        fields.forEach((i) => {
            if (i.match(inputTester))
                fieldString += i + ", ";
        });
        fieldString = fieldString.substring(0, fieldString.length - 2);

        var valuesString = "";
        values.forEach((i) => {
            if (i.match(inputTester))
                valuesString += "'" + i + "', ";
        });
        valuesString = valuesString.substring(0, valuesString.length - 2);
        return this.queryDB("INSERT INTO " + into + " (" + fieldString + ") VALUES (" + valuesString + ");");
    }

    update(table, fields, values, where = null, whereCondition = null) {
        if (fields.length != values.length) {
            console.log("Incorrect values in either fields or values");
            return;
        }

        var whereContent = "";
        var updateContent = "";
        for (var i = 0; i < fields.length; i++) {
            updateContent += `${fields[i]} = ${values[i]}, `
        }
        updateContent = updateContent.substring(0, updateContent.length - 2);

        if (where != null && whereCondition != null)
            whereContent = `WHERE ${where} = ${whereCondition}`

        return this.queryDB(`UPDATE ${table} SET ${updateContent} ${whereContent}`);
    }
}

module.exports = DBConnection;