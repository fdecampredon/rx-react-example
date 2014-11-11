var io = require('socket.io-client');
var Promise = require('bluebird');

var socket = io('http://localhost');


function callService(serviceName, methodName, args) {
  return new Promise(function (resolve, reject) {
    socket.emit('remote-call', serviceName, methodName, args, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}


module.exports = {
  callService: callService
};