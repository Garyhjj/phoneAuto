function begin() {
  sleep(2000)
  lauchDuoFu();
  duofuReading();
  zhongqingJob();
  lauchJu();
  juReading();
}

begin();

function zhongqingJob() {
  //   zhongqingReading();
  lauchZQ();
  zhongqingReading();
  // zhongqingSearch(true);
  // zhongqingKankan();
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
    click(500, isSub ? 1200 : 670);
    while(!click('搜索') && !click('百度一下')) {
      sleep(1000);
    }
    sleep(3000);
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
    swipe(500,300,500,1000,500);
    sleep(3000);
    if(click('搜索')) {

    }else {
      sleep(1000);
      click('百度一下')
    }
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
    function aa1(i, btn) {
        if (i > 9) {
          return
        }
        btn.click();
        var waitTime = 0;
        while(!textContains('青豆').exists()) {
          sleep(2000)
          waitTime = waitTime + 1;
          if(waitTime > 12) {
            break;
          }
        }
        sleep(2000)
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
        var done;
        if(textContains('青豆奖励').exists()) {
          done = true;
        }
        back();
        sleep(2000);
        click(230, 100);
        sleep(2000);
        if(done) {
          return;
        }
        return aa1(i + 1,btn)
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
      var readingTime = 0;
      function beginReading() {
        var target = text('去完成').findOne(6000);
        if(!target) {
          target = text('进行中').findOne(6000);
        }
        if(!target) {
          return;
        }
        aa1(0, target);
        sleep(2000);
        readingTime = readingTime + 1;
        if(readingTime > 60) {
          return;
        }
        return beginReading()
      }
      return beginReading()
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
    if (i < 15) {
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

function launch(name) {
  if(name) {
    launchApp(name);
    sleep(1500);
    click('允许');
  }
}
