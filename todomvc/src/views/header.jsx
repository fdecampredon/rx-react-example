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

var React         = require('react');
var RxReact       = require('rx-react');
var TodoActions   = require('../actions/todoActions');
var TodoTextInput = require('./todoTextInput.jsx');

var Header = RxReact.createClass({

  
  init(comp) {
    comp.observableFromEvent('onSave','#new-todo')
      .filter(text => text.trim())
      .subscribe(TodoActions.create);
  },
  /**
   * @return {object}
   */
  render() {
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
        />
      </header>
    );
  },

});

module.exports = Header;