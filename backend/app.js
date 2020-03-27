require("dotenv").config();
require("./config/mongo"); 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// this rule allows the client app to exchange via http via the server (AJAX ... Axios)
const corsOptions = {
  origin: process.env.CLIENT_URL,
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  optionsSuccessStatus: 200
};

// cors middle on
app.use(cors(corsOptions));

/*------------------------------------------
// USER SESSIONS : START
------------------------------------------*/
app.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true
  })
);
// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());

// ADD SESSION SETTINGS HERE:

/*------------------------------------------
// USER SESSIONS : END
------------------------------------------*/

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
