import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';
export const SafarisContext = React.createContext();

function App() {
	return (
		<div className="App">
				<Routes>
					<Route path='/signup' element={<SignUp></SignUp>}></Route>
					<Route path='/signin' element={<SignIn></SignIn>}></Route>
					<Route path='/*' exact element={<Main ></Main>}></Route>
				</Routes>
				<Footer></Footer>
		</div>
	);
}

export default App;