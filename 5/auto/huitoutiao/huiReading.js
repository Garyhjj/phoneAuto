
sleep(5000);
zhongqingReading();
function zhongqingReading(rt) {
    var time;
    var oneReadSecond = 80;
    var read = (i) => {
      if(Date.now() - time > 1000 * oneReadSecond) {
        return;
      }
      i = i || 1;
      oneUpDown(3000);
      if (i < 50) {
        if(i< 4) {
          click('展开全文');
        }
        sleep(3000);
        read(i + 1);
      }
    }
    var refresh = () => {
      click('刷新');
      sleep(5000);
      swipe(600, 1600, 600, 100, 700);
      sleep(1000);
    }
    var enterP = () => {
      click(400, 680)
    }
    var enterP1 = () => {
      click(400, 1230)
    }
    var nextPage = (right) => {
      if(right) {
        swipe(950, 600, 50, 600, 800);
      }else {
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
        oneReadSecond = ~~(Math.random() * 30 +30);
        read();
        leave();
        sleep(2000);
      }
      enterP();
      inRead();
      enterP1();
      inRead();
      refresh();
      sleep(4000);
      onePageRefreshTime +=1;
      readTime = readTime || 2.2
      if (readTime <= 0) {
        readTime = 2;
      }
      if (Date.now() - start < 1000 * 60 * 60 * readTime) {
        if(onePageRefreshTime > 2) {
          onePageRefreshTime = 0;
          nextPage(dirRight);
          swipeTime +=1;
          if(swipeTime > 12) {
            dirRight = !!dirRight;
            swipeTime = 0;
          }
        }
        return work(readTime);
      }
    }
    start = Date.now();
    nextPage(1);
    refresh();
    work(rt);
  }
  function oneUpDown(sl) {
    swipe(350, 770, 350, 270, 800);
    sleep(sl || 1000);
    swipe(350, 270, 350, 770, 800);
  }