import TradeStore from './../trades/TradeStore';
import { observable, asReference, action, computed, toJS, useStrict } from 'mobx';
import TradeModel from './../trades/TradeModel';
import StockModel from './../stock/StockModel';

useStrict(true);

export default class TransferStore{

  @observable tradeStore;
  @observable transStore;
  @observable selectedBuys;
  @observable selectedSells;
  @observable searchTransfPurch = [];
  @observable searchTransfSale = [];

  constructor(tradeStore, transStore){
    this.tradeStore = tradeStore;
    this.transStore = transStore;
  }

  @action
  handleSearch(trades){
    if(trades){
      this.searchTransfPurch = [];
      this.searchTransfSale = [];
      trades.map((trade, index)=>{
        if(trade.side==='BUY'){
          this.searchTransfPurch.push(new TradeModel(trade));
        } else{
          this.searchTransfSale.push(new TradeModel(trade));
        }
      });
    }
  }

  @action
  clearSearch(){
    this.searchTransfPurch = [];
    this.searchTransfSale = [];
    this.selectedBuys = [];
    this.selectedSells = [];
  }

  @action
  addSelectedBuys(rows){
    let selRows = toJS(rows);
    if(selRows && selRows.length==0){
      this.selectedBuys = [];
    } else if(selRows && selRows.length>0){
      this.selectedBuys = selRows;
    }
  }

  @action
  addSelectedSells(rows){
    let selRows = toJS(rows);
    if(selRows && selRows.length==0){
      this.selectedSells = [];
    } else if(selRows && selRows.length>0){
      this.selectedSells = selRows;
    }
  }

  @computed
  get computedTrans(){
    if(this.selectedBuys && this.selectedSells &&
        (this.selectedBuys.length>0 || this.selectedSells.length>0)){
      console.log('Trigger trans comp');
      return this.transStore.getTransportsForNomiation(this.selectedBuys, this.selectedSells);
    }
  }


  @computed
  get purchasesWOTransfers(){
    if(this.tradeStore.trades){
      let buys = [];
      let trades = toJS(this.tradeStore.trades);
      let tradesArr = Object.keys(trades).map((k) => trades[k]);
      tradesArr.map(trade => {
        if(trade.side==='BUY' && trade.status==='OPEN'){
          buys.push(trade);
        }
      });
      return buys;
    }
    return [];
  }

  @computed
  get salesWOTransfers(){
    if(this.tradeStore.trades){
      let sales = [];
      let trades = toJS(this.tradeStore.trades);
      let tradesArr = Object.keys(trades).map((k) => trades[k]);
      tradesArr.map(trade => {
        if(trade.side==='SELL' && trade.status==='OPEN'){
          sales.push(trade);
        }
      });
      return sales;
    }
    return [];
  }

  @action
  clearSelections(){
    this.selectedBuys = [];
    this.selectedSells = [];
  }

  @action
  handleNomination(stockId, transId){
    let trans = this.transStore.transports.get(transId);
    let buys = this.selectedBuys.map(sBuy=>sBuy.id);
    let sells = this.selectedSells.map(sSell=>sSell.id);
    let stock = new StockModel(stockId, buys, sells);
    if(trans){
      trans.stocks.push(stock);
    }
    let trades = [];
    this.selectedBuys.forEach((buy)=>{
      trades.push(buy.id);
    });
    this.selectedSells.forEach((sell)=>{
      trades.push(sell.id);
    });
    trades.forEach(tradeId =>{
      let trade = this.tradeStore.trades.get(tradeId);
      trade.status = "NOMINATED";
      trade.transportId = transId;
    })
  }
}
