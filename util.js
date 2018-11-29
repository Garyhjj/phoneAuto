const exec = require("child_process").exec,
    execPromise = command =>
    new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout, stderr);
            }
        });
    });
const debug = require('debug'),
    schedule = require('node-schedule');

const wait = (after) => {
    return new Promise((r, j) => {
        setTimeout(() => {
            try {
                r('ok');
            } catch (e) {
                j(e);
            }
        }, after);

    })
}
const isFunction = (f) => typeof f === 'function';
const BEFORE_CLOSE = 'BEFORE_CLOSE',
    ON_APP_GO_FRONT = 'ON_APP_GO_FRONT',
    ON_APP_GO_BACKGROUND = 'ON_APP_GO_BACKGROUND',
    SCHEDULE = 'SCHEDULE';


const systemConfirm = 'com.miui.securitycenter/com.miui.wakepath.ui.ConfirmStartActivity',
    sysPackageInstaller = 'com.miui.packageinstaller/com.android.packageinstaller.PackageInstallerActivity',
    phoneHomePage = 'com.miui.home/com.miui.home.launcher.Launcher';

let phoneList = [];
let nowApp = {}
let controllers = {}

function updateNowApp(phone) {
    const name = phone.name;
    controllers[name] = controllers[name] || [];
    const cls = controllers[name];
    if (phone && cls.indexOf(phone) < 0) {
        cls.push(phone);
    }
    if (phone && phoneList.indexOf(name) < 0) {
        phoneList.push(phone);
        const log = debug(name);
        const fn = async () => {
            const res = await execPromise(`adb ${phone.target} shell dumpsys window windows | findstr "Current"`);
            const before = nowApp[name];
            log(Date.now() + ' check');
            if (before !== res) {
                nowApp[name] = res;
                await Promise.all(cls.map((c) => c.screenChange(res)));
            }
            setTimeout(() => fn(), 5000);
        }
        fn();
    }
}
class PhoneController {
    constructor(options) {
        this.options = {};
        Object.assign(this.options, options);
        this.name = this.options.name || '';
        this._cb = {};
        this.log = debug(this.app);
    }

    _addCb(name, cb) {
        if (isFunction(cb)) {
            this._cb[name] = this._cb[name] || [];
            this._cb[name].push(cb);
        }
    }
    miBeforeClose(cb) {
        this._addCb(BEFORE_CLOSE, cb);
    }

    miOnAppGoFront(cb) {
        this._addCb(ON_APP_GO_FRONT, cb);
    }

    miOnAppGoBackground(cb) {
        this._addCb(ON_APP_GO_BACKGROUND, cb);
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
        this.target = name ? `-s ${name}` : '';
    }

    get app() {
        return this.options.app || '';
    }

    get activity() {
        return this.options.activity || {};
    }

    get isOpen() {
        return this._isOpen;
    }

    get canRun() {
        return this._isOpen && this.onTask;
    }


    adbShell(order) {
        return execPromise(`adb ${this.target} shell input ${order}`);
    }

    joinActivity(activity) {
        return this.app + '/' + activity;
    }

    async isMainPage() {
        const res = await this.getNowApp();
        if (res.indexOf(this.joinActivity(this.activity.main)) > -1) {
            return true;
        } else {
            return false;
        }
    }

    async openApp() {
        await execPromise(`adb ${this.target} shell am start -n ${this.joinActivity(this.activity.enter)}`);
        this.setOpen();
        this.setOnTask();
        await wait(2000);
        return;
    }

    setOnTask() {
        this.onTask = true;
    }

    setOpen() {
        this._isOpen = true;
    }

    async _runCb(name) {
        const cbs = this._cb[name];
        if (cbs && cbs.length > 0) {
            await cbs.reduce(async (a, b) => {
                await a;
                await Promise.resolve(b());
            }, Promise.resolve(''))
        }
    }

    async closeApp() {
        await this._runCb(BEFORE_CLOSE);
        this._isOpen = false;
        return execPromise(`adb ${this.target} shell am force-stop ${this.app}`)
    }

    swipe(x, y, x1, y1, d) {
        return this.adbShell(`swipe ${x} ${y} ${x1} ${y1} ${d}`);
    }

    click(x, y) {
        return this.adbShell(`tap ${x} ${y}`);
    }

    getNowApp() {
        return execPromise(`adb ${this.target} shell dumpsys window windows | findstr "Current"`);
    }
    back() {
        return this.adbShell(`keyevent 4`);
    }
    async startIntervalCheckExit() {
        updateNowApp(this);
    }

    async screenChange(res) {
        if (!this.onTask) {
            return;
        }
        if (res.indexOf(systemConfirm) > -1 || res.indexOf(sysPackageInstaller) > -1) {
            await this.back();
            await wait(3000);
            return;
        }
        if (res.indexOf(this.app) > -1) {
            if (!this.isOpen) {
                this._isOpen = true;
                await this._runCb(ON_APP_GO_FRONT);
            }
        } else {
            if (this.isOpen) {
                this._isOpen = false;
                await this._runCb(ON_APP_GO_BACKGROUND);
            }
        }
        await wait(3000);
    }
    backToFront() {
        return this._runCb(ON_APP_GO_FRONT);
    }

    stopTask() {
        this.onTask = false;
    }

    async isInApp() {
        const res = await this.getNowApp();
        if (res.indexOf(this.app) > -1) {
            return true;
        } else {
            return false;
        }
    }

    async backToMainPage() {
        let isMainPage = await this.isMainPage();
        if (isMainPage) {
            return true;
        } else {
            await this.back();
            await wait(800);
            if (this.isOpen) {
                return this.backToMainPage();
            } else {
                return false;
            }
        }
    }

    addSchedule(cb, cron) {
        const name = SCHEDULE;
        if (isFunction(cb)) {
            this._cb[name] = this._cb[name] || [];
            this._cb[name].push({
                cb,
                cron
            });
        }
    }

    miScheduleJob(beforeDo, afterDo) {
        const ls = this._cb[SCHEDULE];
        if (Array.isArray(ls) && ls.length > 0) {
            ls.forEach((l) => {
                let cb = l.cb;
                let job;
                if (isFunction(beforeDo)) {
                    job = async () => {
                        await Promise.resolve(beforeDo());
                        return Promise.resolve(cb());
                    }
                }
                if (isFunction(afterDo)) {
                    const before = job || cb;
                    job = async () => {
                        await Promise.resolve(before());
                        return Promise.resolve(afterDo());
                    }
                }
                job = job || cb;
                schedule.scheduleJob(l.cron, job);
            })
        }
    }
    async backToPhoneHomePage() {
        await this.adbShell(`keyevent 3`);
        await this.adbShell(`keyevent 3`);
    }
}


function doAllSchedule(appList, schedueList) {
    let target;
    let timeID;
    appList.forEach(l => {
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
    schedueList.forEach((c) => {
        c.miScheduleJob(async () => {
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
        target = appList.shift();
        let hasSameTar;
        hasSameTar = !!appList.find((l) => l.app.controller.app === target.app.controller.app && l.hasInited);
        appList.push(target);
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
}

module.exports = {
    wait,
    execPromise,
    PhoneController,
    doAllSchedule
}