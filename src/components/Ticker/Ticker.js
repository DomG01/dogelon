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
		this.getDogeRequest();
		this.getTeslaRequest();
		
		// Now we need to make it run at a specified interval
		 // runs every 10 seconds.

		setInterval(() => {
			console.log(1);
			this.getDogeRequest();
			this.getTeslaRequest();
		},10000)
		}
	
	async getDogeRequest() {
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

	}

	async getTeslaRequest() {
		let req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis");

		req.end(function (res) {
			if (res.error) throw new Error(res.error);

			this.setState(() => ({
				data: res.body.financialData.currentPrice.raw
			}));
		})

	}

	render() {
		return (
			<div>
				{
					<div>
						<p>DOGE &gt; GBP: £{this.state.data.gbp}</p>
						<p>DOGE &gt; USD: ${this.state.data.usd}</p>
						<p>DOGE &gt; EUR: €{this.state.data.eur}</p>
						<p>TSLA &gt; USD: ${this.state.financialData.currentPrice.raw}</p>
					</div>
				}
			</div>
		);
	}
}