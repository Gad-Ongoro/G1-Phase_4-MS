import React, {useState, useEffect, createContext} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';
import { useNavigate } from 'react-router-dom';
export const SafarisContext = React.createContext();

function App() {
	let navigate = useNavigate()
	let [signedIn, setSignedIn] = useState();
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
			<SafarisContext.Provider value={{signedIn, setSignedIn}}>
				<Header bookings = {bookings}></Header>
				<Main vacations = {vacations} accommodations = {accommodations} setAccommodations = {setAccommodations}></Main>
				<Footer></Footer>
			</SafarisContext.Provider>
    	</div>
 	);
}

export default App;