const express = require('express');
const router = express.Router();

router.get('/jar', function(req, res) {
    res.sendFile('jar.html', { root: './public/TheJar' });
    res.sendFile('jar.png', { root: './public/TheJar' });
    res.sendFile('jar.svg', { root: './public/TheJar' });
})

router.get("/jar/status", function(req, res) {
    res.end("This is a test");
})

module.exports = router;