# MMM-DailyQuote

Random daily quote for MagicMirror2
  
# Installation
  
MagicMirror/modules
 
Clone this repo into your `~MagicMirror/modules` directory.
`git clone https://github.com/cowboysdude/MMM-DailyQuote`
 
Then `cd MMM-DailyQuote`
 
run - `npm install` in your `~MagicMirror/modules/MMM-DailyQuote` directory.
 
 
#config.js

```
{ 
    module: 'MMM-DailyQuote', 
    position: 'bottom_bar', 
    config: { 
         maxWidth: "100%", 
         header: "Quote of the Day",
         lang: "EN" -- OR "DE" for German.  Fallback is EN
         } 
},
```
         
config options...
maxWidth: can be set to either px or %
header: If you don't want to use a header simply leave it out :)
lang: you can set the language explicitly, by default it uses your global config language.
If a language is not supported it will fallback to english.
     
Restart mirror... enjoy...  
