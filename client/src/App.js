import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import UserLog from './components/UserLog';
import './App.css';

function App() {
  	return (
    	<div className="App">
		  	<Header></Header>
			<UserLog></UserLog>
			<Main></Main>
			<Footer></Footer>
    	</div>
 	);
}

export default App;