var express = require('express');

const Chatbot = require('./routes/chatbot.js');
const Jar = require('./routes/jar.js');

var app = express();
app.use('/evesswearjar', Chatbot);
app.use('/evesswearjar', Jar);

app.listen();