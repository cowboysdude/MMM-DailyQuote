# MMM-DailyQuote
Random daily quote for MagicMirror2

  
# Installation
  
 MagicMirror/modules
 
 Clone this repo into your ~MagicMirror/modules directory.
 git clone https://github.com/cowboysdude/MMM-DailyQuote
 
 Then `cd MMM-DailyQuote`
 
 run - `npm install` in your `~MagicMirror/modules/MMM-DailyQuote` directory.
 
 
 #config.js
  
        { 
            disabled: false,
            module: 'MMM-DailyQuote', 
            position: 'bottom_bar', 
            config: { 
                 maxWidth: "100%", 
                 header: "Quote of the Day",
                 lang: "EN"
                 } 
        },
          
         config. params that MUST be included:
         lang: MUST BE SET TO EITHER EN OR DE.  Must be in caps. 
         
         config options...
    maxWidth:` can be set to either px or %
    header: If you don't want to use a header simply leave it out :)
     
  Restart mirror... enjoy...  
