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
var TodoTextInput   = require('./todoTextInput.jsx');

var cx = require('react/lib/cx');

var TodoItem = RxReact.createClass({

  propTypes: {
   todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },
  
  init(comp) {
    comp.observableFromEvent('onSave','.edit')
      .subscribe((text) => {
          TodoActions.updateText({id: comp.props.todo.id, text});
          comp.setState({isEditing: false});                  
      });
    
    comp.observableFromEvent('onChange','.toggle')
      .subscribe(() => TodoActions.toggleComplete(comp.props.todo.id));
    
    comp.observableFromEvent('onDoubleClick','label')
      .subscribe(() => comp.setState({isEditing: true}));
    
    comp.observableFromEvent('onClick','.destroy')
      .subscribe(() => TodoActions.destroy(comp.props.todo.id));
  },

  /**
   * @return {object}
   */
  render(props, state) {
    var todo = props.todo;

    var input;
    if (state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          value={todo.text}
        />;
    }
    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={cx({
          'completed': todo.complete,
          'editing': state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
          />
          <label>
            {todo.text}
          </label>
          <button className="destroy"  />
        </div>
        {input}
      </li>
    );
  }

});

module.exports = TodoItem;