
## Features of the extension
1.  Customize foreground & background color with a simple mouse drag.
2.  Settings automatically saved to affect future web pages.
3.  Manually add new scheme to list, delete unwanted.
4.  Press the switch to turn functionality ON/OFF.

## 
1. Ctrl + Shift + J at visiting page interface : content script log,
2. Right click , Inspect elements at extension popup window :  popup logs
3. Click "Inspect views: background page" link at  (chrome://extensions/) interface 


## Reference: Chrome extension directory in different OS 

> Notice :   {extension ID} is found at chrome://extensions/ with Developer Mode checked on
> e.g. ID: dkabogmdcebincpnhjkblipnceehimch

* *Ubuntu 14.10:*
~/.config/google-chrome/Default/Extensions/{extension ID}  or 
~/.config/google-chrome/Profile 1/Extensions/{extension ID}

* *Mac:*
/Users/username/Library/Application Support/Google/Chrome/Default/Extensions

* *Windows 7:*
C:\Users\username\AppData\Local\Google\Chrome\User Data\Default\Extensions

* *Windows XP:*
C:\Documents and Settings\YourUserName\Local Settings\Application Data\Google\Chrome\User Data\Default

## Futher references & Tips
* format all your codes in a batch with [js-beautify](https://github.com/beautify-web/js-beautify)

npm -g install js-beautify

file type | command | description
------------ | -------------| -------------
.js | js-beautify -r -f *.js |  -r to replace original 
.json | js-beautify -r -f manifest.json|  -f to specify input files
.html | js-beautify -r --html -f *.html |  --html to beautify htmls
.css | js-beautify -r --css -f *.css |  --css to beautify htmls


## Language
for example, set Mac OSX Chrome Browser Language to Arabic 
we do this in the terminal

defaults write com.google.Chrome AppleLanguages '(ar)'

then restart chrome 

