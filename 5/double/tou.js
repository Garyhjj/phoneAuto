const name = require('../share').name,
    {
        PhoneController,
        wait
    } = require('../../util');


const ctr = new PhoneController({
    name: name
});

const toutiaoTop = {
    refresh: async () => {
        await ctr.swipe(500, 400, 515, 1100, 800);
        await wait(1500);
    },
    enterPaper: async () => {
        await ctr.click(400, 430);
        await wait(800);
    },
    readOne: async () => {
        await ctr.swipe(400, 500, 400, 350, 200);
        await wait(1000);
    },
    back: async () => {
        await ctr.click(50, 70);
        await wait(1000);
    },
    work: async function () {
        const aa = async () => {
            await wait(1000);
            await that.readOne();
            i++;
            if (i < 13) {
                aa()
            } else {
                await wait(1000);
                await that.back();
                that.work();
            }
        }
        await this.refresh();
        await this.enterPaper();
        aa();
        let i = 1;
        const that = this;

    }
}

const zhongqingLow = {
    up: false,
    refresh: async () => {
        await ctr.swipe(500, 1400, 515, 1900, 800);
        await wait(1500);
    },
    enterPaper: async () => {
        await ctr.click(400, 1500);
        await wait(800);
    },
    readOne: async function () {
        if (this.up) {
            await ctr.swipe(400, 1500, 400, 1350, 200);
        } else {
            await ctr.swipe(400, 1350, 400, 1500, 200);
        }
        this.up = !this.up;
        await wait(1000);
    },
    back: async () => {
        await ctr.click(50, 1100);
        await wait(1000);
    },
    work: async function () {
        const aa = async () => {
            await wait(1000);
            await that.readOne();
            i++;
            if (i < 70) {
                aa()
            } else {
                await wait(1000);
                await that.back();
                that.work();
            }
        }
        await this.refresh();
        await this.enterPaper();
        aa();
        let i = 1;
        const that = this;

    }
}

async function refresh() {
    await ctr.swipe(500, 400, 515, 900, 800);
    await wait(1500);
    await ctr.swipe(500, 1300, 515, 1900, 800);
    await wait(1500);
}

async function enterPaper() {
    await ctr.click(400, 430);
    await wait(800);
    await ctr.click(400, 1500);
    await wait(2200);
}

async function readOne() {
    await ctr.swipe(400, 500, 400, 350, 200);
    await wait(1000);
    await ctr.swipe(400, 1500, 400, 1350, 200);
    await wait(1000);
}

async function back() {
    await ctr.click(50, 70);
    await wait(1000);
    await ctr.press(400, 1500);
    await wait(2000);
    await ctr.back();
}

async function aa() {
    await refresh();
    await enterPaper();
    await readOne();
    back();
    // await ctr.click(600, 1500);

}

// aa();
// ctr.click(50, 1100);

toutiaoTop.work();
setTimeout(() => {
    zhongqingLow.work();
}, 3000);