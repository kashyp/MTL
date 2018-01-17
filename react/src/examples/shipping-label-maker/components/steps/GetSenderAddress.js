import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Button, Input,  Row, Col, Icon } from 'antd';
import { validateAddress } from './../../utils/Utils';

const FormItem = Form.Item;

class GetSenderAddress extends React.Component{

  constructor(props){
    super(props);
    let initVal = this.getData();
    this.state = {
      senderAdd: {
        value: initVal ? initVal : ''
      },
      next: props.stepData.next,
      previous: props.stepData.previous
    };
    this.handleAddress = this.handleAddress.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleAddress(event){
    this.setState({
      senderAdd: {
        value: event.target.value
      }
    });
  }

  handleNext(e){
    let currentVal = this.state.senderAdd.value;
    let validateRes = validateAddress(currentVal, 'sender\'s');
    this.setState({
      senderAdd: {
        value: currentVal,
        validateStatus: validateRes.validateStatus,
        errorMsg: validateRes.errorMsg
      }
    });
    if(validateRes.validateStatus==='success'){
      this.props.pushData('senderAdd', this.state.senderAdd.value);
      this.props.handleNavButton(this.state.next);
    }
  }

  getData(){
    let value = '';
    let data = this.props.data;
    if(data){
      value = data.get('senderAdd');
    }
    return value;
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
            validateStatus={this.state.senderAdd.validateStatus}
            help={this.state.senderAdd.errorMsg}
          >
            <fieldset>
              <legend>{this.props.stepData.title}</legend>
              <Input addonBefore="Enter Address" onChange={this.handleAddress} value={this.state.senderAdd.value}/>
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
  pushData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default GetSenderAddress;
