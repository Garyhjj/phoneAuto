const zhongqing = require('./zhongqing'),
zhongqing1 = require('./zhongqing1'),
    tou = require('./tou'),
    tou2 = require('./tou2'),
    haicao = require('./haicao'),
    book = require('./book1'),
    {
        doAllSchedule
    } = require('../util');

const list = [{
    app: zhongqing1,
    last: 1000 * 60 * 5
}];
// schedueList = [book.controller, haicao.controller];

module.exports = () => doAllSchedule(list, schedueList);