/* Magic Mirror
 * Module: MMM-DailyQuote
 *
 * By fewieden
 *
 */

const request = require("request");
const iconv = require("iconv-lite");
const parser = require("xml2js").parseString;
const stripNS = require("xml2js").processors.stripPrefix;

module.exports = () => {

	const baseUrl = "http://www.zitate-online.de/zitatdestages.xml";

	const requestQuote = () => new Promise((resolve, reject) => {
		request({
			url: baseUrl,
			method: "GET",
			encoding: null
		}, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				var utf8String = iconv.decode(new Buffer(body), "ISO-8859-1");
				parser(utf8String, { tagNameProcessors: [stripNS] },  (err, result)=> {
					var result = result.RDF.item;
					resolve(result[0]);
				});
			} else {
				reject("Cannot load quote!");
			}
		});
	});

	const normalizeQuote = (quote) => {
		return {
			author: quote.creator[0],
			content: quote.description[0].replace(` (${quote.creator[0]})`, "")
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
