var mongoose = require('mongoose');
var config = require('../config');
var connected = false;
var callback = false;

var url = 'mongodb://' + config.database.password + ':' + config.database.password + '@' + config.database.host;
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
  connected = true;

  if (typeof callback == 'function') {
    callback(db);
  }
});

module.exports = function(cb) {
  if (connected) {
    cb(db);
  } else {
    callback = cb;
  }
};
