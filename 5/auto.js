var isDefLaunch = true;
var isAdmin = true;

var quTouTiaoId1 = isDefLaunch ? 'avi' : 'aw_';
var quTouTiaoId2 = isDefLaunch ? 'uu' : 'v4'; // 'a68' : 'a5x';
var caidanReadingT = isDefLaunch ? 60 : 33;
var kReadingT = isDefLaunch ? 500 : 400;
var zhongVideoT = isDefLaunch ? 25 : 30;
var noVideoFirst = false;
var stopReading = false;

if (!isAdmin && isDefLaunch) {
  quTouTiaoId1 = 'awx';
  quTouTiaoId2 = 'v7';
}

// zhongQingSearch();
// xiangKanVideo();
// zhongQingVideoKa();
// noVideoFirst = false;
//  tianTian();

//  quLingSheng();
// caidanDown();
// quKankan();

home();
begin();
home();

function begin() {
  sleep(2000)

  if (isDefLaunch) {
    //  tianTian();

    quLingSheng();

    caidanDown();

    xiangKanJob();

    zhongJob(0.27);

    if (!isAdmin) {
      caidanDown();
    }

    // kReading();

    if (isAdmin) {
      zhongQingSearch();
    }
    tianTian();


    quLingSheng();

    if (isAdmin) {
      zhongQingSearch();
    }

    quTouTiaoR();

    // quLingSheng();

    tianTian();

    zhongQingVideoKa();

    xiangKanVideo();

    if (!isAdmin) {
      zhongQingSearch();
    }

  } else {
    // tianTian();

    // quLingSheng();

    lauchDuoFu();
    duofuReading(0.1);

    xiangKanJob();

    zhongJob(0.8);

    caidanDown();

    quLingSheng();

    tianTian();

    zhongQingSearch();

    // zhongJob(0.8);

    quLingSheng();

    tianTian();

    zhongQingVideoKa();

    xiangKanVideo();
  }
}

function quKankan() {
  launch('趣看看');
  sleep(20000);
  nextPage(true);
  commonReading({
    readTime: 1.2,
    upDownRead: false,
    oneReadTime: 40,
    enterP: function () {
      sleep(2000);
      checkModal();
      click(330, 400);
    },
    enterP1: function () {
      checkModal();
      swipe(300, 1700, 300, 450, 400);
      sleep(600);
      click(330, 1600);
    },
    refresh: function () {
      click('刷新');
    },
  });

  function checkModal() {
    if (text('继续阅读').exists()) {
      click('继续阅读');
      sleep(1000);
    }
  }
}

function quTouTiaoR() {
  launch('趣头条');
  sleep(23000);
  nextPage(true);
  nextPage(true);
  nextPage(true);
  nextPage(true);
  nextPage(true);
  commonReading({
    readTime: 0.8,
    upDownRead: false,
    oneReadTime: 45,
    enterP: function () {
      sleep(2000);
      var a = getTitle();
      a.click();
    },
    enterP1: function () {
      swipe(300, 1700, 300, 450, 400);
      sleep(600);
      swipe(300, 1700, 300, 450, 400);
      sleep(600);
      var a = getTitle();
      a.click();
    },
    refresh: function () {
      click('刷新');
    },
    beforeOneUpDown: findCaiDan,
    // beforeLeavePage: findCaiDan,
    // afterEnterPage: findCaiDan
  });
  // if (isDefLaunch) {
  //   qVideo(20);
  // }

  function findCaiDan() {
    var id1 = quTouTiaoId1;
    var id2 = quTouTiaoId2;
    if (id(id1).exists()) {
      var caidan = id(id1).findOne(1000);
      click(caidan.bounds().left + 10, caidan.bounds().top + 10);
      sleep(5000);
      if (id(id2).exists()) {
        id(id2).findOne(1000).click();
        quTouTiaoWatch('金币领取成功');
      }
    }
  }
  var failT = 0;

  function getTitle(tryT) {
    tryT = tryT || 0;
    var ls = textContains('评论').find(); // textContains('分钟前').findOne(1000)
    if (ls.length === 0) {
      ls = textContains('小时前').find();
    }
    if (ls.length === 0) {
      ls = textContains('天前').find();
    }
    var lg = ls.length;
    var a;
    while (lg--) {
      var l = ls[lg];
      var bounds = l.bounds();
      var top = bounds.top;
      var left = bounds.left;
      if (top > 350 && top < 1700 && left > 0 && left < 700) {
        a = l;
        break;
      };
    }
    if (a) {
      failT = 0;
      var bounds = a.bounds();
      return {
        click: () => click(bounds.left, bounds.top - 10)
      };
    }
    failT = failT + 1;
    if (failT > 8) {
      stopReading = true;
      return {
        click: () => click(10, 10)
      };
    }
    swipe(300, 1600, 300, 450, 500);
    sleep(600);
    if (text('残忍离开').exists()) {
      back();
      sleep(2000);
    }
    if (tryT > 2) {
      back();
      sleep(3000);
      nextPage(true);
      click('刷新');
      sleep(3000);
      tryT = -1;
    }
    closeNoReact();
    return getTitle(tryT + 1);
  }

  function qVideo(minute) {
    click(550, 1840);
    minute = minute > 0 ? minute : 90;
    var start = Date.now();
    var one = (i) => {
      var times = 1 + ~~(Math.random() * 1);
      sleepAndDo(times);
      var x = ~~(Math.random() * 300 + 400);
      var y = ~~(Math.random() * 100);
      swipe(x, 1800 - y, x + 10, 100 + y, 500);
      sleep(2000);
      if (Date.now() - start < 1000 * 60 * minute) {
        one(i + 1);
      }
    }
    one(0);
  }

  function sleepAndDo(times) {
    var id1 = quTouTiaoId1;
    if (id(id1).exists()) {
      var caidan = id(id1).findOne(1000);
      click(caidan.bounds().left + 10, caidan.bounds().top + 10);
      sleep(5000);
      back();
    }
    sleep(1 * 1000);
    if (text('+50').exists()) {
      sleep(11 * 1000)
    } else {
      sleep((times - 1) * 1000);
    }
  }
}

function xiangKanJob() {
  launch('想看');
  sleep(16000);
  nextPage(true);
  nextPage(true);
  nextPage(true);
  nextPage(true);
  commonReading({
    readTime: 1.2,
    afterEnterPage: function () {
      sleep(2000);
      if (id('more_minute_btn').exists()) {
        var c = id('iv_close').findOne(2000);
        if (c) {
          c.click();
          sleep(1000);
        }
      }
    },
    beforeLeavePage() {
      var txt1 = '读完文章，送您一个彩蛋';
      if (text(txt1).exists()) {
        click(txt1);
        sleep(2000);
        click('继续看文章');
        sleep(1000);
      }
    },
    beforeOneUpDown() {
      if (id('fudai_icon').exists()) {
        var c = id('fudai_icon').findOne(2000);
        if (c) {
          c.click();
          sleep(3000);
          var c1 = id('iv_close').findOne(2000);
          if (c1) {
            c1.click();
            sleep(1000);
          }
        }
      }
      if (id('iv_close').exists()) {
        var c1 = id('iv_close').findOne(2000);
        if (c1) {
          c1.click();
          sleep(1000);
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
    var times = 10 + ~~(Math.random() * 15);
    sleep(1000 * times);
    var x = ~~(Math.random() * 300 + 400);
    var y = ~~(Math.random() * 100);
    swipe(x, 1600, x + 10, 200, 400);
    sleep(2000);
    if (Date.now() - start < 1000 * 60 * minute) {
      one(i + 1);
    }
  }
  one(0);
}


function lauchDuoFu() {
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

function caidanDown() {
  launch('彩蛋视频');
  sleep(20000);
  quTouTiaoVideo({
    readTime: 43,
    hasVideoText: '立即翻倍',
    beforeOneBegin: function (i) {
      if (i < 7) {
        back();
      }
    }
  });
}

function caidan() {
  launch('彩蛋视频');
  sleep(3000);
  click('允许');
  sleep(20000);
  begin();

  function begin(minute) {

    minute = minute > 0 ? minute : caidanReadingT;
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
      var times = 8;
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
  var SLEEP_TIME = 15;
  var sleepTime = 10;
  var realReadingT = ~~(kReadingT * (SLEEP_TIME / sleepTime));
  sleep(3000);
  launch('快手极速版');
  sleep(8000);
  try {
    start(0);
  } catch (err) {
    console.log(err);
  }


  function start(i) {
    if (i < 20) {
      click('我知道了', 1);
      back();
    }
    closeNoReact();
    if (isL) {
      fanfu();
    } else {
      normal();
      isL = isLong();
    }
    if (i > realReadingT) {
      return;
    }
    start(i + 1);
  }

  function fanfu() {
    sleep(sleepTime * 1000);
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
    var times = 6 + ~~(Math.random() * 6);
    sleep(times * 1000);
    var x = ~~(Math.random() * 300 + 400);
    var y = ~~(Math.random() * 100);
    swipe(x, 1800 - y, x + 10, 100 + y, 500);
    sleep(2000);
  }
}

function zhongJob(last) {
  sleep(3000);
  launch('中青看点');
  sleep(25000);
  nextPage(true);
  nextPage(true);
  try {
    commonReading({
      readTime: last,
      oneReadTime: 32,
      beforeLeavePage: function () {
        if (click('查看详情')) {
          sleep(3000);
          back();
          sleep(3000);
        }
        if (id('n_').exists()) {
          var jiangli = id('n_').findOne(1000);
          var bound = jiangli.bounds();
          click(bound.left, bound.top);
          sleep(2000);
          back();
          sleep(2000);
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
  zhongVideo(zhongVideoT);

  function zhongVideo() {
    //  home();
    // launch('中青看点');
    // sleep(3000);
    //  click('允许');
    sleep(5000);
    click(500, 1815);
    // click(280, 1797);
    // sleep(3000);
    // click('小视频');
    sleep(6000);
    click(200, 300);
    begin();

    function begin(minute) {

      minute = minute > 0 ? minute : 20;
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
          var times = 6 + ~~(Math.random() * 8);
          sleepAndDo(times, video);
        }
        var x = ~~(Math.random() * 300 + 400);
        var y = ~~(Math.random() * 100);
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

function xiangKanVideo() {
  launch('想看');
  sleep(16000);
  back();
  sleep(2000);
  click(300, 1800);
  sleep(4000);
  back();
  sleep(2000);
  click(500, 590);
  xkVideo(0);

  function xkVideo(i) {
    if (i > 68) return;
    if (id('fudai_icon').exists()) {
      var c = id('fudai_icon').findOne(2000);
      if (c) {
        c.click();
        sleep(3000);
        var c1 = id('iv_close').findOne(2000);
        if (c1) {
          c1.click();
          sleep(1000);
        }
      }
    }
    if (id('iv_close').exists()) {
      var c1 = id('iv_close').findOne(2000);
      if (c1) {
        c1.click();
        sleep(1000);
      }
    }

    sleep(1000 * 60);
    click(500, 1480);
    xkVideo(i + 1);

  }
}

function zhongQingVideoKa() {
  launch('中青看点');
  sleep(25000);
  back();
  sleep(3000);
  click(500, 1815);
  sleep(5000);
  click(200, 300);
  sleep(500);
  click(193, 1400);
  sleep(2000);
  back();
  sleep(1000 * 60 * 24 * 1.5);
}

function zhongQingSearch() {
  launch('中青看点');
  sleep(25000);
  back();
  sleep(3000);
  click(700, 1815);
  sleep(5000);
  click('立即搜索');
  sleep(5000);
  try {
    all();
  } catch (e) {
    console.log(e);
  }

  function all() {
    var ls = text('去搜索').find();
    var lgAll = ls.length - 0;
    while (lgAll--) {
      ls = text('去搜索').find();
      ls[lgAll].click();
      sleep(5000);
      var max = 4;
      for (var j = 5; j < 12; j++) {
        if (textContains(j + '次搜索').exists()) {
          max = j - 1;
          break;
        }
      }
      zhongqingSearch(max);
      sleep(3000);
      back();
      sleep(6000);
    }

    function zhongqingSearch(times) {
      function aa(i) {
        var max = times || 4;
        var t = max + 1;
        if (i > max || textContains(t + '/' + t).exists()) {
          return
        }

        sleep(3000);
        var tar = text('热').findOne(2000);
        if (tar) {
          tar.click();
        } else {
          click('换一批');
          return aa(i + 1)
        }
        while (!textContains('搜索').exists() && !textContains('百度一下').exists()) {
          sleep(1000);
        }
        sleep(3000);
        var upDown = (j) => {
          oneUpDown(4000)
          if (j > 1) {
            return
          } else {
            upDown(j + 1)
          }
        }
        if (!textContains('页面失联了').exists()) {
          upDown(1);
          sleep(2000);
          swipe(500, 300, 500, 1000, 500);
          sleep(3000);
          if (click('百度一下', 0)) {

          } else {
            sleep(1000);
            click(850, 320);
            click(600, 600);
          }
          sleep(2000);
          upDown(1);
        }
        back()
        sleep(2000);
        if (!textContains('搜索赚').exists()) {
          sleep(1000);
          click(230, 100);
        }
        sleep(1500);
        return aa(i + 1)
      }
      aa(0);
    }

    function oneUpDown(sl) {
      swipe(350, 770, 350, 270, 800);
      sleep(sl || 1000);
      swipe(350, 270, 350, 770, 800);
    }
  }
}


function kuaikanJob(last) {
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
        back();
        sleep(2000);
        if (!text('首页').exists()) {
          sleep(36 * 1000);
          click(985, 112);
          back();
          sleep(1000);
          back();
        }
        return true;
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function quLingSheng(readTime) {
  launch('趣铃声');
  sleep(20000);
  click(550, 1500);
  sleep(2000);
  click('小视频');
  quTouTiaoVideo({
    afterVideo: function () {
      var c = id('iv_close').findOne(2000);
      if (c) {
        c.click();
      }
      sleep(800);
      click('小视频');
    },
    readTime: readTime || 35,
    upDownReadNoVideoTime: 5,
    upDownReadTime: 35,
    textE: '金币发放成功',
    goDown: function () {
      click('铃声');
    },
    goUp: function () {
      click('小视频');
    },
    beforeDownRead: function () {
      click('小视频');
    }
  });
}


function tianTian(readTime) {
  launch(isDefLaunch && isAdmin ? '每日爱清理' : '天天爱清理');
  sleep(8000);
  click('停止扫描');
  sleep(5000);
  click('停止扫描');
  sleep(5000);
  click('停止扫描');
  sleep(5000);
  click('视频');
  quTouTiaoVideo({
    readTime: readTime || 20,
    upDownReadNoVideoTime: 5,
    upDownReadTime: 45,
    textE: '奖励已到账',
    goDown: function () {
      click('首页');
    },
    goUp: function () {
      click('视频');
    },
    beforeDownRead: function () {
      click('视频');
    },
    beforeOneBegin: function (i) {
      if (i < 7) {
        click('暂不领取');
        var c = id('iv_close').findOne(2000);
        if (c) {
          c.click();
        }
      }
      click('继续加油')
    }
  });
}

function commonReading(option) {
  var def = {
    readTime: 1.2,
    oneReadTime: 60,
    beforeLeavePage: noneFn,
    afterEnterPage: noneFn,
    beforeOneUpDown: noneFn,
    canReadTwo: true,
    refresh: defRefresh,
    enterP1: defEnterP1,
    enterP: defEnterP,
    upDownRead: true
  }
  option = option ? Object.assign(def, option) : def;
  var oneReadTime = option.oneReadTime;
  var beforeLeavePage = option.beforeLeavePage;
  var readTime = option.readTime;
  var beforeOneUpDown = option.beforeOneUpDown;
  var canReadTwo = option.canReadTwo;
  var afterEnterPage = option.afterEnterPage;
  var refresh = option.refresh;
  var enterP = option.enterP;
  var enterP1 = option.enterP1;
  var upDownRead = option.upDownRead;
  oneReadTime = oneReadTime || 60;
  stopReading = false;
  var time;
  var read = (i) => {
    if (Date.now() - time > 1000 * oneReadTime) {
      return;
    }
    i = i || 1;
    if (upDownRead) {
      oneUpDown(2500);
    } else {
      twoDown(2500);
    }
    closeNoReact();
    if (i < 50) {
      beforeOneUpDown(i);
      sleep(3000);
      read(i + 1);
    }
  }

  function defRefresh() {
    swipe(400, 350, 400, 900, 800)
  }

  function defEnterP() {
    click(400, 430)
  }

  function defEnterP1() {
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
    if (Date.now() - start < 1000 * 60 * 60 * readTime && !stopReading) {
      if (onePageRefreshTime > 1) {
        onePageRefreshTime = 0;
        nextPage(dirRight);
        swipeTime += 1;
        if (swipeTime > 8) {
          dirRight = !dirRight;
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
  sleep(100);
  back();
  sleep(4000);
  if (!isDefLaunch) {
    launch2(name);

  } else {
    if (name) {
      launchApp(name);
      sleep(5000);
      click('允许', 1);
    }
  }
}

function oneUpDown(sl) {
  swipe(350, 770, 350, 270, 400);
  sleep(sl || 1000);
  swipe(350, 270, 350, 770, 400);
}

function twoDown(sl) {
  swipe(350, 770, 350, 270, 400);
  sleep(sl || 1000);
  swipe(350, 770, 350, 270, 400);
}

function nextPage(right) {
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
      // back();
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

function launch2(name) {
  home();
  sleep(2000);
  home();
  sleep(2000);
  var tar = text(name).findOne(2000);
  while (!tar || tar.bounds().left < 8 || tar.bounds().left > 900) {
    swipe(950, 600, 50, 600, 400);
    sleep(2500);
    tar = text(name).findOne(2000);
  }
  var bounds = tar.bounds();
  click(bounds.left + 60, bounds.top + 100);
}

function closeNoReact() {
  if (textContains('没有响应').exists() && text('等待').exists()) {
    click('等待');
  }
}

function quTouTiaoVideo(opt) {
  var defOpt = {
    afterVideo: function () {
      back();
    },
    readTime: 0,
    upDownReadTime: 0,
    upDownReadNoVideoTime: 0,
    textE: '',
    hasVideoText: '看视频再领',
    goDown: function () {
      swipe(900, 1600, 900, 60, 500);
    },
    goUp: function () {
      swipe(900, 120, 900, 1600, 500);
    },
    beforeDownRead: noneFn,
    beforeOneBegin: noneFn
  }
  opt = opt ? Object.assign(defOpt, opt) : defOpt;

  var afterVideo = opt.afterVideo;
  var textE = opt.textE;
  var goDown = opt.goDown;
  var goUp = opt.goUp;
  var beforeDownRead = opt.beforeDownRead;
  var beforeOneBegin = opt.beforeOneBegin;
  var hasVideoText = opt.hasVideoText;
  var upDownWatchVideo = true;

  function noVideoUpDown() {
    if (opt.upDownReadNoVideoTime) {
      upDownWatchVideo = false;
      updownRead(opt.upDownReadNoVideoTime);
      upDownWatchVideo = true;
    }
  }
  if (noVideoFirst) {
    beforeDownRead();
    noVideoUpDown();
  }
  if (opt.upDownReadTime) {
    beforeDownRead();
    updownRead(opt.upDownReadTime)
  }
  if (!noVideoFirst) {
    beforeDownRead();
    noVideoUpDown();
  }
  beforeDownRead();
  downRead(opt.readTime);

  function downRead(minute) {
    minute = minute > 0 ? minute : 20;
    var start = Date.now();
    var one = (i) => {
      closeNoReact();
      var times = 6 + ~~(Math.random() * 6);
      sleepAndDo(times, video);
      var x = ~~(Math.random() * 300 + 400);
      var y = ~~(Math.random() * 100);
      swipe(x, 1800 - y, x + 10, 100 + y, 500);
      sleep(2000);
      if (Date.now() - start < 1000 * 60 * minute) {
        beforeOneBegin(i + 1);
        one(i + 1);
      }
    }
    one(0);
  }

  function updownRead(minute) {

    minute = minute > 0 ? minute : 40;
    var start = Date.now();
    var one = (i) => {
      closeNoReact();
      var times = 12;
      sleepAndDo(times, video);
      goDown();
      sleepAndDo(0.8, video);
      goUp();
      sleepAndDo(2, video);
      if (Date.now() - start < 1000 * 60 * minute) {
        beforeOneBegin(i + 1);
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
      sleep(times * 1000);
      fn();
    }
  }


  function video() {
    hasVideoText = hasVideoText || '看视频再领';
    if (!textContains(hasVideoText).exists()) {
      return;
    }
    if (upDownWatchVideo) {
      textContains(hasVideoText).findOne(2000).click();
      quTouTiaoWatch(textE);
    } else {
      sleep(1000);
    }
    afterVideo();
  }
}

function quTouTiaoWatch(textE) {
  var def = '点击重播';
  textE = textE || def;
  var hasDef = textE === def;

  function notEnd() {
    return hasDef ? !textContains(textE).exists() :
      !textContains(textE).exists() && !textContains(def).exists();
  }
  var tryT = 0;
  while (notEnd()) {
    sleep(2000);
    if (tryT > 30) {
      back();
      sleep(5000);
      if (text('继续观看').exists()) {
        click('继续观看');
        tryT = 10;
      } else {
        click(985, 112);
        break;
      }
    }
    tryT = tryT + 1;
  }
  if (tryT <= 30) {
    sleep(2000);
    back();
  }
  sleep(3000);
}