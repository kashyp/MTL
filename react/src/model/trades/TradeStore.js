import { observable, asReference, action, computed } from 'mobx';
import TradeModel from './TradeModel';

export default class TradeStore {

  //convert to map
  @observable trades = new Map();
  @observable activeRow;
  @observable prevActiveRow;
  @observable isAddInProgress = false;
  @observable searchTrades = new Map();

  initTrades(tradesFromGQL){
    if(tradesFromGQL && this.trades.size==0){
      tradesFromGQL.map((trade, index) => {
        this.trades.set(trade.tradeId, new TradeModel(trade));
        if(index==0){
          let firstRow = this.trades.get(trade.tradeId);
          this.prevActiveRow = firstRow;
          this.activeRow = firstRow;
        }
      });
    }
  }

  @action
  searchTrade(trades){
    if(trades){
      this.searchTrades.clear();
      trades.map((trade, index)=>{
        this.searchTrades.set(trade.tradeId, new TradeModel(trade));
        if(index==0){
          let firstRow = this.searchTrades.get(trade.tradeId);
          this.prevActiveRow = this.activeRow;
          this.activeRow = firstRow;
        }
      });
    }
  }

  @action
  clearSearch(){
    if(this.trades.size>0){
      let firstRowId = this.trades.entries().next().value[0];
      let firstRow = this.trades.get(firstRowId);
      this.prevActiveRow = firstRow;
      this.activeRow = firstRow;
      this.searchTrades.clear();
      this.setActiveRowById(firstRow.id);
    }
  }

  @action
  handleAddTradeTransition(){
    //make current active row previous
    this.prevActiveRow = this.activeRow;
    this.prevActiveRow.editable = false;
    //assign new active row
    this.activeRow = new TradeModel();
    this.activeRow.editable = true;
    this.isAddInProgress = true;
  }

  @action
  handleAddTradeCancel(){
    this.activeRow = this.prevActiveRow;
    this.activeRow.editable = false;
  }

  @action
  addTrade(trade){
    this.activeRow.editable = false;
    this.trades.set(trade.id, new TradeModel(trade));
    this.activeRow = this.trades.get(trade.id);
    this.isAddInProgress = false;
  }

  @action
  updateTrade(trade){
    this.activeRow.tradeDt = trade.tradeDt;
    this.activeRow.side = trade.side;
    this.activeRow.cp = trade.cp;
    this.activeRow.price = trade.price;
    this.activeRow.qty = trade.qty;
    this.activeRow.loc = trade.loc;
    this.activeRow.commodity = trade.cmdty;
    if(this.searchTrades.size>0){
      //If search result is there currently, update trade store
      let tradeStoreItem = this.trades.get(trade.id);
        if(tradeStoreItem){
          tradeStoreItem.tradeDt = trade.tradeDt;
          tradeStoreItem.side = trade.side;
          tradeStoreItem.cp = trade.cp;
          tradeStoreItem.price = trade.price;
          tradeStoreItem.qty = trade.qty;
          tradeStoreItem.loc = trade.loc;
          tradeStoreItem.commodity = trade.cmdty;
        }
    }
  }

  @action
  setActiveRowById(id){
    //make current active row previous
    this.prevActiveRow = this.activeRow;
    this.prevActiveRow.editable = false;

    //assign new active row
    if(this.searchTrades.size>0){
      this.activeRow = this.searchTrades.get(id);
    } else{
      this.activeRow = this.trades.get(id);
    }

    this.isAddInProgress = false;
  }
}
