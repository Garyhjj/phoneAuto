sleep(2000);
eastReading();
// swipe(400, 350, 400, 1500, 800);
// var ls = id('q4').find();
// console.log(ls.length);
// ls[0].click();
// id('kt').findOne().click();
function eastReading(rt) {
    var read = (i) => {
      i = i || 1;
      oneUpDown(3000);
      if (i < 18) {
        sleep(2000);
        read(i + 1);
      }
    }
    var refresh = () => {
      // swipe(400, 350, 400, 1500, 800);
      id('kt').findOne().click();
      sleep(2000);
      while(textContains('刷新中').exists()) {
        sleep(2000);
      }
    }
    var enterP = (btn) => {
      // click(400, textContains('恭喜你获得').exists() ? 920 : 600);
      btn.click();
    }
    var leave = () => {
      back();
    }
    var start
    var work = (readTime) => {
      if(textContains('恭喜你获得').exists()) {
        click(800,460);
        sleep(66000);
        back();
        sleep(500);
        click(990,140);
        sleep(6000);
      }
      var ts = id('q4').find();
      var vs = id('i7').find();
      var all = ts.concat(vs);
      var lg = all.length;
      while (lg --) {
        enterP(all[lg]);
        sleep(3000);
        sleep(1000);
        read();
        leave();
        sleep(3000);
      }
      refresh();
      sleep(2000);
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
    swipe(350, ~~(Math.random() * 500 + 700), 350, 270, 800);
    // sleep(sl || 1000);
    // swipe(350, 270, 350, ~~(Math.random() * 500 + 1000), 800);
  }