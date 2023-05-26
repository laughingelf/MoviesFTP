var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var movieRouter = require('./routes/movies')
var commentRouter = require('./routes/comments')
var authRouter = require('./routes/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('trust proxy', 1); //needed when deploying online
app.enable('trust proxy'); //needed when deploying online

app.use(
  cors()
); // can pass without arguments as last resort if getting errors
app.options('*', cors());
// app.use(
//   cors({
//     origin: ['https://master--reliable-snickerdoodle-8abd38.netlify.app']  // <== URL of our future React app
//   })
// ); // can pass without arguments as last resort if getting errors
// app.use(
//   cors({
//     origin: ['http://localhost:3000']  // <== URL of our future React app
//   })
// ); // can pass without arguments as last resort if getting errors

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', movieRouter);
app.use('/comment', commentRouter);
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
