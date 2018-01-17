import { observable, action, useStrict, computed } from 'mobx';
import WizardContext from './WizardContext';

useStrict(true);

export default class WizardStore {
  @observable.ref title;
  @observable wizardContext;
  @observable.ref steps;

  constructor(steps){
    this.title = 'Shipping Label Wizard';
    this.wizardContext = new WizardContext();
    this.steps = steps;
  }

  @computed get activeStep(){
    return this.wizardContext.active;
  }

  @action
  pushData(key, value){
    this.wizardContext.setData(key, value);
  }

  @action
  changeActiveStep(step){
    this.wizardContext.markStepActive(step);
  }
}
