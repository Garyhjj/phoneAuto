sleep(5000);
zhongJob(0.9);

function zhongJob(last, isF) {
  home();
  sleep(3000);
  launch('中青看点');
  sleep(15000);
  try {
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
        if (i < 4) {
          click('查看全文，奖励更多');
        }
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
        if (click('查看详情')) {
          sleep(3000);
          leave();
          sleep(3000);
        }
        leave();
        sleep(2000);
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
          if (swipeTime > 12) {
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

  function launch(name) {
    home();
    sleep(2000);
    home();
    sleep(2000);
    var tar = text(name).findOne(2000);
    while(!tar || tar.bounds().left < 8 || tar.bounds().left > 900) {
      swipe(950, 600, 50, 600, 400);
      sleep(2500);
      tar = text(name).findOne(2000);
    }
    const bounds = tar.bounds();
    console.log(bounds, bounds.top, bounds.left)
    click(bounds.left +60, bounds.top + 100);
  }

  // function launch(isFirst) {
  //   while (!text('取消').exists() || text('取消').findOne(2000).bounds().top < 1500) {
  //     launchApp('中青看点');
  //     sleep(1500);
  //   }
  //   if (isFirst) {
  //     click(320, 1520);
  //   } else {
  //     click(780, 1520);
  //   }
  //   click('允许', 1);
  // }
}
