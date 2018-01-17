import React from 'react';
import { Row, Col } from 'antd';
import DevTools from 'mobx-react-devtools';
import { graphql } from 'react-apollo';
import SearchTrans from './SearchTransports';
import { observer, inject } from "mobx-react";
import TransList from './TransList';
import TransDetail from './TransDetail';
import { ALL_TRANS_QUERY } from './gql/transGqlInterface';

@inject("transStore") @observer
class TransportsView extends React.Component{
  render(){
    if (this.props.allTransQuery && this.props.allTransQuery.loading) {
      return <div>Loading...</div>;
    }

    if (this.props.allTransQuery && this.props.allTransQuery.error) {
      return <div>Error : {this.props.allTransQuery.error}</div>;
    }

    const transToRender = this.props.allTransQuery.allTransports;
    this.props.transStore.initTransports(transToRender);

    return(
      <div>
        {/* <DevTools /> */}
          <Row>
            <SearchTrans/>
          </Row>
          <Row gutter={8}>
            <Col className="gutter-row" span={12}>
              <div className="component-container">
                <TransList />
              </div>
            </Col>
            <Col className="gutter-row" className="gutter-row" span={12}>
              <div className="component-container">
                <TransDetail />
              </div>
            </Col>
          </Row>
      </div>
    );
  }
}

export default graphql(ALL_TRANS_QUERY, { name: 'allTransQuery' }) (TransportsView);
