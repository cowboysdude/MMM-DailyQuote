/* Magic Mirror
 * Module: MMM-DailyQuote
 *
 * By fewieden
 *
 */

const request = require("request");

module.exports = () => {

	const baseUrl = "http://quotes.rest";

	const requestQuote = () => new Promise((resolve, reject) => {
		request({
			url: `${baseUrl}/qod.json`,
			method: "GET"
		}, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				var result = JSON.parse(body).contents.quotes;
				resolve(result[0]);
			} else {
				reject("Cannot load quote!");
			}
		});
	});

	const normalizeQuote = (quote) => {
		return {
			author: quote.author,
			content: quote.quote
		};
	};

	return {
		getData(callback) {
			requestQuote().then((res) => {
				callback(null, normalizeQuote(res));
			}, (err) => {
				callback(err);
			});
		}
	};
};
