//find . |grep -r  delOneOption
function reHtmlOption(id) { //设置value，html
    var selector = $('#' + id); // 列表的selecgtor, 它里面选项的val是0,1,2 数组序号
    var textSelected = chrome.i18n.getMessage("textSelected");
    var textStyle = chrome.i18n.getMessage("textStyle");

    $("#" + id + " option").each(function(index, element) {
        $(this).html(''); //先清空文字
    });

    $("#" + id + " option").each(function(index, element) {
        $(this).val(index); //把index设置成value
        $(this).html("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + textStyle + $(this).val());
    }); //option的val
}

function rmSelItemAJumpNext(id) {
    //nextIndexToSelect is the item before current one
    //remember the index of selected option before remove
    var selectedIndex = $("#" + id + " option:selected").index();
    var lastIndex = $("#" + id + " option:last").index();
    var indx = selectedIndex;
    if (indx === -1) {
        console.log('no option selected');
        var nextIndexToSelect = lastIndex; //no item removed. 
    } else {
        $("#" + id + " option:selected").remove();
        reHtmlOption(id); //重新根據index編排value 和html
        var nextIndexToSelect = indx - 1;
        var optionalIndexToSelect = indx; //optional if no item before it
    }
    //select and highlight the option before it,if none,select and HL option after it
    var toSelect = '';
    if (nextIndexToSelect >= 0) {
        toSelect = $("#" + id + " option")[nextIndexToSelect];
    } else if (optionalIndexToSelect >= 0) { //if none,select and HL option after it
        toSelect = $("#" + id + " option")[optionalIndexToSelect];

    } else {}
    if (toSelect !== undefined) {
        toSelect.selected = true;
    }
    // not work? highlightOption  called auto:rm or add causes select change event
    highlightOption(id);
}
/*
top   before
--option1
--option2
--option3
below  after
*/

function highlightOption(id) {
    console.log('以改變文字的方式高亮選中項目');
    var selector = $('#' + id); // 列表的selecgtor, 它里面选项的val是0,1,2 数组序号
    var textSelected = chrome.i18n.getMessage("textSelected");
    var textStyle = chrome.i18n.getMessage("textStyle");
    $("#" + id + " option").each(function(index, element) {
        $(this).html(''); //先清空
    });
    $("#" + id + " option:selected").html('*' + textSelected + '--' + textStyle + selector.val());
    $("#" + id + " option:not(:selected)").each(function(index, element) {
        $(this).html("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + textStyle + $(this).val());
    });
    /*

        var colorPair = ['font', 'bg'];
        colorPair = getItemPair(selector.val());//.val() 恰好也是顏色數組的索引值，在本程式裏
        var fontColor = colorPair[0];
        var bgColor = colorPair[1];

    */
}

//不要删除以下这个函数，因为初始化layout会用到滴
function tailInsertOption(indx, fontColor, bgColor) {
    //new一個item
    var y = document.createElement('option');
    y.text = '  scheme ' + indx; //這個文字會被highlightOption替換
    y.value = indx; //only number, no string plz
    //根據傳入參數設置前景/背景顏色
    y.style.color = fontColor;
    y.style.backgroundColor = bgColor;
    y.style.height = "30px";

    //把item置入列表的尾端
    var x = document.getElementById("mySelect");
    x.add(y, null); // standards compliant, not for IE
    //選中剛加入的item
    x.options[indx].selected = true;
    //文字高亮显示
    highlightOption('mySelect');
}

//==============================编辑中
function headInsertOption(id, fontColor, bgColor) {
    //new一個item
    var y = document.createElement('option');
    y.text = '  scheme ' + '0'; //這個文字會被highlightOption替換
    //-- .val() 恰好也是顏色數組的索引值，在本程式裏
    //-- 开头的index = 0
    y.value = 0; //only number, no string plz

    //根據傳入參數設置前景/背景顏色
    y.style.color = fontColor;
    y.style.backgroundColor = bgColor;
    y.style.height = "30px";

    //把item置入列表的開頭
    $("#" + id).prepend(y);
    reHtmlOption(id); //重新根據index編排value 和html

    //選中剛加入的item
    var indexToSelect = 0; //第一個所以是0
    var toSelect = $("#" + id + " option")[indexToSelect];
    if (toSelect !== undefined) {
        toSelect.selected = true;
    }
    //文字高亮顯示
    // not work? highlightOption  called auto:rm or add causes select change event
    highlightOption(id);
}

//end of ==========================编辑中