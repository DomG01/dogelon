var unirest = require("unirest");

var req = unirest("GET", "https://api.coingecko.com/api/v3/coins/dogecoin");

req.headers({
	"accept": "application/json",
	"useQueryString": true,
});

let getRequest = () => {
	return req.end(function (res) {
		if (res.error) throw new Error(res.error);
		//console.log(res.body.market_data.current_price); 
		return res.body.market_data.current_price;
	})
};

export default getRequest;