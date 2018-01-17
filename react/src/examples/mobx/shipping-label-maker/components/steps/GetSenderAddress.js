import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Button, Input,  Row, Col, Icon } from 'antd';
import { validateAddress } from './../../utils/Utils';
import { observer, inject } from "mobx-react";
import { observable, action, computed } from "mobx";

const FormItem = Form.Item;

@inject("wizardStore") @observer
class GetSenderAddress extends React.Component {

  constructor(props){
    super(props);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  @observable value = this.initVal();

  @computed get senderAdd(){
    let validateRes = validateAddress(this.value, 'sender\'s');
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
      value = data.get('senderAdd');
    }
    return value;
  }

  @computed get next(){
    return this.props.stepData.next;
  }

  @action
  handleAddress(event){
    this.value = event.target.value;
  }

  @action
  handleNext(e){
    if(this.senderAdd.validateStatus==='success'){
      this.props.wizardStore.pushData('senderAdd', this.value);
      this.props.handleNavButton(this.next);
    }
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
            validateStatus={this.senderAdd.validateStatus}
            help={this.senderAdd.errorMsg}
          >
            <fieldset>
              <legend>{this.props.stepData.title}</legend>
              <Input addonBefore="Enter Address" onChange={this.handleAddress} value={this.senderAdd.value}/>
            </fieldset>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.handleNext}>
              <Icon type="right" />Next
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

GetSenderAddress.propTypes = {
  stepData: PropTypes.object.isRequired,
  handleNavButton: PropTypes.func.isRequired,
  wizardStore: PropTypes.object.isRequired
};

export default GetSenderAddress;
