import React from 'react';
import PropTypes from 'prop-types';

//Stateless component
const CourseDetail = props =>{
  {/**
  * {name: 'Maths', duration: '6 months', books: ['mbook1','mbook2','mbook3'], price: 150},
  */}

  let books = props.data.books.map((book, index) =>{
    return <li>{index + 1} - {book}</li>;
  });

  return(
  <div>
    <section>
      <h3>{props.data.name} Course</h3>
      <h5>Duration : {props.data.duration}</h5>
      {
        //Higher Order Component sending price after calculations
      }
      <h5>Price : {props.price} USD</h5>
      Books to read:<br/>
      <ul>
        {books}
      </ul>
    </section>
    </div>
  );
};

CourseDetail.propTypes = {
  data: PropTypes.object.isRequired,
  price: PropTypes.object
};

export default CourseDetail;
