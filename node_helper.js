/* Magic Mirror
    * Module: MMM-DailyQuote
    *
    * By Cowboysdude
    * 
    */
const NodeHelper = require('node_helper');
const request = require('request');
const parser = require('xml2js').parseString;
var stripNS = require('xml2js').processors.stripPrefix;
var iconv = require('iconv-lite');

module.exports = NodeHelper.create({

    start: function() {
        this.quote = {
            timestamp: null,
            data: null
        };
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
         if (notification === 'CONFIG') {
            this.config = payload;
         if (fs.existsSync(`modules/${this.name}/apis/${this.config.provider}.js`)) {
                this.provider = require(`./apis/${this.config.provider}`)(this.config);
                this.getData();
                setInterval(() => {
                    this.getData();
                }, this.config.updateInterval);
            } else {
                console.log(`${this.name}: Couldn`t load provider ${this.config.provider}`);
            }
        }
    },
        },
        
      getData() {
        this.provider.getData((err, data) => {
            if (err) {
                console.log(err);
            } else {
                this.sendSocketNotification('QUOTE', data);
            }
        });
    }
});     
});
