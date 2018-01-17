import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu, Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

//Presentation/Dumb/Stateless Component
const AppHeader = ({ firstName='Prashant', lastName='Kashyap', loggedId=true }) => {
  return (
    <div>
      {/* <IndexLink to="/">
        <div className="logo" />
      </IndexLink> */}
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          {loggedId && <Link to="/trades">TRADES</Link>}
        </Menu.Item>
        <Menu.Item key="2">
          {loggedId && <Link to="/transfers">TRANSFERS</Link>}
        </Menu.Item>
        <Menu.Item key="3">
          {loggedId && <Link to="/transports">TRANSPORTS</Link>}
        </Menu.Item>
        {<SubMenu title={<span><Icon type="caret-down" />Examples</span>}>
          <MenuItemGroup title="React">
            <Menu.Item key="setting:1">
              <Link to="/lifting-state">Lifting State</Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
            <Link to="/shipping-label">Shipping Label Gen</Link>
            </Menu.Item>
            <Menu.Item key="setting:3">
              <Link to="/courses">Pluralsight Admin</Link>
            </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="MobX">
            <Menu.Item key="setting:21">
              <Link to="/counter-mobx">Counter</Link>
            </Menu.Item>
            <Menu.Item key="setting:22">
              <Link to="/temp-mobx">Temperature</Link>
            </Menu.Item>
            <Menu.Item key="setting:23">
              <Link to="/todo-mobx">ToDo</Link>
            </Menu.Item>
            <Menu.Item key="setting:33">
              <Link to="/shipping-label-mobx">Shipping Label Maker</Link>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>}
        <Menu.Item key="6" style={{ float: 'right' }}>
          <div>
            <span>
              <Avatar shape="circle" style={{ backgroundColor: '#87d068', marginTop: '16px' }} icon="user" />
            </span>
          </div>
        </Menu.Item>
        <Menu.Item key="5" style={{ float: 'right' }}>
          <div>
            <span style={{ fontStyle: 'italic' }}>
              {lastName}, {firstName}
            </span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
};

AppHeader.prototypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  loggedId: PropTypes.bool.isRequired
};

export default AppHeader;
