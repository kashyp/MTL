import React, {PropTypes} from "react";
import TodoListModel from './models/TodoListModel';
import TodoList from './components/TodoList';
import DevTools from 'mobx-react-devtools';

const store = new TodoListModel();

const TodoComp = () => (
    <div>
      <DevTools />
      <TodoList store = {store} />
    </div>
  );

  /**
  componentDidMount(){
    console.log('Triggering a new actiong manually');
    store.addTodo("Get Coffee");

    console.log('Triggering a new actiong manually');
    store.addTodo("Write simpler code");

    console.log('Triggering a new actiong manually by changing checked flag');
    store.todos[0].finished = true;

    setTimeout(() => {
      console.log('Triggering a new actiong manually after 2 secs');
      store.addTodo("Get a cookie as well");
    }, 2000);

    setTimeout(() => {
      //This doesn't trigger the computed function as the function is NOT dependent on title change.
      console.log('Triggering a new actiong manually after 4 secs');
      store.todos[0].title = 'Get Coffee 1';
    }, 4000);


    // playing around in the console
    window.store = store;
  } */

TodoComp.propTypes = {
  store: PropTypes.object
};

export default TodoComp;
