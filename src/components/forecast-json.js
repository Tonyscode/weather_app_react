import React from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import store from '../store'
import common from '../promiseAction'


let ForecastOutput = p => {
  console.log('ForecastOutput options =', p)
  if (!p || !p.payload)
    return null;
  if (!p.payload.list)
    return (<div class="error">Error: {p.payload.message}</div>);
  
  var dt1 = new Date(p.payload.list[0].dt*1000);
   const countryNameLoad = common.countries.map(entry => entry.code == p.payload.city.country ? <span> {entry.name}</span> : "")
  //
  var forecastArray = p.payload.list
  var contentForecast3days = [];
   var dt_last = '';
              contentForecast3days.push(
                <tr class="">
                  <th>Time</th>
                  <th>Temp</th>
                  <th>Press</th>
                  <th>Humidity</th>
                  <th>Clouds</th>
                  <th>Wind</th>
                  
                </tr>
              )
  for(var i = 0; i<forecastArray.length-16; i++){
    //
      var dt1 = new Date(p.payload.list[i].dt*1000);
      var temp = Math.round(p.payload.list[i].main.temp);
      var windSpeed=Math.round(p.payload.list[i].wind.speed);
      var pressure = Math.round(((p.payload.list[i].main.pressure)/1.333).toFixed(1));
      let icon = "//openweathermap.org/img/wn/"+ p.payload.list[i].weather[0].icon +"@2x.png" ;
      let dt = dt1.getDate()+'-'+dt1.getMonth()+'-'+dt1.getFullYear();
      if (dt != dt_last) {
          contentForecast3days.push(
              <tr>
                  <td colspan="6" class="fc_date"><Moment format="DD-MMM-YYYY">{dt1}</Moment></td>
              </tr>
           )
      }
      //
      dt_last = dt;

      contentForecast3days.push(
                  <tr >
                      <td><Moment format="H:mm">{dt1}</Moment></td>
                      <td>{temp} °C</td>
                      <td>{pressure} mm </td>
                      <td>{p.payload.list[i].main.humidity} %</td>
                      <td>{p.payload.list[i].weather[0].description} <img alt={p.payload.list[i].weather[0].description} src={icon} width="50" height="50" padding="0" /></td>
                      <td>{windSpeed} m/s </td>
                  </tr>
      )
    }
  //
  return (
    <div class="commonData">
      <div class="table_head">
        <span><i className="fas fa-chart-bar"></i>Forecast in {p.payload.city.name}, {countryNameLoad} </span>
      </div>
      <div></div>
      <table className="table-striped table-hover table-bordered">
        <tbody>
          {contentForecast3days}          
        </tbody>
      </table>
      
     
    </div> 
  )
}

let Preloader1 = p =>
  p && p.status === 'PENDING' ? <img style={{maxWidth: '80px'}} src='https://i.giphy.com/media/11FuEnXyGsXFba/source.gif' /> : <div>none</div>

//
ForecastOutput = connect(st => (st.forecast || {}))(ForecastOutput)
let Thunk1Preloader1 = connect(st => ({status: (st.forecast ? st.forecast.status : '')}))(Preloader1)
let ForecastOutputWithLoading1 = p =>
  p.status === 'RESOLVED' ?  <ForecastOutput /> : <Thunk1Preloader1 /> 

const ForecastOutputConnected = connect(st => {
    return st.forecast || {}
  }
)(ForecastOutputWithLoading1)

export default ForecastOutputConnected;