import { observable, asReference, action, computed, toJS } from 'mobx';
import TransportModel from './TransportModel';
import TransNomModel from './TransNomModel';

export default class TransportStore {

  @observable tradeStore;
  @observable transports = new Map();
  @observable activeRow;
  @observable prevActiveRow;
  @observable isAddInProgress = false;
  @observable searchTransports = new Map();

  constructor(tradeStore){
    this.tradeStore = tradeStore;
  }

  @computed
  get purchases(){
    let result = [];
    if(this.activeRow){
      let stocks = toJS(this.activeRow.stocks);
      if(stocks && stocks.length>0){
        let buys = [];
        stocks.forEach(stock => {
          buys.push(stock.buys);
        });
        buys.forEach(buy =>{
          let trade = this.tradeStore.trades.get(buy);
          if(trade){
            result.push(toJS(trade));
          }
        });
      }
    }
    return result;
  }

  @computed
  get sales(){
    let result = [];
    if(this.activeRow){
      let stocks = toJS(this.activeRow.stocks);
      if(stocks && stocks.length>0){
        let sells = [];
        stocks.forEach(stock => {
          sells.push(stock.sells);
        });
        sells.forEach(sell =>{
          let trade = this.tradeStore.trades.get(sell);
          if(trade){
            result.push(toJS(trade));
          }
        });
      }
    }
    return result;
  }

  @action
  initTransports(transportsFromGQL){
    if(transportsFromGQL && this.transports.size==0){
      transportsFromGQL.map((trans, index) => {
        this.transports.set(trans.transId, new TransportModel(trans));
        if(index==0){
          let firstRow = this.transports.get(trans.transId);
          this.prevActiveRow = firstRow;
          this.activeRow = firstRow;
        }
      });
    }
  }

  @action
  searchTransport(transports){
    if(transports){
      transports.map((trans, index)=>{
        this.searchTransports.set(trans.transId, new TransportModel(trans));
        if(index==0){
          let firstRow = this.searchTransports.get(trans.transId);
          this.prevActiveRow = this.activeRow;
          this.activeRow = firstRow;
        }
      });
    }
  }

  @action
  clearSearch(){
    if(this.transports.size>0){
      let firstRowId = this.transports.entries().next().value[0];
      let firstRow = this.transports.get(firstRowId);
      this.prevActiveRow = firstRow;
      this.activeRow = firstRow;
      this.searchTransports.clear();
      this.setActiveRowById(firstRow.id);
    }
  }

  @action
  handleAddTransTransition(){
    //make current active row previous
    this.prevActiveRow = this.activeRow;
    this.prevActiveRow.editable = false;
    //assign new active row
    this.activeRow = new TransportModel();
    this.activeRow.editable = true;
    this.isAddInProgress = true;
  }

  @action
  handleAddTransportCancel(){
    this.activeRow = this.prevActiveRow;
    this.activeRow.editable = false;
  }

  @action
  addTransport(trans){
    this.activeRow.editable = false;
    this.transports.set(trans.transId, new TransportModel(trans));
    this.activeRow = this.transports.get(trans.transId);
    this.isAddInProgress = false;
  }

  @action
  updateTransport(trans){
    this.activeRow.orig = trans.orig;
    this.activeRow.dst = trans.dst;
    this.activeRow.loadDt = trans.loadDt;
    this.activeRow.unloadDt = trans.unloadDt;
    this.activeRow.type = trans.type;
    if(this.searchTransports.size>0){
      //If search result is there currently, update trans store
      let transStoreItem = this.transports.get(trans.id);
        if(transStoreItem){
          transStoreItem.orig = trans.orig;
          transStoreItem.dst = trans.dst;
          transStoreItem.loadDt = trans.loadDtcp;
          transStoreItem.unloadDt = trans.unloadDt;
          transStoreItem.type = trans.type;
        }
    }
  }

  @action
  setActiveRowById(id){
    //make current active row previous
    this.prevActiveRow = this.activeRow;
    this.prevActiveRow.editable = false;

    //assign new active row
    if(this.searchTransports.size>0){
      this.activeRow = this.searchTransports.get(id);
    } else{
      this.activeRow = this.transports.get(id);
    }
    this.isAddInProgress = false;
  }

  getTransportsForNomiation(buys, sells){
    if(buys.length >0 && sells.length>0){
      let resultComCheck = this._checkSameCommodity(buys, sells);
      if(resultComCheck){
        console.log(`resultComCheck : ${resultComCheck}`);
        let result = [];
        this.transports.keys().forEach((key)=>{
          let value = this.transports.get(key);
          if((value.orig===resultComCheck.src && value.dst===resultComCheck.dst)){
              console.log(`Src and dst matching for transId : ${value.id}`);
              if((new Date(value.loadDt)).getTime() >= (new Date(resultComCheck.minDate)).getTime() && (new Date(value.unloadDt)).getTime()<= (new Date(resultComCheck.maxDate)).getTime()){
                console.log(`matching dates`);
                result.push(value);
              }
          }
        });
        return result;
      }
      return [];
    }
  }

  _checkSameCommodity(buys, sells){
    let commodityMap = new Map();
    let srcMap = new Map();
    let dstMap = new Map();
    let dates = [];

    buys.forEach(buy => {
      commodityMap.set(buy.commodity, 'test');
      dates.push(new Date(buy.tradeDt));
      srcMap.set(buy.loc, 'test');
    });
    if(commodityMap.size>1 || commodityMap.size==0 || srcMap.size>1 || srcMap.size==0){
      return null;
    }
    sells.forEach(sell => {
      commodityMap.set(sell.commodity, 'test');
      dates.push(new Date(sell.tradeDt));
      dstMap.set(sell.loc, 'test');
    });
    if(commodityMap.size>1 || commodityMap.size==0 || dstMap.size>1 || dstMap.size==0){
      return null;
    }

    let maxDate=new Date(Math.max.apply(null,dates));
    let minDate=new Date(Math.min.apply(null,dates));
    let commodity = commodityMap.keys().next().value;
    let src = srcMap.keys().next().value;
    let dst = dstMap.keys().next().value;

    return new TransNomModel(minDate, maxDate, commodity, src, dst);
  }

}
