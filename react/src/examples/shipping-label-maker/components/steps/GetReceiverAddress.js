import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Button, Input,  Row, Col, Icon  } from 'antd';
import { validateAddress } from './../../utils/Utils';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;

class GetReceiverAddress extends React.Component{

  constructor(props){
    super(props);
    let initVal = this.getData();
    this.state = {
      receiverAdd: {
        value: initVal ? initVal : ''
      },
      next: props.stepData.next,
      previous: props.stepData.previous
    };

    this.handleAddress = this.handleAddress.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.getData= this.getData.bind(this);
  }

  handleAddress(event){
    this.setState({
        receiverAdd: {
          value: event.target.value
        }
    });
  }

  handleNext(e){
    let currentVal = this.state.receiverAdd.value;
    let validateRes = validateAddress(currentVal, 'receiver\'s');
    this.setState({
        receiverAdd: {
        value: currentVal,
        validateStatus: validateRes.validateStatus,
        errorMsg: validateRes.errorMsg
      }
    });
    if(validateRes.validateStatus==='success'){
      this.props.pushData('recAdd', this.state.receiverAdd.value);
      this.props.handleNavButton(this.state.next);
    }
  }

  handlePrevious(e){
    this.props.pushData('recAdd', this.state.receiverAdd.value);
    this.props.handleNavButton(this.state.previous);
  }

  getData(){
    let value = '';
    let data = this.props.data;
    if(data){
      value = data.get('recAdd');
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
            validateStatus={this.state.receiverAdd.validateStatus}
            help={this.state.receiverAdd.errorMsg}
          >
            <fieldset>
              <legend>{this.props.stepData.title}</legend>
              <Input addonBefore="Enter Address" onChange={this.handleAddress} value={this.state.receiverAdd.value}/>
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
  pushData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default GetReceiverAddress;
