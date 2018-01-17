//Detailed view of the trade
import React from 'react';
import TradeDetailHeader from './TradeDetailHeader';
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Checkbox, Radio, InputNumber } from 'antd';
import  moment from 'moment';
import { observer, inject } from "mobx-react";
import { observable, action } from "mobx";
import { hasErrors, buySellRadios, commodityOptions, counterPartyOptions, locationOptions } from './../../../utils/TradeUtils';
import { UPDATE_TRADE_MUTATION, ADD_TRADE_MUTATION } from './gql/tradeGqlInterface';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'DD/MM/YYYY';
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;

@inject("tradesStore") @observer
class TradeDetailForm extends React.Component{

  constructor(props) {
    super(props);
  }

  @action
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(this.props.tradesStore.isAddInProgress){
          this._handleAddTradeMutation(values);
        } else{
          let tradeId = this.props.tradesStore.activeRow.id;
          this._handleUpdateTradeMutation(tradeId, values);
        }
      }
    });
  }

  _handleUpdateTradeMutation(tradeId, values){
    const { side , qty, price, tradeDt, commodity, loc, cp, status } = values;
    this.props.updateTradeMutation({
      variables: {
        tradeId,
        side,
        qty,
        price,
        tradeDt,
        commodity,
        loc,
        cp,
        status
      }
    })
    .then(
      action("mutationSuccess", res => {
        this.props.tradesStore.activeRow.editable = false;
        let updatedTrade = {
          id: this.props.tradesStore.activeRow.id,
          side: side,
          qty: qty,
          price: price,
          tradeDt: tradeDt,
          cmdty: commodity,
          loc: loc,
          cp: cp,
          status: status
        };
        this.props.tradesStore.updateTrade(updatedTrade);
      }),
      action("mutationError", error => {
        this.props.tradesStore.activeRow.editable = true;
      })
    );
  }

  _handleAddTradeMutation(values){
    const { side , qty, price, tradeDt, commodity, loc, cp, status } = values;
    this.props.addTradeMutation({
      variables: {
        side,
        qty,
        price,
        tradeDt,
        commodity,
        loc,
        cp
      }
    })
    .then(({data}) =>{
      let updatedTrade = {
        id: data.addTrade.tradeId,
        side: side,
        qty: qty,
        price: price,
        tradeDt: tradeDt,
        cmdty: commodity,
        loc: loc,
        cp: cp,
        status: "OPEN"
      };
      this.props.tradesStore.addTrade(updatedTrade);
    })
    .catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  @action
  toggleEdit = () => {
    this.props.tradesStore.prevActiveRow.editable = false;
    this.props.tradesStore.activeRow.editable = true;
  }

  handleDelete = () => {
    console.log(`In Delete for ${this.props.tradesStore.activeRow.id}`);
  }

  handleAddTrade = () => {
    console.log('Inside handleAddTrade');
    this.props.tradesStore.handleAddTradeTransition();
  }

  @action
  handleCancel = () => {
    this.props.form.resetFields();
    this.props.tradesStore.activeRow.editable=false;
    if(this.props.tradesStore.isAddInProgress){
      this.props.tradesStore.activeRow = this.props.tradesStore.prevActiveRow;
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  render(){
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tradeDtError = isFieldTouched('tradeDt') && getFieldError('tradeDt');
    const commodityError = isFieldTouched('commodity') && getFieldError('commodity');
    const sideError = isFieldTouched('side') && getFieldError('side');
    const cpError = isFieldTouched('cp') && getFieldError('cp');
    const priceError = isFieldTouched('price') && getFieldError('price');
    const qtyError = isFieldTouched('qty') && getFieldError('qty');
    const locError = isFieldTouched('loc') && getFieldError('loc');

    let activeTrade = this.props.tradesStore.activeRow;

    return(
      <div>
        <TradeDetailHeader
          id={activeTrade.id}
          canEdit={activeTrade.status}
          toggleEdit={this.toggleEdit}
          delete={this.handleDelete}
          handleAddTrade={this.handleAddTrade}
        />
        <div style={{ padding: '10px'}} className="trade-detail-form">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              validateStatus={tradeDtError ? 'error' : ''}
              help={tradeDtError || ''}
              label="Trade Date"
            >
              {activeTrade.editable && getFieldDecorator('tradeDt', {
                rules: [{ required: true, message: 'Please input trade date' }],
                initialValue: moment(activeTrade.tradeDt)
              })(
                <DatePicker format={dateFormat}/>
              )}
              {!activeTrade.editable &&
                <span>{moment(activeTrade.tradeDt).format('DD/MM/YY')}</span>
              }
            </FormItem>
            <FormItem
                {...formItemLayout}
                validateStatus={commodityError ? 'error' : ''}
                help={commodityError || ''}
                label="Commodity"
              >
              {activeTrade.editable && getFieldDecorator('commodity', {
                rules: [{ required: true, message: 'Please input commodity' }],
                initialValue: activeTrade.commodity
                })(
                <Select>
                  {commodityOptions}
                </Select>
                )}
              {!activeTrade.editable &&
                <span>{activeTrade.commodity}</span>
              }
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={sideError ? 'error' : ''}
                help={sideError || ''}
                label="Side"
              >
              {activeTrade.editable && getFieldDecorator('side', {
                rules: [{ required: true, message: 'Please input side' }],
                initialValue: activeTrade.side
                })(
                <RadioGroup>
                  {buySellRadios}
                </RadioGroup>
                )}
              {!activeTrade.editable &&
                <span>{activeTrade.side === 'BUY' ? 'Buy' : 'Sell'}</span>
              }
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={cpError ? 'error' : ''}
                help={cpError || ''}
                label="Counterparty"
              >
              {activeTrade.editable && getFieldDecorator('cp', {
                rules: [{ required: true, message: 'Please input counterparty' }],
                initialValue: activeTrade.cp
                })(
                <Select>
                  {counterPartyOptions}
                </Select>
                )}
              {!activeTrade.editable &&
                <span>{activeTrade.cp}</span>
              }
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={priceError ? 'error' : ''}
                help={priceError || ''}
                label="Price"
              >
              {activeTrade.editable && getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input price' }],
                initialValue: activeTrade.price
                })(
                <InputNumber/>
                )}
              {!activeTrade.editable &&
                <span>${activeTrade.price}</span>
              }
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={qtyError ? 'error' : ''}
                help={qtyError || ''}
                label="Quantity"
              >
              {activeTrade.editable && getFieldDecorator('qty', {
                rules: [{ required: true, message: 'Please input quantity' }],
                initialValue: activeTrade.qty
                })(
                <InputNumber/>
                )}
              {!activeTrade.editable &&
                <span>{activeTrade.qty}</span>
              }
              </FormItem>
              <FormItem
                {...formItemLayout}
                validateStatus={locError ? 'error' : ''}
                help={locError || ''}
                label="Location"
              >
              {activeTrade.editable && getFieldDecorator('loc', {
                rules: [{ required: true, message: 'Please input location' }],
                initialValue: activeTrade.loc
                })(
                <Select>
                  {locationOptions}
                </Select>
                )}
              {!activeTrade.editable &&
                <span>{activeTrade.loc}</span>
              }
              </FormItem>
            {activeTrade.editable &&
              <FormItem>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                    Save
                </Button>
                <Button type="primary" onClick={this.handleCancel}>
                    Cancel
                </Button>
            </FormItem>
            }
          </Form>
        </div>
      </div>
    );
  }
}

const TradeDetail =  compose(
  graphql(UPDATE_TRADE_MUTATION, { name: 'updateTradeMutation' }),
  graphql(ADD_TRADE_MUTATION, { name: 'addTradeMutation' })
)(Form.create()(TradeDetailForm));
export default TradeDetail;
