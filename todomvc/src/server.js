var express     = require('express');
var path        = require('path');
var fs          = require('fs');
var RxReact     = require('rx-react');
var React       = require('react');
var serialize   = require('serialize-javascript');

global.Promise = require('bluebird');
require('./utils/assign-polyfill');

require('node-jsx').install({harmony: true});

var exposer     = require('./utils/serviceExposer');
var TodoService = require('./services/todoService');
var TodoApp     = require('./views/todoApp.jsx');
var TodoStore   = require('./stores/todoStore');


var index = fs.readFileSync(path.join(__dirname,'..','index.html'),'UTF-8');
var app = express();


app.use('/assets', express.static(path.join(__dirname,'..','assets')));


app.get('/', function (req, res, next) {
  var app = React.createElement(TodoApp);
  RxReact.renderToStringAsync(app, function(err, markup) {
    if (err) {
      return next(err);
    }
    var cache = serialize(TodoStore.getValue());
    
    res.end(index
              .replace(/{{markup}}/g, markup)
              .replace(/{{cache}}/g, 'var TodoStore_cache = ' + cache));
  });
  
});

var server = require('http').Server(app);
var io = require('socket.io')(server);
exposer(io).expose('todoService', TodoService);



server.listen(3000, function() {
  console.log('Point your browser at http://localhost:3000');
});