/* Magic Mirror
 * Module: MMM-DailyQuote
 *
 * By fewieden
 *
 */

const request = require("request");

module.exports = () => {

	const baseUrl = "http://quotesondesign.com/wp-json/posts";

	const requestQuote = () => new Promise((resolve, reject) => {
		request({
			url: `${baseUrl}?filter[orderby]=rand&filter[posts_per_page]=1`,
			method: "GET"
		}, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				var result = JSON.parse(body);
				resolve(result[0]);
			} else {
				reject("Cannot load quote!");
			}
		});
	});

	const normalizeQuote = (quote) => {
		return {
			author: quote.title,
			content: quote.content
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
