import { observable, action, useStrict } from "mobx";

useStrict(true);

export default class StockModel {

  @observable.ref id;
  @observable buys = [];
  @observable sells = [];

  constructor(id, buys, sells) {
    this.id = id;
    this.buys = buys;
    this.sells = sells;
  }

}
