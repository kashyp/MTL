import React from 'react';
import PropTypes from 'prop-types';
import {PRICE_UNIT as currency} from './../utils/Utils';
import { Button } from 'antd';
import { inject } from "mobx-react";

//Stateless component
const ShippingLabel = inject("shippingStore")(({ shippingStore }) => {
    if(shippingStore.cost){
      return(
        <div>
          <h4>Shipping label</h4>
          <p>Label Id: {shippingStore.labelId}</p>
          <p>Sender's Address: {shippingStore.sendersAdd}</p>
          <p>Receiver's Address: {shippingStore.recAdd}</p>
          <p>Cost: {shippingStore.cost} {currency}</p>
          <br />
          <Button type="primary" onClick={()=>{window.location.reload();}}>Start Again</Button>
        </div>
      );
    }
});

ShippingLabel.propTypes = {
  shippingStore: PropTypes.object.isRequired
};

export default ShippingLabel;
