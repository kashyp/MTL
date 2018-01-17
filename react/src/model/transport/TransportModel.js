import { observable, action, useStrict, computed } from "mobx";
import TradeStore from './../trades/TradeStore';
import StockModel from './../stock/StockModel';

useStrict(true);

export default class TransportModel {

  @observable.ref id;
  @observable orig;
  @observable dst;
  @observable loadDt;
  @observable unloadDt;
  @observable type;
  @observable editable = false;
  @observable stocks = [];

  constructor(trans) {
    if(trans){
      this.id = trans.transId;
      this.orig = trans.orig;
      this.dst = trans.dst;
      this.loadDt = trans.loadDt;
      this.unloadDt = trans.unloadDt;
      this.type = trans.type;
      let origStocks = trans.stocks;
      if(origStocks){
          origStocks.forEach(stock => {
            this.stocks.push(new StockModel(stock.stockId, stock.buy, stock.sell));
        });
      }
    }
  }

  @action
  addStock(stock){
    this.stocks.push(stock);
  }
}
