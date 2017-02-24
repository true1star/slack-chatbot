var express = require('express');
var app = express();

var home = require('./controller/homeCtrl');
app.use('/', home);

module.exports = app;