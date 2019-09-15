import React from 'react';
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import MainPage from './main.js'


const Header = p =>
  
  <div class="header">
    <div class = "informer">
      <Link to='/get_weather'>Choose your town</Link>
    </div>
    <div class = "informer">
        <Link to=''>Main</Link>
    </div>
    <div class = "informer">
        <Link to='/info'>Info</Link>
    </div>
   
     
  
  </div>


const NotFound = p =>
  <h1>
    404 что-то пошло не так
  </h1>


 export default Header;
 export {NotFound, Header, MainPage};
