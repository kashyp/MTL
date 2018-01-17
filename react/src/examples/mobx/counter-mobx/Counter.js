import React from 'react';
import { observer } from "mobx-react";
import DevTools from 'mobx-react-devtools';
import CounterModel from './CounterModel';

//Seperation of state
const appState = new CounterModel();

@observer
class Counter extends React.Component {

  handleDec = () => {
    appState.decrement();
  }

  handleInc = () => {
    appState.increment();
  }

  //@observable count = 0;
  render(){
    return(
      <div>
        <DevTools />
        Counter: {appState.count}
        <br/>
        <br/>
        <button onClick={this.handleDec}> Dec Count </button>
        <button onClick={this.handleInc}> Inc Count </button>
      </div>
    );
  }
}

export default Counter;
