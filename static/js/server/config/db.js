var mongoose = require('mongoose');

// Bootstrap db connection
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } }, user: 'viva', pass: 'vbnm1234' };

  mongoose.connect('mongodb://localhost/viva_db', options);
};

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect();
});

module.exports.connect = connect;
