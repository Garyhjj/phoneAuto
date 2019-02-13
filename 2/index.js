const zhongqing = require('./zhongqing'),
    zhongqing1 = require('./zhongqing1'),
    tou = require('./tou'),
    tou2 = require('./tou2'),
    haicao = require('./haicao'),
    haicao2 = require('./haicao2'),
    book = require('./book1'),
    book2 = require('./book2'),
    {
        doAllSchedule
    } = require('../util');

// const list = [{
//     app: tou2,
//     last: 1000 * 60 * 300
// }];

schedueList = [];
const list = []

async function aa(i) {
    if (i < 20) {
        await zhongqing.controller.click(500, 570);
        await zhongqing.controller.wait(63000);
        await zhongqing.controller.back();
        await zhongqing.controller.wait(1000);
        aa(i + 1);
    }
}
aa(0)

module.exports = () => doAllSchedule(list, schedueList);