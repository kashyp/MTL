import React from 'react';
import { Row, Col, Table } from 'antd';

const PurchaseSale = (props) => {
  return(
    <div className={props.topDivClass}>
      <Row className={props.rowClass}>
        <span className={props.spanClass}>{props.heading}</span>
      </Row>
      <Table columns={props.columns} rowKey={record => record.id} rowSelection={props.rowSelection}
        dataSource={props.data} size={props.tableSize} pagination={props.tablePagination}/>
    </div>
  );
}

export default PurchaseSale;
