import { observable } from "mobx";

export default class CounterModel {
  @observable count = 0;

  increment = function(){
    this.count++;
  }

  decrement = function(){
    this.count--;
  }
}
