import React from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import store from '../store'
import common from '../promiseAction'
import { Sparklines, SparklinesBars  } from 'react-sparklines';

let JsonPokazometer = p => {
  console.log('JsonPokazometer options =', p)
  if (!p || !p.payload)
    return null;
  if (!p.payload.sys)
    return (<div class="error">Error: {p.payload.message}</div>);
  
  var dt2 = new Date(p.payload.sys.sunset*1000);
  var dt1 = new Date(p.payload.sys.sunrise*1000);
  let currDate = new Date(p.payload.dt*1000);
  //var date = <div>{dt.getHours()}:{dt.getMinutes()}</div>
   var wind = p.payload.wind.deg;
   var windRoute = '';


  switch (true){
    case (338 < wind && wind< 360 || 0 < wind && wind <= 22):
        windRoute = "North";
        break;
    case (293 < wind && wind <=338):
        windRoute = "North-west";
        break;
    case  (wind <=293 && 248 < wind):
        windRoute = "West";
        break;
    case 203 < wind && wind<=248:
        windRoute = "South-west";
        break;
    case 158 < wind && wind<=203:
        windRoute = "South";
        break;
    case 113 < wind && wind<=158:
        windRoute = "South-east";
        break;
    case 68 < wind && wind<=113:
        windRoute = "East";
        break;
    case 23 < wind && wind<=68:
        windRoute = "North-east";
        
}

  const countryName = common.countries.map(entry => entry.code == p.payload.sys.country ? <span> {entry.name}</span> : ""
    )
//
  // let content = []
  //console.log('JsonViewer options =', p)
  // for (let [key, value] of Object.entries(p.payload)){
   
    // if(typeof value !== 'object'){
    //   content.push(<tr><td>{key}</td><td>{value}</td></tr>)
    // }
    // // else {
    //   content.push(<tr><td>{key}</td><td>{JSON.stringify(value)}</td></tr>)
    // }

    // console.log('value=', value, "key=", key)
  // }

  let icon = "//openweathermap.org/img/wn/"+p.payload.weather[0].icon+"@2x.png" ;
  var temp1 = Math.round(p.payload.main.temp);
  var press = Math.round(((p.payload.main.pressure)/1.333).toFixed(1));
  //
  return (

    <div class="commonData">
    
    <div>

      <table className="table-striped">
         <td colspan="2">
         <div class="table_head">
          <span><i className="fas fa-chart-bar"></i>Current weather in {p.payload.name}, {p.payload.sys.country}</span>
        </div>
        </td>
        <tbody>
        <tr class="currTime">
          <td colspan="2"><Moment format="H:mm DD-MMM-YYYY">{currDate}</Moment>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="fc_date">
              {temp1} °C <img alt={p.payload.weather[0].description} src={icon} width="80" height="80" />
          </td>
        </tr>    
          <tr>
            <td>Humidity</td>
            <td>{p.payload.main["humidity"]} %</td>
          </tr>         
          <tr>
            <td>Wind</td>
            <td>{p.payload.wind.speed} m/s, {windRoute} ({p.payload.wind.deg} deg) </td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>{press}  mm</td>
          </tr>
          <tr>
            <td>Sunrise</td>
            <td><Moment format="H:mm">{dt1}</Moment></td>
          </tr>
          <tr>
            <td>Sunset</td>
            <td>{dt2.getHours()}:{dt2.getMinutes()}</td>
          </tr>
          
        </tbody>
      </table> 
    </div>  
    
    </div>  
  )
}

let Preloader = p =>
  p && p.status === 'PENDING' ? <img style={{maxWidth: '100px'}} src='https://i.giphy.com/media/11FuEnXyGsXFba/source.gif' /> : <div>none</div>
//p.status === 'PENDING' && <img style={{maxWidth: '100px'}} src='https://i.giphy.com/media/11FuEnXyGsXFba/source.gif' />

JsonPokazometer = connect(st => (st.weather || {}))(JsonPokazometer)
let Thunk1Preloader = connect(st => ({status: (st.weather ? st.weather.status : '')}))(Preloader)
let JsonPokazometerWithLoading = p =>
  p.status === 'RESOLVED' ?  <JsonPokazometer /> : <Thunk1Preloader /> 

const WeatherOutputConnected = connect(st => {
    return st.weather || {}
  }
)(JsonPokazometerWithLoading)

export default WeatherOutputConnected;