/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */


var React         = require('react');
var RxReact       = require('rx-react');
var TodoStore     = require('../stores/todoStore');
var Footer        = require('./footer.jsx');
var Header        = require('./header.jsx');
var MainSection   = require('./mainSection.jsx');

var TodoApp = RxReact.createClass({

  
  getStateStream() {
    return TodoStore.map(todos => ({
      allTodos: todos,
      areAllComplete: todos.every(todo => todo.complete)  
    }));
  },

  /**
   * @return {object}
   */
  render(props, state) {
    state = state || { allTodos: [], areAllComplete: false };
  	return (
      <div>
        <Header />
        <MainSection
          allTodos={state.allTodos}
          areAllComplete={state.areAllComplete}
        />
        <Footer allTodos={state.allTodos} />
      </div>
  	);
  },


});

module.exports = TodoApp;