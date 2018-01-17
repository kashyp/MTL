//Container for the Trades View
import React from 'react';
import { Row, Col } from 'antd';
import TradesList from './TradesList';
import TradeDetail from './TradeDetail';
import SearchTrades from './SearchTrades';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_TRADES_QUERY } from "./gql/tradeGqlInterface";
import { observer, inject } from "mobx-react";

@inject("tradesStore") @observer
class TradesView extends React.Component{

  render(){
  if (this.props.allTradesQuery && this.props.allTradesQuery.loading) {
    return <div>Loading...</div>;
  }

  if (this.props.allTradesQuery && this.props.allTradesQuery.error) {
    return <div>Error : {this.props.allTradesQuery.error}</div>;
  }

  const tradesToRender = this.props.allTradesQuery.allTrades;
  //load the store
  this.props.tradesStore.initTrades(tradesToRender);

    return(
      <div>
        {/* <DevTools /> */}
          <div>
            <Row>
              <SearchTrades />
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={18}>
                <div className="component-container">
                  <TradesList />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="component-container">
                  <TradeDetail/>
                </div>
              </Col>
            </Row>
          </div>
      </div>
    );
  }
}

export default graphql(ALL_TRADES_QUERY, { name: 'allTradesQuery' }) (TradesView);
//export default TradesView;
