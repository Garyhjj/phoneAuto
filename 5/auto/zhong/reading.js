
sleep(5000);
zhongqingReading();
function zhongqingReading(rt) {
    var read = (i) => {
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
    var leave = () => {
      back();
    }
    var start
    var work = (readTime) => {
      enterP();
      sleep(3000);
      sleep(1000);
      read();
      if (click('查看详情')) {
        sleep(3000);
        leave();
        sleep(3000);
      }
      leave();
      sleep(1000);
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
    swipe(350, 770, 350, 270, 800);
    sleep(sl || 1000);
    swipe(350, 270, 350, 770, 800);
  }