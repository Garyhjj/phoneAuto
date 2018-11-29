const zhongqing = require('./zhongqing'),
    tou = require('./tou'),
    tou2 = require('./tou2'),
    haicao = require('./haicao'),
    book = require('./book1'),
    {
        doAllSchedule
    } = require('../util');

const list = [{
    app: tou2,
    last: 1000 * 60 * 20
}, {
    app: tou,
    last: 1000 * 60 * 20
}, {
    app: zhongqing,
    last: 1000 * 60 * 30
}];
schedueList = [book.controller, haicao.controller];

module.exports = () => doAllSchedule(list, schedueList);