import React from 'react';
import logo from './logo.png';
import './App.css';

import Home from './components/Home/Home';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Home />

			</header>
		</div>
	);
}

export default App;
