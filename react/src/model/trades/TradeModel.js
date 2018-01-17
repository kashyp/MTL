import { observable, action, useStrict } from "mobx";

useStrict(true);

export default class TradeModel {

  @observable.ref id;
  @observable tradeDt;
  @observable side;
  @observable cp;
  @observable price;
  @observable qty;
  @observable loc;
  @observable commodity;
  @observable status;
  @observable editable = false;
  @observable transportId;

  constructor(trade) {
    if(trade){
    this.id = trade.tradeId ? trade.tradeId : trade.id;
    this.tradeDt = trade.tradeDt;
    this.side = trade.side;
    this.cp = trade.cp;
    this.price = trade.price;
    this.qty = trade.qty;
    this.loc = trade.loc;
    this.commodity = trade.cmdty;
    this.status = trade.status
    this.transportId = trade.transportId;
    }
  }
}
