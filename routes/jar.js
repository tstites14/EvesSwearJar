const express = require('express');
const router = express.Router();

router.get('/jar', function(req, res) {
    res.sendFile('jar.html', { root: './public/TheJar' });
    res.sendFile('jar.png', { root: './public/TheJar' });
    res.sendFile('jar.svg', { root: './public/TheJar' });
})

router.get("/jar/status", function(res) {
    res.end("New event");
})

module.exports = router;