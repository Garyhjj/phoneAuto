sleep(5000);
tianTian();

// var c = textContains('点击重播').findOne(500).bounds().top;
// console.log(c);
// click(985, 112)
// watch()

function tianTian() {
    home();
    launch('天天爱清理');
    sleep(3000);
    click('允许');
    sleep(20000);
    click('视频');
    begin();
    home();

    function begin(minute) {

        minute = minute > 0 ? minute : 150;
        var start = Date.now();
        var one = (i) => {
            const times = 6 + ~~(Math.random() * 6);
            sleepAndDo(times, video);
            const x = ~~(Math.random() * 300 + 400);
            const y = ~~(Math.random() * 100);
            swipe(x, 1800 - y, x + 10, 100 + y, 500);
            sleep(2000);
            if (Date.now() - start < 1000 * 60 * minute) {
                if (i < 150) {
                    back();
                    sleep(1000);
                }
                one(i + 1);
            }
        }
        one(0);
    }

    function sleepAndDo(times, fn) {
        var one = 3;
        if (times > one) {
            sleep(one * 1000);
            fn();
            return sleepAndDo(times - one, fn);
        } else {
            sleep(times * 1000);
            fn();
        }
    }


    function video() {
        if (!textContains('看视频再领').exists()) {
            return;
        }
        textContains('看视频再领').findOne(2000).click();
        watch();
    }


    function watch() {
        var tryT = 0;
        while (!textContains('点击重播').exists() ||
            !textContains('奖励已到账').exists() ||
            !textContains('金币发放成功').exists() ||
            !textContains('金币领取成功').exists()) {
            sleep(2000);
            if (tryT > 25) {
                back();
                sleep(2000);
                click(985, 112);
                break;
            }
            tryT = tryT + 1;
        }
        if (tryT <= 25) {
            sleep(5000);
            back();
        }
        sleep(3000);
        back();
    }

    function launch(name) {
        if (name) {
            launchApp(name);
            sleep(1500);
            click('允许', 1);
        }
    }
}