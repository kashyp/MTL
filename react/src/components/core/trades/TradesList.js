import React from 'react';

import { Table, Icon, Divider } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import { tradeColumns } from './../../../utils/TradeUtils';

@inject("tradesStore") @observer
class TradesList extends React.Component {

  handleRowClick = (trade)=> {
    console.log(`trade.id ${trade.id}`);
    //Enable selected property of row so that delete icon comes
    //Change trade details screen
    this.props.tradesStore.setActiveRowById(trade.id);
  }

  handleAddTrade = (e)=> {
    console.log(`inside add trade`);
  }

  render(){

  let tradesToRender = (this.props.tradesStore.searchTrades.size>0 ? this.props.tradesStore.searchTrades.values() : this.props.tradesStore.trades.values());
  //To make this component observe activeRow
  let activeRowActive = this.props.tradesStore.activeRow.editable;

    return(
      <div className="trade-list-view">
        <Table columns={tradeColumns} rowKey={record => record.id}
          dataSource={tradesToRender} onRowClick={this.handleRowClick}/>
      </div>
    );
  }
}

export default TradesList;
