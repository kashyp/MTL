import React from 'react';
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import  moment from 'moment';
import { Row, Col, Button, Table } from 'antd';
import { NOMINATE_TRADES_MUTATION } from './gql/transferGqlInterface';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

@inject("transferStore") @observer
class TransferTransportComp extends React.Component{

  handleNominate = (event, record)=>{
    this._handleNominateMutation(record);
  }

  _handleNominateMutation(trans){
    let transId = trans.id;
    let buyRows = this.props.transferStore.selectedBuys;
    let buys = buyRows.map(buy => buy.id);
    let sellRows = this.props.transferStore.selectedSells;
    let sells = sellRows.map(sell => sell.id);
    this.props.nominateTradesMutation({
      variables: {
        transId,
        buys,
        sells
      }
    })
    .then(({data}) =>{
      let stockId = data.nominateTrade.stockId;
      this.props.transferStore.handleNomination(stockId, transId);
      this.props.router.push('/transports');
    })
    .catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  transferTransColumns = [{
    title: 'Origin',
    dataIndex: 'orig',
    key: 'orig'
  }, {
    title: 'Destination',
    dataIndex: 'dst',
    key: 'dst'
  }, {
    title: 'Loading Date',
    dataIndex: 'loadDt',
    key: 'loadDt',
    render: (text, record) => {
      return moment(record.loadDt).format('DD/MM/YY');
    }
  }, {
    title: 'Unloading Date',
    dataIndex: 'unloadDt',
    key: 'unloadDt',
    render: (text, record) => {
      return moment(record.unloadDt).format('DD/MM/YY');
    }
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },{
    title: '',
    key: 'nominate',
    render: (text, record) => {
      return <Button type="primary" onClick={(e) => this.handleNominate(e, record)}>Nominate</Button>
    }
  }];

  render(){
    return(
      <div>
        <div className="component-container">
          <Row className="transfer-purch-sale-row" style={{paddingLeft: '10px'}}>
            <span className="transfer-purch-sale-span">Transports</span>
          </Row>
          <div className="transfer-purch-sale-div">
            <Table columns={this.transferTransColumns} rowKey={record => record.id} dataSource={this.props.transferStore.computedTrans}/>
          </div>
        </div>
      </div>
    );
  }

}

//export default TransferTransportComp;
export default graphql(NOMINATE_TRADES_MUTATION, { name: 'nominateTradesMutation' }) (withRouter(TransferTransportComp));
