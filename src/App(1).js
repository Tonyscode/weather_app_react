import React from 'react';
import './App.css';
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

 class Info extends React.Component{
  render(){
    return (
      <div>
      <h2>Погода</h2>
      <p>Узнайте погоду в своем городе</p>
      </div>
      );
  }
 }


const MainPage = p =>
<div>
  Main
</div>

const AboutPage = p =>
  <div>
    About
  </div>

const Footer = p =>
  <div>
    <Link to='/sum/2/2'>2+2</Link>
  </div>

const Header = p =>
  <div>
    
    <Link to='/sum/5/5'>Прогноз погоды</Link>
  </div>

const NotFound = p =>
  <h1>
    404
  </h1>

const SumPage = p =>
{
console.log(p)
   setTimeout(() => p.history.push('/about'), 10000)
   return(
      <pre>
        {JSON.stringify(p, null, 4)}
        
        <h1> {+p.match.params.a + +p.match.params.b}</h1>
      </pre>
  )
}


function App() {
  return (
<div>

   <Router history = {createHistory()}>

    <div>
    <Header/>
   
        <Switch>
          <Route path="/" component = {MainPage} exact/>
          <Route path="/about" component = { AboutPage }  />
          <Route path="/info" component = { Info } exact
           />
          <Route path="/sum/:a/:b" component = {SumPage}  />
          <Redirect from="me" to = "/about" />
          <Route component = {NotFound} />
        </Switch>
        <Footer/>
    </div>
    
    </Router>
</div>
  );
}

export default App;
