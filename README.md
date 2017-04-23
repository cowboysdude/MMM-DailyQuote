# MMM-DailyQuote
Random daily quote for MagicMirror2

  
Examples
  
 MagicMirror/modules
 
  
 git clone https://github.com/cowboysdude/MMM-DailyQuote
 
  
 # Installation
  
     cd
    ~MagicMirror/modules/MMM-DailyQuote
    run - npm install
    Clone this repo into your ~MagicMirror/modules directory.
  
 #config.js
 `git clone https://github.com/cowboysdude/MMM-DailyQuote.git`
 
 Then `cd MMM-DailyQuote`
 
 run - `npm install` in your `~MagicMirror/modules/MMM-DailyQuote` directory.
 
 # Add to Config.js
  
        { 
            disabled: false,
            module: 'MMM-DailyQuote', 
            position: 'bottom_bar', 
            config: { 
                 maxWidth: "100%", 
                 header: "Quote of the Day", 
                 } 
        },
          
         config options...
    maxWidth:` can be set to either px or %
    header: If you don't want to use a header simply leave it out :)
  
  Restart mirror... enjoy...  
