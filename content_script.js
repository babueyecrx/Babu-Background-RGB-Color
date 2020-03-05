//日誌控制
chrome.storage.local.get('progMode', function(result) {
    if (result.progMode == 'product') {
        //'取消日志'
        console.log = function() {}
    }
});
//end of 日誌控制
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
//新類--------------------------------------------
//-----variable  declarations for clor style-----
var myClsName = "wangYeDeYanSe"; //id name +='id'
var myStyleSheetID = myClsName + 'id';

//---begin of 新類別和新樣式表的函數-----
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function bodyFullAddClass(newClsName) {
    if (!$('head').hasClass(newClsName)) { //有些網頁沒有body，所以選擇用head判斷
        console.log('not yet have this class, will add it now');
        //$("*").addClass(newClsName);//这是原来的一刀切做法
        $('*').not('input').addClass(newClsName); //輸入框排除在外
    } else {
        console.log('already have this class, will not add again');
    }
}


function bodyFullRmClass(newClsName) {
    if ($('head').hasClass(newClsName)) {
        console.log('it does have this class, will remove it now');
        $("*").removeClass(newClsName);
    } else {
        console.log('this class does not exist, so remove action will not take place');
    }
}

function removeStyleSheet(StyleSheetID) {
    obj = document.getElementById(StyleSheetID);
    if (obj) {
        obj.remove();
    }
}
//創立樣式表
function createStyleSheet(clsName, StyleSheetID, ftColor, bgColor) {
    console.log('creating... ftcolor: ' + ftColor + '  bgColor: ' + bgColor);
    var obj = document.getElementById(StyleSheetID);
    if (obj) {
        removeStyleSheet(StyleSheetID);
    }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = StyleSheetID;
    if ((ftColor === null) || (bgColor === null)) {
        if ((ftColor === null) && (bgColor === null)) {
            style.innerHTML = '.' + clsName + '{ }';
        } else {

            if (ftColor === null) {
                style.innerHTML = '.' + clsName + '{ background-color: ' + bgColor + '!important' + '}';
            }
            if (bgColor === null) {
                style.innerHTML = '.' + clsName + '{ color:' + ftColor + '!important' + '}';
            }
        }

    } else {
        style.innerHTML = '.' + clsName + '{ color:' + ftColor + '!important' + '; background-color: ' + bgColor + '!important' + '}';
    }

    //console.log('style.innerHTML');
    //console.log(style.innerHTML);
    //.wangYeDeYanSe{ color:#383b30!important; background-color: #f8e0cb!important}
    style.innerHTML += 'a:link { text-decoration:underline; }';
    /*
    .類名{ color:#53cc1b!important; background-color: #011401!important}
    */
    var objHead = document.getElementsByTagName('head')[0];
    if (objHead) {
        objHead.appendChild(style);
    }
}

function modifyStyleSheet(newclsName, StyleSheetID, newftColor, newbgColor) {
    console.log('modifying : ftcolor ' + newftColor + '  bgColor: ' + newbgColor);
    console.log('type of newftColor ' + typeof(newftColor));
    console.log('type of newbgColor ' + typeof(newbgColor));
    var obj = document.getElementById(StyleSheetID);
    if (obj) {
        removeStyleSheet(StyleSheetID);
        createStyleSheet(newclsName, StyleSheetID, newftColor, newbgColor);
    } else {
        createStyleSheet(newclsName, StyleSheetID, newftColor, newbgColor);
    }

}

function functionName(fun) {
    var ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}

function modifyColor(msg) {
    for (var name in msg) {
        console.log('modifyColor L107: ' + String(name) + ' : ' + msg[name] + ' : ' + typeof(msg[name]));
    }

    var fontColor = msg.customColor;
    var BGColor = msg.customBGColor;

    //例如fontColor = 'green';
    //BGColor = 'yellow';
    if (msg.type == 'both') {
        console.log('modifyColor L112 fontColor: ' + fontColor + ' : ' + 'typeof(fontColor):' + typeof(fontColor));
        console.log('modifyColor L113 BGColor: ' + BGColor + ' : ' + 'typeof(BGColor)' + typeof(BGColor));
        modifyStyleSheet(myClsName, myStyleSheetID, fontColor, BGColor);
    } else if (msg.type == 'fontColor') {

        console.log('modifyColor L112 fontColor: ' + fontColor + ' : ' + 'typeof(fontColor):' + typeof(fontColor));
        console.log('modifyColor L113 BGColor null ');

        BGColor = null;
        modifyStyleSheet(myClsName, myStyleSheetID, fontColor, BGColor);
    } else if (msg.type == 'BGColor') {
        fontColor = null;
        console.log('modifyColor L112 fontColor null ');
        console.log('modifyColor L113 BGColor: ' + BGColor + ' : ' + 'typeof(BGColor)' + typeof(BGColor));

        modifyStyleSheet(myClsName, myStyleSheetID, fontColor, BGColor);
    } else {
        console.log('msg type not correct, do nothing');
    }
}

//end of 新類別和新樣式表的函數---------------------------


chrome.extension.onMessage.addListener(function(req, sender, respond) {
    if (req === 'Are you there?') {
        respond('Yes');
    }
});

// Content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.ping) {
        console.log('ping ... received');
        sendResponse({
            pong: true
        });
        return;
    }
    document.dispatchEvent(new CustomEvent('Buffer2Remote', {
        todo: "LOL"
    }));
});

/* Listen for message from the popup or background */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var feedback = {
        type: 'test',
        result: "response from content script"
    };
    sendResponse(feedback);

    /* First, resultidate the message's structure */
    if ((msg.from === 'background') && (msg.subject === 'useLastTheme')) {
        logAllProps('背景頁發來消息要求使用最後一次的樣式', msg);

        chrome.storage.local.get("switchState",
            function(result) {
                if (result.switchState == 'enable') {
                    console.log(' content script read control state as enable');
                    var fontColor = msg.customColor;
                    var BGColor = msg.customBGColor;
                    console.log(' content script last theme ' + fontColor + ' on ' + BGColor);
                    createStyleSheet(myClsName, myStyleSheetID, fontColor, BGColor);
                    bodyFullAddClass(myClsName);
                }
            });
    }
    if ((msg.from === 'popup') && (msg.subject === 'useLastTheme')) {
        logAllProps('popup頁發來消息要求使用最後一次的樣式', msg);
        chrome.storage.local.get("switchState",
            function(result) {
                if (result.switchState == 'enable') {
                    console.log(' content script read control state as enable');
                    var fontColor = msg.customColor;
                    var BGColor = msg.customBGColor;
                    console.log(' content script last theme ' + fontColor + ' on ' + BGColor);
                    createStyleSheet(myClsName, myStyleSheetID, fontColor, BGColor);
                    bodyFullAddClass(myClsName);
                }
            });
    }

    /* First, resultidate the message's structure */
    if ((msg.from === 'popup') && (msg.subject === 'setColorTheme')) {
        logAllProps('popup頁發來消息 設置新的樣式', msg);

        chrome.storage.local.get("switchState",
            function(result) {
                console.log('content script switchState: ' + result.switchState);
                if (result.switchState == 'enable') {
                    // add code
                    modifyColor(msg);
                }
            });
    }
    return true;
});


/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /*disableColorExtension*/
    if ((msg.from === 'popup') && (msg.subject === 'switch')) {
        logAllProps('popup頁發來消息 開關變動', msg);
        if (msg.newValue === true) {
            var fontColor = msg.customColor;
            var BGColor = msg.customBGColor;
            console.log(' content script last theme ' + fontColor + ' on ' + BGColor);
            createStyleSheet(myClsName, myStyleSheetID, fontColor, BGColor);
            bodyFullAddClass(myClsName);

            chrome.storage.local.set({
                    "switchState": "enable"
                },
                function() {
                    console.log(" 在內容頁將switchState設置爲enable ");
                    console.log("=================================");
                });
        } else {
            //window.location.reload();
            removeStyleSheet(myStyleSheetID);
            bodyFullRmClass(myClsName);
            chrome.storage.local.set({
                    "switchState": "disable"
                },
                function() {
                    console.log(" 在內容頁將switchState設置爲disable ");
                    console.log("=================================");
                });
        }
    }
});

chrome.storage.local.get("switchState",
    function(result) {
        if (result.switchState === 'enable') {
            bodyFullAddClass(myClsName);
        }
    });