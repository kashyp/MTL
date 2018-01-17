import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {browserHistory} from 'react-router';
import GetSenderAddress from './../../../components/steps/GetSenderAddress';
import GetReceiverAddress from './../../../components/steps/GetReceiverAddress';
import GetPackageWeight from './../../../components/steps/GetPackageWeight';

class Wizard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      title: 'Shipping Label Wizard',
      wizardContext: {
        data: new Map(),
        active: 'step1'
      },
      steps: this.props.stepsData
    };

    this.onComplete = this.onComplete.bind(this);
    this.pushData = this.pushData.bind(this);
    this.handleNavButton = this.handleNavButton.bind(this);
  }

  onComplete(){
    //console.log('Inside onComplete of Wizard');
    this.props.calculateShippingcost(this.state.wizardContext.data);
  }

  pushData(key, value){
    //console.log('Inside pushData of Wizard');
    this.state.wizardContext.data.set(key, value);
  }

  handleNavButton(step){
    //console.log('Inside handleNavButton of Wizard');
    let data = this.state.wizardContext.data;
    this.setState({wizardContext: {active: step, data: data}});
  }

  render(){
    let comp = null;

    this.state.steps.map(
      (stepData) =>{
        if(stepData.key === 'step1' && this.state.wizardContext.active === 'step1'){
          comp = <GetSenderAddress stepData={stepData} pushData={this.pushData} handleNavButton={this.handleNavButton} data={this.state.wizardContext.data}/>;
        }
        if(stepData.key === 'step2' && this.state.wizardContext.active === 'step2'){
          comp = <GetReceiverAddress stepData={stepData} pushData={this.pushData} handleNavButton={this.handleNavButton} data={this.state.wizardContext.data}/>;
        }
        if(stepData.key === 'step3' && this.state.wizardContext.active === 'step3'){
          comp = <GetPackageWeight stepData={stepData} pushData={this.pushData} handleNavButton={this.handleNavButton} data={this.state.wizardContext.data} onComplete={this.onComplete}/>;
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
