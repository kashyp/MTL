//Detailed view of the trade
import React from 'react';
import TransDetailHeader from './TransDetailHeader';
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Checkbox, Radio, InputNumber } from 'antd';
import  moment from 'moment';
import { observer, inject } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { hasErrors, transTypeOptions, locationOptions } from './../../../utils/TradeUtils';
import { UPDATE_TRANS_MUTATION, ADD_TRANS_MUTATION } from './gql/transGqlInterface';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PurchaseSales from './../../shared/PurchaseSales';
import PurchaseSaleWrapper from './../../shared/PurchaseSaleWrapper';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'DD/MM/YYYY';
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;

// const dummyData = [
//   {id: 1, tradeDt: new Date("2018-02-10"), cmdty: 'CU', qty: 2000000, price: 200, loc: 'BA'},
//   {id: 2, tradeDt: new Date("2018-02-10"), cmdty: 'CU', qty: 2000000, price: 200, loc: 'BA'},
//   {id: 3, tradeDt: new Date("2018-02-10"), cmdty: 'CU', qty: 2000000, price: 200, loc: 'BA'}
// ];

@inject("transStore") @observer
class TransDetailForm extends React.Component{

  constructor(props) {
    super(props);
  }

  @action
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(this.props.transStore.isAddInProgress){
          this._handleAddTransMutation(values);
        } else{
          let transId = this.props.transStore.activeRow.id;
          this._handleUpdateTransMutation(transId, values);
        }
      }
    });
  }

  _handleUpdateTransMutation(transId, values){
    const { orig, dst, loadDt, unloadDt, type } = values;
    this.props.updateTransMutation({
      variables: {
        transId,
        orig,
        dst,
        loadDt,
        unloadDt,
        type
      }
    })
    .then(
      action("mutationSuccess", res => {
        this.props.transStore.activeRow.editable = false;
        let updatedTrans = {
          id: this.props.transStore.activeRow.id,
          orig,
          dst,
          loadDt,
          unloadDt,
          type
        };
        this.props.transStore.updateTransport(updatedTrans);
      }),
      action("mutationError", error => {
        this.props.transStore.activeRow.editable = true;
      })
    );
  }

  _handleAddTransMutation(values){
    const { orig, dst, loadDt, unloadDt, type } = values;
    this.props.addTransMutation({
      variables: {
        orig,
        dst,
        loadDt,
        unloadDt,
        type
      }
    })
    .then(({data}) =>{
      let updatedTrans = {
        transId: data.addTrans.transId,
        orig: orig,
        dst: dst,
        loadDt: loadDt,
        unloadDt: unloadDt,
        type: type
      };
      this.props.transStore.addTransport(updatedTrans);
    })
    .catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  @action
  toggleEdit = () => {
    this.props.transStore.prevActiveRow.editable = false;
    this.props.transStore.activeRow.editable = true;
  }

  handleDelete = () => {
    console.log(`In Delete for ${this.props.transStore.activeRow.id}`);
  }

  handleAddTrans = () => {
    console.log('Inside handleAddTrans');
    this.props.transStore.handleAddTransTransition();
  }

  @action
  handleCancel = () => {
    this.props.form.resetFields();
    this.props.transStore.activeRow.editable=false;
    if(this.props.transStore.isAddInProgress){
      this.props.transStore.activeRow = this.props.transStore.prevActiveRow;
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  render(){
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const loadDtError = isFieldTouched('loadDt') && getFieldError('loadDt');
    const unloadDtError = isFieldTouched('unloadDt') && getFieldError('unloadDt');
    const origError = isFieldTouched('orig') && getFieldError('orig');
    const dstError = isFieldTouched('dstError') && getFieldError('dst');
    const typeError = isFieldTouched('type') && getFieldError('type');

    let activeTrans = this.props.transStore.activeRow;
    let purchases = this.props.transStore.purchases ? toJS(this.props.transStore.purchases) : [];
    let sales = this.props.transStore.sales ? toJS(this.props.transStore.sales) : [];

    let PurchaseComp = PurchaseSaleWrapper(PurchaseSales, 'transport', 'purchase');
    let SaleComp = PurchaseSaleWrapper(PurchaseSales, 'transport', 'sales');

    return(
      <div>
        <TransDetailHeader
          id={activeTrans.id}
          toggleEdit={this.toggleEdit}
          delete={this.handleDelete}
          handleAddTrans={this.handleAddTrans}
        />
        <div style={{ padding: '10px'}} className="trans-detail-form">
          <Form onSubmit={this.handleSubmit}>
            <Row style={{fontSize: '11px', fontWeight: 'bold'}}>
              <Col span={4}>
                <span>Origin</span>
              </Col>
              <Col span={5}>
                <span>Destination</span>
              </Col>
              <Col span={6}>
                <span>Loading Date</span>
              </Col>
              <Col span={6}>
                <span>Unloading Date</span>
              </Col>
              <Col span={3}>
                <span>Type</span>
              </Col>
            </Row>
            <Row style={{marginTop: '10px'}}>
              <Col span={4}>
                <FormItem
                    validateStatus={origError ? 'error' : ''}
                    help={origError || ''}
                  >
                  {activeTrans.editable && getFieldDecorator('orig', {
                    rules: [{ required: true, message: 'Please input origin' }],
                    initialValue: activeTrans.orig
                    })(
                    <Select>
                      {locationOptions}
                    </Select>
                    )}
                  {!activeTrans.editable &&
                    <span>{activeTrans.orig}</span>
                  }
                  </FormItem>
              </Col>
              <Col span={5}>
                <FormItem

                    validateStatus={origError ? 'error' : ''}
                    help={dstError || ''}
                  >
                  {activeTrans.editable && getFieldDecorator('dst', {
                    rules: [{ required: true, message: 'Please input destination' }],
                    initialValue: activeTrans.dst
                    })(
                    <Select>
                      {locationOptions}
                    </Select>
                    )}
                  {!activeTrans.editable &&
                    <span>{activeTrans.dst}</span>
                  }
                  </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  validateStatus={loadDtError ? 'error' : ''}
                  help={loadDtError || ''}
                >
                  {activeTrans.editable && getFieldDecorator('loadDt', {
                    rules: [{ required: true, message: 'Please input loading date' }],
                    initialValue: moment(activeTrans.loadDt)
                  })(
                    <DatePicker format={dateFormat}/>
                  )}
                  {!activeTrans.editable &&
                    <span>{moment(activeTrans.loadDt).format('DD/MM/YY')}</span>
                  }
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem
                  validateStatus={unloadDtError ? 'error' : ''}
                  help={unloadDtError || ''}
                >
                  {activeTrans.editable && getFieldDecorator('unloadDt', {
                    rules: [{ required: true, message: 'Please input unloading date' }],
                    initialValue: moment(activeTrans.unloadDt)
                  })(
                    <DatePicker format={dateFormat}/>
                  )}
                  {!activeTrans.editable &&
                    <span>{moment(activeTrans.unloadDt).format('DD/MM/YY')}</span>
                  }
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem
                    validateStatus={typeError ? 'error' : ''}
                    help={typeError || ''}
                  >
                  {activeTrans.editable && getFieldDecorator('type', {
                    rules: [{ required: true, message: 'Please input Type' }],
                    initialValue: activeTrans.type
                    })(
                    <Select>
                      {transTypeOptions}
                    </Select>
                    )}
                  {!activeTrans.editable &&
                    <span>{activeTrans.type}</span>
                  }
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={19}></Col>
              <Col span={5}>
                {activeTrans.editable &&
                  <FormItem style={{float: 'right'}}>
                    <Button type="primary" size="small" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Save
                    </Button>
                    <Button type="primary" size="small" onClick={this.handleCancel} style={{marginLeft: '5px'}}>
                        Cancel
                    </Button>
                  </FormItem>
                }
              </Col>
            </Row>
          </Form>
        </div>
        <PurchaseComp data={purchases}/>
        <SaleComp data={sales}/>
      </div>
    );
  }
}

const TransDetail =  compose(
  graphql(UPDATE_TRANS_MUTATION, { name: 'updateTransMutation' }),
  graphql(ADD_TRANS_MUTATION, { name: 'addTransMutation' })
)(Form.create()(TransDetailForm));
export default TransDetail;
