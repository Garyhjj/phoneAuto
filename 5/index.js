const zhongqing = require('./zhongqing'),
    tou = require('./tou'),
    haicao = require('./haicao'),
    book1 = require('./book1'),
    book2 = require('./book2'),
    {
        doAllSchedule
    } = require('../util');

const list = [{
    app: haicao,
    last: 1000 * 60 * 20
}, {
    app: tou,
    last: 1000 * 60 * 20
}];

schedueList = [book1.controller, book2.controller, haicao.controller];

module.exports = () => doAllSchedule(list, schedueList);