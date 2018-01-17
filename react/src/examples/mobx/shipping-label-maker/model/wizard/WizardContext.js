import { observable, action, useStrict } from 'mobx';

useStrict(true);

export default class WizardContext{

  @observable data = new Map();
  @observable active = 'step1';

  @action
  markStepActive(step){
    this.active = step;
  }

  @action
  setData(key, value){
    this.data.set(key, value);
  }
}
