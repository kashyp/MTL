import { observable, action } from "mobx";

export default class TodoModel {
  //id is just defined to add to element key fir better react rendering performance
  id = Math.random();
  //just a property, won't be changed/observed
  title;
  //only finished is observable
  @observable finished = false;

  constructor(title) {
    this.title = title;
  }

  @action
  toggleStatus(){
    this.finished = !this.finished;
  }
}
