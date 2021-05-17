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
		this.getRequest();
		
		// Now we need to make it run at a specified interval
		 // runs every 10 seconds.

	}

	async getRequest() {
		let req = unirest("GET", "https://api.coingecko.com/api/v3/coins/dogecoin");

		req.headers({
			"accept": "application/json",
			"useQueryString": true,
		});
		req.end(async (res) => {
			if (res.error) throw new Error(res.error);
			this.setState(() => ({
				data: res.body.market_data.current_price
			}));
		})

		setInterval(this.setState(() => ({
			data: this.getRequest()
		})), 10000);
	}

	render() {
		return (
			<div>
				{
					<div>
						<p>DOGE > GBP: £{this.state.data.gbp}</p>
						<p>DOGE > USD: ${this.state.data.usd}</p>
						<p>DOGE > EUR: €{this.state.data.eur}</p>
					</div>
				}
			</div>
		);
	}
}