/**
 * node-angular
 */

var express = require('express')
  , colors = require('colors')
  , angular = new require('angular')
  , mongoose = require('mongoose')
  , coffee = require('coffee-script')
  , app = express.createServer()
  ;

/**
 * configure mongodb
 */

var MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost/test';

/**
 * connect to mongodb
 */
 
// mongoose.connect(MONGO_DB);

// mongoose.connection.on('open', function(){
//   angular.log('success', 'mongodb connected');
// });

// mongoose.connection.on('error', function(error){
// 	angular.error('error', error.message);
// });

/**
 * configure express
 */

app.configure('development', function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.session({
    key: 'sid',
    secret: 'CHANGE_ME'
  }));
  //app.use(angular.logger());
});


/**
 * initialize controllers & models
 */

angular.load('models', '/app/models/');
angular.load('controllers', '/app/controllers/', app);

/**
 * http.Server.listen()
 */
var port = process.env.PORT || 5000;
app.listen(port, function() {
  angular.log('title', 'listening on port ' + port);
});

exports.listen = function(port) {
  // app.listen(port, function() {
  //   angular.log('title', 'listening on port ' + port);
  // });
};

/* EOF */
