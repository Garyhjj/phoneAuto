sleep(5000);
juReading();


function juReading(rt) {
    var read = (i) => {
        i = i || 1;
        oneUpDown(2000);
        if (i < 16) {
            sleep(2000);
            read(i + 1);
        }
    }
    var refresh = () => {
        swipe(400, 350, 400, 900, 800)
    }
    var enterP = (btn) => {
        // click(400, 380)
        btn.click();
    }
    var leave = () => {
        back();
    }
    var start
    var work = (readTime) => {
        var ts = id('item_artical_three_parent').find();
        var lg = ts.length;
        while(lg --) {
            enterP(ts[lg]);
            sleep(3000);
            sleep(1000);
            read();
            leave();
            if (click('关闭广告')) {
                sleep(2000);
            }
            if (textContains('继续赚钱').exists()) {
                textContains('继续赚钱').findOne(3000).click();
                sleep(1500);
            }
            if (text('忽略').exists()) {
                textContains('忽略').findOne(3000).click();
                sleep(1500);
            }
            sleep(1000);
        }
        // if(click('领取')) {
        //   sleep(2000);
        // }
        
        refresh();
        sleep(4000);
        readTime = readTime || 2.2
        if (readTime <= 0) {
            readTime = 2;
        }
        if (Date.now() - start < 1000 * 60 * 60 * readTime) {
            return work(readTime);
        }
    }
    start = Date.now();
    work(rt);

}

function oneUpDown(sl) {
    swipe(350, 1070, 350, 270, 800);
    sleep(sl || 1000);
    swipe(350, 270, 350, 1070, 800);
  }