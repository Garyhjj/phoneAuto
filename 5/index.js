const zhongqing = require('./zhongqing'),
    tou = require('./tou'),
    tou1 = require('./tou1'),
    haicao = require('./haicao'),
    book1 = require('./book1'),
    book2 = require('./book2'),
    {
        doAllSchedule
    } = require('../util');

const list = [{
    app: haicao,
    last: 1000 * 60 * 80
}, {
    app: zhongqing,
    last: 1000 * 60 * 80
}, {
    app: tou,
    last: 1000 * 60 * 80
}, ];

schedueList = [];

module.exports = () => doAllSchedule(list, schedueList);