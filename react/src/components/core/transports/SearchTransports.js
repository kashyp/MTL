import React from 'react';
import * as moment from 'moment';
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Checkbox } from 'antd';
import { SEARCH_TRANS_QUERY } from './gql/transGqlInterface';
import { graphql, compose, withApollo } from 'react-apollo';
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import gql from 'graphql-tag';
import { transTypeOptions, locationOptions } from './../../../utils/TradeUtils';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

@inject("transStore") @observer
class SearchTransForm extends React.Component {

  componentDidMount() {
    // To disabled submit button at the beginning.
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
    this.props.transStore.clearSearch();
  }

  _handleSearchQuery(values){
    const { orig , dst, loadDts, unloadDts, type } = values;
    this.props.client
    .query({
      query: SEARCH_TRANS_QUERY,
      variables: {
          orig: orig ? orig : null,
          dst: dst ? dst : null,
          loadSdt: loadDts ? loadDts[0] : null,
          loadEdt: loadDts ? loadDts[1] : null,
          unloadSdt: unloadDts ? unloadDts[0] : null,
          unloadEdt: unloadDts ? unloadDts[1] : null,
          type: type
      }
    }).then(({data}) =>{
      this.props.transStore.searchTransport(data.searchTransports);
    })
  }

  render(){

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return(
      <div className="component-container">
        <Form onSubmit={this.handleSubmit}>
          {/** Label row */}
          <Row gutter={58} className="component-row" style={{fontSize: '11px', fontWeight: 'bold'}}>
            <Col className="gutter-row" span={3}>
              <span>Origin</span>
            </Col>
            <Col className="gutter-row" span={3}>
              <span>Destination</span>
            </Col>
            <Col className="gutter-row" span={6}>
              <span>Loading Date</span>
            </Col>
            <Col className="gutter-row" span={6}>
              <span>Unloading Date</span>
            </Col>
            <Col className="gutter-row" span={2}>
              <span>Type</span>
            </Col>
            <Col className="gutter-row" span={4} />
          </Row>
          {/** Components row */}
          <Row gutter={58} className="component-row">
            <Col className="gutter-row" span={3}>
              <FormItem >
                {getFieldDecorator('orig')(
                  <Select>
                    {locationOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={3}>
              <FormItem >
                {getFieldDecorator('dst')(
                  <Select>
                    {locationOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={6}>
              <FormItem >
                {getFieldDecorator('loadDts')(
                  <RangePicker format='DD-MM-YY' />
                )}
              </FormItem>
            </Col>
            <Col className="gutter-row" span={6}>
              <FormItem >
                {getFieldDecorator('unloadDts')(
                  <RangePicker format='DD-MM-YY' />
                )}
              </FormItem>
            </Col>
            {/** Location */}
            <Col className="gutter-row" span={2}>
              <FormItem >
                {getFieldDecorator('type')(
                  <Select>
                  {transTypeOptions}
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

const SearchTrans = Form.create()(SearchTransForm);
export default withApollo(SearchTrans);

