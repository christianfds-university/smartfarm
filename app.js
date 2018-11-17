//Imports
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var cors = require('cors');

var db_init = require('./config/dbinit');

//Faz conexão com o banco
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(function () {
    console.log('connection succesful');
    db_init.db_init();
  })
  .catch((err) => console.error(err));

//Inicializa API's e APP
var api = require('./routes/api');
var app = express();

app.use(cors());

//Configura parsers, express, passport e etc
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/login', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/register', express.static(path.join(__dirname, 'dist', 'App')));

app.use('/login', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/register', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/home', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/proprural', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/proprural-reg', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/proprural/:propid', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/proprural/:propid/cockpit', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/talhao/:propid', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/talhao-reg/:propid', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/talhao/:propid/:talhaoid', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/safra/:safraid', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/safra-reg/:talhaoid', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/cultivar', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/cultivar-reg', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/cultivar/:cultivarid', express.static(path.join(__dirname, 'dist', 'App')));
app.use('/eq', express.static(path.join(__dirname, 'dist', 'App')));

app.use('/api', api);

//Trata o erro 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;