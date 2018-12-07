const {
    wait,
    PhoneController,
} = require('../../util'),
    maxRead = 20,
    app = "cn.youth.news",
    activity = {
        enter: 'com.weishang.wxrd.activity.SplashActivity',
        main: 'com.weishang.wxrd.activity.MainActivity'
    };
const name = require('../share').name;
let read = 0;
const controller = new PhoneController({
    app,
    name,
    activity
});

const taskPage = 'cn.youth.news/com.weishang.wxrd.activity.WebViewActivity';

async function isTaskPage() {
    const res = await controller.getNowApp();
    if (res.indexOf(taskPage) > -1) {
        return true;
    } else {
        return false;
    }
}

function nextTitle() {
    return controller.swipe(900, 500, 200, 520, 200);
}

function nextPaper() {
    return controller.swipe(400, 350, 400, 900, 800);
}
async function enterPaper() {
    await controller.click(400, 350);
    await wait(2000);
    const isMain = await controller.isMainPage();
    if (isMain) {
        await nextPaper();
        return await enterPaper();
    } else {
        let isTaskP = await isTaskPage();
        if (isTaskP) {
            return true;
        } else {
            await controller.backToMainPage();
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
    await controller.swipe(400, 350, 400, 900, 800);
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
        if (i < 60) {
            aa1()
        } else {
            await wait(1000);
            await controller.click(50, 70);
            await wait(1000);
            read++;
            work();
        }
    }
    async function aa1() {
        if (!controller.canRun) {
            hasStop = true;
            return;
        };
        await wait(2000);
        await controller.swipe(400, 350, 400, 500, 200);
        i++;
        if (i < 60) {
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
    while (i < 5) {
        await wait(500);
        await nextTitle();
        i++;
    }
    await controller.click(400, 700);
}
async function begin() {
    await controller.openApp();
    await wait(8000);
    await controller.back();
    await wait(5000);
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