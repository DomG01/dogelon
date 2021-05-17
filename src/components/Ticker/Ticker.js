import unirest from 'unirest';
import React, { Component } from 'react';

import './Ticker.css';
// import getRequest from '../../modules/getRequest';

export default class Ticker extends Component {
  constructor(props) {
		super(props);
		this.state = { data: {} };
	}
	
	componentDidMount() {
		// need to make the initial call to getData() to populate
		// data right away
		//console.log(getRequest());
		this.setState(() => ({
			data: this.getRequest()
		}));
		
		// Now we need to make it run at a specified interval
		setInterval(this.setState(() => ({
			data: this.getRequest()
		})), 10000); // runs every 10 seconds.

	}

	async getRequest() {
		let req = unirest("GET", "https://api.coingecko.com/api/v3/coins/dogecoin");
		let currentPrices = {}

		req.headers({
			"accept": "application/json",
			"useQueryString": true,
		});
		req.end(async (res) => {
			if (res.error) throw new Error(res.error);
			//console.log(res.body.market_data.current_price); 
			currentPrices = req.body;
		})

		console.log(currentPrices)
		return currentPrices;


	}

	render() {
		return (
			<div>
				{
					console.log(this.state.data)
				}
			</div>
		);
	}
}