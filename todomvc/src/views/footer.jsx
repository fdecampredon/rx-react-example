/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var React           = require('react');
var RxReact         = require('rx-react');
var ReactPropTypes  = React.PropTypes;
var TodoActions     = require('../actions/todoActions');

var Footer = RxReact.createClass({

  propTypes: {
    allTodos: ReactPropTypes.array.isRequired
  },
  
  
  init(comp) {
    comp.observableFromEvent('onClick', '#clear-completed')
      .subscribe(TodoActions.destroyCompleted);
  },

  /**
   * @return {object}
   */
  render(props) {
    var allTodos = props.allTodos;
    var total = allTodos.length;

    if (total === 0) {
      return null;
    }

    var completed = allTodos.filter(todo => todo.complete).length;

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button id="clear-completed">
          Clear completed ({completed})
        </button>;
    }

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  },

});

module.exports = Footer;