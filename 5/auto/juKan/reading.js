sleep(5000);
juReading();


function juReading(rt) {
    var read = (i) => {
        i = i || 1;
        oneUpDown(3000);
        if (i < 16) {
            sleep(2000);
            read(i + 1);
        }
    }
    var refresh = () => {
        swipe(400, 350, 400, 900, 800)
    }
    var enterP = () => {
        click(400, 380)
    }
    var leave = () => {
        back();
    }
    var start
    var work = (readTime) => {
        enterP();
        sleep(3000);
        sleep(1000);
        read();
        leave();
        if (click('关闭广告')) {
            sleep(2000);
        }
        if (textContains('继续赚钱').exists()) {
            textContains('继续赚钱').findOne().click();
            sleep(1500);
        }
        // if(click('领取')) {
        //   sleep(2000);
        // }
        sleep(1000);
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
    swipe(350, 770, 350, 270, 800);
    sleep(sl || 1000);
    swipe(350, 270, 350, 770, 800);
  }