import React from 'react';
import './App.css';
import Moment from 'react-moment';
import {BrowserRouter, Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import {Provider, connect} from 'react-redux';
import store from './store'
import Weather from './components/weather'
import Footer from './components/footer'
import Info from './components/info'
import AboutPage from './components/about'
import 'bootstrap/dist/css/bootstrap.css';
import common from './promiseAction'
import {Header, NotFound, Favorites, MainPage} from './components/header.js'
import Forecast3D from './components/forecast3d'
import {JsonPokazometerConnected1, JsonPokazometer1} from './components/forecast3d.js'




function App() {
  return (
<div>
  <Provider store={store}>
   <BrowserRouter history = {createHistory()}>
    <div>
      <Header/>
        <Switch>
          <Route path="/" component = {MainPage} exact/>
          <Route path="/info" component = {Info} exact />
          <Route path="/get_weather" component = {Weather} />         
          <Redirect from="me" to = "/about" />
          <Route path="/forecast/:id(\d+)" component= {Forecast3D} />
          <Route component = {NotFound} />
        </Switch>
    </div>
   </BrowserRouter>
  </Provider>
</div>
  );
}
//<Route path="/sum/:a/:b" component = {SumPage}  />
export default App;
//  <JsonPokazometerConnected />
//
