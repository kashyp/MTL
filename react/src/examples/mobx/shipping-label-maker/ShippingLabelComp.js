import React from 'react';
import { Provider } from 'mobx-react';
import ShippingLabelMaker from './components/ShippingLabelMaker';
import ShippingLabelStore from './model/ShippingLabelStore';
import WizardStore from './model/wizard/WizardStore';
import DevTools from 'mobx-react-devtools';

const shippingStore = new ShippingLabelStore();
const wizardStore = new WizardStore(shippingStore.stepsData);

class ShippingLabelComp extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <DevTools />
        <Provider shippingStore={shippingStore} wizardStore={wizardStore}>
          <ShippingLabelMaker />
        </Provider>
      </div>
    );
  }
}

  export default ShippingLabelComp;
