import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TemperatureInput from './TemperatureInput';
import BoilingVerdict from './BoilingVerdict';

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.toCelsius = this.toCelsius.bind(this);
    this.toFahrenheit = this.toFahrenheit.bind(this);
    this.tryConvert = this.tryConvert.bind(this);

    this.state = {
      temperature: 0,
      scale: 'c'
    };
  }

  toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded;
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = (scale === 'f') ? this.tryConvert(temperature, this.toCelsius) : temperature;
    const fahrenheit = (scale === 'c') ? this.tryConvert(temperature, this.toFahrenheit) : temperature;

    return (
      <div>
        <p>Example showing the lifting of state from TemperatureInput component to Calculator. </p>
        <p>This is needed to better manage the state of the input temperature and so that Calculator which is the source, distributes and calculates the temp acc. </p>
        <br/>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <br/>
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
          <br/>
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

Calculator.propTypes = {
  celsius: PropTypes.number
};

export default Calculator;
