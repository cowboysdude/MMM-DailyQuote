# MMM-DailyQuote

Random daily quote for MagicMirror2 by fewieden
 
# Installation
  
MagicMirror/modules
 
Clone this repo into your `~MagicMirror/modules` directory.
`git clone https://github.com/cowboysdude/MMM-DailyQuote`
 
Then `cd MMM-DailyQuote`
 
run - `npm install` in your `~MagicMirror/modules/MMM-DailyQuote` directory.
 
 
#config.js

```
	   { 
		  disabled: f,
    module: 'MMM-DailyQuote', 
    position: 'bottom_bar' 
    }
```
         
config options...
 None :) 
 
 Used to only support English and German now supports all languages :)  It reads your language from your config.js file ie language: 'nl'
 It's automatic with no support for override at the moment.
 
 SO putting in a config section in the module and adding 'language: "en"' won't work ;)  So before anyone tells you to try it. 
     
Restart mirror... enjoy...  
