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
         wrapper.className = "wrapper";
         wrapper.style.maxWidth = this.config.maxWidth;
         

         if (!this.loaded) {
             wrapper.innerHTML = "Finding Quote....";
             wrapper.className = "bright light small";
             return wrapper;
         }
         if (this.config.header != "" ){
         var header = document.createElement("header");
         header.className = "header";
         header.innerHTML = this.config.header;
         wrapper.appendChild(header);
		 }
		 
         var top = document.createElement("div");

         var mainquote = document.createElement("h3");
         mainquote.classList.add("small", "bright", "content");
         mainquote.innerHTML = quote[0].content;
         top.appendChild(mainquote);

         var author = document.createElement("p");
         author.classList.add("xsmall", "bright");
         author.innerHTML = "~ "+quote[0].title;
         top.appendChild(author);

         wrapper.appendChild(top);
         return wrapper;

     },

     processQuote: function(data) {
         this.today = data.Today;
         this.quote = data;
         this.loaded = true;
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

     socketNotificationReceived: function(notification, payload) {
         if (notification === "QUOTE_RESULT") {
             this.processQuote(payload);
             this.updateDom(this.config.fadeSpeed);
         }
         this.updateDom(this.config.initialLoadDelay);
     },

 });