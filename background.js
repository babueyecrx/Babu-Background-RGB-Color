//background.js 需要先卸载extension, 不然只是ctrl+r不会更新它滴
//日誌控制
var manifest = chrome.runtime.getManifest()
if (manifest.key === undefined) //debug versoin
{
    chrome.storage.local.set({
        'progMode': 'debug'
    }, function() {});

} else { //product version
    chrome.storage.local.set({
        'progMode': 'product'
    }, function() {});
}
//end of 日誌控制


function initLocalStorage() {

    if (localStorage.getItem('state') == null) {
        console.log('第一次工作， 設置state初始值爲enable');
        localStorage.setItem('state', 'enable');
    }

    if (localStorage.getItem('fontColorArr') == null) {
        fontColorArr = ["#252923","#dce8d5”,”#383b30", "#383b30", "#000000", "#000000", "#383b30", "#252923", "#000000", "#dce8d5", "#0A296E", "#a1e365"];
        bgColorArr = ["#a5cca5","#306330”,”#f8e0cb", "#a1e365", "#ffebd2", "#4b8b0c", "#f8e0cb", "#a5cca5", "#FFFFFF", "#306330", "#8C7723", "#001100"];
        var strFontColorArr = JSON.stringify(fontColorArr);
        var strBGColorArr = JSON.stringify(bgColorArr);
        localStorage.setItem('fontColorArr', strFontColorArr);
        localStorage.setItem('bgColorArr', strBGColorArr);
    }

    if (localStorage.getItem('futureFontColor') == null) {
        localStorage.setItem('futureFontColor', fontColorArr[0]);
        localStorage.setItem('futureBGColor', bgColorArr[0]);
    }

}

function updateState() {
    if (localStorage.getItem('state') == 'enable') {
        //Set some content from background page
        chrome.storage.local.set({
                "switchState": "enable"
            },
            function() {
                console.log(" switchState set to be 'enable' in background.js ");
            });
    } else {
        //Set some content from background page
        chrome.storage.local.set({
                "switchState": "disable"
            },
            function() {
                console.log("switchState set to be 'disable' in background.js ");
            });
    }
}

function constructBGMSG() {
    var customInfo = {
        from: 'background',
        subject: 'useLastTheme'
    };
    customInfo.customColor = localStorage.getItem('futureFontColor');
    customInfo.customBGColor = localStorage.getItem('futureBGColor');
    return customInfo;
}

initLocalStorage();
updateState();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    updateState();
    chrome.storage.local.get("switchState",
        function(result) {
            if (result.switchState == 'enable') {

                if (changeInfo.status == 'complete') {
                    console.log('選項卡載入完成' + ' id ' + tab.id + ' url: ' + tab.url);
                    chrome.tabs.sendMessage(tab.id, constructBGMSG(),
                        function(response) {});
                }
            }
        });
});


var chrome_notification_create = function() {
    
    // This is just for later usage not considered now
    
    var options = {
                type:'basic',
                iconUrl:chrome.runtime.getURL("imgs/se/se128_green.png"),
                title : "This is our new icon",
                message: "Only a notice, You do not have to do anything",
                priority:1,
                buttons:[{
                           title:'thank you'
                        },
                    {
                        title:'have a nice day'
                    }
                ],
                requireInteraction: true                
    }

    chrome.notifications.create(
            'id1',
            options,
            function() {
                console.log(chrome.runtime.lastError);
            }
    );
}

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
       var newURL = "https://www.youtube.com/watch?v=8HNi5nH1lgU";
       chrome.tabs.create({ url: newURL });

    } else if (details.reason == "update") {

       chrome_notification_create();
       //only once
    }
});