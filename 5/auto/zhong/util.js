var zhongQing = 'weishang.wxrd';
var util = require('../util.js');
var launch = util.launch;
function lauchZQ() {
    home();
    sleep(5000);
    launch('中青看点');
    if (!isActivityExists(zhongQing, 15000)) {
        lauchZQ();
    };
    sleep(15000);
    back();
    sleep(3000);
    back();
    sleep(3000);
}


function intoZhongQingRenWu(type) {
    click(980, 1880);
    sleep(4000);
    click('任务中心');
    var str
    if (type === 1) {
        str = '看看赚'
    } else if (type === 2) {
        str = '搜索'
    }
    while (!textContains(str).exists()) {
        sleep(1000);
    }
    textContains(str).findOne().click();
    while (!textContains('任务说明').exists()) {
        sleep(1000);
    }
}

module.exports = {
    lauchZQ: lauchZQ,
    intoZhongQingRenWu: intoZhongQingRenWu
}