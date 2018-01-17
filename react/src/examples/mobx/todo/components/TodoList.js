import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Todo from "./Todo";

@observer
class TodoList extends React.Component {
  @observable newTodoTitle = "";


  @action
  handleInputChange = e => {
    //console.log('Triggering a new action of input title change');
    this.newTodoTitle = e.target.value;
  };

  @action
  handleFormSubmit = e => {
    //console.log('Triggering a new actiong of add Todo');
    this.props.store.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
    e.preventDefault();
  };

  render() {
    let store = this.props.store;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {store.todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {store.unfinishedTodoCount}
      </div>
    );
  }
}

export default TodoList;
