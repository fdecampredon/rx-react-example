var client = require('../utils/remoteClient');

module.exports = {
  getAllTodos: undefined,
  createTodo: undefined,
  destroyTodo: undefined,
  updateText: undefined,
  toggleCompleteAll: undefined,
  toggleComplete: undefined,
  destroyCompleted: undefined
};

Object.keys(module.exports).forEach(function (method) {
  module.exports[method] = function () {
    return client.callService('todoService', method, [].slice.call(arguments));
  };
});