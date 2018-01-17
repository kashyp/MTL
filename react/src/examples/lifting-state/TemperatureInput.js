import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber } from 'antd';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <Input value={temperature} onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

TemperatureInput.propTypes = {
  scale: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  onTemperatureChange: PropTypes.func.isRequired
};

export default TemperatureInput;
