var unirest = require("unirest");

var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis");

req.query({
	"symbol": "TSla",
	"region": "US"
});

req.headers({
	"x-rapidapi-key": "8587810f1bmsh10eb1222f09a6a9p19af5ejsn68327210f814",
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"useQueryString": true
});

let getTeslaRequest = () => {
	return req.end(function (res) {
		if (res.error) throw new Error(res.error);
		//console.log(res.body.market_data.current_price); 
		return ;
	})
};
