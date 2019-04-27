const {
    wait,
    PhoneController,
} = require('../../util'),
    maxRead = 20,
    app = "com.martian.hbnews",
    activity = {
        enter: 'com.martian.hbnews.activity.MartianAppStart',
        main: 'com.martian.hbnews.activity.MainActivity,com.martian.hbnews.libnews.activity.MartianNewsPushListActivity',
    };
const name = require('../share').name;
let read = 0;
const controller = new PhoneController({
    app,
    name,
    activity
});
const taskPage = 'com.martian.hbnews.libnews.activity.MartianNewsWebViewActivity',
    taskPage1 = 'com.martian.hbnews.libnews.activity.MartianNewsPushListActivity';

async function isTaskPage() {
    // const res = await controller.getNowApp();
    // if (res.indexOf(taskPage) > -1 || res.indexOf(taskPage1) > -1) {
    //     return true;
    // } else {
    //     return false;
    // }
    return true;
}

function nextTitle() {
    return controller.swipe(700, 500, 100, 520, 200);
}

function nextPaper() {
    // return controller.swipe(400, 500, 400, 350, 200);
    return controller.swipe(400, 350, 400, 900, 800);
}
async function enterPaper() {
    await controller.click(400, 350);
    await wait(2000);
}

async function leavePaper() {
    await controller.back();
}
let hasStop;
async function work() {
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
        await wait(2000);
        await controller.swipe(400, 500, 400, 350, 200);
        i++;
        if (i < 18) {
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
    // await controller.adbShell(`keyevent 3`);
    // await controller.adbShell(`keyevent 3`);
    // let i = 1;
    // while (i < 4) {
    //     await wait(500);
    //     await nextTitle();
    //     i++;
    // }
    // await controller.click(420, 300);
    controller.setOpen();
    controller.setOnTask();
}
controller.openApp = openApp;
async function begin() {
    await controller.openApp();
    // await wait(11000);
    // await controller.backToMainPage();
    // await wait(3000);
    // await nextTitle();
    // controller.startIntervalCheckExit();
    // controller.miOnAppGoFront(async () => {
    //     if (hasStop) {
    //         await wait(3000);
    //         work();
    //     }
    // });
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