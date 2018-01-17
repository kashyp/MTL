import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Button, Input,  Row, Col, Icon  } from 'antd';
import { validateAddress } from './../../utils/Utils';
import { observer, inject } from "mobx-react";
import { observable, action, computed } from "mobx";

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

@inject("wizardStore") @observer
class GetReceiverAddress extends React.Component{

  constructor(props){
    super(props);

    this.handleAddress = this.handleAddress.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  @observable value = this.initVal();

  @computed get receiverAdd(){
    let validateRes = validateAddress(this.value, 'receiver\'s');
    return({
      value: this.value,
      validateStatus: validateRes.validateStatus,
      errorMsg: validateRes.errorMsg
    });
  }

  initVal(){
    let value = '';
    let data = this.props.wizardStore.wizardContext.data;
    if(data){
      value = data.get('recAdd');
    }

    return value;
  }

  @computed get next(){
    return this.props.stepData.next;
  }

  @computed get previous(){
    return this.props.stepData.previous;
  }

  @action
  handleAddress(event){
    this.value = event.target.value;
  }

  @action
  handleNext(e){
    if(this.receiverAdd.validateStatus==='success'){
      this.props.wizardStore.pushData('recAdd', this.value);
      this.props.handleNavButton(this.next);
    }
  }

  @action
  handlePrevious(e){
    this.props.wizardStore.pushData('recAdd', this.value);
    this.props.handleNavButton(this.previous);
  }

  render(){
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    };
    return(
      <div>
        <br/>
        <Form>
          <FormItem
            {...formItemLayout}
            validateStatus={this.receiverAdd.validateStatus}
            help={this.receiverAdd.errorMsg}
          >
            <fieldset>
              <legend>{this.props.stepData.title}</legend>
              <Input addonBefore="Enter Address" onChange={this.handleAddress} value={this.receiverAdd.value}/>
            </fieldset>
          </FormItem>
          <FormItem>
            <ButtonGroup>
              <Button type="primary" onClick={this.handlePrevious}>
                <Icon type="left" />Previous
              </Button>
             <Button type="primary" onClick={this.handleNext}>
                <Icon type="right" />Next
              </Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </div>
    );
  }
}

GetReceiverAddress.propTypes = {
  stepData: PropTypes.object.isRequired,
  handleNavButton: PropTypes.func.isRequired,
  wizardStore: PropTypes.object.isRequired
};

export default GetReceiverAddress;
