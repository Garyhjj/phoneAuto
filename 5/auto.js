home();
begin();

function begin() {
  sleep(2000)
  // lauchDuoFu();
  //duofuReading(0.8);
  //   zhongJob(0.4,true);

  kuaikanJob(1.1);

  lauchDuoFu();
  duofuReading(1.1);

  xiangKanJob();

  caidan();

  kReading();

  zhongJob(0.4, true);
}

function xiangKanJob() {
  home();
  launch('想看');
  sleep(16000);
  nextPage(true);
  nextPage(true);
  commonReading({
    readTime: 1.2,
    afterEnterPage: function() {
      sleep(2000);
      if (id('more_minute_btn').exists()) {
        var c = id('iv_close').findOne(2000);
        if (c) {
          c.click();
          sleep(1000);
        }
      }
    },
    beforeOneUpDown() {
      if (id('fudai_icon').exists()) {
        var c = id('fudai_icon').findOne(2000);
        if (c) {
          c.click();
          sleep(3000);
          if (id('more_minute_btn').exists()) {
            var c = id('iv_close').findOne(2000);
            if (c) {
              c.click();
              sleep(1000);
            }
          }
        }
      }
    }
  })
}

function quTouTiao() {
  home();
  launch('趣头条小视频版');
  sleep(3000);
  click('允许');
  sleep(8000);
  littleVideo(10);
}

function littleVideo(minute) {
  minute = minute > 0 ? minute : 40;
  sleep(2000);
  var start = Date.now();
  var one = (i) => {
    const times = 10 + ~~(Math.random() * 15);
    sleep(1000 * times);
    const x = ~~(Math.random() * 300 + 400);
    const y = ~~(Math.random() * 100);
    swipe(x, 1600, x + 10, 200, 400);
    sleep(2000);
    if (Date.now() - start < 1000 * 60 * minute) {
      one(i + 1);
    }
  }
  one(0);
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
    if (i < 18) {
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
    if (text('领铜钱').exists()) {
      click('领铜钱');
      sleep(3000);
      click('继续阅读');
      sleep(2000);
    }
    enterP();
    sleep(3000);
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

function caidan() {
  home();
  launch('彩蛋视频');
  sleep(3000);
  click('允许');
  sleep(8000);
  begin();

  function begin(minute) {

    minute = minute > 0 ? minute : 40;
    var start = Date.now();
    var one = (i) => {
      var list = ['立即下载', '查看详情'];
      var skip = false;
      var lg = list.length;
      while (lg--) {
        if (textContains(list[lg]).exists()) {
          skip = true;
          break;
        }
      }
      const times = 8;
      sleepAndDo(times, video);
      swipe(900, 1600, 900, 60, 500);
      sleepAndDo(0.5, video);
      swipe(900, 120, 900, 1600, 500);
      sleepAndDo(2, video);
      if (Date.now() - start < 1000 * 60 * minute) {
        if (i < 20) {
          back();
          sleep(1000);
        }
        one(i + 1);
      }
    }
    one(0);
  }

  function sleepAndDo(times, fn) {
    var one = 3;
    if (times > one) {
      sleep(one * 1000);
      fn();
      return sleepAndDo(times - one, fn);
    } else {
      sleep(times);
      fn();
    }
  }


  function video() {
    if (!text('立即翻倍').exists()) {
      return;
    }
    back();
    return;
  }
}



function kReading() {
  var tx = ['广告', '桔子好物分享'];
  var isL = false;
  home();
  sleep(3000);
  launch('快手极速版');
  sleep(8000);
  try {
    start(0);
  } catch (err) {
    console.log(err);
  }
  home();


  function start(i) {
    if (i < 50) {
      click('我知道了', 1);
      back();
    }
    if (isL) {
      fanfu();
    } else {
      normal();
      isL = isLong();
    }
    if (i > 480) {
      return;
    }
    start(i + 1);
  }

  function fanfu() {
    sleep(15 * 1000);
    videoUpDown();
  }

  function isLong() {
    var lg = tx.length;
    while (lg--) {
      var t = tx[lg];
      if (text(t).exists()) {
        var top = text(t).findOne(1000).bounds().top;
        if (top < 1900) {
          return true;
        }
      }
    }
    return false;
  }

  function normal() {
    const times = 6 + ~~(Math.random() * 6);
    sleep(times * 1000);
    const x = ~~(Math.random() * 300 + 400);
    const y = ~~(Math.random() * 100);
    swipe(x, 1800 - y, x + 10, 100 + y, 500);
    sleep(2000);
  }
}

function zhongJob(last, isF) {
  home();
  sleep(3000);
  launch('中青看点');
  sleep(25000);
  try {
    commonReading({
      readTime: last,
      oneReadTime: 32,
      beforeLeavePage: function () {
        if (click('查看详情')) {
          sleep(3000);
          leave();
          sleep(3000);
        }
      },
      beforeOneUpDown: function (i) {
        if (i < 4) {
          click('查看全文，奖励更多');
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
  zhongVideo();

  home();

  function zhongVideo() {
    //  home();
    // launch('中青看点');
    // sleep(3000);
    //  click('允许');
    sleep(5000);
    //   click(500, 1797);
    click(280, 1797);
    sleep(3000);
    click('小视频');
    sleep(6000);
    click(200, 300);
    begin();
    home();

    function begin(minute) {

      minute = minute > 0 ? minute : 150;
      var start = Date.now();
      var one = (i) => {
        var list = [];
        var skip = false;
        var lg = list.length;
        while (lg--) {
          if (textContains(list[lg]).exists()) {
            skip = true;
            break;
          }
        }
        if (!skip) {
          const times = 10 + ~~(Math.random() * 8);
          sleepAndDo(times, video);
        }
        const x = ~~(Math.random() * 300 + 400);
        const y = ~~(Math.random() * 100);
        swipe(x, 1800 - y, x + 10, 100 + y, 500);
        sleep(2000);
        if (Date.now() - start < 1000 * 60 * minute) {
          one(i + 1);
        }
      }
      one(0);
    }

    function sleepAndDo(times, fn) {
      var one = 3;
      if (times > one) {
        sleep(one * 1000);
        fn();
        return sleepAndDo(times - one, fn);
      } else {
        sleep(times);
        fn();
      }
    }


    function video() {
      if (text('免费领取').exists()) {
        while (!text('待领取').exists()) {
          sleep(2000);
        }
        click('待领取');
      }
    }
  }

}


function kuaikanJob(last) {
  home();
  sleep(3000);
  launch('快看点');
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
    commonReading({
      readTime: last,
      beforeLeavePage: function () {
        click(970, 840);
        sleep(3000);
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
          sleep(36 * 1000);
          click(985, 112);
          back();
          sleep(1000);
          leave();
        }
        return true;
      }
    });
  } catch (err) {
    console.log(err);
  }
  home();
}


function commonReading(option) {
  var def = {
    readTime: 1.2,
    oneReadTime: 60,
    beforeLeavePage: noneFn,
    afterEnterPage: noneFn,
    beforeOneUpDown: noneFn,
    canReadTwo: true
  }
  option = option ? Object.assign(def, option) : def;
  var oneReadTime = option.oneReadTime;
  var beforeLeavePage = option.beforeLeavePage;
  var readTime = option.readTime;
  var beforeOneUpDown = option.beforeOneUpDown;
  var canReadTwo = option.canReadTwo;
  var afterEnterPage = option.afterEnterPage;
  oneReadTime = oneReadTime || 60;
  var time;
  var read = (i) => {
    if (Date.now() - time > 1000 * oneReadTime) {
      return;
    }
    i = i || 1;
    oneUpDown(3000);
    if (i < 50) {
      beforeOneUpDown(i);
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
  var leave = () => {
    back();
  }
  var start;
  var swipeTime = 0;
  var onePageRefreshTime = 0;
  var dirRight = true;
  var work = () => {
    var inRead = () => {
      sleep(3000);
      time = Date.now();
      afterEnterPage();
      read();
      var noDefLeave = beforeLeavePage();
      if (!noDefLeave) {
        leave();
        sleep(2000);
      }
    }
    enterP();
    inRead();
    if (canReadTwo) {
      enterP1();
      inRead();
    }
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
        if (swipeTime > 8) {
          dirRight = !!dirRight;
          swipeTime = 0;
        }
      }
      return work();
    }
  }
  start = Date.now();
  work();
}


function launch(name) {
  back();
  sleep(200);
  back();
  sleep(1000);
  if (name) {
    launchApp(name);
    sleep(1500);
    click('允许', 1);
  }
}

function oneUpDown(sl) {
  swipe(350, 770, 350, 270, 400);
  sleep(sl || 1000);
  swipe(350, 270, 350, 770, 400);
}

function nextPage(right){
  if (right) {
    swipe(950, 600, 50, 600, 800);
  } else {
    swipe(50, 600, 950, 600, 800);
  }
  sleep(5000);
}

function videoFanFu(last, oneTime) {
  sleep()
  last = last || 1.2;
  oneTime = oneTime || 8;
  var start = Date.now();
  startR();
  function startR() {
    if (Date.now() - start < 1000 * 60 * 60 * last) {
      sleep(oneTime * 1000);
      videoUpDown()
      back();
      sleep(1000);
      return startR();
    }
  }
}

function noneFn() {}

function videoUpDown(isX) {
  swipe(900, isX ? 770 : 1600, 900, 60, 500);
  sleep(700);
  swipe(900, 120, 900, isX ? 780 : 1600, 500);
}