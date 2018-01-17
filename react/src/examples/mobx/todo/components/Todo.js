import React, { Component } from "react";
import { observer } from "mobx-react";

//Stateless component

/**
@observer
class Todo extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const todo = this.props.todo;
    return(
      <li>
        <input
          type="checkbox"
          checked={todo.finished}
          onClick={() => (todo.finished = !todo.finished)}
        />
        {todo.title}
      </li>
    );
  }
} **/

const Todo = observer(({ todo }) => (
//const Todo = ({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={(e) => (todo.toggleStatus())}
    />
    {todo.title}
  </li>
));

export default Todo;
