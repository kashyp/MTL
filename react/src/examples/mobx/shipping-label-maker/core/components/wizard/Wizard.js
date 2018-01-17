import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {browserHistory} from 'react-router';
import GetSenderAddress from './../../../components/steps/GetSenderAddress';
import GetReceiverAddress from './../../../components/steps/GetReceiverAddress';
import GetPackageWeight from './../../../components/steps/GetPackageWeight';
import { observer, inject } from "mobx-react";
import { action } from "mobx";

@inject("wizardStore") @observer
class Wizard extends React.Component{

  /**constructor(props){
    super(props);

    this.onComplete = this.onComplete.bind(this);
    this.pushData = this.pushData.bind(this);
    this.handleNavButton = this.handleNavButton.bind(this);
  }*/

  @action
  onComplete(){
    //console.log('Inside onComplete of Wizard');
    this.props.calculateShippingcost(this.props.wizardStore.wizardContext.data);
  }

  @action
  handleNavButton(step){
    //console.log('Inside handleNavButton of Wizard');
    //let data = this.state.wizardContext.data;
    //this.setState({wizardContext: {active: step, data: data}});
    this.props.wizardStore.changeActiveStep(step);
  }

  render(){
    let comp = null;

    this.props.wizardStore.steps.map(
      (stepData) =>{
        if(stepData.key === 'step1' && this.props.wizardStore.activeStep === 'step1'){
          comp = <GetSenderAddress stepData={stepData} handleNavButton={this.handleNavButton.bind(this)}/>;
        }
        if(stepData.key === 'step2' && this.props.wizardStore.activeStep === 'step2'){
          comp = <GetReceiverAddress stepData={stepData} handleNavButton={this.handleNavButton.bind(this)}/>;
        }
        if(stepData.key === 'step3' && this.props.wizardStore.activeStep === 'step3'){
          comp = <GetPackageWeight stepData={stepData} handleNavButton={this.handleNavButton.bind(this)} onComplete={this.onComplete.bind(this)}/>;
        }
      }
    );

    return(
      <div>
        {comp}
      </div>
    );
  }
}

Wizard.propTypes = {
  calculateShippingcost: PropTypes.func.isRequired,
  stepsData: PropTypes.array.isRequired
};

export default Wizard;
