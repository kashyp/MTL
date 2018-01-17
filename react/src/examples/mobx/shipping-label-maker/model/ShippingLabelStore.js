import { observable, asReference, action, computed, useStrict } from 'mobx';
import {PRICE_UNIT as currency, SHIPPING_RATE as rate, getLabel} from './../utils/Utils';
import stepData from './steps/Steps';

export default class ShippingLabelStore {

  @observable sendersAdd;
  @observable recAdd;
  @observable weight;

  @observable labelId;
  @observable.ref stepsData = stepData;

  constructor(){
    this.sendersAdd = '';
    this.recAdd = '';
    this.weight = 0;
  }

  @computed get cost(){
    return (this.weight > 0) ? (this.weight * rate) : 0;
  }

  @action setData(data){
    if(data){
      this.sendersAdd = data.get('senderAdd');
      this.recAdd = data.get('recAdd');
      this.weight = data.get('weight');
      this.labelId = getLabel();
    }
  }
}
