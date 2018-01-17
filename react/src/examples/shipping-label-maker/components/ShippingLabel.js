import React from 'react';
import PropTypes from 'prop-types';
import {PRICE_UNIT as currency} from './../utils/Utils';
import { Button } from 'antd';

//Stateless component
const ShippingLabel = props =>{

  return(
    <div>
      <h4>Shipping label</h4>
      <p>Label Id: {props.labelId}</p>
      <p>Sender's Address: {props.sendersAdd}</p>
      <p>Receiver's Address: {props.recAdd}</p>
      <p>Cost: {props.cost} {currency}</p>
      <br />
      <Button type="primary" onClick={()=>{window.location.reload();}}>Start Again</Button>
    </div>
  );
};

ShippingLabel.propTypes = {
  sendersAdd: PropTypes.string.isRequired,
  recAdd: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  labelId: PropTypes.string
};

export default ShippingLabel;
