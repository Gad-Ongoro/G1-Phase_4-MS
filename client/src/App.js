import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import UserLog from './components/UserLog';
import './App.css';

function App() {
	let [bookings] = useState(0);
	
  	return (
    	<div className="App">
			<Header bookings = {bookings}></Header>
			<Routes>
				<Route path='/account' exact element={<UserLog></UserLog>}></Route>
			</Routes>
			<Main></Main>
			<Footer></Footer>
    	</div>
 	);
}

export default App;