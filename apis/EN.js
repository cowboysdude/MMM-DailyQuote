


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