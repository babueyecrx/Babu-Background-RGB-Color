var cstorage = chrome.storage.local;

function constructPPMSG() {
    var customInfo = {
        from: 'popup',
        subject: 'useLastTheme'
    };
    customInfo.customColor = localStorage.getItem('futureFontColor');
    customInfo.customBGColor = localStorage.getItem('futureBGColor');
    return customInfo;
}

document.addEventListener("DOMContentLoaded",
    function() {
        console.debug("DOMContentLoaded");
        // initLocalStorage();   moved to background.js
        loadLayout();
        //每次用戶打開popup界面，讓上次的樣式生效
        if (localStorage.getItem('state') == 'enable') {
            //copy the last theme msg same as in background
            currentTabSendCustomInfo(constructPPMSG());
        }
        //列表選項變化事件的響應函數
        $('#mySelect').bind('change',
            function() {
                var customInfo = {
                    from: 'popup',
                    subFrom: 'mySelect',
                    subject: 'setColorTheme'
                };
                var theme_index = $('#mySelect').val();
                var checkIndex = $("#mySelect").get(0).selectedIndex;

                var i = checkIndex;
                console.debug('#mySelect value = %d, selectedIndex = %d', Number(theme_index), checkIndex);
                //change the text to highlight selected option
                highlightOption('mySelect');

                var colorPair = ['font', 'bg'];
                colorPair = getItemPair(i);
                var fontColor = colorPair[0];
                var bgColor = colorPair[1];

                customInfo.customColor = fontColor;
                customInfo.customBGColor = bgColor;
                customInfo.type = 'both';
                currentTabSendCustomInfo(customInfo); //!!changes in picker will also send this msg
                localStorage.setItem('noRepeat', 'plzNoRepeat'); //!!so prevent it
                // 這個樣式 存起來給以後用 
                localStorage.setItem('futureFontColor', fontColor);
                localStorage.setItem('futureBGColor', bgColor);
                // 同步 color picker , 以 seq_interval = 400ms 的間隔先後設置2個picker
                sequentialSet(fontColor, bgColor, setBGPicker);
            });

        //保存新樣式按鈕的響應函數
        $('#saveItem').bind('click',
            function() {
                var n = getLenColorArr();
                var fontColor = '#' + getHexCode('fontColorPicker');
                var bgColor = '#' + getHexCode('BGColorPicker');
                /*已註釋
                //界面列表裏加入新item的操作
                //item置入列表的尾端
                                tailInsertOption(n, fontColor, bgColor);
                //local storage顏色數組操作//新記錄置入數組的尾端
                                tailAddItemColorArr(fontColor, bgColor);
                已註釋*/

                //新的，在开头加------
                //item置入列表的开头
                headInsertOption('mySelect', fontColor, bgColor);
                //local storage顏色數組操作//新記錄置入數組的开头
                headAddItemColorArr(fontColor, bgColor);
                //end of新的，在开头加------
            });

        //刪除當前樣式按鈕的響應函數
        $('#deleteItem').bind('click',
            function() {
                //界面列表裏刪除item的操作
                rmSelItemAJumpNext('mySelect'); //替换原来的函数

                //local storage顏色數組操作
                var theme_index = $('#mySelect').val();
                var k = Number(theme_index);
                delItemColorArr(k); // k for array index
            });

        //關閉窗口圖片的響應函數
        $('#close').bind('click', function() {
            window.close();
        });

        //撥動開關的響應函數
        $('#enableSwitchButton').on('switchChange.bootstrapSwitch',
            function(event, state) {
                console.log('開關有變動事件發生哦');
                //set color on current page
                var customInfo = {
                    from: 'popup',
                    subFrom: 'enableSwitchButton',
                    subject: 'switch',
                    newValue: state
                };

                customInfo.customColor = localStorage.getItem('futureFontColor');
                customInfo.customBGColor = localStorage.getItem('futureBGColor');
                currentTabSendCustomInfo(customInfo);

                if (state === true) {
                    console.debug('開關撥到 邏輯 真 ...');
                    localStorage.setItem('state', 'enable');

                    $("#mainPart").css('display', 'block');
                    $("#rightPart").css('display', 'none');

                    chrome.browserAction.setIcon({
                        path: 'imgs/se/se128_green.png'
                    });
                } else {
                    console.debug('開關撥到 邏輯 假 ...');
                    localStorage.setItem('state', 'disable');

                    $("#mainPart").css('display', 'none');
                    $("#rightPart").css('display', 'block');

                    chrome.browserAction.setIcon({
                        path: 'imgs/se/se128_grey.png'
                    });
                }
            });
    });