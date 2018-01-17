import { observable, action, computed } from "mobx";

/**
const t = observable({
  unit: "C",
  tempC: 25,
  tempF: function () {
    console.log('calculating temp in F');
    return this.tempC * (9/5) + 32;
  },
  tempK: function() {
    console.log('calculating temp in K');
    return this.tempC + 273.15;
  },
  temp: function() {
    console.log('calculating temp');
    switch(this.unit) {
      case "K": return this.tempK + 'K';
      case "C": return this.tempC + 'C';
      case "F": return this.tempF + 'F';
    }
  }
});

export default TempModel; */

export default class TempModel{

  id = Math.random();
  //Observable properties in state
  @observable unit = "C";
  @observable tempC = 25;

  get unit(){
    return this.unit;
  }

  @action
  setUnit(input){
    this.unit = input;
  }

  //Computed values which are like state properties only
  //@computed
  get tempF (){
    console.log('calculating temp in F');
    return this.tempC * (9/5) + 32;
  }

  //@computed
  get tempK (){
    console.log('calculating temp in K');
    return this.tempC + 273.15;
  }

  @computed
  get temp (){
    console.log('calculating temp');
    switch(this.unit) {
      case "K": return this.tempK + 'K';
      case "C": return this.tempC + 'C';
      case "F": return this.tempF + 'F';
    }
  }
}
