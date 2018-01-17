import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import TradesView from './components/core/trades/TradesView';
import TransfersView from './components/core/transfers/TransfersView';
import TransportsView from './components/core/transports/TransportsView';
import AboutPage from './components/about/AboutPage';
import CoursePage from './examples/courses/CoursePage';
import Calculator from './examples/lifting-state/LiftingStateEx';
import ShippingLabelMaker from './examples/shipping-label-maker/components/ShippingLabelMaker';
import GetSenderAddress from './examples/shipping-label-maker/components/steps/GetSenderAddress';
import GetReceiverAddress from './examples/shipping-label-maker/components/steps/GetReceiverAddress';
import GetPackageWeight from './examples/shipping-label-maker/components/steps/GetPackageWeight';
import Counter from './examples/mobx/counter-mobx/Counter';
import TodoComp from './examples/mobx/todo/TodoComp';
import TempComp from './examples/mobx/temperature/TempComp';
import ShippingLabelComp from './examples/mobx/shipping-label-maker/ShippingLabelComp';

export default (
  <Route path="/" component={App}>
    {/* <IndexRoute component={HomePage} /> */}
    <IndexRoute component={TradesView} />
    <Route path="courses" component={CoursePage} />
    <Route path="trades" component={TradesView} />
    <Route path="transfers" component={TransfersView} />
    <Route path="transports" component={TransportsView} />
    <Route path="about" component={AboutPage} />
    <Route path="lifting-state" component={Calculator} />
    <Route path="shipping-label" component={ShippingLabelMaker} />
    <Route path="counter-mobx" component={Counter} />
    <Route path="todo-mobx" component={TodoComp} />
    <Route path="temp-mobx" component={TempComp} />
    <Route path="shipping-label-mobx" component={ShippingLabelComp} />
  </Route>
);
