import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './media_screens.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AppContext from './services/utils';
import MouseMove from './components/MouseMove';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<React.StrictMode>
			<AppContext>
				<App />
			</AppContext>
			<MouseMove></MouseMove>
		</React.StrictMode>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
