
require('./utils/assign-polyfill');
var React = require('react');

var TodoApp = require('./views/todoApp.jsx');

React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);