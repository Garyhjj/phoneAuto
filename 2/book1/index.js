const {
    wait,
    PhoneController,
} = require('../../util'),
    app = "com.martian.ttbook",
    activity = {
        enter: 'com.martian.mibook.activity.EnterActivity',
        main: 'com.martian.mibook.activity.Homepage'
    };
const name = require('../share').name;
let read = 0;
const controller = new PhoneController({
    app,
    name,
    activity
});

const during = 1000 * 25,
    lines = [
        [600, 10],
        [10, 80]
    ],
    count = 50;
let n = lines[0],
    i = 0,
    lastGetJiang;
async function getJiang() {
    await controller.click(660, 100);
    await wait(1000);
    await controller.back();
    await wait(1000);
}

function enterNote() {
    return controller.click(310, 460);
}
let hasStop;
async function work(isNotFirst) {
    const nowT = Date.now();
    i++;
    if (i === count) {
        n = lines.find(_ => _ !== n);
        i = 0;
    }
    if (!isNotFirst) {
        await enterNote();
    }
    if (!lastGetJiang || nowT - lastGetJiang > 1000 * 60 * 61) {
        await controller.back(name);
        await wait(5000);
        await getJiang(name);
        await controller.back(name);
        await wait(5000);
        lastGetJiang = Date.now();
        await enterNote();
    }
    await controller.click(...n);
    await wait(during);
    if (!controller.canRun) {
        hasStop = true;
        return;
    };
    work(true);
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
    await wait(9000);
    await controller.back();
    await wait(5000);
    controller.startIntervalCheckExit();
    controller.miOnAppGoFront(async () => {
        if (hasStop) {
            await wait(3000);
            work(true);
        }
    });
    work();
}
// controller.click(400, 500);
controller.addSchedule(async () => {
    await controller.backToMainPage();
    await wait(2000);
    await controller.backToMainPage();
    await wait(2000);
    await controller.backToMainPage();
    return getJiang();
}, '26 * * * *');
module.exports = {
    begin,
    close: controller.closeApp.bind(controller),
    controller,
    work
}