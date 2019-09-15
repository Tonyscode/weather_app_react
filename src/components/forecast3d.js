import React from 'react';
import store from '../store'
import Moment from 'react-moment';
import common from '../promiseAction'
import WeatherOutputConnected from './weather-json.js'
import ForecastOutputConnected from './forecast-json.js'
import Weather from './weather.js'
import FavoriteTownList from './localstorage.js'


class Forecast3D extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      countrySelect: '',
      townSelect: props.match.params.id || '',
      favorits: []
    }
    this.getCity = getCity.bind(this);
    this.changeCity = changeCity.bind(this);

    this.addToLocalStore = addToLocalStore.bind(this)
    this.changeCityHandler = this.changeCity.bind(this)
    //this.getFavorit = getFavorit.bind(this)


  }

  componentDidMount() {
    if (this.state.townSelect != ''){
      this.loadWeather()
    }
  }

  loadWeather() {
    console.log("state townSelect", this.state.townSelect);
    store.dispatch(common.getForecastById(this.state.townSelect));
    store.dispatch(common.getWeatherById(this.state.townSelect));
  }
  changeCity() {
    let path = '/forecast/'+this.state.townSelect;
    console.log("state townSelect", this.state.townSelect, path);
    this.props.history.push(path)
  }

  render(){
    //console.log('--', this.props)
    const options = common.countries.map(entry =>
      <option value={entry.code}> {entry.name}</option>
    )
//
  let towns=[];
    const townOptions = common.cities.map(entry => {
      if (this.state.countrySelect != ''
        && this.state.countrySelect == entry.c
      )
        return (<option value={entry.i}> {entry.n}</option>)
    }
    )
 //
    return (
      <div class="weather_output">       
        <WeatherOutputConnected />
        <ForecastOutputConnected />
      </div> 
    )
  }
}
 //

// class FavoriteTown1 extends React.Component{
//   constructor(props){
//     super(props)
//     this.loadWeather = this.loadWeather.bind(this)
//   }

//   loadWeather(e) {
//     store.dispatch(common.getForecastById(this.props.id))
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
// class FavoriteTownList1 extends React.Component{
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
//     const favTownsArray = favTowns.map(el => <FavoriteTown1 id={el} remove={this.remove}/>);

//     return (
//       <div id='favTownsList'>
//         <ul>{favTownsArray}</ul>      
//       </div>
//     );
//   }
// }
//

function getCity(e){ 
  this.setState({countrySelect: e.target.value})
 // console.log("-getCity-e",e)
}

function changeCity(e){
  this.setState({townSelect: e.target.value })
  const {townSelect, favorits} = this.state;
}

// function getCityName(id) {

//   let x = common.cities.map(entry => {
//     if (id == entry.i)
//         return (entry.l || entry.n)
//     }
//   )
//   return x.filter(el => (el !== undefined)).join('')
// }
 
function addToLocalStore(e) {
  //e.preventDefault(); e.stopPropagation();
  if (this.state.townSelect !== '' ) {
    const { townSelect} = this.state;
    let favorits = localStorage.getItem('favorits');
    favorits = (favorits.length > 0 ? favorits.split(',') : []) 
    localStorage.setItem('townSelect',townSelect)
    if (favorits.indexOf(this.state.townSelect) == -1) {
      favorits.push(this.state.townSelect)
    }
    this.setState({favorits: favorits})
    localStorage.setItem('favorits', favorits);
  }
}
export default Forecast3D;
