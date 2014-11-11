var levelup             = require('level');
var promiseFromCallback = require('../utils/promiseFromCallback');



var db = levelup('../todomvc-db', {valueEncoding: 'json' });


var get = promiseFromCallback(db.get, db);
var put = promiseFromCallback(db.put, db);
var del = promiseFromCallback(db.del, db);
var batch = promiseFromCallback(db.batch, db);


function getAllTodos() {
    return new Promise (function (resolve, reject) {
        var todos = [];
        db.createReadStream()
          .on('data', function (data) {
            todos.push(data.value);
          })
          .on('error', function (err) {
            reject(err);
          })
          .on('close', function () {
            resolve(todos);
          });
    });
}

function createTodo(todo) {
    return get(todo.id).then(function (todo) {
        throw new Error('There is already a todo with id:' + todo.id);
    }, function () {
        return put(todo.id, todo);
    });
}

function destroyTodo(id) {
    return del(id);
}


function updateText(id, text) {
    return get(id).then(function (todo) {
        return put(id, {...todo, text});
    });
}


function toggleComplete(id) {
  return get(id).then(function (todo) {
    return put(id, {...todo, complete: !todo.complete});
  });
}

function toggleCompleteAll() {
  return this.getAllTodos().then(function (todos) {
    var complete = !todos.every(todo => todo.complete);
    var ops = todos.map(todo => ({type: 'put', key: todo.id, value: {...todo, complete}}));
    return batch(ops);
  });
}

function destroyCompleted() {
  return this.getAllTodos().then(function (todos) {
    var ops = todos
      .filter(todo => todo.complete)
      .map(todo => ({type: 'del', key: todo.id}));
    return batch(ops);
  });
}


module.exports = {
  getAllTodos,
  createTodo,
  destroyTodo,
  updateText,
  toggleCompleteAll,
  toggleComplete,
  destroyCompleted
};


