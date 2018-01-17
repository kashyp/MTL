import React from 'react';
import { Row, Col, Button, Table } from 'antd';
import PurchaseSales from './../../shared/PurchaseSales';
import PurchaseSaleWrapper from './../../shared/PurchaseSaleWrapper';
import SearchTransfers from './SearchTransfers';
import DevTools from 'mobx-react-devtools';
import PurchaseSaleComp from './PurchaseSaleComp';
import TransferTransportComp from './TransferTransportComp';

const Transfers = (props) => {

    return(
      <div>
        {/* <DevTools /> */}
        <Row>
          <SearchTransfers />
        </Row>
        <Row gutter={8}>
          <Col className="gutter-row" span={12}>
            <PurchaseSaleComp />
          </Col>
          <Col className="gutter-row" span={12}>
            <TransferTransportComp />
          </Col>
        </Row>
      </div>
    );
}

export default Transfers;
