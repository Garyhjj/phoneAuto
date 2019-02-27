const zhongqing = require('./zhongqing'),
    zhongqing1 = require('./zhongqing1'),
    tou = require('./tou'),
    tou2 = require('./tou2'),
    haicao = require('./haicao'),
    haicao2 = require('./haicao2'),
    book = require('./book1'),
    book2 = require('./book2'),
    weiTouTiao = require('./weiTouTiao'),
    {
        doAllSchedule
    } = require('../util');

const list = [{
    app: weiTouTiao,
    last: 1000 * 60 * 300
}];

schedueList = [];
// const list = []

// async function aa(i) {
//     if (i < 40) {
//         await zhongqing.controller.click(350, 570);
//         await zhongqing.controller.wait(36000);
//         await zhongqing.controller.back();
//         await zhongqing.controller.wait(1000);
//         aa(i + 1);
//     }
// }
// aa(0)


module.exports = () => doAllSchedule(list, schedueList);