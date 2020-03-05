var seq_interval = 400;

function initColorPicker() {
    console.log('initializing color pickers');
    $('#fontColorPicker').colpick({
        flat: false,
        layout: 'hex',
        submit: '0',
        colorScheme: 'light',
        onChange: function(hsb, hex, rgb, el, bySetColor) {
            $(el).css('border-color', '#' + hex);
            if (!bySetColor) $(el).val(hex);
            console.log('#' + 'fontColorPicker' + ' on change event , new hex code : ' + hex);
            sendColorPickerInfo('fontColorPicker', hex);

        }
    }).keyup(function() {
        $(this).colpickSetColor(this.value, true);
    });


    $('#BGColorPicker').colpick({
        flat: false,
        layout: 'hex',
        submit: '0',
        colorScheme: 'light',
        onChange: function(hsb, hex, rgb, el, bySetColor) {
            $(el).css('border-color', '#' + hex);
            if (!bySetColor) $(el).val(hex);
            console.log('#' + 'BGColorPicker' + ' on change event , new hex code : ' + hex);
            sendColorPickerInfo('BGColorPicker', hex);

        }
    }).keyup(function() {
        $(this).colpickSetColor(this.value, true);
    });


}

function myfunction() {
    longfunctionfirst(shortfunctionsecond);
}

function shortfunctionsecond() {
    //setTimeout('console.log("second function finished");', 500);
};

function longfunctionfirst(callback) {
    setTimeout(function() {
        console.log('first function finished');
        if (typeof callback == 'function')
            callback();
    }, seq_interval);
}




function sequentialSet(lastFontColor, lastBGColor, setBGPicker) {
    $('#fontColorPicker').colpickSetColor(lastFontColor, true);
    longfunctionfirst(function() {
        setBGPicker(lastBGColor);
    });

}

function setBGPicker(lastBGColor) {
    $('#BGColorPicker').colpickSetColor(lastBGColor, true);
    //setTimeout('console.log("second function finished");', seq_interval);
}


function loadLayout() {
    var workstate = localStorage.getItem('state');
    console.log('reading workstate = ' + workstate);
    var myDate = new Date();
    console.log(' @ ' + myDate.toString());
    if (workstate == 'enable') {
        console.log(' switch open ');
        $('#enableSwitchButton').bootstrapSwitch('toggleState');
        $('#enableSwitchButton').bootstrapSwitch('state', true, true);
    } else {
        console.log(' switch closed ');
        $('#enableSwitchButton').bootstrapSwitch('toggleState');
        $('#enableSwitchButton').bootstrapSwitch('state', false, false);
    }
    var textEnable = chrome.i18n.getMessage("labelEnable");
    var textDisable = chrome.i18n.getMessage("labelDisable");
    $('#enableSwitchButton').bootstrapSwitch('size', 'large');
    $('#enableSwitchButton').bootstrapSwitch('onText', textDisable);
    $('#enableSwitchButton').bootstrapSwitch('offText', textEnable);

    if (workstate == 'enable') {
        $("#mainPart").css('display', 'block');
    } else {
        $("#mainPart").css('display', 'none');
    }

    //col picker master
    localStorage.setItem('noRepeat', 'plzNoRepeat'); //no send at initializing    
    initColorPicker();


    var lastFontColor = localStorage.getItem('futureFontColor');
    var lastBGColor = localStorage.getItem('futureBGColor');

    sequentialSet(lastFontColor, lastBGColor, setBGPicker);
    //$('#fontColorPicker').colpickSetColor(lastFontColor, true);
    //setTimeout(setBGPicker(lastBGColor), 500);

    console.log('font color picker set to ' + lastFontColor);
    console.log('background color picker set to ' + lastBGColor);

    // color option list
    var fontColorArr = JSON.parse(localStorage.getItem('fontColorArr'));
    var bgColorArr = JSON.parse(localStorage.getItem('bgColorArr'));

    var n = getLenColorArr();
    for (var i = 0; i < n; i++) {
        var fontColor = fontColorArr[i];
        var bgColor = bgColorArr[i];
        tailInsertOption(i, fontColor, bgColor);
    }


}