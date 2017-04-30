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

    getQuote: function(url) {
        request({
            url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                this.sendSocketNotification('QUOTE_RESULT', result);
            }
        });
    },
    
     getGQuote: function(url) {
    	request({ 
    	          url:"http://www.zitate-online.de/zitatdestages.xml",
    	          method: 'GET',
    	          encoding: null
    	        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
            var utf8String = iconv.decode(new Buffer(body), "ISO-8859-1");	
                parser(utf8String, { tagNameProcessors: [stripNS] },  (err, result)=> {
                        var result = JSON.parse(JSON.stringify(result.RDF.item));
                        this.sendSocketNotification('QUOTE_RESULT', result);
                });
            }
       });
    },
    

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_QUOTE') {
                this.getQuote(payload);
            } else if (notification === 'GET_GQUOTE'){
                this.getGQuote(payload);
            }
        }
});
