#!/usr/bin/env node

/**
 * 初始化配置
 */
var config = require('../config/config');
config.init()
global.config = config



/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug')('express-generator:server');
var http = require('http');
var RED = require("node-red");
const createError = require("http-errors");


var port = config.data['port']
console.log(config.data)
if (!port) {
   port =  normalizePort(process.env.PORT || '3000')
}

var flowJson = config.data['flow_json']
var userData = config.data['user_data']
console.log(flowJson)
console.log(userData)



/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);


// 覆盖 Node-Red settings.js
var settings = {
  flowFile:flowJson,
  httpAdminRoot:"/red",
  httpNodeRoot: "/api",
  userDir:userData,
  functionGlobalContext: { }    // enables global context
};
// 初始化Node-red 运行时
RED.init(server,settings);
app.use(settings.httpAdminRoot,RED.httpAdmin);
app.use(settings.httpNodeRoot,RED.httpNode);


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



/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
RED.start();

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
