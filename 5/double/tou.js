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
        await ctr.wait(500);
        await ctr.swipe(500, 400, 515, 1100, 800);
        await ctr.wait(1000);
    },
    enterPaper: async () => {
        await ctr.click(400, 350);
        await ctr.wait(300);
    },
    readOne: async () => {
        await ctr.swipe(400, 500, 400, 350, 200);
    },
    back: async () => {
        await ctr.click(50, 70);
        await ctr.wait(500);
    },
    work: async function () {
        const aa = async () => {
            await ctr.wait(300);
            await that.readOne();
            i++;
            if (i < 16) {
                aa()
            } else {
                await ctr.wait(800);
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
const fu = {
    refresh: async () => {
        await ctr.wait(800);
        await ctr.swipe(500, 500, 515, 1100, 800);
        await ctr.wait(1000);
    },
    enterPaper: async () => {
        await ctr.click(400, 350);
        await ctr.wait(300);
    },
    readOne: async () => {
        await ctr.swipe(400, 500, 400, 350, 200);
    },
    readOne2: async () => {
        await ctr.click(400, 350);
    },
    back: async () => {
        await ctr.click(100, 100);
        await ctr.wait(500);
    },
    work: async function () {
        const aa = async () => {
            await ctr.wait(300);
            await that.readOne();
            i++;
            if (i < 30) {
                aa()
            } else {
                await ctr.wait(800);
                await that.back();
                that.work();
            }
        }
        await this.refresh();
        await this.enterPaper();
        aa();
        let i = 1;
        const that = this;
    },
    work2: async function () {
        const aa = async () => {
            await ctr.wait(2000);
            await that.readOne2();
            i++;
            if (i < 30) {
                aa()
            } else {
                await ctr.wait(800);
                // await that.back();
                that.work2();
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
        await ctr.wait(800);
    },
    enterPaper: async () => {
        await ctr.click(400, 1500);
        await ctr.wait(300);
    },
    readOne: async function () {
        if (this.up) {
            await ctr.swipe(400, 1500, 400, 1350, 200);
        } else {
            await ctr.swipe(400, 1350, 400, 1500, 200);
        }
        this.up = !this.up;
    },
    back: async () => {
        await ctr.click(50, 1100);
        await ctr.wait(500);
    },
    work: async function () {
        const aa = async () => {
            await ctr.wait(400);
            await that.readOne();
            i++;
            if (i < 40) {
                aa()
            } else {
                await ctr.wait(800);
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
// aa();
// ctr.click(50, 1100);

// toutiaoTop.work();

fu.work2();
zhongqingLow.work();