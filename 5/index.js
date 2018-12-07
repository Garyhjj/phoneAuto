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
    app: zhongqing,
    last: 1000 * 60 * 180
}];

schedueList = [];
doAllSchedule(list, schedueList);
module.exports = () => doAllSchedule(list, schedueList);