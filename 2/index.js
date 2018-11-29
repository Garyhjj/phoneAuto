const zhongqing = require('./zhongqing'),
    tou = require('./tou'),
    tou2 = require('./tou2'),
    haicao = require('./haicao'),
    book = require('./book1'),
    {
        wait
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
let target;
let timeID;
list.forEach(l => {
    const app = l.app,
        controller = app.controller;
    controller.miBeforeClose(() => {
        controller.log(' closed');
    });
    controller.miOnAppGoBackground(() => {
        clearTimeout(timeID);
        controller.log(' go back')
        timeID = setTimeout(() => app.begin(), 1000 * 60 * 10);
    });
    controller.miOnAppGoFront(() => {
        clearTimeout(timeID);
        controller.log(' go front')
    });
})

schedueList = [book.controller, haicao.controller];
schedueList.forEach((c) => {
    c.miScheduleJob(async () => {
        console.log(target)
        if ((target && target.app.controller === c)) {
            const tarCtr = target.app.controller;
            await tarCtr.stopTask();
            await wait(2000);
            await c.backToMainPage();
        } else {
            if (target) {
                const tarCtr = target.app.controller;
            }
            await c.backToPhoneHomePage();
            await wait(3000);
            await c.openApp();
            await wait(8000);
        }


    }, async () => {
        if ((target && target.app.controller === c)) {
            const tarCtr = target.app.controller;
            await tarCtr.setOnTask();
            await wait(2000);
            await c.backToMainPage();
            tarCtr.backToFront();
        } else {
            if (target) {
                await c.closeApp();
                const tarCtr = target.app.controller;
                tarCtr.setOnTask();
                await wait(2000);
                await tarCtr.openApp();
                await wait(5000);
                await c.backToMainPage();
                tarCtr.backToFront();
            }
        }
    })
})
async function start() {
    if (target) {
        await target.app.close();
        await wait(5000)
    }
    target = list.shift();
    let hasSameTar;
    hasSameTar = !!list.find((l) => l.app.controller.app === target.app.controller.app && l.hasInited);
    list.push(target);
    const app = target.app;
    if (target.hasInited || hasSameTar) {
        await app.controller.openApp();
    } else {
        await app.begin();
        target.hasInited = true;
    }
    setTimeout(() => start(), target.last);
}

start();