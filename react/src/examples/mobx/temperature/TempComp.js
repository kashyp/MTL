import React from 'react';
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import DevTools from 'mobx-react-devtools';
import Temp from './Temp';
import TempModel from './TempModel';

const temperature = new TempModel();

//const temps = observable([]);
//temps.push(new TempModel());

const TempComp = (props) => {

    return(
      <div>
        <DevTools />
          <Temp temperature={temperature} />

        {
          //<Temp temperatures={temps} />
        }
      </div>
    );
}

export default TempComp;
