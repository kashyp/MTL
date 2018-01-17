import React from 'react';
import PropTypes from 'prop-types';

class AddCourse extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      duration: '',
      books: []
    }

    this.handleName = this.handleName.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.handleBooks = this.handleBooks.bind(this);
    this.addCourse = this.addCourse.bind(this);
  }

  //Demonstrating ref on an input element. This is focussing on Name input below.
  //The callback function for ref is called before unmounting with null and when mounting is done.
  //Ref can not be used inside a functional (stateless) component as it doesn't extends React.Component
  componentDidMount() {
    if(this.textInput){
      this.textInput.focus();
    }
  }

  handleName(e){
    this.setState({name: e.target.value});
  }

  handleDuration(e){
    this.setState({duration: e.target.value});
  }

  handleBooks(e){
    this.setState({books: e.target.value});
  }

  addCourse(e){
    let newCourse = {
      name: this.state.name,
      duration: this.state.duration,
      books: [this.state.books]
    };

    this.props.addCourse(newCourse);

    this.setState({
      name: '',
      duration: '',
      books: []
    });
  }

  render(){
    return(
      <div>
        <div className="form-group">
          <label htmlFor="name">Course Name: </label>
          {/**
           * Using ref here below to reference the input textbox here. The reference this.textInput can then be used later to focus this element
           */}
          <input ref={(input) => {this.textInput = input;}} id="name" className="form-control" onChange={this.handleName} value={this.state.name} />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration: </label>
          <input id="duration" className="form-control" onChange={this.handleDuration} value={this.state.duration} />
        </div>

        <div className="form-group">
          <label htmlFor="books">Books: </label>
          <input id="books" className="form-control" onChange={this.handleBooks} value={this.state.books} />
        </div>

        <div className="btn-grp">
          <button type="button" className="btn btn-primary" onClick={this.addCourse}>Add a new Course</button>
          {/**
           * Using ref here below to execute the callback provided by parent through inputRef. Basically assign the reference to this button to parent comp.
           * This works with functional components as well.
          */}

          <button type="button" ref={this.props.inputRef} className="btn btn-secondary" onClick={this.props.removeCourse}>Remove Course</button>
        </div>
      </div>
    );
  }

}
AddCourse.prototypes ={
  addCourse : PropTypes.func.isRequired,
  removeCourse : PropTypes.func.isRequired,
  inputRef : PropTypes.func.isRequired
}

export default AddCourse;
