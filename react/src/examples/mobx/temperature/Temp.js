import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
class Temp extends React.Component {
  @observable newUnit = "";

  handleInputChange = e => {
    this.newUnit = e.target.value;
    //this.props.temperature.unit = this.newUnit;
    this.props.temperature.setUnit(this.newUnit);
  };

  render(){
    return(
      <div>
        Input Unit:
        <input type="text" value={this.unit} onChange={this.handleInputChange} />
          <br />
        Temperature {this.props.temperature.temp}
      </div>
    );
  }
}

export default Temp;
