import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

const AppFooter = () =>{
  return(
    <div style={{ textAlign: 'center' }}>
        Metallica App ©2017 Created by Prashant Kashyap. <Link to="/about">Click</Link> to know more about the app.
    </div>
  );
};

export default AppFooter;
