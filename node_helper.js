/* Magic Mirror
 * Module: MMM-DailyQuote
 *
 * By cowboysdude
 *
 */
const NodeHelper = require("node_helper");
const request = require("request");
const translate = require('google-translate-api');

module.exports = NodeHelper.create({

    start: function() {
        console.log(`Starting module helper: ${this.name}`);
    },

    requestQuote: function(url) {
        var self = this;
        request({
            url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var quote = JSON.parse(body);
                var book = {
                    content: quote.quoteText,
                    author: quote.quoteAuthor
                };
                var result = book;
                //console.log(result);
                if (config.language != 'en') {
                    translate(result.content, {
                            from: 'en',
                            to: config.language
                        })
                        .then(result => {
                            var strings = result;
                            //console.log(strings);
                            var books = {
                                content: strings.text,
                                author: quote.quoteAuthor
                            };

                            console.log(books);
                            self.sendSocketNotification("QUOTE_RESULT", books);
                        })
                } else {
                    self.sendSocketNotification("QUOTE_RESULT", result);

                }

            }
        });
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_QUOTE") {
            this.requestQuote(payload);
        }

        if (notification === "CONFIG") {
            this.config = payload;
        }
    }
});