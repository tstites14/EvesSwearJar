var express = require('express');

var router = express.Router();

router.get('/jar', function(req, res) {
    res.end("TEST");
})

module.exports = router;