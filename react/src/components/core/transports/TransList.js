import React from 'react';

import { Table, Icon, Divider } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import { transColumns } from './../../../utils/TradeUtils';

@inject("transStore") @observer
class TradesList extends React.Component {

  handleRowClick = (trans)=> {
    //Enable selected property of row so that delete icon comes
    //Change trade details screen
    this.props.transStore.setActiveRowById(trans.id);
  }

  render(){

  let transToRender = (this.props.transStore.searchTransports.size>0 ? this.props.transStore.searchTransports.values() : this.props.transStore.transports.values());
  //To make this component observe activeRow
  let activeRowActive = this.props.transStore.activeRow.editable;

    return(
      <div className="trade-list-view">
        <Table columns={transColumns} rowKey={record => record.id}
          dataSource={transToRender} onRowClick={this.handleRowClick}/>
      </div>
    );
  }
}

export default TradesList;
