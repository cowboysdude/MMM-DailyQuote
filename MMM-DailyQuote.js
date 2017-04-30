  /* Magic Mirror
    * Module: MMM-DailyQuote
    *
    * By cowboysdude
    * 
    */
   
Module.register("MMM-DailyQuote", {

       // Module config defaults.
       defaults: {
           updateInterval: 12*60*60*1000, // every 12 hours
           animationSpeed: 1000,
           initialLoadDelay: 1130, // 0 seconds delay
           retryDelay: 2500,
           header: "",
           maxWidth: "100%",
           lang: ""
       },

       // Define required scripts.
       getScripts: function() {
           return ["moment.js"];
       },
       
       getStyles: function() {
           return ["MMM-DailyQuote.css"];
       },

       // Define start sequence.
       start: function() {
           Log.info("Starting this really cool module: " + this.name);

           // Set locale.
           moment.locale(config.language);
           this.today = "";
           this.quote = [];
           this.scheduleUpdate();
       },

      getDom: function() {

         var quote = this.quote;

         var wrapper = document.createElement("div");
         wrapper.style.maxWidth = this.config.maxWidth;

         if (!this.loaded) {
         	if (this.config.lang === "EN"){
         	wrapper.classList.add("bright", "light", "small");
			wrapper.innerHTML = "Finding Quote....";	
			} else if (this.config.lang === "DE")  {
			wrapper.classList.add("bright", "light", "small");	
			wrapper.innerHTML = "Finding Zitat....";	
			} else {
			wrapper.classList.add("warning");
			wrapper.innerHTML = "DailyQuote Error: <br> Please set language in Config.js <br><b> - SEE README -";	
			}
            
            return wrapper;
         }
         if (this.config.header != "" ){
         var header = document.createElement("header");
         header.className = "header";
         header.innerHTML = this.config.header;
         wrapper.appendChild(header);
		 }
		 
         var top = document.createElement("div");

        if (this.config.lang === "EN"){
         var mainquote = document.createElement("p");
         mainquote.classList.add("small", "bright", "font");
         mainquote.innerHTML = quote[0].content;
         top.appendChild(mainquote);

         var author = document.createElement("p");
         author.classList.add("xsmall", "bright");
         author.innerHTML = "~ "+quote[0].title;
         top.appendChild(author);
         } else if (this.config.lang === "DE") {
         	
         var mainquote = document.createElement("p");
         mainquote.classList.add("small", "bright", "font");
         mainquote.innerHTML = quote[1].title;
         top.appendChild(mainquote);
         
         var mainAuthor = document.createElement("p");
         mainAuthor.classList.add("xsmall", "bright");
         mainAuthor.innerHTML = "~ "+quote[1].creator;
         top.appendChild(mainAuthor);
         }
         
         wrapper.appendChild(top);
         return wrapper;

     },

     processQuote: function(data) {
         this.today = data.Today;
         this.quote = data;
console.log(this.quote);
         this.loaded = true;
     },

     scheduleUpdate: function() {
         setInterval(() => {
             this.getQuote();
         }, this.config.updateInterval);

         this.getQuote(this.config.initialLoadDelay);
     },

     getQuote: function() {
    if (this.config.lang === "EN") {
            this.sendSocketNotification('GET_QUOTE');
         } else if (this.config.lang === "DE") {
             this.sendSocketNotification('GET_GQUOTE');
         } else  {
             console.log("Please select either EN or DE in config.js")
         } 
     },

     socketNotificationReceived: function(notification, payload) {
         if (notification === "QUOTE_RESULT") {
             this.processQuote(payload);
             this.updateDom(this.config.fadeSpeed);
         }
         this.updateDom(this.config.initialLoadDelay);
     },

 });
