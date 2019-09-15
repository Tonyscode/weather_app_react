import React from 'react';
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import store from '../store'
import common from '../promiseAction'
import WeatherOutputConnected from './weather-json.js'
import FavoriteTownList from './localstorage.js'

class Weather extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      countrySelect: '',
      townSelect: '',
      rememberMe: false,
      favorits: []
    }
    this.getCity = getCity.bind(this);
    this.changeCity = changeCity.bind(this);
    this.handleChange = handleChange.bind(this);
    this.addToLocalStore = addToLocalStore.bind(this)
    this.loadWeatherHandler = this.loadWeather.bind(this)
    //this.getFavorit = getFavorit.bind(this)
  }

  loadWeather() {
    let path = '/forecast/'+this.state.townSelect;
    console.log("state townSelect", this.state.townSelect, path);
    //
    this.props.history.push(path)
    //return (<Redirect push to={{pathname: path}} />)
	//store.dispatch(common.getWeatherById(this.state.townSelect));
	//store.dispatch(common.getForecastById(this.state.townSelect));
  }

  render(){
    //console.log('--', this.props)
    const options = common.countries.map(entry =>
      <option value={entry.code}> {entry.name}</option>
    )
//
	
    const townOptions = common.cities.map(entry => {
      if (this.state.countrySelect != ''
        && this.state.countrySelect == entry.c
      )
        return (<option value={entry.i}> {entry.n}</option>)
    }
    )
	//	
    return (
      <div class="commonData">
        <div class="countrySelect">
          <label for="country">Страна:</label>
          <select id='country' onChange={this.getCity}>
            <option value=""> </option>
            {options}
          </select>
        </div>
        <div class="townSelect">
          <label for="towns">Город:</label>
          <select id='citySelect' onChange={this.changeCity}>
            <option value=""> </option>
            {townOptions}
          </select>
         <div> 
         <button onClick={this.loadWeatherHandler}>Загрузить погоду</button>
         </div>
        </div> 
        <div class="addBox">
          <input id="rememberme" name="rememberme" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/>
          <span class="marg">
          <label for="rememberme" class="addBox">
            Добавить в избранные
          </label>
          </span>
          <button className="btn btn-outline-warning btn-sm" onClick={this.addToLocalStore}>Добавить</button>
        </div>
		    <FavoriteTownList history={this.props.history} />
        
      </div> 
    )
  }
}


function getCity(e){
  //console.log("getcity", e)	
  this.setState({countrySelect: e.target.value})
  console.log("-getCity-e",e)
}

function changeCity(e){
  this.setState({townSelect: e.target.value })
  const { rememberMe, townSelect, favorits} = this.state;
}

function addToLocalStore(e) {
  //e.preventDefault(); e.stopPropagation();
  if (this.state.rememberMe == true && this.state.townSelect !== '' ) {
    const { rememberMe, townSelect} = this.state;
    let favorits = localStorage.getItem('favorits');
    favorits = (favorits.length > 0 ? favorits.split(',') : []) 	
    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('townSelect', rememberMe ? townSelect :'')
    if (favorits.indexOf(this.state.townSelect) == -1) {
      favorits.push(this.state.townSelect)
    }
    this.setState({favorits: favorits})
    localStorage.setItem('favorits', favorits);
  }
}

function handleChange(e) {

  this.setState({rememberMe: !this.state.rememberMe})
  console.log(this.state.rememberMe)
}
 //

// class FavoriteTown extends React.Component{
//   constructor(props){
//     super(props)
//     this.loadWeather = this.loadWeather.bind(this)
//   }

//   loadWeather(e) {
//     store.dispatch(common.getWeatherById(this.props.id))
//     //store.dispatch(common.getForecastById(this.props.id))
//   }

//   render(){
//     const {id} = this.props;
//     const name = getCityName(id);
//     return (
//       <li>
//         <span onClick={this.loadWeather}>{name}</span>
//         <button className="btn btn-outline-warning btn-sm" onClick={()=> this.props.remove(id)}>X</button>
//       </li>
//     );
//   }
// }
// //
// class FavoriteTownList extends React.Component{
//   constructor(props){
//     super(props)
//     this.remove = this.remove.bind(this)
//   }
  
//   remove(id) {
//     var x = localStorage.favorits.split(',').filter(item => item != id);
//     localStorage.setItem('favorits', x)
//     this.setState({})
//     console.log("x", x)
//   }

//   render() {
//     let favTowns = localStorage.getItem("favorits") || '';
//     favTowns = (favTowns.length >0 ? favTowns.split(',') : []);
//     const favTownsArray = favTowns.map(el => <FavoriteTown id={el} remove={this.remove}/>);

//     return (
//       <div>
//         <ul id='FT'>{favTownsArray}</ul>      
//       </div>
//     );
//   }
// }
// //
export default Weather;

