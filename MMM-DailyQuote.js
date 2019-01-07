/* Magic Mirror
 * Module: MMM-DailyQuote
 *
 * By cowboysdude
 *
 */
Module.register("MMM-DailyQuote", {

	quote: {},
	loaded: false,

	// Module config defaults.
	defaults: {
		updateInterval: 12*60*60*1000, // every 12 hours
		animationSpeed: 1000,
		initialLoadDelay: 1130, // 0 seconds delay
		retryDelay: 2500 
	},

	getStyles: function () {
		return ["MMM-DailyQuote.css"];
	},

	getTranslations: function () {
		return {
			de: "translations/de.json",
			en: "translations/en.json"
		};
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting this really cool module: " + this.name);

		// Set config.language as language if it is not defined explicitly in module config
		this.scheduleUpdate();
		this.config.lang = this.config.lang || config.language;
		this.sendSocketNotification("CONFIG", this.config);
	},

	getDom: function () {
		var quote = this.quote;

		var wrapper = document.createElement("div"); 

		if (!this.loaded) {
			wrapper.classList.add("bright", "light", "small");
			wrapper.innerHTML = this.translate("LOADING");
		} else {
			if (this.config.header != "") {
				var header = document.createElement("header");
				header.className = "header";
				header.innerHTML = this.config.header;
				wrapper.appendChild(header);
			}

			var top = document.createElement("div");

			var mainquote = document.createElement("p");
			mainquote.classList.add("small", "bright", "font");
			mainquote.innerHTML = quote.content;
			top.appendChild(mainquote);

			var author = document.createElement("p");
			author.classList.add("xsmall", "bright");
			author.innerHTML = "~ " + quote.author;
			top.appendChild(author);

			wrapper.appendChild(top);
		}

		return wrapper;
	},
	
	scheduleUpdate: function() {
		setInterval(() => {
			this.getQuote();
		}, this.config.updateInterval);
		this.getQuote(this.config.initialLoadDelay);
	},

	getQuote: function() {
		this.sendSocketNotification('GET_QUOTE');
	},

	processQuote: function (data) {
		this.quote = data;
		this.loaded = true;
		console.log(this.quote);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "QUOTE_RESULT") {
			this.processQuote(payload);
			this.updateDom(this.config.fadeSpeed);
		}
	}
});
