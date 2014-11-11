var { Action }  = require('rx-flux');
var uuid        = require('node-uuid');
var TodoService = require('../services/todoService');


var TodoActions = {

  /**
   * @param  {string} text
   */
  create: Action.create(function (text) {
    var todo = {
        id: uuid.v4(),
        text: text,
        complete: false,
        time: Date.now()
    };
    
    return { 
        todo: todo, 
        promise: TodoService.createTodo(todo)
    };
  }),

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: Action.create(function ({id, text}) {
    return { 
        update: {id, text}, 
        promise: TodoService.updateText(id, text)
    };
  }),

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: Action.create(id => ({ id, promise: TodoService.toggleComplete(id) })),

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: Action.create(() => TodoService.toggleCompleteAll()),

  /**
   * @param  {string} id
   */
  destroy: Action.create(id => ({id, promise: TodoService.destroyTodo(id)})),

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: Action.create(() => TodoService.destroyCompleted())

};

module.exports = TodoActions;