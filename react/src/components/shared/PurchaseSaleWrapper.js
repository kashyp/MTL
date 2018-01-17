import React from 'react';
import {render} from 'react-dom';
import { purchaseSaleConfig } from './../../utils/TradeUtils';

//Higher order component demo which add firm's price to the course
let PurchaseSaleWrapper = (Component, category, option) => class extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    let compProps = purchaseSaleConfig[category];
    this.setState({
      topDivClass: compProps.topDivClass,
      rowClass: compProps.rowClass,
      spanClass: compProps.spanClass,
      columns: compProps.columns,
      tableSize: compProps.tableSize,
      tablePagination: compProps.tablePagination,
      heading: compProps.heading[option]
    });
  }

  render(){
    return(
      <Component {...this.props} {...this.state}/>
    );
  }
};

export default PurchaseSaleWrapper;
