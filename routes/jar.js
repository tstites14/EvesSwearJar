const express = require('express');
const router = express.Router();

router.get('/jar', function(req, res) {
    res.sendFile('jar.html', { root: './public/TheJar' });
})

module.exports = router;