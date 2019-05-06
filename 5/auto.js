var zhongQing = 'weishang.wxrd';
var juKan = 'xiangzi.jukandian';

function begin() {
  device.keepScreenDim();
  sleep(2000)
  eastJob();
  zhongqingJob();
  juJob();
  lauchDuoFu();
  duofuReading();
  device.cancelKeepingAwake();
  // textContains('分钟').findOne().click();
}

begin();
// console.log(ca())
function juJob() {
  lauchJu();
  juReading();
  juVideo();
}
function eastJob() {
  launch('东方头条');
  sleep(10000);
  eastReading(1.3);
  sleep(2000);
  eastSmallVideo();
}

function eastSmallVideo (minute) {
  minute = minute> 0? minute: 30;
  var entry = id('l1').findOne(5000);
  entry.click();
  sleep(2000);
  var video = id('a_f').findOne(5000);
  video.click();
  var start = Date.now();
  var one = () => {
      const times = 10 + ~~(Math.random()*15);
      sleep(1000 * times);
      swipe(900,900,150,900,300);
      sleep(2000);
      if(Date.now() - start < 1000 *60 * minute) {
          one();
      }
  }
  one();
}

function eastReading(rt) {
  var read = (i) => {
    i = i || 1;
    swipe(350, ~~(Math.random() * 500 + 700), 350, 270, 800);
    if (i < 18) {
      sleep(2000);
      read(i + 1);
    }
  }
  var refresh = () => {
    // swipe(400, 350, 400, 1500, 800);
    var btn = id('kt').findOne(6000);
    if(btn) {
      btn.click();
    }else {
      return;
    }
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
  var tryRefresh = 0;
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
      tryRefresh = 0;
      enterP(all[lg]);
      sleep(3000);
      sleep(1000);
      read();
      leave();
      sleep(3000);
    }
    refresh();
    tryRefresh = tryRefresh + 1;
    if(tryRefresh > 10) {
      return;
    }  
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

function zhongqingJob() {
  lauchZQ();
  zhongqingReading();
  // intoZhongQingRenWu(1);
  // zhongqingKankan1();
  // backToMainZhongQing()
  // intoZhongQingRenWu(2);
  // zhongqingSearch();
  // 
  // click('搜索赚')
}

function backToMainZhongQing() {
  let i = 3;
  while (i--) {
    back();
    sleep(3000)
  }
  click(230, 100);
  sleep(2000);
  click(150, 1880);
  sleep(2000);
}

function intoZhongQingRenWu(type) {
  click(980, 1880);
  sleep(4000);
  click('任务中心');
  var str
  if (type === 1) {
    str = '看看赚'
  } else if (type === 2) {
    str = '搜索'
  }
  while (!textContains(str).exists()) {
    sleep(1000);
  }
  textContains(str).findOne().click();
  while (!textContains('任务说明').exists()) {
    sleep(1000);
  }
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
  if (!isActivityExists(zhongQing, 15000)) {
    lauchZQ();
  };
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
  if (!isActivityExists(juKan, 15000)) {
    lauchJu();
  };
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
      var lg = ts.length;
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