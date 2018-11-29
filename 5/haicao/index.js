const {
    wait,
    PhoneController,
} = require('../../util'),
    maxRead = 10,
    app = "com.billionstech.grassbook",
    activity = {
        enter: 'com.billionstech.grassbook.business.main.MainActivity',
        main: 'com.billionstech.grassbook.business.main.MainActivity'
    };
const name = require('../share').name;
let read = 0;
const controller = new PhoneController({
    app,
    name,
    activity
});

function getHourCoin() {
    return controller.click(920, 120)
}

function nextTitle() {
    return controller.swipe(900, 500, 200, 520, 200);
}

function nextPaper() {
    return controller.swipe(500, 900, 520, 70, 500);
}

async function enterPaper() {
    await controller.click(400, 600);
    await wait(2000);
    const isMain = await controller.isMainPage();
    if (isMain) {
        await nextPaper();
        return await enterPaper();
    } else {
        return true;
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


async function readOne() {
    return await controller.swipe(400, 700, 400, 300, 200);
}



let hour,
    hasStop;
async function work() {
    if (!controller.canRun) {
        hasStop = true;
        return;
    };
    const nowH = new Date().getHours();
    if (hour !== nowH) {
        await getHourCoin();
        hour = nowH;
        await wait(1000);
        await controller.back();
        await wait(1000);
    }
    await enterPaper();
    await wait(2000);
    let i = 0;
    const reading = async () => {
        await readOne();
        await wait(2000);
        i++;
    }

    while (i < 17) {
        if (!controller.canRun) {
            hasStop = true;
            return;
        };
        await reading();
    }

    await leavePaper();
    await wait(1000);
    read++;
    if (read > maxRead) {
        await nextTitle();
        read = 0;
    } else {
        await nextPaper();
    }
    await wait(2000);
    await work();
}


async function begin() {
    await controller.openApp();
    await wait(5000);
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

// getHourCoin();

// begin();
// auto();

// controller.miBeforeClose(() => console.log(555));
// controller.miBeforeClose(async () => {
//     await wait(2000);
//     console.log(666);
// })

// controller.closeApp();

// controller.openApp();

// controller.startIntervalCheckExit().then((df) => {
//     console.log(controller.isOpen)
// })
controller.addSchedule(async () => {
    await wait(10000);
    await controller.backToMainPage();
    await wait(2000);
    await getHourCoin();
    await wait(1000);
    await controller.back();
    await wait(1000);
}, '32 * * * *');

module.exports = {
    begin,
    close: controller.closeApp.bind(controller),
    controller,
}