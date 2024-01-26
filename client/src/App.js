import React, {useState, useEffect, createContext} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';
export const SafarisContext = React.createContext();

function App() {
	let [signedIn, setSignedIn] = useState();
	let [bookings] = useState(0);
	let [vacations, setVacations] = useState([]);
	let [accommodations, setAccommodations] = useState([])
	let [searchTerm, setSearchTerm] = useState('Hello World')

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

	// HEADER
	function handleLogOut(e){
		document.cookie = `user_name = ; expires=Thu, 01 Jan 2000 00:00:00 UTC;`;
		document.cookie = `customer_id = ; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
	}

  	return (
    	<div className="App">
			<SafarisContext.Provider value={{accommodations, setAccommodations, signedIn, setSignedIn, searchTerm, setSearchTerm}}>
				<Header bookings = {bookings} handleLogOut = {handleLogOut}></Header>
				<Main vacations = {vacations} accommodations = {accommodations} setAccommodations = {setAccommodations}></Main>
				<Footer></Footer>
			</SafarisContext.Provider>
    	</div>
 	);
}

export default App;