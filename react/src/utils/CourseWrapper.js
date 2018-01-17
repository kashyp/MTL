import React from 'react';
import {render} from 'react-dom';

const cut = 35;
//Higher order component demo which add firm's price to the course
let CourseWrapper = (Component, price) => class extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.setState(
      {price: (cut + price)}
    );
  }

  render(){
    return(
      <Component {...this.props} {...this.state}/>
    );
  }
};

CourseWrapper.defaultProps = {
  price: 0
};

export default CourseWrapper;
