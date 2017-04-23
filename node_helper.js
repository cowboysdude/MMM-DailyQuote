/* Magic Mirror
    * Module: MMM-DailyQuote
    *
    * By Cowboysdude
    * 
    */
const NodeHelper = require('node_helper');
const request = require('request');
const fs = require('fs');

module.exports = NodeHelper.create({

    start: function() {
        this.quote = {
            timestamp: null,
            data: null
        };
        this.path = "modules/MMM-DailyQuote/quote.json";
        if (fs.existsSync(this.path)) {
            var temp = JSON.parse(fs.readFileSync(this.path, 'utf8'));
            if (temp.timestamp === this.getDate()) {
                this.quote = temp;
                
            }
            
        }

    },

    getQuote: function(url) {
        request({
            url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
        console.log(result);
                this.sendSocketNotification('QUOTE_RESULT', result);
                this.quote.timestamp = this.getDate();
                this.quote.data = result;
        console.log("This recipe: "+this.quote.data);
                this.fileWrite();
            }
        });
    },

    fileWrite: function() {
        fs.writeFile(this.path, JSON.stringify(this.quote), function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The Quote was saved!");
        });
    },

    getDate: function() {
        return (new Date()).toLocaleDateString();
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_QUOTE') {
            if (this.quote.timestamp === this.getDate() && this.quote.data !== null) {
                this.sendSocketNotification('QUOTE_RESULT', this.quote.data);
            } else {
                this.getQuote(payload);
            }
        }
    }

});