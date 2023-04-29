const express = require('express');
const router = express.Router();

const DBConnection = require('../dbconnection.js');

router.get('/jar', function(req, res) {
    res.sendFile('jar.html', { root: './public/TheJar' });
    res.sendFile('jar.png', { root: './public/TheJar' });
    res.sendFile('jar.svg', { root: './public/TheJar' });
})

router.get('/jar/jar.js', function(req, res) {
    res.sendFile('jar.js', { root: './public/TheJar' });
})

router.get("/jar/status", function(req, res) {
    const dbConnection = new DBConnection();

    dbConnection.select("newEvent", "params")
        .then((value) => {
            const result = value[0].newEvent;

            dbConnection.update("params", ["newEvent"], ["0"], "1", "1");

            res.end(result);
        })
        .catch((err) => {
            res.end("0");
        });
})

module.exports = router;