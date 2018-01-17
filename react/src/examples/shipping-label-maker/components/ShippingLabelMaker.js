import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Wizard from './../core/components/wizard/Wizard';
import ShippingLabel from './ShippingLabel';
import {PRICE_UNIT as currency, SHIPPING_RATE as rate, getLabel} from './../utils/Utils';

class ShippingLabelMaker extends React.Component{

  //ToDO : Add Enums for steps
  constructor(props){
    super(props);
    this.state = {
      cost: 0,
      sendersAdd: '',
      recAdd: '',
      labelId: '',
      stepsData: [
        {key:'step1', title: 'Sender\'s Address', next: 'step2', previous: 'none'},
        {key:'step2', title: 'Receiver\'s Address', next: 'step3', previous: 'step1'},
        {key:'step3', title: 'Package Weight', next: 'none', previous: 'step2'}
      ]
    };
    this.calculateShippingcost = this.calculateShippingcost.bind(this);
  }

  calculateShippingcost(data){
    //calculate
    let costCalc = data.get('weight') * rate;
    this.setState(
      {cost: costCalc, sendersAdd: data.get('senderAdd'), recAdd: data.get('recAdd'), labelId: getLabel()}
    );
  }

  render(){
    if(this.state.cost>0){
      return (
        <div>
          <h3>Shipping Label Generator</h3>
          <ShippingLabel cost={this.state.cost} sendersAdd={this.state.sendersAdd} recAdd={this.state.recAdd} labelId={this.state.labelId}/>
        </div>
      );
    }
    return(
      <div>
          <h3>Shipping Label Generator</h3>
          <Wizard calculateShippingcost={this.calculateShippingcost} stepsData={this.state.stepsData}/>
      </div>
    );
  }
}

export default ShippingLabelMaker;
