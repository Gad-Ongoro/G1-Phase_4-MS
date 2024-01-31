import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';
export const SafarisContext = React.createContext();

function App() {
	let navigate = useNavigate()
	let [signedIn, setSignedIn] = useState();
	let [bookings, setBookings] = useState(0);
	let [vacations, setVacations] = useState([]);
	let [accommodations, setAccommodations] = useState([])
	let [searchTerm, setSearchTerm] = useState('Hello World')

	let token_exists = localStorage.getItem('customer_auth_token') !== null

	useEffect(() => {
		fetch("http://127.0.0.1:5000/vacations", {
			headers:{
				Authorization: `Bearer ${localStorage.getItem('customer_auth_token')}`
			}
		})
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
		// navigate('/signup')
	}

  	return (
    	<div className="App">
			<SafarisContext.Provider value={{accommodations, setAccommodations, signedIn, setSignedIn, searchTerm, setSearchTerm, bookings, setBookings, token_exists}}>
				<Header bookings = {bookings} handleLogOut = {handleLogOut}></Header>
				<Main vacations = {vacations} accommodations = {accommodations} setAccommodations = {setAccommodations}></Main>
				<Footer></Footer>
			</SafarisContext.Provider>
    	</div>
 	);
}

export default App;