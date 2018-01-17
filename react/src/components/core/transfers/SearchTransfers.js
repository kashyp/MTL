import React from 'react';
import * as moment from 'moment';
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Checkbox } from 'antd';
import { SEARCH_TRADES_QUERY } from './../trades/gql/tradeGqlInterface';
import { graphql, compose, withApollo } from 'react-apollo';
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import gql from 'graphql-tag';
import { buySellOptions, commodityOptions, counterPartyOptions, locationOptions } from './../../../utils/TradeUtils';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;


@inject("transferStore") @observer
class SearchTransfersForm extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.transferStore.clearSearch();
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this._handleSearchQuery(values)
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.transferStore.clearSearch();
  }

  _handleSearchQuery(values){
    const { tradeDts, commodity, locations, transFlg } = values;

    this.props.client
    .query({
      query: SEARCH_TRADES_QUERY,
      variables: {
          startTd: tradeDts ? tradeDts[0] : null,
          endTd: tradeDts ? tradeDts[1] : null,
          commodity: commodity,
          locations: locations ? locations : null,
          transFlg: transFlg ? transFlg : false
      }
    }).then(({data}) =>{
      this.props.transferStore.handleSearch(data.searchTrades);
    })
  }

  render(){

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return(
      <div className="component-container">
        <Form onSubmit={this.handleSubmit}>
          {/** Label row */}
          <Row gutter={36} className="component-row" style={{fontSize: '11px', fontWeight: 'bold'}}>
            <Col className="gutter-row" span={6}>
              <span>Trade Date</span>
            </Col>
            <Col className="gutter-row" span={3}>
              <span>Commodity</span>
            </Col>
            <Col className="gutter-row" span={6}>
              <span>Locations</span>
            </Col>
            <Col className="gutter-row" span={9} />
          </Row>
          {/** Components row */}
          <Row gutter={36} className="component-row">
            {/** Trade Date */}
            <Col className="gutter-row" span={6}>
              <FormItem >
                {getFieldDecorator('tradeDts')(
                  <RangePicker format='DD-MM-YY' />
                )}
              </FormItem>
            </Col>
            {/** Commodity */}
            <Col className="gutter-row" span={3}>
              <FormItem >
                {getFieldDecorator('commodity')(
                  <Select key="commodity">
                    {commodityOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            {/** Location */}
            <Col className="gutter-row" span={6}>
              <FormItem >
                {getFieldDecorator('locations')(
                  <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select Locations">
                  {locationOptions}
                </Select>
                )}
              </FormItem>
            </Col>
            {/** Trans Arranged */}
            <Col className="gutter-row" span={5}>
              <FormItem >
                {getFieldDecorator('transFlg')(
                  <Checkbox> Transport Arranged</Checkbox>
                )}
              </FormItem>
            </Col>
            {/** Blank */}
            <Col className="gutter-row" span={4}>
              <FormItem>
                <Button size="small" onClick={this.handleReset}>
                    CLEAR
                </Button>
                <Button size="small" htmlType="submit" style={{marginLeft: '10px' }}>
                    SEARCH
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const SearchTransfers = Form.create()(SearchTransfersForm);
//export default SearchTransfers;
export default withApollo(SearchTransfers);

