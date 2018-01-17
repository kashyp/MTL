import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, InputNumber, Row, Col, Icon } from 'antd';
const ButtonGroup = Button.Group;

class GetPackageWeight extends React.Component{

  constructor(props){
    super(props);
    let initVal = this.getData();
    this.state = {
      packageWt: initVal ? initVal : 0,
      next: props.stepData.next,
      previous: props.stepData.previous
    };

    this.handleWeight = this.handleWeight.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.getData = this.getData.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handlePrint(e){
    this.props.pushData('weight', this.state.packageWt);
    this.props.onComplete();
  }

  handleWeight(value){
    this.setState({packageWt: value});
  }

  handlePrevious(e){
    this.props.pushData('weight', this.state.packageWt);
    this.props.handleNavButton(this.state.previous);
  }

  getData(){
    let value = '';
    let data = this.props.data;
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
              <InputNumber addonBefore="Enter weight" onChange={this.handleWeight} defaultValue={this.state.packageWt}/>
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
  pushData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default GetPackageWeight;
