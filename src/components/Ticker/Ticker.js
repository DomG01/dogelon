import unirest from 'unirest';
import React, { Component } from 'react';

import './Ticker.css';
// import getRequest from '../../modules/getRequest';

export default class Ticker extends Component {
  constructor(props) {
		super(props);
		this.state = { dataDoge: {} , dataTesla: {} };
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
		},60000)
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
				dataDoge: res.body.market_data.current_price
			}));
		})

	}

	async getTeslaRequest() {
		let req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis");

		req.query({
			"symbol": "TSLA",
			"region": "US"
		});

		req.headers({
			"x-rapidapi-key": "8587810f1bmsh10eb1222f09a6a9p19af5ejsn68327210f814",
			"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
			"useQueryString": true
		});

		req.end(async (res) => {
			if (res.error) throw new Error(res.error);
			this.setState(() => ({
				dataTesla: res.body.financialData.currentPrice
			}));
		})

	}

	render() {
		return (
			<div>
				{
					<div>
						<p>DOGE &gt; GBP: £{this.state.dataDoge.gbp}</p>
						<p>DOGE &gt; USD: ${this.state.dataDoge.usd}</p>
						<p>DOGE &gt; EUR: €{this.state.dataDoge.eur}</p>
						<p>TSLA &gt; USD: ${this.state.dataTesla.raw}</p>
						
					</div>
				}
			</div>
		);
	}
}