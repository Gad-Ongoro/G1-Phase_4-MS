import React, {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';
export const SafarisContext = React.createContext();

function App() {
	let [signedIn, setSignedIn] = useState();
	let [customer, SetCustomer] = useState();
	let [customerProfile, setCustomerProfile] = useState({});
	
	let [bookings, setBookings] = useState(0);
	let [vacations, setVacations] = useState([]);
	let [accommodations, setAccommodations] = useState([]);
	let [reviews, setReviews] = useState([]);
	let [searchTerm, setSearchTerm] = useState('Hello World');
	let user_id;

	let token = localStorage.getItem('customer_auth_token');
	let decoded_token;
	let token_exists = token !== null;

	if (token_exists){
		decoded_token = jwtDecode(token);
		user_id = decoded_token.sub;
	};

	// READ customers/:id
	useEffect(() => {
		if (token_exists){
			fetch(`https://spartans-safaris.onrender.com/customers/${user_id}`)
			.then(response => {
				if (response.ok){
					return(
					response.json()
					)
				} else{
					window.alert('No Users Found!')
				}
			})
			.then(data => {
				SetCustomer(data)
			})
		}
	}, [user_id]);

	// READ customer_profiles/:id
	useEffect(() => {
		if (token_exists){
			fetch(`https://spartans-safaris.onrender.com/customer_profiles/${user_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			})
			.then(response => {
				if (response.ok){
					return(
					response.json()
					)
				}
			})
			.then(data => {
				setCustomerProfile(data)
				}
			)
		}
	}, [user_id]);


	// READ vacations
	useEffect(() => {
		fetch("https://spartans-safaris.onrender.com/vacations", {
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

	// READ accommodations
	useEffect(() => {
		fetch("https://spartans-safaris.onrender.com/accommodations")
		.then(response => response.json())
		.then(data => {
			setAccommodations(data)
		})
	},
	[]
	)

	// READ reviews (Accommodation_Reviews)
	useEffect(
		() => {
			fetch('https://spartans-safaris.onrender.com/reviews')
			.then(response => response.json())
			.then(data => setReviews(data))
		},
	[]
	);


// functions() => {}
	// UPDATE customer_profiles/:id
	function updateCustomerProfile(inputs){
		if (token_exists){
			fetch(`https://spartans-safaris.onrender.com/customer_profiles/${user_id}`, {
				method: 'PATCH',
				headers: {
					// Authorization: `Bearer ${token}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(inputs)
			})
			.then(response => {
				if (response.ok){
					response.json()
				}
				else{window.alert('Please set Profile Details')}
				})
			.then(data => {console.log(inputs)})
		};
	};

// Elements <> </>
	let spinners = (<div className='text-center p-4 m-4'>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
	</div>);


	// handle log out
	function handleLogOut(e){
		if (token_exists){localStorage.removeItem(('customer_auth_token'))};
	};

	// scroll to top
	function scrollToTop(){
		document.body.scrollTop = 0;
  		document.documentElement.scrollTop = 0;
	}

  	return (
    	<div className="App">
			<SafarisContext.Provider value={{customer, user_id,
				accommodations, setAccommodations,
				signedIn, setSignedIn, searchTerm, setSearchTerm, bookings, setBookings,
				token_exists, scrollToTop, customerProfile, updateCustomerProfile,
				spinners, reviews
				}}>

				<Header bookings = {bookings} handleLogOut = {handleLogOut}></Header>
				<Main vacations={vacations}  accommodations={accommodations}  setAccommodations={setAccommodations}></Main>
				<Footer></Footer>

			</SafarisContext.Provider>
    	</div>
 	);
}

export default App;