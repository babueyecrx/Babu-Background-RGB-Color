function sendColorPickerInfo(id, hex) {
    var customInfo = {
        from: 'popup',
        to: 'content',
        subFrom: 'colpick_lib.js  :  id = ' + id,
        subject: 'setColorTheme'
    };

    if (id == 'fontColorPicker') {
        customInfo.type = 'both';
        customInfo.customColor = '#' + hex;
        customInfo.customBGColor = '#' + getHexCode('BGColorPicker');
        $('#fontColorPicker').text(hex);

        localStorage.setItem('futureFontColor', '#' + hex);
    } else if (id == 'BGColorPicker') {
        customInfo.type = 'both';
        customInfo.customColor = '#' + getHexCode('fontColorPicker');
        customInfo.customBGColor = '#' + hex;
        $('#BGColorPicker').text(hex);
        localStorage.setItem('futureBGColor', '#' + hex);
    }

    if (localStorage.getItem('noRepeat') === 'plzNoRepeat') {
        console.log('myselect option has already sent the same msg to set info');
        localStorage.setItem('noRepeat', 'released');
    } else {
        currentTabSendCustomInfo(customInfo, function(response) {
            console.log('response in colpick_lib.js');
            judgeRepsonse(response);
        });
    }
}


function getHexCode(id) {

    var hexVal = $.colpick.hsbToHex($('#' + $('#' + id).data('colpickId')).data('colpick').color);
    console.log('get hex code for ' + id + 'returns ' + hexVal);
    return hexVal;
    /*
     * var hsbVal= $('#' + $('#BGColorPicker').data('colpickId')).data('colpick').color
Object {h: 204.82758620689654, s: 69.04761904761905, b: 32.94117647058823}

$.colpick.hsbToHex(hsbVal)

var fontHexVal=$.colpick.hsbToHex($('#' + $('#fontColorPicker').data('colpickId')).data('colpick').color);
var BGhexVal=$.colpick.hsbToHex($('#' + $('#BGColorPicker').data('colpickId')).data('colpick').color);
     *
     * $('#BGColorPicker').css("border-color")
     *
     * $.colpick.rgbToHex({r:26,g:60,b:84})"1a3c54"
     */

}