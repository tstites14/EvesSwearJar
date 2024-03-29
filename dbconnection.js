class DBConnection {
    constructor() {
        this.mysql = require('mysql');
    }

    #connect() {
        return this.mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            multipleStatements: false
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
        if (select.match(/^[-_A-Za-z()*%', ]+$/) && from.match(/^[A-Za-z]+$/)) {
            var query = `SELECT ${select} FROM ${from}`;

            if (where != null && whereCondition != null && where.match(/^[-_A-Za-z()*%', ]+$/) && whereCondition.match(/^[A-Za-z0-9()]+$/))
                query += ` WHERE ${where} = '${whereCondition}'`;

            if (orderBy != null && orderByOrder != null && orderBy.match(/^[A-Za-z]+$/) && orderByOrder.match(/^[A-Za-z]+$/))
                query += ` ORDER BY ${orderBy} ${orderByOrder}`;

            return this.queryDB(query);
        } else {
            return new Promise((resolve, reject) => {
                reject(new Error("Invalid command entered"));
            })
        }
    }
    
    selectGroup(select, from, group, where = null, whereCondition = null, orderBy = null, limit = false) {
        if (select.match(/^[-_A-Za-z()*%', ]+$/) && from.match(/^[A-Za-z]+$/) && group.match(/^[A-Za-z]+$/)) {
            var query = `SELECT ${select} FROM ${from}`;

            if (where != null && whereCondition != null && where.match(/^[-_A-Za-z()*%', ]+$/) && whereCondition.match(/^[A-Za-z0-9()]+$/))
                query += ` WHERE ${where} = '${whereCondition}'`
            
            query += ' GROUP BY ' + group;
            
            if (orderBy != null && orderBy.match(/^[A-Za-z]+$/))
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
            return new Promise((resolve, reject) => {
                reject(new Error("The number of fields and values do not match."));
            });
        }

        if (into.match(/^[A-Za-z0-9*]+$/)) {
            var fieldString = "";
            fields.forEach((i) => {
                if (i.match(/^[A-Za-z]+$/))
                    fieldString += i + ", ";
            });
            fieldString = fieldString.substring(0, fieldString.length - 2);
    
            var valuesString = "";
            values.forEach((i) => {
                if (i.match(/^[A-Za-z0-9 ]+$/))
                    valuesString += "'" + i + "', ";
            });
            valuesString = valuesString.substring(0, valuesString.length - 2);
            return this.queryDB("INSERT INTO " + into + " (" + fieldString + ") VALUES (" + valuesString + ")");
        } else {
            return new Promise((resolve, reject) => {
                reject(new Error("Invalid command entered"));
            });
        }
    }

    update(table, fields, values, where, whereCondition) {
        if (fields.length != values.length) {
            return new Promise((resolve, reject) => {
                reject(new Error("The number of fields and values do not match."));
            });
        }

        var whereContent = "";
        var updateContent = "";
        if (table.match(/^[A-Za-z0-9]+$/)) {
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].match(/^[A-Za-z0-9]+$/) && values[i].match(/^[A-Za-z0-9]+$/))
                    updateContent += `${fields[i]} = '${values[i]}', `
            }
            updateContent = updateContent.substring(0, updateContent.length - 2);
    
            if (where.match(/^[A-Za-z0-9]+$/) && whereCondition.match(/^[A-Za-z0-9]+$/))
                whereContent = `WHERE ${where} = '${whereCondition}'`
    
            return this.queryDB(`UPDATE ${table} SET ${updateContent} ${whereContent}`);
        } else {
            return new Promise((resolve, reject) => {
                reject(new Error("Invalid command entered"));
            })
        }
    }
}

module.exports = DBConnection;