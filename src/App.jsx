import React from 'react';
import logo from './logo.png';
import './App.css';

import Ticker from './components/Ticker/Ticker';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Ticker />

			</header>
		</div>
	);
}

export default App;
