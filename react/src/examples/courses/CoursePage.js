import React from 'react';
import CourseDetail from './CourseDetail';
import CourseWrapper from './../../utils/CourseWrapper';
import AddCourse from './AddCourse';
import {getCourses} from './../../utils/DataService';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Courses extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      courses: []
    };
    //bind instance methods
    this.addCourse = this.addCourse.bind(this);
    this.removeCourse = this.removeCourse.bind(this);
  }

  componentDidMount(){
    getCourses().then(courses =>{
      this.setState({courses: courses});
    })
  }

  //Demonstrating 2 things:
  //1. setState takes an optional second argument as a callback function which gets triggered asynchronously after the setState request is picked in the queue
  //2. Highlighting child components button - Rare case when parent wants to access/change child component vioating 1 way data flow. inputref sent in the props
  //   gets a reference of the child element in this.childDelButton.
  addCourse(course){
    this.setState(
      { courses: this.state.courses.concat(course)}, () =>{
        if(this.childDelButton){
          this.childDelButton.focus();
        }
      });
  }

  removeCourse(event){
    this.state.courses.pop();
    this.setState(
      {courses: this.state.courses}
    );
  }

  render(){
    let courses = null;
    if(this.state.courses){
      courses = this.state.courses.map(course => {
        let WrappedCourse = CourseWrapper(CourseDetail, course.price);
        return(
          <WrappedCourse data={course}/>
        );
      });
    }

    return(
      <div>
        <h1>Courses Page</h1>
        <br/>
        {courses}
        <br/>
        <AddCourse addCourse={this.addCourse} removeCourse={this.removeCourse} inputRef={el => this.childDelButton = el}/>
      </div>
    );
  }
}

export default Courses;
