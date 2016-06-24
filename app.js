require('dotenv').config();
pry = require('pryjs')
'use strict'
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var request         = require('request');
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));



// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// Mongo Database Stuff
var dbConfig = require('./db/db');
var User = require('./models/user');
var LocationSchema = require('./models/location_schema');
var Categories = require('./models/categories_schema');
var Db_dump = require('./models/db_dump');
mongoose.connect(dbConfig.url);

// Import csv data into mongo collections, first run seed in terminal
// Db_dump.importData();

// Route configs
var routes = require('./routes/index')(LocationSchema, ensureAuthenticated);
var users = require('./routes/users')(User, LocationSchema);
var locations = require('./routes/locations')(User, LocationSchema);
var categories = require('./routes/categories')(Categories, LocationSchema);
var auth = require('./routes/auth')(passport, User);

// Routes
app.use('/', routes);
app.use('/api/v1/users', ensureAuthenticated, users);
app.use('/api/v1/locations', ensureAuthenticated, locations);
app.use('/api/v1/categories', ensureAuthenticated, categories);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.render('not_authorized.jade', { error: 'Not authorised  |  ' });
}

module.exports = app;
