import unirest from 'unirest';
import React, { Component } from 'react';
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';

import './Home.css';
// import getRequest from '../../modules/getRequest';

export default class Home extends Component {
  constructor(props) {
		super(props);
		this.state = { dataDoge: {} , dataTesla: {} };
	}
	
	componentDidMount() {
		// need to make the initial call to getData() to populate
		// data right away
		//console.log(getRequest());
		this.getDogeRequest();
		// this.getTeslaRequest();
		
		// Now we need to make it run at a specified interval
		 // runs every 10 seconds.

		setInterval(() => {
			console.log(1);
			this.getDogeRequest();
			// this.getTeslaRequest();
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
			<div className="homeContainer">
					<Ticker>
          				<FinancialTicker id="DOGEGBP" symbol="DOGE-GBP" currentPrice={this.state.dataDoge.gbp} />
         				<FinancialTicker id="DOGEUSD" symbol="DOGE-USD" currentPrice={this.state.dataDoge.usd} />
          				<FinancialTicker id="DOGEEUR" symbol="DOGE-EUR" currentPrice={this.state.dataDoge.eur} />
						<FinancialTicker id="DOGEGBP" symbol="DOGE-GBP" currentPrice={this.state.dataDoge.gbp} />
         				<FinancialTicker id="DOGEUSD" symbol="DOGE-USD" currentPrice={this.state.dataDoge.usd} />
          				<FinancialTicker id="DOGEEUR" symbol="DOGE-EUR" currentPrice={this.state.dataDoge.eur} />
          				{/* <FinancialTicker id="TSLAUSD" change={true} symbol="TSLA-USD" currentPrice={this.state.dataTesla.raw} /> */}
        			</Ticker>
			</div>
		);
	}
}