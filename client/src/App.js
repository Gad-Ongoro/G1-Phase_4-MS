import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
	document.cookie = "name=Gad Ongoro";
	let [bookings] = useState(0);
	let [vacations, setVacations] = useState([]);
	let [accommodations, setAccommodations] = useState([])

	useEffect(() => {
		fetch("http://127.0.0.1:5000/vacations")
		.then(response => response.json())
		.then(data => {
			setVacations(data)
		})
	},
	[]
	)

	useEffect(() => {
		fetch("http://127.0.0.1:5000/accommodations")
		.then(response => response.json())
		.then(data => {
			setAccommodations(data)
			// console.log(data);
		})
	},
	[]
	)

  	return (
    	<div className="App">
			<Header bookings = {bookings}></Header>
			<Main vacations = {vacations} accommodations = {accommodations} setAccommodations = {setAccommodations}></Main>
			<Footer></Footer>
    	</div>
 	);
}

export default App;