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
    config: {
    updateInterval: 12*60*60*1000, // every 12 hours.. this is default.  I wouldn't do more than once an hour....
    }
    }
```
         
config options...
 ONE - if you want to use it:
 updateInterval: 12*60*60*1000, // every 12 hours  if you don't want to use it, no need to put it in your config :)  It's the default.
 
 
 Used to only support English and German now supports all languages :)  It reads your language from your config.js file ie language: 'nl'
 It's automatic with no support for override at the moment.
 
 SO putting in a config section in the module and adding 'language: "en"' won't work ;)  So before anyone tells you to try it. 
  
There are however only 2 translation files for this en and de....if you'd like to contribute please let me know.  
  
Restart mirror... enjoy...  
