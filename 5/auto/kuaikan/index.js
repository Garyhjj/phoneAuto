sleep(5000);
kuaikanJob(0.5);

function kuaikanJob(last) {
  home();
  sleep(3000);
  launch();
  sleep(15000);
  back();
  sleep(2000);
  click('收入囊中');
  sleep(2000);
  try {
    click('首页');
    sleep(3000);
    click('娱乐');
    sleep(3000);
    zhongqingReading(last);
  } catch (err) {
    console.log(err);
  }
  home();

  function zhongqingReading(rt) {
    var time;
    var read = (i) => {
      if (Date.now() - time > 1000 * 60) {
        return;
      }
      i = i || 1;
      oneUpDown(3000);
      if (i < 50) {
        sleep(3000);
        read(i + 1);
      }
    }
    var refresh = () => {
      swipe(400, 350, 400, 900, 800)
    }
    var enterP = () => {
      click(400, 430)
    }
    var enterP1 = () => {
      click(400, 800)
    }
    var nextPage = (right) => {
      if (right) {
        swipe(950, 600, 50, 600, 800);
      } else {
        swipe(50, 600, 950, 600, 800);
      }
      sleep(5000);
    }
    var leave = () => {
      back();
    }
    var start;
    var swipeTime = 0;
    var onePageRefreshTime = 0;
    var dirRight = true;
    var work = (readTime) => {
      var inRead = () => {
        sleep(3000);
        time = Date.now();
        read();
        var a = text('继续阅读').findOne(2000);
        if (a) {
          a.click();
        } else {
          back();
        }
        sleep(1000);
        leave();
        sleep(2000);
        if (!text('首页').exists()) {
          sleep(40 * 1000);
          click(985, 112);
          back();
          sleep(1000);
          leave();
          sleep(2000);
        }
      }
      enterP();
      inRead();
      enterP1();
      inRead();
      refresh();
      sleep(4000);
      onePageRefreshTime += 1;
      readTime = readTime || 1.3
      if (readTime <= 0) {
        readTime = 2;
      }
      if (Date.now() - start < 1000 * 60 * 60 * readTime) {
        if (onePageRefreshTime > 1) {
          onePageRefreshTime = 0;
          nextPage(dirRight);
          swipeTime += 1;
          if (swipeTime > 7) {
            dirRight = !!dirRight;
            swipeTime = 0;
          }
        }
        return work(readTime);
      }
    }
    start = Date.now();
    work(rt);
  }

  function oneUpDown(sl) {
    swipe(350, 770, 350, 270, 400);
    sleep(sl || 1000);
    swipe(350, 270, 350, 770, 400);
  }

  function launch(isFirst) {
    launchApp('快看点');
    sleep(16000);
    click('允许', 1);
  }
}
