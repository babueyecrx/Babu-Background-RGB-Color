//日誌樣式
function logAllProps(prefix, obj) {
    var props = " ";
    console.log('~~~~~~~', prefix, '~~~~~~~~開始符~~~~~~~~');
    console.log('~~~~~~~~//先輸出object們~~~~~~~~');
    for (var p in obj) {
        if (typeof(obj[p]) == "string") {
            props += " || " + String(p) + " : " + obj[p] + " ;  || ";
        } else if (typeof(obj[p]) == "object") {
            console.log('某個object名爲 ' + String(p) + '， 其值爲 : ');
            console.log(obj[p]);
        } else {}
    }
    console.log('~~~~~~~~//object們列舉完畢~~~~~~~~');
    console.log('~~~~~~~~//再輸出餘下的~~~~~~~~');
    console.log(props);
    console.log('~~~~~~~~//餘下的列舉完畢~~~~~~~~');
    console.log('~~~~~~~', prefix, '~~~~~~~~結束符~~~~~~~~');
    console.log('======================================');
}
//end of 日誌樣式


function ensureSendMessage(tab, message, callback) {

    var tabId = tab.id;
    console.log("sending ping... to tab:  %s ", tab.url);
    chrome.tabs.sendMessage(tabId, 'Are you there?',
        function(response) {
            var condit1 = (typeof response === 'undefined');
            var condit2 = (response === 'Yes');
            if (condit1 === false) { // Content script does send response
                if (condit2) {
                    console.log(':) contentScript exist & respond correct @ tab %s ', tab.url);
                    chrome.tabs.sendMessage(tabId, message, callback);
                    logAllProps('msg sending to content script : ', message);
                } else {
                    console.log('content script exist but wrong response!');
                    // do nothing
                }
            } else {
                console.log("No Response from @ tab %s ", tab.url);
                //suppose we have only 1 content script declaration in manifest
                // that is why we put (0) in getNthContentScript
                var contentScript = getNthContentScript(0);
                var jss = contentScript.js; //js files

                var detail0 = { // the 0th js file
                    file: jss[0],
                    allFrames: contentScript.all_frames,
                    runAt: contentScript.run_at
                };

                var detail1 = { // the 1st js file
                    file: jss[1],
                    allFrames: contentScript.all_frames,
                    runAt: contentScript.run_at
                };

                chrome.tabs.executeScript(tabId, detail0,
                    function() {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                            throw Error("Unable to inject 0th script into tab ", tab.url);
                        }
                        console.log('OK, 0th script injected and ready');

                        chrome.tabs.executeScript(tabId, detail1,
                            function() {
                                if (chrome.runtime.lastError) {
                                    console.error(chrome.runtime.lastError);
                                    throw Error("Unable inject 1th script into " + tab.url);
                                }
                                console.log('OK, 1st script injected and ready');
                                console.log('let us test if content can respond now');
                                callbackExeScript(tabId, message, callback);
                            });
                    });
            }
        });
}


function callbackExeScript(tabId, message, callback) {

    // This function always fires *after* the attempt to run the code
    var exec_error = setTimeout(onError, 500);
    chrome.tabs.sendMessage(tabId, 'Are you there?',
        function(yes_no) {
            if (yes_no === 'Yes') {
                clearTimeout(exec_error);
                onSuccess(tabId, message, callback);
            }
        });
}


// On error and on success, this happens:
function onError() {
    console.log('onError() content script respond wrong!');
}

function onSuccess(tabId, message, callback) {
    console.log('content script can respond now !');

    chrome.tabs.sendMessage(tabId, message, callback);
    var prefix = 'sending message to tab with ID ' + tabId;
    logAllProps(prefix, message);
}


function sendCustomInfo(queryInfo, customInfo, callback) {

    tabsSendCustomInfo(queryInfo, customInfo, callback);

}

function tabsSendCustomInfo(queryInfo, customInfo, callback) {

    chrome.tabs.query(queryInfo,
        //However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab. 
        function(oldtabs) {
            // filter "chrome:// " like URLS
            var pattern = getPatternsCont();
            console.log('there are %d  tabs before filter: ', oldtabs.length);
            oldtabs.forEach(function(oldtab) {
                console.log(oldtab.url)
            });

            newtabs = oldtabs.filter(function(tab) {
                return pattern.test(tab.url);
            });
            console.log('there are %d tabs after filter:', newtabs.length);
            newtabs.forEach(function(newtab) {
                console.log(newtab.url)
            });

            if (newtabs.length > 0) {
                newtabs.forEach(function(tab) {
                    ensureSendMessage(tab, customInfo, callback);
                });
            }
        });
}


function getNthContentScript(indx) {

    var content_scripts = chrome.runtime.getManifest().content_scripts;
    // Exclude CSS files - CSS is automatically inserted.
    content_scripts = content_scripts.filter(function(content_script) {
        return content_script.js && content_script.js.length > 0;
    });

    var content_script = content_scripts[indx]; // script without 's'
    return content_script;
}


function getPatternsCont() {

    var content_script = getNthContentScript(0);
    var parsed = content_script.matches.map(parse_match_pattern)
        .filter(function(pattern) {
            return pattern !== null
        });
    // Create pattern for validation:            		
    var pattern = new RegExp(parsed.join('|'));
    return pattern;
}


function injectScripts(tab, content_script) {


    content_script.js.forEach(function(js) {
        console.debug('mylib.js injecting %s into %s', js, tab.url);
        console.debug(content_script.all_frames + ' & ' + content_script.run_at);
        chrome.tabs.executeScript(tab.id, {
            file: js,
            allFrames: content_script.all_frames,
            runAt: content_script.run_at
        });
    });
}


/**
 * @param String input  A match pattern
 * @returns  null if input is invalid
 * @returns  String to be passed to the RegExp constructor */
function parse_match_pattern(input) {
    if (typeof input !== 'string') return null;
    var match_pattern = '(?:^',
        regEscape = function(s) {
            return s.replace(/[[^$.|?*+(){}\\]/g, '\\$&');
        },
        result = /^(\*|https?|file|ftp|chrome-extension):\/\//.exec(input);

    // Parse scheme
    if (!result) return null;
    input = input.substr(result[0].length);
    match_pattern += result[1] === '*' ? 'https?://' : result[1] + '://';

    // Parse host if scheme is not `file`
    if (result[1] !== 'file') {
        if (!(result = /^(?:\*|(\*\.)?([^\/*]+))(?=\/)/.exec(input))) return null;
        input = input.substr(result[0].length);
        if (result[0] === '*') { // host is '*'
            match_pattern += '[^/]+';
        } else {
            if (result[1]) { // Subdomain wildcard exists
                match_pattern += '(?:[^/]+\\.)?';
            }
            // Append host (escape special regex characters)
            match_pattern += regEscape(result[2]);
        }
    }
    // Add remainder (path)
    match_pattern += input.split('*').map(regEscape).join('.*');
    match_pattern += '$)';
    return match_pattern;
}