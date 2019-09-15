import React from 'react';
import countries from '../jsons/countries.js'
import cities from '../jsons/current.city.list.js'

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
 	//this.getFavorit = getFavorit.bind(this)

 }


  render(){
  	//console.log('--', this.props)
    const options = countries.map(entry =>
		<option value={entry.code}> {entry.name}</option>)
//
	let towns=[];
	
	 const townOptions = cities.map(entry => {
	 	if(this.state.countrySelect != ''
	 		&& this.state.countrySelect == entry.c
	 	)
	 		return (<option value={entry.i}> {entry.l || entry.n}</option>)
	 })
	//const favTownsArray=[];
	
	
 //
    return (
    	
	     <div>
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
		     	 {townOptions}</select>
		       </div>
		       <label>
		     	<input name="rememberme" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/>
		     		Добавить в любимые
		     	</label>
	     	<button  onClick={this.addToLocalStore}>Добавить</button>
	     	  
		    <FavoriteTownList />	 
		       
	     </div> 
 )
}
}
 //
 function FavoriteTown(props) {
 	function remove(e) {
		console.log(e);
 	}

	
 	this.props = props;
	const {id} = props;
	const name = getCityName(id);
	return (<li>{name} <button onClick={this.remove}>x</button></li>);
}


function FavoriteTownList(props) {

	let favTowns = (localStorage.getItem("favorits") || '').split(',');
	const favTownsArray = favTowns.map(el => <FavoriteTown id={el} />);
	//favtowns.map(el => <li key={el}>{el}</li>)
	console.log(favTowns)
	return (<ul id='FC'>{favTownsArray}</ul>);
}


 function getCity(e){
 	console.log("getcity", e)
	//this.props.onChange(this.state.countrySelect)
	this.setState({countrySelect: e.target.value})
	console.log("-getCity-e",e)
 }
 function changeCity(e){
 	this.setState({townSelect: e.target.value })
 	const { rememberMe, townSelect, favorits} = this.state;
 }
function getCityName(id) {
	let x = cities.map(entry => {
	 	if(id == entry.i)
	 		return (entry.l || entry.n)
	 })
	return x.filter(el => (el !== undefined)).join(', ')
}
 
 
 function addToLocalStore(e){

 	debugger;
 	//e.preventDefault(); e.stopPropagation();
 	if(this.state.rememberMe == true && this.state.townSelect !== '' ){
 		const { rememberMe, townSelect} = this.state;
 		//let favorits = localStorage.getItem('favorits')// было 
 		let favorits = (localStorage.getItem('favorits') || '').split(',')
 	
 		localStorage.setItem('rememberMe', rememberMe);
	 	localStorage.setItem('townSelect', rememberMe ? townSelect :'')
 		favorits.push(this.state.townSelect)
 		this.setState({favorits: favorits})
 		localStorage.setItem('favorits', favorits);
	 }
 }
 function handleChange(e){ 	
 	
 	this.setState({rememberMe: !this.state.rememberMe})
 	console.log(this.state.rememberMe)
 }
   export default Weather;