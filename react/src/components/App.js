import React from 'react';
import AppHeader from './common/Header';
import AppFooter from './common/Footer';
import AppSider from './common/Sider';
import PropTypes from 'prop-types';
import TradeStore from './../model/trades/TradeStore';
import TransportStore from './../model/transport/TransportStore';
import TransferStore from './../model/transfers/TransferStore';
import { Provider } from 'mobx-react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const tradesStore = new TradeStore();
const transStore = new TransportStore(tradesStore);
const transferStore = new TransferStore(tradesStore, transStore);

class App extends React.Component{
  render(){
    return (
      <Layout>
        <Header className="header">
          <AppHeader />
        </Header>
        <Layout>
          {/**<Sider><AppSider /></Sider>**/}
          <Provider tradesStore={tradesStore} transStore={transStore} transferStore={transferStore}>
          <Content style={{ padding: '0 50px' }}>
          {/**background: '#fff', padding: 24,*/}
            <div style={{ minHeight: 280, paddingTop: '10px' }}>
              {this.props.children}
            </div>
          </Content>
          </Provider>
        </Layout>
        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
