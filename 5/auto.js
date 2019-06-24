var zhongQing = 'weishang.wxrd';
var juKan = 'xiangzi.jukandian';

function begin() {
  sleep(2000)
  zhongqingJob();
  lauchDuoFu();
  duofuReading();
  juJob();
}

begin();
// console.log(ca())
function juJob() {
  lauchJu();
  juReading();
  juVideo();
}

function zhongqingJob() {
  lauchZQ();
  zhongqingReading();
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
  swipe(900, 500, 200, 520, 200);
  sleep(3000);
  work(rt);

}


function lauchZQ() {
  home();
  sleep(5000);
  launch('中青看点');
  // if (!isActivityExists(zhongQing, 15000)) {
  //   lauchZQ();
  // };
  sleep(15000);
  back();
  sleep(3000);
  back();
  sleep(3000);
}

function isActivityExists(ac, waitTime) {
  if (ca().indexOf(ac) > -1) {
    return true;
  }
  var begin = Date.now();
  while (Date.now() - begin < waitTime) {
    if (ca().indexOf(ac) > -1) {
      return true;
    }
    sleep(2000);
  }
}

function lauchDuoFu() {
  home();
  launch('多福看看');
  sleep(10000);
}

function duofuReading(rt) {
  var read = (i) => {
    i = i || 1;
    oneUpDown(3000);
    if (i < 20) {
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
    readTime = readTime || 2.4
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
  home();
  sleep(5000);
  launch('聚看点');
  sleep(15000);
  back();
  sleep(3000);
  click('继续赚钱');
  sleep(3000);
  back();
  sleep(3000);
  click('继续赚钱');
}



function juVideo(minute) {
    var entryID = 'll_tab2_layout';
    var videoID = 'rl_video';
    minute = minute > 0 ? minute : 30;
    var entry = id(entryID).findOne(5000);
    var start = Date.now();
    if(!entry) return; 
    var one = () => {
        entry.click();
        sleep(2000);
        var video = id('l1').findOne(5000);
        if(video) {
          video.click();
          const times = 35 + ~~(Math.random() * 20);
          sleep(1000 * times);
          back();
          sleep(2000);
        }
        if (Date.now() - start < 1000 * 60 * minute) {
            one();
        }
    }
    one();
}
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
  var start;
  var tryRefresh = 0;
  var work = (readTime) => {
      var ts = id('item_artical_three_parent').find();
      var lg = ts && ts.length;
      while(lg --) {
          tryRefresh = 0;
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
      tryRefresh = tryRefresh + 1;
      if(tryRefresh > 10) {
        return;
      }
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
  if (name) {
    launchApp(name);
    sleep(1500);
    click('允许', 1);
  }
}

function ca() {
  return currentActivity()
}

function inZhongQing() {
  return ca().indexOf('weishang') > -1
}