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

const list = [{
    app: zhongqing1,
    last: 1000 * 60 * 400
}, {
    app: zhongqing,
    last: 1000 * 60 * 200
}];
schedueList = [];

module.exports = () => doAllSchedule(list, schedueList);