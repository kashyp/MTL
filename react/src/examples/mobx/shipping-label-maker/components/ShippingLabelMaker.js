import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Wizard from './../core/components/wizard/Wizard';
import ShippingLabel from './ShippingLabel';
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import DevTools from 'mobx-react-devtools';

@inject("shippingStore") @observer
class ShippingLabelMaker extends React.Component {

  @action
  calculateShippingcost(data){
    this.props.shippingStore.setData(data);
  }

  render(){
    if(this.props.shippingStore.cost>0){
      return (
        <div>
          <h3>Shipping Label Generator</h3>
          <ShippingLabel />
        </div>
      );
    }
    return(
      <div>
          <h3>Shipping Label Generator</h3>
          <Wizard calculateShippingcost={this.calculateShippingcost.bind(this)} stepsData={this.props.shippingStore.stepsData}/>
      </div>
    );
  }
}

ShippingLabelMaker.prototypes = {
  shippingStore: PropTypes.object.isRequired
};

export default ShippingLabelMaker;
