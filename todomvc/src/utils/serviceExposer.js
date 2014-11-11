
function exposer(io) {
  
  var services = {};
  
  io.on('connection', function (socket) {
    socket.on('remote-call', function (serviceName, methodName, args, callback) {
      var service = services[serviceName];
      if (!service) {
        callback(new Error('unknow service:' + service));
      }
      
      var method = service[methodName];
      if (!method) {
         callback(new Error('unknow metbod:' + methodName));
      }
      
      new Promise(function (resolve) {
        resolve(method.apply(service, args || []));
      }).then(function (result) {
        callback(null, result);
      }, function (err) {
        callback(err);
      });
      
    });
  });
  
  return {
    expose: function expose(serviceName, service) {
      services[serviceName] = service;
      return this;
    }
  };
}

module.exports = exposer;