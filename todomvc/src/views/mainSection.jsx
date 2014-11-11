/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @jsx React.DOM
 */

var React           = require('react');
var RxReact         = require('rx-react');
var ReactPropTypes  = React.PropTypes;
var TodoActions     = require('../actions/todoActions');
var TodoItem        = require('./todoItem.jsx');

var MainSection = RxReact.createClass({

  propTypes: {
    allTodos: ReactPropTypes.array.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },
  
  init(comp) {
    comp.observableFromEvent('onChange', '#toggle-all')
      .subscribe(TodoActions.toggleCompleteAll);
  },

  /**
   * @return {object}
   */
  render(props) {
    // This section should be hidden by default
    // and shown when there are todos.
    if (props.allTodos.length < 1) {
      return null;
    }

    var todos = props.allTodos.map(todo => 
      (<TodoItem key={todo.id} todo={todo} />)
    );


    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          checked={props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  },



});

module.exports = MainSection;