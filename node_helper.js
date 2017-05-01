/* Magic Mirror
 * Module: MMM-DailyQuote
 *
 * By Cowboysdude
 *
 */
const NodeHelper = require("node_helper");
const fs = require("fs");

module.exports = NodeHelper.create({

	fallback: "EN",

	start: function () {
		console.log(`Starting module helper: ${this.name}`);
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "CONFIG") {
			this.config = payload;
			if (fs.existsSync(`modules/${this.name}/apis/${this.config.lang.toUpperCase()}.js`)) {
				this.loadProvider(this.config.lang.toUpperCase());
			} else {
				console.log(`${this.name}: Couldn't load quote provider ${
				    this.config.lang.toUpperCase()}, loading fallback EN`);
				this.loadProvider(this.fallback);
			}
		}
	},

	loadProvider: function (provider) {
		this.quote = require(`./apis/${provider}`)();
		this.getData();
		setInterval(() => {
			this.getData();
		}, this.config.updateInterval);
	},

	getData: function () {
		this.quote.getData((err, data) => {
			if (err) {
				console.log(err);
			} else {
				this.sendSocketNotification("QUOTE_RESULT", data);
			}
		});
	}
});
