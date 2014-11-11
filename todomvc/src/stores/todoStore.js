/*global TodoStore_cache*/

var TodoService = require('../services/todoService');
var TodoActions = require('../actions/todoActions');
var { Store }   = require('rx-flux');


var TodoStore = new Store();

TodoStore.lifecycle.init.subscribe(function () {
  if(typeof TodoStore_cache !== 'undefined') {
    TodoStore.setValue(TodoStore_cache);
  } else {
    TodoStore.setValue(TodoService.getAllTodos().then(result => result || []));
  }
});

TodoActions.create
    .subscribe(function ({todo, promise}) { 
        TodoStore.applyOperation(todos => todos.concat(todo), promise);
    });

TodoActions.updateText.
    subscribe(function ({update: {id, text}, promise})  { 
        TodoStore.applyOperation(todos => todos.map(todo => todo.id !== id ? todo : {...todo, text}), promise);
    });

TodoActions.destroy
    .subscribe(function ({id, promise}) { 
        TodoStore.applyOperation(todos => todos.filter(todo => todo.id !== id), promise);
    });

TodoActions.destroyCompleted
    .subscribe(promise => 
        TodoStore.applyOperation(todos => todos.filter(todo => !todo.complete), promise));


TodoActions.toggleComplete
    .subscribe(function ({id, promise}) { 
        TodoStore.applyOperation(
          todos => todos.map(todo => todo.id !== id ? todo : {...todo, complete: !todo.complete}), 
          promise
        );
    });

TodoActions.toggleCompleteAll
    .subscribe(promise => { 
        TodoStore.applyOperation(todos => {
            var complete = !todos.every(todo => todo.complete);
            return todos.map(todo => ({...todo, complete}));
        }, promise);
    });

module.exports = TodoStore;