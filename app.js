"use strict";

const http = require('http');
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
const env = require('dotenv');
const init_route = require('./routes/init_route');

//require environment variables
env.config();

//our app
const app = express();

//rate limiter for api calls
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: process.env.RATE_LIMIT
});

//some initial app modules
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//api route
app.use('/trackmything', limiter, init_route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


process.on('uncaughtException', function(err) {
    process.exit(1);
});


//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({"Error" : err.status + ": " +err.message});
});


app.set('port', normalizePort(process.env.PORT));

let server = http.createServer(app).listen(process.env.PORT);

server.on('error', onError);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 * Error is caught in app.js
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
