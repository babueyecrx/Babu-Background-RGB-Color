document.write('<script src="select_option_lib.js"><\/script>'); //保留
document.write('<script src="array_deal.js"><\/script>'); //保留
document.write('<script src="colpick_lib.js"><\/script>'); //保留
document.write('<script src="init_lib.js"><\/script>'); //保留
//injectSend.js
document.write('<script src="injectSend.js"><\/script>');


function setDOMInfo(info) {
    logAllProps('從content_script得到回饋消息:  ', info);
}

function currentTabSendCustomInfo(customInfo) {
    var queryInfo = {
        status: 'complete',
        active: true
    };
    sendCustomInfo(queryInfo, customInfo, setDOMInfo);
}


/////////////////以下函數已經被替換成injectSend.js裏的
///////除了popup.js colpick_lib.js也調用了currentTabSendCustomInfo