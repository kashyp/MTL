import { observable, computed, action, useStrict } from "mobx";

import TodoModel from "./TodoModel";

useStrict(true);

export default class TodoListModel {
  //observable is equivalent to adding todos in the state like
  //this.state = {todos : []}
  //Additionally it makes Mobx track changes to this observable element
  @observable todos = [];

  //This function would be triggered whenever todos or todo.finished change
  //This is tracked by MobX. Since there are 2 observables in picture here - todos and todo.finished
  @computed
  get unfinishedTodoCount() {
    console.log('Calculating unfinished count.');
    return this.todos.filter(todo => !todo.finished).length;
  }

  //Action trigger state change -> trigger reactions
  @action
  addTodo(title) {
    console.log('Action of adding triggered.');
    this.todos.push(new TodoModel(title));
  }
}
