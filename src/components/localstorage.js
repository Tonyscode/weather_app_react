import React from 'react';
import store from '../store'
import common from '../promiseAction'

class FavoriteTown1 extends React.Component{
  constructor(props){
    super(props)
    this.loadWeather = this.loadWeather.bind(this)
  }

  loadWeather(e) {
    let path = '/forecast/'+this.props.id;
    console.log("Change town to ", this.props.id, path);
    this.props.history.push(path)
  }

  render(){
    const {id} = this.props;
    const name = getCityName(id);
    return (
      <li>
        <span onClick={this.loadWeather}>{name}</span>
        <button className="btn btn-outline-warning btn-sm" onClick={()=> this.props.remove(id)}>X</button>
      </li>
    );
  }
}
// //
class FavoriteTownList extends React.Component{
  constructor(props){
    super(props)
    this.remove = this.remove.bind(this)
  }
  
  remove(id) {
    var x = localStorage.favorits.split(',').filter(item => item != id);
    localStorage.setItem('favorits', x)
    this.setState({})
    console.log("x", x)
  }

  render() {
    let favTowns = localStorage.getItem("favorits") || '';
    favTowns = (favTowns.length >0 ? favTowns.split(',') : []);
    const favTownsArray = favTowns.map(el => <FavoriteTown1 id={el} remove={this.remove} history={this.props.history} />);

    return (
      <div id='favTownsList'>
        <ul>{favTownsArray}</ul>      
      </div>
    );
  }
}
function getCityName(id) {

  let x = common.cities.map(entry => {
    if (id == entry.i)
        return (entry.l || entry.n)
    }
  )
  return x.filter(el => (el !== undefined)).join('')
}
export default FavoriteTownList;