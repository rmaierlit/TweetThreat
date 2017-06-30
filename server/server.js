var express = require('express');
var router = require('./routes.js');
var app = express();

app.use('/api', router);
//app.use(express.static(__dirname + '/../client'));

app.listen(2525);


console.log('server listening on 2525');