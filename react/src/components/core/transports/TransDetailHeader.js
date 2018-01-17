import React from 'react';
import { Icon, Row, Col, Tooltip } from 'antd';

const TradeDetailHeader = (props) => {

  // const handleEdit = function(e){
  //   console.log(`handleEdit for id ${id}`);
  // };

  // const handleDelete = function(e){
  //   console.log(`handleDelete for id ${id}`);
  // };

  return(
    <Row className="trade-header">
      <Col span={21}>
        Trade ID: {props.id}
      </Col>
      <Col span={1}>
        <Tooltip title="Add Transport">
          <span style={{ cursor: 'pointer' }} onClick={props.handleAddTrans}>
            <Icon type="plus-circle-o" />
          </span>
        </Tooltip>
      </Col>
      <Col span={1}>
        <Tooltip title="Edit Transport">
          <span style={{ cursor: 'pointer' }} onClick={props.toggleEdit}>
            <Icon type="edit" />
          </span>
        </Tooltip>
      </Col>
      <Col span={1}>
        <Tooltip title="Delete Transport">
          <span style={{ cursor: 'pointer' }} onClick={props.delete}>
            <Icon type="delete" />
          </span>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default TradeDetailHeader;
