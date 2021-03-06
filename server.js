var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

require('./api/model/model.server.setup')();

var session = require('express-session');
app.use(session({ secret: 'aG9hbmdwaGFtOTU=' }));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

var apiApp = require('./api/app.js');
apiApp(app);

var port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;
