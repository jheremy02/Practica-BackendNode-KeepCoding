var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {isAPIRequest}=require('./lib/utils.js')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
require('./lib/connectMongoose.js')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/advertisements',require("./routes/api/advertisements.js"))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// error handler
app.use(function(err, req, res, next) {

  if (err.array) {

    //error de validacion
    err.status=422;

    const errInfo=err.array({onlyFirstError:true})[0]

    console.log(errInfo)
    err.message=`${errInfo.location}   ${errInfo.param} - ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // si es un error en el API responfo json
  console.log(req.originalUrl)

  if (isAPIRequest(req)) {
    
    res.json({error:err.message})
    return;
  }


  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});

module.exports = app;
