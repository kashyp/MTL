import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, InputNumber, Row, Col, Icon } from 'antd';
import { observer, inject } from "mobx-react";
import { observable, action, computed } from "mobx";
const ButtonGroup = Button.Group;

@inject("wizardStore") @observer
class GetPackageWeight extends React.Component{

  constructor(props){
    super(props);

    this.handleWeight = this.handleWeight.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  @observable packageWt = this.initVal();

  @action
  handlePrint(e){
    this.props.wizardStore.pushData('weight', this.packageWt);
    this.props.onComplete();
  }

  @action
  handleWeight(value){
    this.packageWt = value;
  }

  @computed get previous(){
    return this.props.stepData.previous;
  }

  @action
  handlePrevious(e){
    this.props.wizardStore.pushData('weight', this.value);
    this.props.handleNavButton(this.previous);
  }

  initVal(){
    let value = '';
    let data = this.props.wizardStore.wizardContext.data;
    if(data){
      value = data.get('weight');
    }
    return value;
  }

  render(){
    return(
      <div>
        <br/>
        <Row>
          <Col span={8}>
            <fieldset>
              <legend>{this.props.stepData.title}</legend>
              <InputNumber addonBefore="Enter weight" onChange={this.handleWeight} defaultValue={this.packageWt}/>
            </fieldset>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col span={8}>
            <ButtonGroup>
              <Button type="primary" onClick={this.handlePrevious}>
                <Icon type="left" />Previous
              </Button>
              <Button type="primary" onClick={this.handlePrint}>
                <Icon type="export" />Print
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

GetPackageWeight.propTypes = {
  stepData: PropTypes.object.isRequired,
  handleNavButton: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  wizardStore: PropTypes.object.isRequired
};

export default GetPackageWeight;
