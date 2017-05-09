/* Magic Mirror
 * Module: MMM-DailyQuote
 *
 * By fewieden
 *
 */
Module.register("MMM-DailyQuote", {

	quote: {},
	loaded: false,

	// Module config defaults.
	defaults: {
		updateInterval: 12 * 60 * 60 * 1000, // every 12 hours
		animationSpeed: 1000,
		initialLoadDelay: 1130, // 0 seconds delay
		retryDelay: 2500,
		header: "",
		maxWidth: "100%"
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
		this.config.lang = this.config.lang || config.language;
		this.sendSocketNotification("CONFIG", this.config);
	},

	getDom: function () {
		var quote = this.quote;

		var wrapper = document.createElement("div");
		wrapper.style.maxWidth = this.config.maxWidth;

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

	processQuote: function (data) {
		this.quote = data;
		this.loaded = true;
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "QUOTE_RESULT") {
			this.processQuote(payload);
			this.updateDom(this.config.fadeSpeed);
		}
	}
});
