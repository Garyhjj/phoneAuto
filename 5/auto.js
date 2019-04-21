function begin() {
  sleep(2000)
  lauchDuoFu();
  duofuReading();
  zhongqingJob();
  lauchJu();
  juReading();
  // click(1000,540);
}

begin();

function zhongqingJob() {
  //   zhongqingReading();
  lauchZQ();
  zhongqingReading();
  // zhongqingSearch();
}

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
    console.log(Date.now(), start, readTime)
    enterP();
    sleep(3000);
    // click1(715, 300);
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

function zhongqingSearch(isSub) {
  function aa(i, isSub) {

    if (i > 10) {
      return
    }

    sleep(3000);
    click(500, isSub ? 1170 : 670);
    sleep(5000);
    const upDown = (j) => {
      oneUpDown(2000)
      if (j > 1) {
        return
      } else {
        upDown(j + 1)
      }
    }
    upDown(1);
    sleep(2000);
    click(1000, 330);
    sleep(1000);
    click(700, 530);
    sleep(2000);
    upDown(1);

    back();
    sleep(1000);
    click(230, 100);
    sleep(1500);
    return aa(i + 1, isSub)
  }
  if (!isSub) {
    aa(0);
  }
  aa(2, true)

}
function zhongqingkankanBefore() {
    swipe(500, hasTop ? 460 : 650, 500, 100, 800);
    sleep(1000);
}
function zhongqingKankan(l, f) {
    function aa1(i, site) {
        if (i > 6) {
          return
        }
        click(site[0], site[1]);
        sleep(3000);
        const changeSite = (y) => {
          if (y > 0) {
            swipe(350, 870, 350, 270, 700);
            sleep(800);
            return changeSite(y - 1)
          }
        }
        changeSite(i);
        click(300, 700);
        sleep(3000);
        const upDown = (j) => {
          oneUpDown(3000);
          if (j > 2) {
            return
          } else {
            return upDown(j + 1)
          }
        }
        upDown(2);
        back();
        sleep(2000);
        click1(230, 100);
        sleep(2000);;
        return aa1(i + 1, site)
      }
    
      const ls = [];
      const formatLs = (col) => {
        const begin = 200,
          height = 130;
        col = col || 9;
        ls.length = 0;
        for (var i = 0; i < col; i++) {
          var y = begin + height * i;
          ls.push([300, y]);
          ls.push([900, y]);
        }
      }
      function beginReading(last, from) {
        formatLs(last ? 6 : 9);
        from = from || 0;
        var lg = ls.length - from;
        sleep(2000);
        while (lg--) {
          aa1(0, ls[lg]);
          sleep(7000);
        }
        if(last) {
          return;
        }
        swipe(500, 1200, 500, 140, 800);
        sleep(3000);
        beginReading(true)
      }
      return beginReading(l, f)
}

function lauchZQ() {
  launch('中青看点');
  sleep(15000);
  back();
  sleep(3000);
  back();
  sleep(3000);
}


function lauchDuoFu() {
  launch('多福看看');
  sleep(10000);
}

function duofuReading(rt) {
  var read = (i) => {
    i = i || 1;
    oneUpDown(3000);
    if (i < 30) {
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
    leave();
    sleep(1000);
    refresh();
    sleep(2000);
    readTime = readTime || 2
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

function lauchJu() {
  launch('聚看点');
  sleep(15000);
  back();
  sleep(3000);
  click('继续挣钱');
  sleep(2000);
}

function juReading(rt) {
  var read = (i) => {
    i = i || 1;
    oneUpDown(3000);
    if (i < 27) {
      sleep(3000);
      read(i + 1);
    }
  }
  var refresh = () => {
    swipe(400, 350, 400, 900, 800)
  }
  var enterP = () => {
    click(400, 440)
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
    if(click('关闭广告')) {
      sleep(2000);
    }
    // if(click('领取')) {
    //   sleep(2000);
    // }
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

function launch(name) {
  if(name) {
    launchApp(name);
    sleep(1500);
    click('允许');
  }
}
