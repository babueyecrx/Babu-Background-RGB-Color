function delItemColorArr(indx) {
    var fontColorArr = JSON.parse(localStorage.getItem('fontColorArr'));
    var bgColorArr = JSON.parse(localStorage.getItem('bgColorArr'));

    fontColorArr.splice(indx, 1); //indx--where from to del，1-- how many to del
    bgColorArr.splice(indx, 1);

    var strFontColorArr = JSON.stringify(fontColorArr);
    var strBGColorArr = JSON.stringify(bgColorArr);
    localStorage.setItem('fontColorArr', strFontColorArr);
    localStorage.setItem('bgColorArr', strBGColorArr);
}


function headAddItemColorArr(itemFontColor, itemBGColor) {

    var fontColorArr = JSON.parse(localStorage.getItem('fontColorArr'));
    var bgColorArr = JSON.parse(localStorage.getItem('bgColorArr'));

    //unshift : 向数组的末尾添加一个或多个元素
    fontColorArr.unshift(itemFontColor);
    bgColorArr.unshift(itemBGColor);

    var strFontColorArr = JSON.stringify(fontColorArr);
    var strBGColorArr = JSON.stringify(bgColorArr);
    localStorage.setItem('fontColorArr', strFontColorArr);
    localStorage.setItem('bgColorArr', strBGColorArr);
}



function tailAddItemColorArr(itemFontColor, itemBGColor) {

    var fontColorArr = JSON.parse(localStorage.getItem('fontColorArr'));
    var bgColorArr = JSON.parse(localStorage.getItem('bgColorArr'));
    //push : 向数组的末尾添加一个或多个元素
    fontColorArr.push(itemFontColor);
    bgColorArr.push(itemBGColor);

    var strFontColorArr = JSON.stringify(fontColorArr);
    var strBGColorArr = JSON.stringify(bgColorArr);
    localStorage.setItem('fontColorArr', strFontColorArr);
    localStorage.setItem('bgColorArr', strBGColorArr);
}



function getLenColorArr() {
    //var fontColorArrParsed = JSON.parse(localStorage.getItem('fontColorArr'));
    var bgColorArrParsed = JSON.parse(localStorage.getItem('bgColorArr'));
    var arrLen = bgColorArrParsed.length;
    return arrLen;
}

function getItemPair(i) {
    //fetch the i th item in color array for list
    var fontColorArr = JSON.parse(localStorage.getItem('fontColorArr'));
    var bgColorArr = JSON.parse(localStorage.getItem('bgColorArr'));
    var colorPair = ['font', 'bg'];
    colorPair[0] = fontColorArr[i];
    colorPair[1] = bgColorArr[i];
    return colorPair;

}