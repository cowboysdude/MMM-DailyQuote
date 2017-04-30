

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
    