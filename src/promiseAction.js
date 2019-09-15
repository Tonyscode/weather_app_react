import React from 'react';
import './App.css';
import countries from './jsons/countries.js'
import cities from './jsons/current.city.list.js'


const API_KEY = 'cbbf60308205a553ab0cd909d719762e';
const common = {
  countries: countries,
  cities: cities,

  promiseActionsMaker: function (name, promise) {
    const actionPending     = () => ({ type: 'PROMISE', name, status: 'PENDING', payload: null, error: null })
    const actionResolved    = payload => ({ type: 'PROMISE', name, status: 'RESOLVED', payload, error: null })
    const actionRejected    = error => ({ type: 'PROMISE', name, status: 'REJECTED', payload: null, error })

    function actionPromiseThunk() {
      return async dispatch => {
        dispatch(actionPending())
        let data = await promise.catch(e => dispatch(actionRejected(e)))
        dispatch(actionResolved(data))
      }
    }

    return actionPromiseThunk;
  },

  getWeatherById: function(id){
  
    let thunk1 = common.promiseActionsMaker(
        'weather', 
        fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`)
          .then(function(data) { 
            console.log('Data:', data);
            return data.json()
          })
    )
    return thunk1()
  },

 // store.dispatch(getWeatherById(5)) то же что getWeatherById(5)(store.dispatch)

  getForecastById: function(id){
  
    let thunk2 = common.promiseActionsMaker(
        'forecast', 
        fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${API_KEY}&units=metric`)
          .then(data => 
            data.json()
            )
    )
    return thunk2()
  },
  getCityName: function getCityName(id) {

    let x = cities.map(entry => {
      if (id == entry.i)
        return (entry.l || entry.n)
      }
    )
    return x.filter(el => (el !== undefined)).join('')
  }
}

export default common;
  // var forecastArray = p.payload.list
  // var contentForecast3days = [];
  // for(var i = 0; i<forecastArray.length; i++){
    
  //     for(let [key, value] of Object.entries(p.payload.list[i])){
  //       contentForecast3days.push(<tr>
  //         <td><Moment format="Dd:mm"></Moment></td>
  //         <td>p.payload.list[i].main.temp</td>
  //         <td>p.payload.list[i].main.humidity</td>
  //         <td>p.payload.list[i].weather[0].description</td>
  //         <td>p.payload.list[i].wind.speed</td>
  //         <td>p.payload.list[i].main.pressure</td>
  //       </tr>)
      
  //     }

  //   }
  // 