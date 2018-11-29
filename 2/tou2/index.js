const {
    wait,
    PhoneController,
} = require('../../util'),
    maxRead = 20,
    app = "com.martian.hbnews",
    activity = {
        enter: 'com.martian.hbnews.activity.MartianAppStart',
        main: 'com.martian.hbnews.activity.MainActivity',
    };
const name = require('../share').name;
let read = 0;
const controller = new PhoneController({
    app,
    name,
    activity
});
const taskPage = 'com.martian.hbnews.libnews.activity.MartianNewsWebViewActivity';

async function isTaskPage() {
    const res = await controller.getNowApp();
    if (res.indexOf(taskPage) > -1) {
        return true;
    } else {
        return false;
    }
}

function nextTitle() {
    return controller.swipe(700, 500, 100, 520, 200);
}

function nextPaper() {
    return controller.swipe(400, 500, 400, 350, 200);
}
async function enterPaper() {
    await controller.click(400, 350);
    await wait(2000);
    const isMain = await controller.isMainPage();
    if (isMain) {
        await nextPaper();
        return await enterPaper();
    } else {
        const isTaskP = await isTaskPage();
        if (isTaskP) {
            return true;
        } else {
            await controller.back();
            await wait(2000);
            await nextPaper();
            return await enterPaper();
        }
    }
}

async function leavePaper() {
    await controller.back();
    await wait(2000);
    const isMain = await controller.isMainPage();
    if (isMain) {
        return true;
    } else {
        return await leavePaper();
    }
}
let hasStop;
async function work() {
    if (!controller.canRun) {
        hasStop = true;
        return;
    };
    if (read > maxRead) {
        await nextTitle();
        await wait(2000);
        read = 0;
    }
    await nextPaper();
    await wait(2000);
    await enterPaper();
    await wait(1000);
    aa();
    let i = 1;

    async function aa() {
        if (!controller.canRun) {
            hasStop = true;
            return;
        };
        await wait(2000);
        await controller.swipe(400, 500, 400, 350, 200);
        i++;
        if (i < 13) {
            aa()
        } else {
            await wait(1000);
            await leavePaper();
            await wait(1000);
            read++;
            work();
        }
    }
}


async function openApp() {
    await controller.adbShell(`keyevent 3`);
    await controller.adbShell(`keyevent 3`);
    let i = 1;
    while (i < 4) {
        await wait(500);
        await nextTitle();
        i++;
    }
    await controller.click(300, 300);
    controller.setOpen();
    controller.setOnTask();
}
controller.openApp = openApp;
async function begin() {
    await controller.openApp();
    await wait(11000);
    await controller.backToMainPage();
    await wait(3000);
    await nextTitle();
    controller.startIntervalCheckExit();
    controller.miOnAppGoFront(async () => {
        if (hasStop) {
            await wait(3000);
            work();
        }
    });
    work();
}
// controller.click(400, 500);
// begin();

module.exports = {
    begin,
    close: controller.closeApp.bind(controller),
    controller,
    work
}