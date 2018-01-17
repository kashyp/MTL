import React from 'react';
import * as moment from 'moment';
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Checkbox } from 'antd';
import { SEARCH_TRADES_QUERY } from './gql/tradeGqlInterface';
import { graphql, compose, withApollo } from 'react-apollo';
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import gql from 'graphql-tag';
import { buySellOptions, commodityOptions, counterPartyOptions, locationOptions } from './../../../utils/TradeUtils';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;


@inject("tradesStore") @observer
class SearchForm extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.tradesStore.clearSearch();
    this.props.form.validateFields();
  }

  searchFormSubmit = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this._handleSearchQuery(values)
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this.props.tradesStore.clearSearch();
  }

  _handleSearchQuery(values){
    const { side , tradeDts, commodity, location, cpty } = values;
    let locations = [];
    if(location){
      locations.push(location);
    }
    this.props.client
    .query({
      query: SEARCH_TRADES_QUERY,
      variables: {
          buySide: side ? side[0] : null,
          sellSide: side ? side[1] : null,
          commodity: commodity,
          counterparty: cpty,
          locations: locations,
          startTd: tradeDts ? tradeDts[0] : null,
          endTd: tradeDts ? tradeDts[1] : null
      }
    }).then(({data}) =>{
      this.props.tradesStore.searchTrade(data.searchTrades);
    })
  }

  render(){

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return(
      <div className="component-container">
        <Form onSubmit={this.searchFormSubmit}>
          {/** Label row */}
          <Row gutter={58} className="component-row" style={{fontSize: '11px', fontWeight: 'bold'}}>
            <Col className="gutter-row" span={6}>
              <span>Trade Date</span>
            </Col>
            <Col className="gutter-row" span={3}>
              <span>Commodity</span>
            </Col>
            <Col className="gutter-row" span={4}>
              <span>Side</span>
            </Col>
            <Col className="gutter-row" span={3}>
              <span>Counterparty</span>
            </Col>
            <Col className="gutter-row" span={3}>
              <span>Location</span>
            </Col>
            <Col className="gutter-row" span={5} />
          </Row>
          {/** Components row */}
          <Row gutter={58} className="component-row">
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
            {/** Side */}
            <Col className="gutter-row" span={4}>
              <FormItem >
                {getFieldDecorator('side')(
                  <CheckboxGroup
                   options={buySellOptions}
                  />
                )}
              </FormItem>
            </Col>
            {/** Counterparty */}
            <Col className="gutter-row" span={3}>
              <FormItem >
                {getFieldDecorator('cpty')(
                <Select>
                   {counterPartyOptions}
                 </Select>
                )}
              </FormItem>
            </Col>
            {/** Location */}
            <Col className="gutter-row" span={4}>
              <FormItem >
                {getFieldDecorator('location')(
                  <Select>
                  {locationOptions}
                </Select>
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

const SearchTrades = Form.create()(SearchForm);
export default withApollo(SearchTrades);

