var isDefLaunch = false;
var isAdmin = false;

var videoCheckLs = [];
var useStorage = true;

var quTouTiaoId1 = isDefLaunch ? 'avi' : 'aw_';
var quTouTiaoId2 = isDefLaunch ? 'uu' : 'v4'; // 'a68' : 'a5x';
var caidanReadingT = isDefLaunch ? 60 : 33;
var kReadingT = isDefLaunch ? 1200 : 1200;
var zhongVideoT = isDefLaunch ? 0 : 0;
var easyVideoT = 5;
var noVideoFirst = false;
var stopReading = false;
var unDoneFnForSave = [];
var unDoneFnKeyForSave = [];
var unDoneFnForRun = [];

var kankanSleep = 2400;
var runChildFirst = true;

var isNote3 = isDefLaunch && !isAdmin;
var startDate = (new Date).getDate();
var runDouYinBX = false;

if (!isAdmin && isDefLaunch) {
  quTouTiaoId1 = 'awx';
  quTouTiaoId2 = 'v7';
}
removeUselessStorage();
initVideoCheckListener();
var rehuoLike = initAllReHuoLike();
var huohuoJob = rehuoLike.huohuoJob;
var quZhuanJob = rehuoLike.quZhuanJob;
var rehuoJob = rehuoLike.rehuoJob;
var tianQiJob = rehuoLike.tianQiJob;

var kuaiYinJob = initKuaiYinJob();
var zhongQingOther = initZhongQingOther();

sleep(5000);
useStorage = false;

// checkDouYinInKuaiShou();
// kuaishouUpDown(1, true);
// kuai7Chengjiu();
// zhongQingLongVideo(100);
// sleep(1000 * 10000);

// quTouTiaoR();

// kReading();

// zhongJob(0.94);
// zhongQingLongVideo(0.2);
// shuaBao();
// zhongQingKanKan();;
// quTouTiaoWatch()
// kuaiShouSmallTask();
// sleep(1000 * 10000);
// kuaishouUpDown(1, true);
// huohuoJob.other();
// quZhuanJob.runAll();
// rehuoJob.runAll();
// kuaiYinJob.runAll();
// kuaiYinJob.baoXiang();
// huohuoJob.hongBao();
// sleep(1000 * 10000);
// quZhuanJob.chengJiu();
// zhongQingOther.zhuanPan();
// zhongQingOther.kankan(true)
// jinRiJob();
// tianQiJob.runAll();
// runReHuoLikeOther();
// zhongQingOther.search();
useStorage = true;

home();
begin();
otherRun();
begin();
otherRun();

function otherRun() {
  if (isAdmin) {
    douYin(30);
    douYinBaoXiang();
    // jinRiJob();
  } else {
    kuaiYinJob.runAll();
  }
  // fengKan(10);

  huohuoJob.runAll();

  rehuoJob.runAll();

  quZhuanJob.runAll();

  if (isAdmin || !isDefLaunch) {
    shuaBao();
  }

  zhongVideoT = 0;
  zhongJob(1.0);
  douYinBaoXiang();
  zhongQingLongVideo(0.2);
  douYinBaoXiang();
  zhongJob(1.0);
  runUnDoneFn();
  douYinBaoXiang();
  zhongJob(1.0);
  douYinBaoXiang();
  if (isAdmin || !isDefLaunch) {
    shuaBao();
  }
  // fengKan(10);
  if (isDefLaunch && !isAdmin) {
    zhongQingOther.search();
  }

  douYinBaoXiang();
  zhongJob(0.9);
  douYinBaoXiang();
  runUnDoneFn();
  zhongQingLongVideo(0.2);
  douYinBaoXiang();
  kReading();
  douYinBaoXiang();
  runUnDoneFn();
  douYinBaoXiang();
  // fengKan(10);
  if (isDefLaunch) {
    zhongQingOther.zhuanPan();
  }

  runUnDoneFn();
  huohuoJob.other();

  rehuoJob.other();

  quZhuanJob.other();

  if (isDefLaunch && !isAdmin) {
    zhongQingOther.search();
  }
  if (!isAdmin) {
    kuaiYinJob.water();
  }
  zhongJob(1.34);
  runUnDoneFn();
  tianQiJob.runAll();
  runReHuoLikeOther();
  zhongQingOther.search();
  zhongQingOther.kankan();
  runUnDoneFn();
}


home();

console.log(new Date().toString())

function begin() {
  sleep(2000)

  if (isDefLaunch) {

    zhongJob(1.0);
    zhongQingOther.zhuanPan();

    if (!isAdmin) {
      quTouTiaoR();
    }
  } else {
    zhongJob(1.0);
  }
}

function runReHuoLikeOther() {
  var apps = initAllReHuoLike();
  for (var name in apps) {
    var app = apps[name];
    if (app && typeof app.other === 'function') {
      app.other();
    }
  }
}

function initAllReHuoLike() {
  var clickF = function () {
    click(500, 350);
    inFirst = true;
  }
  var pageIdx = 0;
  var inFirst = true;
  var tianQiJob = initReHuoLikeJob({
    appName: '趣查天气',
    videoAdText: '看视频再送',
    successCloseId: 'mh',
    hourCoinText: 'acx',
    enterMain: function () {
      click(640, 1825);
    },
    upDownRead: true,
    afterEnterTask: function () {
      sleep(4000);
      var id1 = 'h9';
      if (id(id1).exists()) {
        var tar = id(id1).findOne(2000);
        if (tar) {
          tar.click();
        }
      }
    },
    beforeMainStart: function () {
      sleep(8000);
      clickF();
      sleep(3000);
      clickF();
    },
    mainEveryloop: function (i) {
      var startId = 'a2y'
      if (textContains('看视频再送').exists()) {
        return;
      }
      if (textEndsWith('关闭广告').exists()) {
        click('关闭广告');
      } else {
        if (i % 5 === 0 && i > 1) {
          var ad = text('广告').findOne(2000);
          var noAd;
          if (ad) {
            var top = ad.bounds().top;
            noAd = top < device.height - 100;
          } else {
            noAd = true;
          }
          if (noAd && inFirst) {
            click(500, 1250);
          } else {
            try {
              if (pageIdx === 0) {
                nextPage();
                pageIdx++;
              } else {
                nextPage(true);
                pageIdx--
              }
              clickF();
            } catch (err) {
              console.log(err)
            }
          }
        }
      }
      
    },
    mainText: '天气'
  });
  var quZhuanJob = initReHuoLikeJob({
    appName: '趣赚清理',
    videoAdText: '看视频再送',
    successCloseId: 'ly',
    hourCoinText: 'aep',
    enterMain: function () {
      click(640, 1825);
    },
    backStopId: 'gt'
  });

  var rehuoJob = initReHuoLikeJob({
    appName: '热火视频极速版',
    videoAdText: '翻倍',
    successCloseId: 'lx',
    hourCoinText: isDefLaunch && !isAdmin ? 'adx' : 'acn'
  });

  var huohuoJob = initReHuoLikeJob({
    appName: '火火视频极速版',
    videoAdText: '看视频再送',
    successCloseId: isNote3 ? 'ky' : function () {
      var id3 = 'kj';
      var id4 = 'ki';
      if (id(id3).exists()) {
        var tar = id(id3).findOne(2000);
        if (tar) {
          tar.click();
        }
      } else if (id(id4).exists()) {
        var tar = id(id4).findOne(2000);
        if (tar) {
          tar.click();
        }
      }
      var id5 = 'go';
      if (id(id5).exists()) {
        var tar = id(id5).findOne(2000);
        if (tar) {
          tar.click();
        }
      }
      sleep(1500);
    },
    hourCoinText: isNote3 ? 'ac0' : 'abc',
    backStopId: 'gi'
  });
  return {
    huohuoJob: huohuoJob,
    quZhuanJob: quZhuanJob,
    rehuoJob: rehuoJob,
    tianQiJob: tianQiJob
  }
}

function initReHuoLikeJob(p) {
  var def = {
    enterMain: function () {
      click(500, 1825);
    },
    backStopId: false,
    taskEntryName: '任务',
    upDownRead: false,
    afterEnterTask: noneFn,
    mainEveryloop: noneFn,
    beforeMainStart: noneFn,
    mainText: '首页'
  }
  p = p ? Object.assign(def, p) : def;

  var appName = p.appName;
  var videoAdText = p.videoAdText;
  var hourCoinText = p.hourCoinText;
  var successCloseId = p.successCloseId;
  var enterMain = p.enterMain;
  var key = p.key || appName;
  var backStopId = p.backStopId;
  var taskEntryName = p.taskEntryName;
  var upDownRead = p.upDownRead;
  var afterEnterTask = p.afterEnterTask;
  var mainEveryloop = p.mainEveryloop;
  var beforeMainStart = p.beforeMainStart;
  var mainText = p.mainText;

  var main = noneFn;
  var hongBao = noneFn;
  var chengJiu = noneFn;
  var other = noneFn;

  if (appName && videoAdText && hourCoinText && successCloseId) {
    main = function (t) {
      runAndMarkByDuring(function (realT, addInFn) {
        toast(realT)
        startApp();
        var i = 8;
        while (i) {
          sleep(800);
          if (text(mainText).exists()) {
            break;
          }
          i = i - 1;
        }
        enterMain();
        sleep(4000);
        var getOnePassTime = initGetLittleDuringTime();
        beforeMainStart();
        quTouTiaoVideo({
          readTime: upDownRead ? 0 : (realT || 40),
          upDownReadTime: upDownRead ? (realT || 40) : 0,
          goDown: function () {},
          goUp: function () {},
          beforeOneBegin: function (i, passTime) {
            if (textContains('充电').exists()) {
              click('取消');
            }
            var coinText = '金蛋大奖';
            if (textContains(coinText).exists()) {
              var tar = textContains(coinText).findOne(1000);
              click(tar.bounds().left + 15, tar.bounds().top - 15);
              sleep(2000);
            } else {
              closeSuccessModal();
            }
            if (!text(mainText).exists()) {
              sleep(500);
              back();
            }
            if (textContains('立即领取').exists()) {
              click('立即领取');
              sleep(2000);
              back();
            }
            randomInterest(0.07);
            addInFn(getOnePassTime(passTime, 0.1));
            mainEveryloop(i)
          },
          hasVideoText: videoAdText,
          oneReadTime: function () {
            return 6 + ~~(Math.random() * 5);
          },
          afterVideo: function () {
            var succText = '您又赚了';
            var res = myWaitUntil(succText, 6);
            if (res) {
              sleep(1500);
              var a = textContains(succText).findOne(2000);
              if (a) {
                var top = a.bounds().top;
                click(950, top - 86);
              }
            } else {
              closeSuccessModal();
            }
            if (upDownRead) {
              click(500, 350);
            }
          }
        });
      }, key + 'main', upDownRead ? 20 : 60, t || 40);
    }

    hongBao = function () {
      goToD();
      begin();
      sleep(2000);
      videoAd();

      function begin() {
        var tarText = '领红包';
        while (text(tarText).exists()) {
          var a = text(tarText).findOne(1000);
          if (a) {
            swipe(500, 500, 500, 600, 500);
            sleep(100);
            click(a.bounds().left + 10, a.bounds().top - 30);
            sleep(3000);
            if (text('看视频红包').exists()) {
              click(550, 1230);
              sleep(5000)
              quTouTiaoWatch();
              sleep(3000);
              closeSuccessModal();
              if (text('观看历史').exists()) {
                back();
                sleep(1000);
              }
            }
            return begin();
          }
        }
        runAndMark(function () {
          const myId = hourCoinText;
          if (id(myId).exists()) {
            var tar = id(myId).findOne(2000);
            if (tar) {
              tar.click();
            }
            quTouTiaoWatch();
            sleep(3000);
            closeSuccessModal();
            if (text('观看历史').exists()) {
              back();
              sleep(1000);
            }
            saveUnDoneFn(function () {
              return hongBao()
            }, key + 'hongBao');
            return true;
          }
        }, key + 'hongBao' + new Date().getHours())
      }

      function goToD() {
        startApp();
        goToTask();
        var i = 8;
        while (i) {
          sleep(1000);
          closeSuccessModal();
          if (text('日常任务').exists()) {
            break;
          }
          if (hongBaoModalExists()) {
            break
          }
          i = i - 1;
        }
        sleep(5000);
        closeSuccessModal();
        closeHongBaoModal();
        closeSuccessModal();
        closeBackStopModal();
        if (text('勋章殿堂').exists()) {
          swipe(350, 570, 350, 1570, 300);
          sleep(300);
          swipe(350, 570, 350, 1570, 300);
          sleep(300);
          swipe(350, 570, 350, 1570, 300);
        }
        sleep(8000);
      }
    }

    chengJiu = function () {
      var tarText = '可领取';
      var okText = '确认';

      runAndMark(function () {
        goToD();
        var ls = text(tarText).find();
        toast(ls.length)
        begin(ls.length);
        sleep(2000);
        back();
        sleep(3000);
        videoAd();
      }, key + 'chengJiu');

      function begin(all) {
        while (text(tarText).exists() && all--) {
          var idx = text('可领取勋章').exists() ? 1 : 0;
          click(tarText, idx);
          sleep(2000);
          if (text(okText).exists()) {
            click(okText);
            sleep(2000);
            click(tarText, 0);
          }
          quTouTiaoWatch();
          if (typeof successCloseId === 'string') {
            myWaitUntil(function () {
              return id(successCloseId).exists();
            })
          } else {
            sleep(8000);
          }
          closeSuccessModal();
        }
        var ls = textContains('已领取').find();
        return ls.length > 7;
      }

      function goToD() {
        startApp();
        goToTask();
        var i = 8;
        while (i) {
          sleep(1000);
          closeSuccessModal();
          if (text('立即提现').exists()) {
            break;
          }
          if (hongBaoModalExists()) {
            break;
          }
          i = i - 1;
        }
        sleep(5000);
        closeSuccessModal();
        closeHongBaoModal();
        closeSuccessModal();
        closeBackStopModal();
        scrollIntoView('新手任务', 200);
        scrollIntoView('日常任务', 600);
        var chengjiuText = '勋章殿堂';
        var a = text(chengjiuText).findOne(1500);
        if (!a) {
          return;
        }
        click(chengjiuText);
        sleep(8000);
      }
    }

    other = function () {
      var keyP = key + 'ohter'
      if (isDone(keyP)) {
        return;
      }
      goToD();
      var a3 = runAndMark(function () {
        return quTouTiaoAdGame({
          enter: function () {
            click(100, 150);
            myWaitUntil('还剩下')
            sleep(2000);
            return true;
          },
          signalText: '还剩下',
          runOneGame: function (t) {
            click(520, 856);
            if (t !== 5) {
              quTouTiaoWatch();
            }
            sleep(4000);
            if (text('提醒').exists()) {
              click('确定');
            }
            closeSuccessModal();
            return true;
          },
          testTryT: function (n) {
            sleep(5000);
            return textContains(n + '次机会').exists();
          }
        });
      }, keyP + 'guaFen');
      if (a3) {
        markDone(keyP);
      }
      videoAd();

      function goToD() {
        startApp();
        goToTask();
        var i = 8;
        while (i) {
          sleep(1000);
          closeSuccessModal();
          if (text('日常任务').exists()) {
            break;
          }
          if (hongBaoModalExists()) {
            break
          }
          i = i - 1;
        }
        sleep(5000);
        closeSuccessModal();
        closeHongBaoModal();
        closeSuccessModal();
        sleep(8000);
      }
    }
  }

  function closeBackStopModal() {
    if (!backStopId) {
      return;
    }
    closeMiModal();
    if (id(backStopId).exists()) {
      var tar = id(backStopId).findOne(2000);
      if (tar) {
        tar.click();
      }
      sleep(800);
    }
    click('不再提醒');
  }

  function closeHongBaoModal() {
    if (huohuoHongBaoModalExists()) {
      click(890, 500);
      sleep(2000);
    }
  }

  function hongBaoModalExists() {
    return text('看视频红包').exists();
  }

  function videoAd() {
    if (text('看视频').exists()) {
      click('看视频');
      sleep(4000);
      if (!text('看视频').exists()) {
        quTouTiaoWatch();
        sleep(2000);
        closeSuccessModal();
        sleep(2000);
      }
      if (!text('看视频').exists()) {
        back();
      }
    }
  }

  function goToTask() {
    var a = text(taskEntryName).findOne(1500);
    if (!a) {
      a = text('领取红包').findOne(1500);
    }
    if (a) {
      click(a.bounds().left + 10, a.bounds().top - 10);
    } else {
      click(920, 1850);
    }
    afterEnterTask();
  }

  function closeSuccessModal() {
    var id1 = successCloseId;
    if (typeof id1 === 'function') {
      id1();
      return;
    }
    if (id(id1).exists()) {
      var tar = id(id1).findOne(2000);
      if (tar) {
        tar.click();
      }
    }
    sleep(1500);
  }

  function startApp() {
    var res = launch(appName);
    sleep(18000);
    closeBackStopModal();
    click('取消');
    return res;
  }

  var runAll = function () {
    main(40);
    hongBao();
    chengJiu();
  }

  return {
    main: main,
    hongBao: hongBao,
    chengJiu: chengJiu,
    other: other,
    runAll: runAll
  }
}

function kuaiShouSmallTask() {
  runAndMark(function () {
    var entryId = 'red_packet';
    var entry = id(entryId).findOne(1200);
    try {
      if (entry) {
        click(entry.bounds().centerX(), entry.bounds().centerY());
        var res = myWaitUntil('日常任务');
        if (res) {
          // swipe(500,1900,500,200,600);
          sleep(1200)
          var tar1 = '福利';
          var end2 = '已完成';
          var n = 12;
          while (!text(end2).exists() && n-- && textContains('看直播').exists()) {
            watch2()
            sleep(2000);
          }
          var m = 12;
          while (m-- && textStartsWith(tar1).exists()) {
            watch1()
            sleep(2000);
          }
          sleep(6000);
          var isEnd = !textStartsWith(tar1).exists() && text(end2).exists();
          back();
          sleep(3000);
          return isEnd
        }
      }
    } catch (err) {
      console.log(err)
    }
  }, 'kuaiShouSmallTask')

  function watch1() {
    click('福利');
    sleep(3000);
    if (text('刷新').exists()) {
      back();
      return
    }
    sleep(3000);
    if (text('刷新').exists()) {
      back();
      return
    }
    sleep(3000);
    if (text('刷新').exists()) {
      back();
      return
    }
    sleep(3000);
    if (text('刷新').exists()) {
      back();
      return
    }
    var l = 15;
    while (l--) {
      if (textContains('后可领取奖励').exists()) {
        sleep(3000)
      } else {
        return back();
      }
    }
  }

  function watch2() {
    var tar = text('看直播').find();
    if (tar[tar.length - 1]) {
      tar[tar.length - 1].click();
      sleep(40000);
      back();
      sleep(2000);
      if (text('退出').exists()) {
        click('退出');
        sleep(1000);
      }
    }
  }
}

function checkDouYinInKuaiShou() {
  kuaishouUpDown(1, true, function () {
    back();
    sleep(500);
    home();
    launchApp('快手极速版');
  });
}

function kuaishouUpDown(i, untilNextDay, afterCheck) {
  i = i || 1;
  if (text('拖动滑块').exists()) {
    function trySwipe(j) {
      j = j || 0;
      if (j > 2) {
        return;
      }
      var xSite = [900, 850, 800, 750, 700, 650];
      var lg = xSite.length;
      var succ = false;
      while (text('拖动滑块').exists() && lg--) {
        swipe(120, 975, xSite[lg] + 5, 975, 800);
        sleep(2500);
        if (!text('拖动滑块').exists()) {
          succ = true;
          break;
        }
      }
      if (succ) {
        console.log('success__' + xSite[lg]);
        return true;
      } else {
        trySwipe(j + 1);
      }
    }
    trySwipe(0);
    if (text('拖动滑块').exists()) {
      toast('failed');
      console.log('k__failed');
      return false;
    }
  }
  sleep(15 * 1000);
  oneUpDown();
  var opened = douYinBaoXiang();
  if (opened && typeof afterCheck === 'function') {
    afterCheck();
  }
  if (untilNextDay) {
    if ((new Date).getDate() !== startDate) {
      return;
    }
  } else {
    if (i > kReadingT) {
      return;
    }
  }
  kuaishouUpDown(i + 1, untilNextDay, afterCheck);

  function oneUpDown(isX) {
    swipe(900, isX ? 770 : 1600, 900, 60, 500);
    sleep(500);
    swipe(900, 200, 900, isX ? 1180 : 1600, 500);
  }
}

function zhongQingKanKan() {
  begin();

  function findAd() {
    var ad = '广告';
    var ad2 = '热点新闻';
    var ad3 = '热闻看看';
    var ad31 = '热点资讯';
    var ad4 = '今日热搜';
    var ad41 = '今日热点';
    var ad5 = '猎文小说';
    var ad6WithEnd = 'ErkJggg==';
    var ad7 = '?';
    var ad8 = 'iframe';
    var type = '';
    myWaitUntil(function () {
      if (text(ad).exists()) {
        type = ad;
        return true
      } else if (textEndsWith(ad6WithEnd).exists()) {
        type = ad6WithEnd;
        return true;
      } else if (text(ad2).exists() || text(ad3).exists() || text(ad31).exists()) {
        type = ad2;
        return true
      } else if (text(ad4).exists() || text(ad41).exists()) {
        type = ad4;
        return true
      } else if (text(ad5).exists()) {
        type = ad5;
        return true
      } else if (idEndsWith(ad8).exists()) {
        type = ad8;
        return true
      }
      return false;
    }, 10);
    toast(type);
    if (type === ad) {
      toast('has ad');
      if (text(ad7).findOne(2000)) {
        myWaitUntil(function () {
          return id('pop_close').exists()
        }, 6)
        click(500, 1020);
        checkSpecialType();
        return true;
      } else {
        var ls = text(ad).find().concat(textEndsWith(ad6WithEnd).find());
        ls.sort(function (a, b) {
          return a.bounds().top - b.bounds().top;
        });
        scrollIntoView(function () {
          return ls[0];
        }, 1600);
        ls = text(ad).find();
        ls.sort(function (a, b) {
          return a.bounds().top - b.bounds().top;
        });
        var a = ls[0];
        if (a) {
          var top = a.bounds().top;
          click(500, top + 80);
          checkSpecialType();
        }
        return true;
      }
    } else if (type === ad2) {
      toast(ad2);
      clickFirst();
      checkSpecialType();
      return true;
    } else if (type === ad4) {
      var tar = text(ad4).findOne(2000);
      if (tar) {
        click(500, tar.bounds().top + 160);
        checkSpecialType();
      }
      return true;
    } else if (type === ad5) {
      sleep(4000);
      var tar = myWaitUntil('ggg==');
      toast(tar);
      if (tar) {
        click(500, 1000);
        checkSpecialType();
      }
      return true;
    } else if (type === ad6WithEnd) {
      toast('has ad end');
      var ls = textEndsWith(ad6WithEnd).find();
      ls.sort(function (a, b) {
        return a.bounds().top - b.bounds().top;
      });
      scrollIntoView(function () {
        return ls[0];
      }, 1600);
      ls = textEndsWith(ad6WithEnd).find();
      ls.sort(function (a, b) {
        return a.bounds().top - b.bounds().top;
      });
      var a = ls[0];
      if (a) {
        var top = a.bounds().top;
        click(500, top - 80);
        checkSpecialType();
      }
      return true;
    } else if (type === ad7) {
      toast('modal')
      myWaitUntil(function () {
        return id('pop_close').exists()
      }, 6)
      click(500, 1020);
      checkSpecialType();
      return true;
    } else if (type === ad8) {
      toast('iframe')
      var a = idEndsWith(ad8).findOne(1000);
      if (a) {
        click(500, a.bounds().top + 80);
        checkSpecialType();
        return true;
      }
    }
  }

  function checkSpecialType() {
    sleep(5000);
    if (isEnd()) {
      return true;
    }
    if (addListType()) {
      return true;
    } else if (souGouType()) {
      return true;
    } else if (baiDuType()) {
      return true;
    } else if (otherSouType()) {
      return true;
    } else if (tongChengType()) {
      return true;
    }
  }

  function tongChengType() {
    if (textContains('city=fs').exists()) {
      var i = 8;
      while (i--) {
        upDown(2);
        click(500, 800);
        sleep(600);
        back();
        sleep(1200);
        if (isEnd()) {
          break;
        }
      }
      return true;
    }
  }

  function addListType() {
    var a1 = '商家列表';
    var a2 = '聚合商家推荐';
    var a3 = '为您推荐';
    var a4 = '柠檬爱美'
    var a5 = '聚合商家推荐';
    var ls = [a1, a2, a3, a4, a5];
    var type = '';
    for (var i = 0; i < ls.length; i++) {
      if (text(ls[i]).exists()) {
        type = ls[i];
      }
    }
    if (type) {
      toast(type)
      var lg = 7;
      if (type === a4) {
        lg = 1;
      }
      while (lg--) {
        if (textContains('已看' + lg + '篇').exists()) {
          break;
        }
      }
      var i = 8;
      while (i--) {
        upDown(2);
        clickFirst();
        sleep(600);
        back();
        sleep(1200);
        if (isEnd()) {
          break;
        }
        if (i === 4) {
          var lg1 = 7;
          while (lg1--) {
            if (textContains('已看' + lg1 + '篇').exists()) {
              break;
            }
          }
          if (lg1 === lg) {
            break;
          }
        }
      }
      return true;
    }
  }

  function souGouType() {
    if (text('搜索').exists() && text('相关搜索').exists()) {
      var a = text('搜索').findOne(1000);
      if (a) {
        var i = 8;
        while (i--) {
          sleep(1200);
          upDown(2);
          click(a.bounds().centerX(), a.bounds().centerY());
          if (isEnd()) {
            break;
          }
        }
      }
      return true;
    }
  }

  function baiDuType() {
    if (text('百度一下').exists()) {
      var a = text('百度一下').findOne(1000);
      if (a) {
        var i = 8;
        while (i--) {
          sleep(1200);
          upDown(2);
          click(a.bounds().centerX(), a.bounds().centerY());
          if (isEnd()) {
            break;
          }
        }
      }
      return true;
    }
  }

  function otherSouType() {
    var t = '相关搜索';
    if (text(t).exists()) {
      var i = 8;
      while (i--) {
        myWaitUntil(t, 5);
        scrollIntoView(t);
        var a = text(t).findOne(1000);
        if (a) {
          click(300, a.bounds().centerY() + 160);
        } else {
          back();
        }
        if (isEnd()) {
          break;
        }
      }
      return true;
    }
  }

  function isEnd() {
    return textContains('青豆奖励').exists() || textContains('今日任务已完成').exists();
  }

  function clickFirst() {
    click(500, 500);
  }
  // begin();
  function begin(l, f) {
    function aa1(i, btn) {
      if (i > 9) {
        return
      }
      if (i > 3) {
        if (!textContains('加油').exists()) {
          return;
        }
      }
      if (text('美图').exists()) {
        return
      }
      btn.click();
      var waitTime = 0;
      while (!textContains('青豆').exists()) {
        sleep(2000)
        waitTime = waitTime + 1;
        if (waitTime > 12) {
          break;
        }
      }
      sleep(6000);
      const changeSite = (y) => {
        if (y > 0) {
          swipe(350, 870, 350, 270, 700);
          sleep(800);
          return changeSite(y - 1)
        }
      }
      var hasAd = findAd();
      if (!hasAd) {
        changeSite(i);
        click(300, 570);
        var a = checkSpecialType();
        if (!a) {
          sleep(3000);
          upDown(2);
        } else if (!isEnd()) {
          back();
          sleep(3000);
          click(300, 550);
          checkSpecialType();
        }
      }
      var done;
      if (isEnd()) {
        done = true;
      }
      leave();
      if (done) {
        return;
      }
      return aa1(i + 1, btn)
    }
    var readingTime = 0;

    function beginReading(target) {
      if (!target) {
        return;
      }
      aa1(0, target);
      sleep(2000);
      readingTime = readingTime + 1;
      if (readingTime > 48) {
        return;
      }
      return beginReading()
    }
    var ls1 = text('进行中').find().reverse();
    var lg2 = ls1.length;
    var ls = text('去完成').find().reverse();
    var lg1 = ls.length;
    while (lg1--) {
      var tar = text('去完成').findOne(800);
      if (!tar) {
        break;
      }
      var bounds = tar.bounds();
      // click(bounds.centerX(), bounds.centerY());
      beginReading({
        click: function () {
          click(bounds.centerX(), bounds.centerY() - 30);
        }
      });
    }
    while (lg2--) {
      var tar = text('进行中').findOne(800);
      if (!tar) {
        break;
      }
      var bounds = tar.bounds();
      beginReading({
        click: function () {
          click(bounds.centerX(), bounds.centerY() - 30);
        }
      });
    }
  }

  function leave() {
    back();
    sleep(2000);
    click(230, 100);
    sleep(2000);
  }

  function upDown(j) {
    oneUpDown(3000);
    if (j > 2) {
      return
    } else {
      return upDown(j + 1)
    }
  }

  function oneUpDown(sl) {
    swipe(350, 770, 350, 270, 800);
    sleep(sl || 1000);
    swipe(350, 270, 350, 770, 800);
  }
}

function initVideoCheckListener() {
  addVideoCheckListener(function () {
    var isTaoBao = false
    var checkType = '';
    var types = ['Fancy', '电商'];
    return function (time) {
      if (time === 0) {
        isTaoBao = false;
        checkType = '';
      }
      if (time < 13 && !isTaoBao) {
        var lg = types.length;
        while (lg--) {
          var t = types[lg];
          if (text(t).exists()) {
            isTaoBao = true;
            checkType = t;
            toast(checkType)
            break;
          }
        }
      } else {
        if (isTaoBao) {
          if (!text(checkType).exists() && !text('关闭').exists()) {
            sleep(2000);
            if (!textContains('是否允许').exists()) {
              const appName = launch.lastest;
              launch.lastest = '';
              toast('relaunch' + appName);
              home();
              sleep(300)
              home();
              sleep(500)
              launch(appName);
              sleep(9000);
              videoLeftClose();
              return true;
            }
          }
        } else {
          return;
        }
      }
    }
  }())

  addVideoCheckListener((function () {
    var isTaoBao = false;
    var checkType = '';
    var types = ['点击下载', '安装', '下载', '打开'];
    return function (time) {
      if (time === 0) {
        isTaoBao = false;
        checkType = '';
      }
      if (time < 13 && !isTaoBao) {
        var lg = types.length;
        while (lg--) {
          var t = types[lg];
          if (text(t).exists()) {
            isTaoBao = true;
            checkType = t;
            break;
          }
        }
      } else {
        if (isTaoBao) {
          if (!text(checkType).exists()) {
            sleep(2000);
            videoLeftClose();
            return true;
          }
        } else {
          if (text('恭喜获得奖励').exists()) {
            sleep(2000);
            videoLeftClose();
            return true;
          }
          return;
        }
      }
    }
  })());

  addVideoCheckListener((function () {
    var isDuoDuo = false;
    var checkType = '';
    var types = ['跳过', '反馈'];
    return function (time) {
      if (time === 0) {
        isDuoDuo = false;
        checkType = '';
      }
      if (time < 15 && !isDuoDuo) {
        var lg = types.length;
        while (lg--) {
          var t = types[lg];
          if (text(t).exists()) {
            isDuoDuo = true;
            checkType = t;
            break;
          }
        }
      } else {
        if (isDuoDuo) {
          if (!text(checkType).exists()) {
            sleep(6000);
            videoRightClose();
            return true;
          }
        } else {
          if (time === 32) {
            toast('32秒')
            if (textContains('是否允许').exists()) {
              back();
              sleep(1000)
              back();
              return true;
            }
            var a1 = getSignal();
            if (a1) {
              var top1 = a1.bounds().top;
              back();
              sleep(2000);
              if (text('继续观看').exists()) {
                click('继续观看');
              } else if (text('关闭').exists()) {
                click('关闭');
              } else {
                var a2 = getSignal();
                if (!a2) {
                  return true;
                } else {
                  if (top1 !== a2.bounds().top) {
                    return true;
                  }
                }
              }
            }
          }
        }
        if (id('tt_video_ad_close').exists()) {
          sleep(2000);
          videoRightClose();
          return true;
        };
      }

      function getSignal() {
        return textEndsWith('广告').findOne(500);
      }
    }
  })());
}

function quTouTiaoBaoXiangAuto(enter) {
  return quTouTiaoAdGame({
    enter: enter,
    skipSite: 8,
    runOneGame: quTouTiaoBaoXiang
  });
}

function quTouTiaoShuiJingQiuAuto(enter) {
  return quTouTiaoAdGame({
    enter: enter,
    skipSite: 8,
    runOneGame: quTouTiaoBaoXiang
  });
}

function quTouTiaoAdGame(params) {
  var allDone = false;
  try {
    var signalText = '今日免费';
    var def = {
      enter: noneFn,
      skipSite: -1,
      shouldSkip: function (t) {
        return textContains(t + '次').exists()
      },
      isEnd: function () {
        return textContains('0次').exists();
      },
      beforeOneBegin: function () {
        return myWaitUntil(signalText);
      },
      signalText: signalText,
      runOneGame: noneFn,
      testTryT: function (n) {
        return textContains(n + '次').exists();
      },
      skipFirst: false
    }
    params = Object.assign(def, params);
    var enter = params.enter;
    var skipSite = params.skipSite;
    var runOneGame = params.runOneGame;
    var shouldSkip = params.shouldSkip;
    var isEnd = params.isEnd;
    var beforeOneBegin = params.beforeOneBegin;
    var testTryT = params.testTryT;
    var skipFirst = params.skipFirst;
    signalText = params.signalText;
    if (typeof enter !== 'function') {
      var t = enter;
      var x;
      var y;
      enter = function () {
        var a = text(t).findOne(1500);
        if (!a) {
          return;
        }
        x = x || a.bounds().left + 10;
        y = y || a.bounds().top - 15;
        click(x, y);
        return true;
      }
    }
    var can = enter();
    if (!can) {
      return;
    }
    if (!beforeOneBegin()) {
      back();
      sleep(2000);
      checkBack();
      return;
    }
    sleep(200);
    var tryT = 9;
    var max = 9;
    while (max--) {
      if (testTryT(max)) {
        tryT = max;
        break;
      }
    }
    toast(tryT);
    if (skipFirst || (skipSite > 0 && tryT === skipSite)) {
      sleep(6000);
      back();
      sleep(2000);
      checkBack();
      sleep(2000);
      enter();
    }
    if (tryT === 0) {
      back();
      sleep(2000);
      checkBack();
      return true;
    }

    while (tryT--) {
      if (!beforeOneBegin()) {
        toast('before failed')
        console.log('before failed')
        break;
      }
      sleep(2000);
      var res = runOneGame(tryT + 1);
      sleep(1300);
      checkBack();
      if (!res || tryT === 0) {
        toast('2 failed')
        break;
      }
      var can = enter();
      if (!can) {
        sleep(1100);
        can = enter();
      }
      if (!can) {
        break;
      }
    }
    allDone = testTryT(0);
  } catch (e) {
    console.log(e);
  }
  sleep(3000);
  checkBack();
  return allDone;

  function checkBack(i) {
    i = i || 0;
    if (textContains(signalText).exists()) {
      back();
      sleep(1300);
    } else {
      sleep(1000);
      if (i > 5) {
        return;
      }
      return checkBack(i + 1);
    }
  }
}

function quTouTiaoBaoXiang() {
  if (textContains('0次').exists()) {
    sleep(1500);
    back();
    return false;
  }
  click(500, 980);
  quTouTiaoWatch();
  back();
  sleep(3500);
  return true;
}

function quTouTiaoNiuDan() {
  if (textContains('0次').exists()) {
    back();
    return false;
  }
  if (myWaitUntil('看视频抽大奖')) {
    var a = textContains('看视频抽大奖').findOne(1500);
    if (a) {
      sleep(2000);
      click(890, 380);
      sleep(2000);
      click(a.bounds().left + 5, a.bounds().top + 100);
    }
  } else {
    sleep(2000);
    click(890, 380);
    sleep(2000);
    click(720, 1500);
  }
  quTouTiaoWatch();
  back();
  sleep(2000);
  return true;
}

function quTouTiaoJiaWaWa() {
  if (textContains('0次').exists()) {
    back();
    return false;
  }
  sleep(2000);
  click(890, 380);
  sleep(2000);
  click(480, 1600);
  quTouTiaoWatch();
  sleep(8000);
  back();
  sleep(2000);
  return true;
}

function quTouTiaoWaBao() {
  if (textContains('0次').exists()) {
    back();
    return false;
  }
  sleep(2000);
  click(890, 380);
  sleep(3000);
  click(550, 1700);
  var txt = '看视频立即领取';
  var res = myWaitUntil(txt);
  if (!res) {
    back();
    return false;
  }
  sleep(3000);
  click(txt);
  clickOneByText2(txt);
  sleep(3000);
  if (text(txt).exists()) {
    click(txt);
    clickOneByText2(txt);
  }
  quTouTiaoWatch();
  back();
  sleep(2000);
  return true;
}

function quTouTiaoLaoHuji() {
  var txt = '看视频';
  myWaitUntil(txt)
  var skipFirst = false;
  var t = 11;
  var tar = textStartsWith(txt).findOne(200);
  if (!tar) {
    var tar = textStartsWith('免费').findOne(200);
    if (!tar) {
      return;
    }
    var skipFirst = true;
  }
  var txt1 = tar.text();
  var tl = '/10';
  if (!textContains(tl).exists()) {
    if (textContains('/5').exists()) {
      tl = '/5';
    }
  }
  toast(txt1)
  while (t--) {
    if (txt1.indexOf(t + tl) > -1) {
      toast(t);
      break;
    }
  }
  var isFirst = true;
  while (t--) {
    if (textContains(txt).exists()) {
      if (isFirst) {
        isFirst = false;
        if (!skipFirst) {
          click(txt);
          quTouTiaoWatch();
        } else {
          click('免费', 0);
        }
      } else {
        var res = myWaitUntil('免费再玩一次');
        if (res) {
          click('免费再玩一次');
          sleep(3500);
          if (textContains(txt).exists()) {
            click(txt);
          }
        } else {
          click(txt);
        }
        quTouTiaoWatch();
      }
    }
  }
  var res = textContains(0 + tl).exists()
  back();
  sleep(2000);
  return res;
}

function quTouTiaoQiu() {
  var txt = '本期剩余次数';
  var lg = 10;
  var tryT = 9;
  var y = 1150;
  myWaitUntil(txt);
  while (lg--) {
    if (textContains(txt + lg).exists()) {
      tryT = lg;
    }
  }
  toast(tryT);

  var isOne = true;
  while (tryT--) {
    if (!textContains(txt).exists()) {
      return false;
    }
    if (isOne) {
      click(550, y);
      isOne = false;
    } else {
      var res = myWaitUntil('继续抽数字');
      if (res) {
        click('继续抽数字');
      } else {
        click(550, y);
      }
      sleep(2000);
      if (textContains(txt).exists()) {
        click(550, y);
      }
    }
    quTouTiaoWatch();
  }
  return textContains(txt + 0).exists()
}

function quTouTiaoGuaFen() {
  var i = 8;
  while (text('瓜分ta').exists() && i--) {
    if (text('还有 0 次机会').exists() || text('今日瓜分机会已用完').exists()) {
      back();
      return true;
    }
    clickOneByText('瓜分ta');
    sleep(3000);
    if (text('瓜分ta').exists()) {
      clickOneByText('瓜分ta');
    }
    quTouTiaoWatch();
    var res = text('还有 0 次机会').exists();
    back();
    return res;
  }
}

function quTouTiaoXiaoShuo() {
  quTouTiaoXiaoShuo.failT = 0;
  begin(1);

  function begin(tryT) {
    tryT = tryT || 1;
    var text1 = '感谢支持免费原创小说';
    if (textContains(text1).exists()) {
      var canSee = false;
      while (!canSee) {
        twoDown();
        sleep(1500);
        var tar = textContains(text1).findOne(1000);
        if (tar.bounds().top < 1500) {
          canSee = true;
          click(600, tar.bounds().top + 100);
          quTouTiaoWatch();
        }
      }
    }
    if (tryT > 14) {
      click('下一章');
      sleep(1000);
      tryT = 0;
      quTouTiaoXiaoShuo.failT = quTouTiaoXiaoShuo.failT + 1;
    }
    if (textContains('阅读金币奖励').exists()) {
      click('下一章');
      quTouTiaoXiaoShuo.failT = 0;
    }
    sleep(1000);
    twoDown();
    sleep(1000);
    if (quTouTiaoXiaoShuo.failT > 1) {
      quTouTiaoXiaoShuo.failT = 0;
      return;
    }
    begin(tryT + 1);
  }
}

function quTouTiaoWaBaoAuto(t, skipFirst) {
  if (isDefLaunch) {
    var isOne = true;
    quTouTiaoAdGame(Object.assign({
      enter: t,
      runOneGame: quTouTiaoWaBao,
      skipFirst: skipFirst || false,
    }, skipFirst ? {
      beforeOneBegin: function () {
        sleep(2000);
        if (isOne) {
          sleep(6000);
          isOne = false;
        }
        return true;
      }
    } : {}));
  }
}

function quTouTiaoNiuDanAuto(t, skip) {
  return quTouTiaoAdGame({
    enter: t,
    skipSite: skip || 6,
    runOneGame: quTouTiaoNiuDan
  })
}

function quTouTiaoJiaWaWaAuto(t, s) {
  return quTouTiaoAdGame({
    enter: t,
    skipSite: s || 8,
    runOneGame: quTouTiaoJiaWaWa
  })
}

function quTouTiaoQiuWithEnter(e) {
  if (textContains(e).exists()) {
    click(e);
    sleep(5000);
    back();
    sleep(2000);
    click(e);
    sleep(2000);
    var res = quTouTiaoQiu();
    back();
    return res;
  }
}

function huohuoHongBaoModalExists() {
  return text('看视频红包').exists();
}

function shuaBao() {
  runAndMarkByDuring(function (readT, addInFn) {
    launch('刷宝短视频');
    sleep(20000);
    var getOnePassTime = initGetLittleDuringTime();
    quTouTiaoVideo({
      readTime: readT,
      hasVideoText: '立即翻倍',
      beforeOneBegin: function (i, passTime) {
        if (i < 7) {
          click('取消');
          back();
        }
        if (i % 7 === 0) {
          click('首页');
        }
        if (!textContains('首页').exists()) {
          back();
          sleep(2000);
          if (!textContains('首页').exists()) {
            back();
            sleep(2000);
          }
        }
        if (text('立即下载').exists()) {
          swipe(500, 1600, 500, 60, 500);
        }
        if (text('查看详情').exists()) {
          swipe(500, 1600, 500, 60, 500);
        }
        addInFn(getOnePassTime(passTime, 1.2));
      },
      oneReadTime: function () {
        return 5 + ~~(Math.random() * 5);
      }
    });
    click('我');
    var res = myWaitUntil(function () {
      return id('tv_gold_num').exists();
    });
    if (res) {
      sleep(10000);
      var a = id('tv_gold_num').findOne(2000);
      if (a) {
        var t = a.text();
        if (!(+t > 6600)) {
          getStorage().remove('shuaBao__During');
          return false;
        }
      }
    }
  }, 'shuaBao', 55, 60);
}

function initKuaiYinJob() {
  var keyP = 'kuaiYin';

  var appName = '快音';
  var redPacketId = 'redPacket';
  var hasAdId = 'tvEggDuration'

  var openAdId = 'btnOpen';
  var addText = '再抽一次';
  var closeText = '红包不限量';

  var modalCloseId = 'ivClose';

  var main = noneFn;
  var addVideo = noneFn;
  var water = noneFn;
  var baoXiang = noneFn;

  main = function (t) {
    var getOnePassTime = initGetLittleDuringTime();
    return runAndMarkByDuring(function (readT, addInFn) {
      startApp();

      start(1);
      beforeEnd();

      function start(i) {
        i = i || 1;
        if (!id(hasAdId).exists()) {
          sleep(8000);
        } else {
          if (clickIdCenter(redPacketId)) {
            if (myWaitUntil(function () {
                return id(openAdId).exists();
              })) {
              clickIdCenter(openAdId)
              toast('has openId');
              sleep(1000);
              if (myWaitUntil(addText)) {
                sleep(1000);
                click(addText);
                quTouTiaoWatch();
                if (myWaitUntil(closeText)) {
                  sleep(1000);
                  click(closeText)
                }
              }
            }
          }
        }
        addInFn(getOnePassTime(i, 5));
        if (readT < i) {
          return;
        }
        return start(i + 1);
      }
    }, keyP + 'main', ~~(60 * 21 / 8), t || 200)
  }

  addVideo = function () {
    var key = keyP + 'addVideo';

    if (isDone(key)) {
      return;
    }
    startApp();
    goToTask();
    start();
    beforeEnd();

    function start(i) {
      i = i || 0;
      var tar = '看视频赚钱';
      if (i > 10) {
        markDone(key);
        closeModal();
        return;
      }
      if (text(tar).exists()) {
        click(tar);
        sleep(5000);
        if (text(tar).exists()) {
          markDone(key);
          closeModal();
          return;
        }
        quTouTiaoWatch();
        sleep(3000);
        closeModal();
        sleep(2000);
        return start(i + 1);
      }

    }

  }

  water = function () {
    var key = keyP + 'water';
    if (isDone(key)) {
      return;
    }
    startApp();
    goToTask();
    var enterT = '喝水赚钱';
    if (text(enterT).exists()) {
      click(enterT);
      if (myWaitUntil('喝水赚金币')) {
        var tT = 'x100';
        var ls = text('x100').find();
        var lg = ls.length;
        while (lg--) {
          click(tT, 0);
          if (myWaitUntil('看视频领取')) {
            click('看视频领取');
            quTouTiaoWatch();
            sleep(3000);
            closeModal();
          } else {
            click(300, 5);
          }
        }
        markDone(key);
        back();
        sleep(1000);
        closeModal();
      }
    }
    beforeEnd();
  }

  baoXiang = function () {
    var key = keyP + 'baoXiang';
    if (isDone(key)) {
      return;
    }
    startApp();
    goToTask();
    start();
    beforeEnd();

    function start() {
      var tarId = 'tvTreasureBox';
      var a = id(tarId).findOne(2000);
      if (a) {
        var b = a.bounds();
        click(b.centerX(), b.centerY() - 100);
        click(b.centerX(), b.centerY() - 100)
        sleep(100);
        var addT = '看视频再领';
        if (myWaitUntil(addT)) {
          click(addT);
          quTouTiaoWatch();
          sleep(3000);
          closeModal();
          sleep(1000);
          return start()
        } else {
          markDone(key);
        }
      }
    }
  }

  function goToTask() {
    myWaitUntil('福利');
    click(isDefLaunch ? 700 : 700, 1850);
    sleep(5000);
    closeModal();
  }

  function startApp() {
    var res = launch(appName);
    if (res) {
      sleep(8000);
      click('知道了');
      sleep(2000);
      back();
    }
  }

  function beforeEnd() {
    click('首页')
  }

  function closeModal() {
    if (id(modalCloseId).exists()) {
      var a = id(modalCloseId).findOne(2000);
      if (a) {
        a.click();
        sleep(100);
      }
    }
  }

  return {
    main: main,
    addVideo: addVideo,
    water: water,
    baoXiang: baoXiang,
    runAll: function () {
      main();
      addVideo();
      baoXiang();
    }
  }

}

function douYinBaoXiang() {
  if (!runDouYinBX) {
    return;
  }
  var store = getStorage();
  var k = 'douYinBaoXiang';
  var latest = +store.get(k) || 0;
  if (Date.now() - latest < 1000 * 60 * 20) {
    return;
  }
  var is = launchApp('抖音极速版');
  if (is) {
    sleep(17000);
  }
  if (text('继续观看').exists()) {
    click('继续观看');
    watch();
    sleep(3000);
    back();
  }
  var enter = id('ay7').findOne(6000);
  closeLater();
  if (enter) {
    enter.click();
    myWaitUntil('去提现');
    sleep(1600);
    click(400, 90);
    sleep(1200);
    closeLater();
    back();
    sleep(1200);
    enter.click();
    myWaitUntil('去提现');
    sleep(1600);
    click(400, 90);
    sleep(1200);
    closeLater();
    back();
    sleep(1200);
    enter.click();
    myWaitUntil('去提现');
    sleep(1600);
    click(400, 90);
    sleep(1200);
    sleep(5000);
    closeLater();
    if (text('去领取').exists()) {
      click('去领取');
      watch();
      sleep(3000);
      // store.put(k, Date.now());
    }
    closeLater();
    if (text('开宝箱得金币').exists()) {
      closeLater();
      click('开宝箱得金币');
      var has = myWaitUntil('看广告视频再赚');
      if (has) {
        sleep(1200);
        closeLater();
        click('看广告视频再赚');
        sleep(1200);
        watch();
        sleep(3000);
        store.put(k, Date.now());
      }
    }
    closeLater();
    back();
    sleep(1500);
    if (text('继续观看').exists()) {
      click('继续观看');
      watch();
      sleep(3000);
      back();
    }
    if (text('继续观看').exists()) {
      click('关闭视频');
      sleep(3000);
      back();
    }
    closeLater();
    sleep(3000);
  }
  launch.lastest = '';
  return true;

  function watch() {
    sleep(6000);
    if (text('去提现').exists()) {
      return;
    }
    sleep(9000);
    var i = 10;
    while (i--) {
      sleep(5000);
      back();
      sleep(1200);
      if (text('继续观看').exists()) {
        click('继续观看');
      } else {
        break;
      }
    }

  }

  function closeLater() {
    if (text('以后再说').exists()) {
      click('以后再说');
      sleep(1000);
    }
  }
}

function douYin(r) {
  runAndMarkByDuring(function (realR, addInFn) {
    launch('抖音极速版');
    sleep(10000);
    douYinBaoXiang();
    var getOnePassTime = initGetLittleDuringTime();
    quTouTiaoVideo({
      readTime: realR || 30,
      beforeOneBegin: function (i, passTime) {
        click('以后再说');
        randomInterest(0.08);
        addInFn(getOnePassTime(passTime, 1.5));
      },
      oneReadTime: function () {
        return 4 + ~~(Math.random() * 5);
      }
    });
  }, 'douYin', 35, r || 30)
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
  runAndMarkByDuring(function (r, addInFn) {
    launch('趣头条');
    sleep(23000);
    if (id('aeh').exists()) {
      var a = id('aeh').findOne(2000);
      if (a) {
        a.click();
      }
    }
    nextPage(true);
    nextPage(true);
    nextPage(true);
    nextPage(true);
    var getOnePassTime = initGetLittleDuringTime();
    commonReading({
      readTime: r,
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
      beforeLeavePage: function (i, passTime) {
        addInFn(getOnePassTime(passTime, 0.03));
      },
      refresh: function () {
        click('刷新');
      },
      beforeOneUpDown: findCaiDan,
      // beforeLeavePage: findCaiDan,
      // afterEnterPage: findCaiDan
    });
  }, 'quTouTiaoR', 1.2, 0.8);

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
        var shouldwatch;
        if (!text('我知道了').exists()) {
          shouldwatch = true;

        }
        var tar = id(id2).findOne(1000);
        if (tar) {
          tar.click();
        }
        if (shouldwatch) {
          quTouTiaoWatch('金币领取成功');
        }
      }
    }
  }
  var failT = 0;

  function getTitle(tryT) {
    tryT = tryT || 0;
    var id1 = 'ajc';
    var as = id(id1).find;
    var b;
    for (var i = 0; i < as.length; i++) {
      var tar = as[i];
      var bounds = tar.bounds();
      var top = bounds.top;
      var left = bounds.left;
      if (top > 350 && top < 1700 && left > 0 && left < 700) {
        b = tar;
        break;
      };
    }
    if (b) {
      var bounds = b.bounds();
      return {
        click: () => click(bounds.left - 30, bounds.top - 30)
      };
    } else {
      twoDown();
    }
    var txt = '评论';
    var ls = textContains('评论').find(); // textContains('分钟前').findOne(1000)
    if (ls.length < 2) {
      txt = '分钟前';
      ls = textContains('分钟前').find();
    }
    if (ls.length < 2) {
      txt = '分钟前';
      ls = textContains('小时前').find();
    }
    if (ls.length < 2) {
      txt = '天前';
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

function kReading(disableCheck) {
  var tx = ['万合出品', '开心锤锤', '陈连仁不容易'];
  var isL = false;
  var SLEEP_TIME = 15;
  var sleepTime = 10;
  var realReadingT = ~~(kReadingT * (SLEEP_TIME / sleepTime));
  var oneRealReadingT;
  var getOnePassTime = initGetLittleDuringTime();

  runAndMarkByDuring(function (realT, addInFn) {
    function start(i) {
      addInFn(getOnePassTime(i, 6));
      if (text('拖动滑块').exists()) {
        function trySwipe(j) {
          j = j || 0;
          if (j > 2) {
            return;
          }
          var xSite = [900, 850, 800, 750, 700, 650];
          var lg = xSite.length;
          var succ = false;
          while (text('拖动滑块').exists() && lg--) {
            swipe(120, 975, xSite[lg] + 5, 975, 800);
            sleep(2500);
            if (!text('拖动滑块').exists()) {
              succ = true;
              break;
            }
          }
          if (succ) {
            console.log('success__' + xSite[lg]);
            return true;
          } else {
            trySwipe(j + 1);
          }
        }
        trySwipe(0);
        if (text('拖动滑块').exists()) {
          toast('failed');
          console.log('k__failed');
          return false;
        }
      }
      var startE = 10;
      if (i < startE) {
        click('我知道了', 0);
        if (!text('拖动滑块').exists()) {
          back();
          sleep(2000)
        }
        if (!text('分享').exists()) {
          swipe(1000, 500, 200, 510, 800);
        }
        randomInterest(0.3)
      } else if (i === startE) {
        isL = false;
        sleep(3000);
        if (text('同城').exists()) {
          click(410, 160);
        } else {
          swipe(200, 500, 1000, 510, 800);
        }
        sleep(10000);

        function intoOne() {
          click(450, 620);
        }
        var tr = 15;
        var findSucc = false;
        while (tr--) {
          toast(tr)
          intoOne();
          if (myWaitUntil(function () {
              return text('分享').exists()
            }, 12)) {
            tr = 0;
            findSucc = true;
          } else {
            back();
            sleep(2000);
            swipe(500, 1700, 500, 200, 800);
          }
        }
        if (!findSucc) {
          return;
        }
      } else {
        // if (i % 33 === 0) {
        //   kuaiShouSmallTask();
        // }
        if (text('同城').exists()) {
          click(410, 160);
          sleep(5000);
          click(450, 600);
        }
        if (isAdmin && !disableCheck) {
          var hasLaunch = douYinBaoXiang();
          if (hasLaunch) {
            back();
            sleep(500);
            home();
            launchApp('快手极速版');
            sleep(3000);
          }
        }
      }
      closeNoReact();
      if (isL) {
        fanfu();
        // if (i % 33 === 0) {
        //   isL = false;
        // }
      } else {
        isL = isLong();
        if (!isL) {
          normal();
        }
      }
      if (i > oneRealReadingT) {
        return;
      }
      start(i + 1);
    }


    oneRealReadingT = realT;
    sleep(3000);
    launch('快手极速版');
    sleep(15000);
    try {
      kuaiShouSmallTask();
      var res = start(0);
      kuaiShouSmallTask();
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, 'kReading', realReadingT, ~~(realReadingT / 2));

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

function checkZhongQingTwo(mark) {
  var runFirst = true;
  var child = mark + '_two';
  if (isNote3) {
    if (runChildFirst) {
      if (!isDone(child)) {
        runFirst = false
        mark = child;
      }
    } else {
      if (isDone(mark)) {
        runFirst = false
        mark = child;
      }
    }
  }
  var afterLaunch = function () {
    if (isNote3) {
      var hasTwo = myWaitUntil('请选择要使用的应用', 10);
      launch.lastest === '';
      if (hasTwo) {
        click(runFirst ? 300 : 750, 1520);
      }
    }
  }
  return {
    mark: mark,
    afterLaunch: afterLaunch
  }
}

function jinRiJob(last) {
  var mark = 'jinRiJob';
  runAndMarkByDuring(function (realLast, addInFn) {
    var res = launch('今日头条极速版');
    sleep(res ? 20000 : 12000);
    back();
    sleep(3000);
    back();
    sleep(3000);
    click(80, 1815);
    sleep(1000);
    nextPage(true);
    nextPage(true);
    nextPage(true);
    var error;
    var getOnePassTime = initGetLittleDuringTime();
    try {
      commonReading({
        readTime: realLast,
        oneReadTime: 38,
        oneWipeTime: 10,
        beforeLeavePage: function (i, passTime) {
          addInFn(getOnePassTime(passTime, 0.03));
        },
        beforeOneUpDown: function (i) {},
        enterP: function () {
          var i = 5;
          while (i--) {
            click(400, 430);
            sleep(2500);
            if (!text('发布').exists()) {
              break;
            }
          }
          click('以后再说');
        },
        enterP1: function () {
          var ls = id('ky').find();
          ls.sort(function (a, b) {
            return a.bounds().top - b.bounds().top;
          });
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
            click(a.bounds().left + 10, a.bounds().top - 30);
          } else {
            click(500, 580);
          }
        }
      });
    } catch (err) {
      console.log(err);
      error = err;
    }
    if (error) {
      return false;
    }
  }, mark, 1.5, last);
}

function zhongJob(last) {
  var data = checkZhongQingTwo('zhongJob');
  var mark = data.mark;
  var afterLaunch = data.afterLaunch;
  runAndMarkByDuring(function (realLast, addInFn) {
    var res = launch('中青看点');
    afterLaunch();
    sleep(res ? 20000 : 12000);
    back();
    sleep(3000);
    back();
    sleep(3000);
    click(80, 1815);
    sleep(1000);
    nextPage(true);
    nextPage(true);
    var error;
    var getOnePassTime = initGetLittleDuringTime();
    try {
      commonReading({
        readTime: realLast,
        oneReadTime: 32,
        oneWipeTime: 10,
        beforeLeavePage: function (i, passTime) {
          addInFn(getOnePassTime(passTime, 0.03));
          if (text('查看详情').exists() && text('忽略').exists()) {
            click('查看详情');
            sleep(3000);
            back();
            sleep(3000);
          }
        },
        beforeOneUpDown: function (i) {
          if (i < 4) {
            click('查看全文，奖励更多');
          }
        },
        enterP: function () {
          var i = 5;
          while (i--) {
            click(400, 430);
            sleep(2500);
            if (!text('热文').exists()) {
              break;
            }
          }
        },
        enterP1: function () {
          var t = '阅读';
          var ls = textContains(t).find();
          ls.sort(function (a, b) {
            return a.bounds().top - b.bounds().top;
          });
          var lg = ls.length;
          var a;
          for (var index = 2; index < lg; index++) {
            var l = ls[index];
            var txt = l.text();
            var bounds = l.bounds();
            var top = bounds.top;
            var left = bounds.left;
            if (top > 600 && top < 1700 && left > 0 && left < 700 && +txt[0] > 0) {
              a = l;
              break;
            };
          }
          if (a) {
            click(a.bounds().left + 10, a.bounds().top - 10);
          } else {
            click(500, 580);
          }
        }
      });
    } catch (err) {
      console.log(err);
      error = err;
    }
    if (error) {
      return false;
    }
  }, mark, 2.0, last);


  function zhongVideo(t) {
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
    begin(t);

    function begin(minute) {
      if (!(minute > 0)) {
        return;
      }
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

function zhongQingLongVideo(t) {
  var data = checkZhongQingTwo('zhongQingLongVideo');
  var mark = data.mark;
  var afterLaunch = data.afterLaunch;
  runAndMarkByDuring(function (realT, addInFn) {
    var res = launch('中青看点');
    afterLaunch();
    if (res) {
      sleep(10000);
    }
    sleep(10000);
    back();
    sleep(3000);
    toVideo();
    myWaitUntil('次播放');
    sleep(3000);
    var getOnePassTime = initGetLittleDuringTime();
    try {
      commonReading({
        readTime: realT,
        oneReadTime: 32,
        oneWipeTime: 15,
        beforeLeavePage: function (i, passTime) {
          addInFn(getOnePassTime(passTime, 0.03));
        },
        beforeOneUpDown: function (i) {
          if (i < 10 && id('n1').exists()) {
            back();
            sleep(300);
          }
        },
        enterP: function () {
          myWaitUntil('次播放');
          click(500, 350);
        },
        afterEnterPage: function () {
          click('关闭广告', 0);
          click('重新加载', 0);
          if (id('a3f').exists()) {
            var a2 = id('a3f').findOne(200)
            if (a2) {
              a2.click();
            }
          }
        },
        enterP1: function () {
          var ls = textContains('次播放').find();
          ls.sort(function (a, b) {
            return a.bounds().top - b.bounds().top;
          });
          if (ls.length > 1) {
            var res = scrollIntoView(function () {
              return ls[1];
            }, 1400, 6);
            if (res) {
              click(400, res.bounds().top + 60);
            } else {
              click(500, 350);
            }
          } else {
            click(500, 350);
          }
        }
      });
    } catch (err) {
      console.log(err);
      error = err;
    }
    // click(500, 350);
    // var failT = 0;
    // var i = realT || 35;
    // var lastI = i;
    // while (i--) {
    //   if (text('热文').exists()) {
    //     toVideo();
    //     myWaitUntil('次播放');
    //     sleep(3000);
    //     click(500, 350);
    //   } else if (text('广场舞').exists()) {
    //     click(500, 350);
    //   }
    //   sleep(3000);
    //   click('关闭广告', 0);
    //   click('重新加载', 0);
    //   if (id('nl').exists()) {
    //     back();
    //     sleep(300);
    //   }
    //   if (id('a3f').exists()) {
    //     var a2 = id('a3f').findOne(200)
    //     if (a2) {
    //       a2.click();
    //     }
    //   }
    //   sleep(1000 * 23);
    //   oneDown();
    //   sleep(500);
    //   oneDown();
    //   sleep(500);
    //   var ls = textContains('次播放').find();
    //   toast(ls.length);
    //   if (ls.length > 1) {
    //     failT = 0;
    //     var res = scrollIntoView(function () {
    //       ls = textContains('次播放').find();
    //       return ls[1];
    //     }, 1400, 6);
    //     if (res) {
    //       click(400, res.bounds().top - 30);
    //     } else {
    //       failT = failT + 1;
    //     }
    //   } else {
    //     failT = failT + 1
    //   }
    //   if (failT > 1) {
    //     back();
    //     sleep(3000);
    //     toVideo();
    //     sleep(1200);
    //     click('刷新');
    //     sleep(3000);
    //     myWaitUntil('次播放');
    //     toVideo();
    //     sleep(3000);
    //   }
    //   if (i % 3 === 0) {
    //     addInFn(lastI - i);
    //     lastI = i;
    //   }
    // }
  }, mark, 0.4, t);

  function toVideo() {
    click(400, 1815);
  }
}

function initZhongQingOther() {
  var keyP = 'zhongQing';
  var appName = '中青看点';

  var kankanCloseID1 = 'big_pic_close_btn';

  var enterMain = function () {
    click(700, 1815);
  }

  var search = noneFn;
  var kankan = noneFn;
  var zhuanPan = noneFn;

  zhuanPan = function () {
    var myK = keyP + 'ZhuanPan';
    var reakKey = beforeGoToMain(myK);
    runAndMark(function () {
      if (reakKey) {
        var r = myWaitUntil('抽奖赚');
        if (!r) {
          return;
        }
        sleep(5000);
        var res = start(0);
        sleep(5000);
        backToMain();
        return res;
      }
    }, reakKey);


    function start(i) {
      i = i || 0;
      clickOneByText('抽奖赚');
      var res = myWaitUntil('剩余次数', 6);
      if (!res) {
        click('关闭');
        sleep(4000);
      }
      sleep(1200);
      click(530, 1000);
      sleep(800);
      if (i % 17 === 0 && i > 0) {
        if (textContains('本场已完成').findOne(1000)) {
          back();
          sleep(1000)
          back();
          sleep(1000)
          return true;
        }
        if (text('关闭').exists()) {
          click('关闭');
          sleep(1800);
        }
      }
      back();
      myWaitUntil('抽奖赚');

      if (i < 106) {
        return start(i + 1);
      }
      return true || text('0').exists();
    }
  }

  kankan = function (halfAuto) {
    if (halfAuto) {
      startTask();
    } else {
      var myK = keyP + 'Kankan';
      var reakKey = beforeGoToMain(myK);
      if (reakKey) {
        if (goToSubTask()) {
          sleep(10000);
          scrollIntoView('每天一次任务', 700);
          startTask();
          if (text('去完成').find().length < 2) {
            markDone(reakKey);
          } else {
            saveUnDoneFn(function () {
              kankan();
            }, reakKey)
          }
          backToMain();
        }
      }
    }


    function startTask() {
      if (halfAuto) {
        intervalCheck();
      } else {
        begin();
      }


      function intervalCheck(i) {
        i = i || 1;
        if (i > 50) {
          return;
        }
        checkSpecialType();
        sleep(1000 * 8);
        intervalCheck(i + 1);
      }

      function shouldRun() {
        var canRun = false;
        confirm('检测到可自动', '是否进行', function (is) {
          canRun = is;
        });
        return canRun;
      }

      function findAd() {
        var ad = '广告';
        var ad2 = '热点新闻';
        var ad3 = '热闻看看';
        var ad31 = '热点资讯';
        var ad4 = '今日热搜';
        var ad41 = '今日热点';
        var ad5 = '猎文小说';
        var ad6WithEnd = 'ErkJggg==';
        var ad7 = '?';
        var ad8 = 'iframe';
        var type = '';
        myWaitUntil(function () {
          if (text(ad).exists()) {
            type = ad;
            return true
          } else if (textEndsWith(ad6WithEnd).exists()) {
            type = ad6WithEnd;
            return true;
          } else if (text(ad2).exists() || text(ad3).exists() || text(ad31).exists()) {
            type = ad2;
            return true
          } else if (text(ad4).exists() || text(ad41).exists()) {
            type = ad4;
            return true
          } else if (text(ad5).exists()) {
            type = ad5;
            return true
          } else if (idEndsWith(ad8).exists()) {
            type = ad8;
            return true
          }
          return false;
        }, 10);
        toast(type);
        if (type === ad) {
          toast('has ad');
          if (text(ad7).findOne(2000)) {
            myWaitUntil(function () {
              return id('pop_close').exists()
            }, 6)
            click(500, 1020);
            checkSpecialType();
            return true;
          } else {
            var ls = text(ad).find().concat(textEndsWith(ad6WithEnd).find());
            ls.sort(function (a, b) {
              return a.bounds().top - b.bounds().top;
            });
            scrollIntoView(function () {
              return ls[0];
            });
            ls = text(ad).find();
            ls.sort(function (a, b) {
              return a.bounds().top - b.bounds().top;
            });
            var a = ls[0];
            if (a) {
              var top = a.bounds().top;
              click(500, top + 80);
              checkSpecialType();
            }
            return true;
          }
        } else if (type === ad2) {
          toast(ad2);
          clickFirst();
          checkSpecialType();
          return true;
        } else if (type === ad4) {
          var tar = text(ad4).findOne(2000);
          if (tar) {
            click(500, tar.bounds().top + 160);
            checkSpecialType();
          }
          return true;
        } else if (type === ad5) {
          sleep(4000);
          var tar = myWaitUntil('ggg==');
          toast(tar);
          if (tar) {
            click(500, 1000);
            checkSpecialType();
          }
          return true;
        } else if (type === ad6WithEnd) {
          toast('has ad end');
          var ls = textEndsWith(ad6WithEnd).find();
          ls.sort(function (a, b) {
            return a.bounds().top - b.bounds().top;
          });
          scrollIntoView(function () {
            return ls[0];
          });
          ls = textEndsWith(ad6WithEnd).find();
          ls.sort(function (a, b) {
            return a.bounds().top - b.bounds().top;
          });
          var a = ls[0];
          if (a) {
            var top = a.bounds().top;
            click(500, top - 80);
            checkSpecialType();
          }
          return true;
        } else if (type === ad7) {
          toast('modal')
          myWaitUntil(function () {
            return id('pop_close').exists()
          }, 6)
          click(500, 1020);
          checkSpecialType();
          return true;
        } else if (type === ad8) {
          toast('iframe')
          var a = idEndsWith(ad8).findOne(1000);
          if (a) {
            click(500, a.bounds().top + 80);
            checkSpecialType();
            return true;
          }
        }
      }

      function checkSpecialType() {
        sleep(5000);
        if (isEnd()) {
          return true;
        }
        if (baiDuType()) {
          return true;
        } else if (souGouType()) {
          return true;
        } else if (otherSouType()) {
          return true;
        } else if (addListType()) {
          return true;
        } else if (tongChengType()) {
          return true;
        }
      }

      function tongChengType() {
        if (textContains('city=fs').exists() || textStartsWith('京东热卖').exists()) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          var i = 8;
          while (i--) {
            upDown(2);
            if (isEnd()) {
              break;
            }
            click(500, 1300);
            sleep(1500);
            // upDown(2);
            back();
            sleep(1200);

          }
          return true;
        }
      }

      function addListType() {
        var a1 = '商家列表';
        var a2 = '聚合商家推荐';
        var a3 = '为您推荐';
        var a4 = '柠檬爱美'
        var a5 = '聚合商家推荐';
        var ls = [a1, a2, a3, a4, a5];
        var type = '';
        for (var i = 0; i < ls.length; i++) {
          if (text(ls[i]).exists()) {
            type = ls[i];
          }
        }
        if (type) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          toast(type)
          var lg = 7;
          if (type === a4) {
            lg = 1;
          }
          while (lg--) {
            if (textContains('已看' + lg + '篇').exists()) {
              break;
            }
          }
          var i = 8;
          while (i--) {
            upDown(2);
            if (isEnd()) {
              break;
            }
            clickFirst();
            myWaitUntil(function () {
              return !text(ls[i]).exists()
            }, 10);
            back();
            sleep(1200);

            if (i === 4) {
              var lg1 = 7;
              while (lg1--) {
                if (textContains('已看' + lg1 + '篇').exists()) {
                  break;
                }
              }
              if (lg1 === lg) {
                break;
              }
            }
          }
          return true;
        }
      }

      function souGouType() {
        if (text('搜索').exists() && text('相关搜索').exists()) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          var a = text('搜索').findOne(1000);
          if (a) {
            var i = 8;
            while (i--) {
              sleep(1200);
              upDown(2);
              if (isEnd()) {
                break;
              }
              click(a.bounds().centerX(), a.bounds().centerY());
            }
          }
          return true;
        }
      }

      function baiDuType() {
        if (text('百度一下').exists()) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          var a = text('百度一下').findOne(1000);
          if (a) {
            var i = 8;
            while (i--) {
              sleep(1200);
              upDown(2);
              if (isEnd()) {
                break;
              }
              click(a.bounds().centerX(), a.bounds().centerY());
            }
          }
          return true;
        }
      }

      function otherSouType() {
        var mainT = '相关搜索';
        if (text(mainT).exists()) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          var i = 8;
          while (i--) {
            myWaitUntil(mainT, 5);
            var isNear = text('其他人还搜了').exists() && i > 1;
            var t = isNear ? '其他人还搜了' : mainT;
            isNear && upDown(2);
            if (i < 3 && isEnd()) {
              return true;
            }
            scrollIntoView(t, device.height - 300);
            var a = text(t).findOne(1000);
            if (a) {
              click(i % 2 === 0 ? 730 : 300, a.bounds().centerY() + 160);
            } else {
              back();
            }
            if (isEnd()) {
              break;
            }
          }
          return true;
        }
      }

      function isEnd() {
        return textContains('青豆奖励').exists() || textContains('今日任务已完成').exists();
      }

      function clickFirst() {
        click(500, 500);
      }
      // begin();
      function begin(l, f) {
        function aa1(i, btn) {
          if (i > 9) {
            return
          }
          if (i > 3) {
            if (!textContains('加油').exists()) {
              return;
            }
          }
          if (text('美图').exists()) {
            return
          }
          btn.click();
          var waitTime = 0;
          while (!textContains('青豆').exists()) {
            sleep(2000)
            waitTime = waitTime + 1;
            if (waitTime > 12) {
              break;
            }
          }
          sleep(6000);
          const changeSite = (y) => {
            if (y > 0) {
              swipe(350, 870, 350, 270, 700);
              sleep(800);
              return changeSite(y - 1)
            }
          }
          if (text('页面已拦截').exists()) {
            return;
          }
          var hasAd = findAd();
          clickIdCenter(kankanCloseID1);
          if (!hasAd) {
            changeSite(i);
            click(300, 570);
            var a = checkSpecialType();
            if (!a) {
              sleep(3000);
              upDown(2);
            } else if (!isEnd()) {
              back();
              sleep(3000);
              click(300, 550);
              checkSpecialType();
            }
          }
          var done;
          if (isEnd()) {
            done = true;
          }
          leave();
          if (done) {
            return;
          }
          return aa1(i + 1, btn)
        }
        var readingTime = 0;

        function beginReading(target) {
          if (!target) {
            return;
          }
          aa1(0, target);
          sleep(2000);
          readingTime = readingTime + 1;
          if (readingTime > 48) {
            return;
          }
          return beginReading()
        }
        var ls1 = text('进行中').find().reverse();
        var lg2 = ls1.length;
        var ls = text('去完成').find().reverse();
        var lg1 = ls.length;
        while (lg1--) {
          var tar = text('去完成').findOne(800);
          if (!tar) {
            break;
          }
          var bounds = tar.bounds();
          // click(bounds.centerX(), bounds.centerY());
          beginReading({
            click: function () {
              click(bounds.centerX(), bounds.centerY() - 30);
            }
          });
        }
        while (lg2--) {
          var tar = text('进行中').findOne(800);
          if (!tar) {
            break;
          }
          var bounds = tar.bounds();
          beginReading({
            click: function () {
              click(bounds.centerX(), bounds.centerY() - 30);
            }
          });
        }
      }

      function leave() {
        back();
        sleep(2000);
        click(230, 100);
        sleep(2000);
      }

      function upDown(j) {
        oneUpDown(kankanSleep);
        if (j > 2) {
          return
        } else {
          return upDown(j + 1)
        }
      }

      function oneUpDown(sl) {
        swipe(350, 770, 350, 270, 800);
        sleep(sl || 1000);
        swipe(350, 270, 350, 770, 800);
      }
    }
  }

  search = function () {
    function all() {
      var doneT = 0;
      var allT = 0;
      var ls = text('去搜索').find();
      allT = ls.length;
      var lgAll = allT;
      while (lgAll--) {
        ls = text('去搜索').find();
        ls[lgAll].click();
        sleep(5000);
        var max = 4;
        var isSpecial = false;
        if (textStartsWith('点击今').exists()) {
          isSpecial = true;
          for (var j = 4; j < 13; j++) {
            if (textContains(j + '').exists()) {
              max = j;
              toast(max);
              break;
            }
          }
        } else {
          for (var j = 1; j < 16; j++) {
            if (textContains(j + '次搜索').exists()) {
              max = j;
              break;
            }
          }
        }
        if (max === 8 && !isDefLaunch) {
          doneT = doneT + 1;
          back();
          myWaitUntil('去搜索');
          sleep(1000);
          continue;
        }
        zhongqingSearch(max);
        sleep(3000);
        if (isSpecial) {
          if (text('8').find().length > 1) {
            doneT = doneT + 1;
          }
        } else {
          if (textContains(max + '/' + max).exists()) {
            doneT = doneT + 1;
          }
        }
        toast('done__' + doneT);
        back();
        myWaitUntil('去搜索');
        sleep(1000);
      }
      toast('doneT' + doneT)
      toast('allT' + allT)
      return doneT > 0 && (doneT - allT > 0);

      function zhongqingSearch(times) {
        function aa(i) {
          var max = times || 4;
          var t = max;
          var specialT = textStartsWith('点击今').exists();
          if (specialT) {
            t = t + 4;
          }
          if (i > max || textContains(t + '/' + t).exists()) {
            return
          }
          sleep(3000);
          var tar = text('热').findOne(2000);
          if (tar) {
            tar.click();
          } else {
            if (specialT) {
              click(230, 1220);
            } else {
              click('换一批');
              return aa(i + 1)
            }
          }
          if (specialT) {
            sleep(1500);
            return aa(i + 1);
          }
          if (!textContains('搜索').exists() && !textContains('百度一下').exists()) {
            sleep(1000);
          }
          sleep(3000);
          if (text('当前奖励已获得').exists()) {
            return;
          }
          var upDown = (j) => {
            oneUpDown(4000)
            if (j > 1) {
              return
            } else {
              upDown(j + 1)
            }
          }
          if (!textContains('页面失联了').exists()) {
            upDown(specialT ? 3 : 1);
            sleep(2000);
            swipe(500, 300, 500, 1000, 500);
            sleep(3000);
            if (!specialT) {
              if (click('百度一下', 0)) {

              } else {
                sleep(1000);
                click(850, 320);
                click(600, 600);
              }
              sleep(2000);
              upDown(1);
            }
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

    var myK = keyP + 'Search';
    var reakKey = beforeGoToMain(myK);
    if (reakKey) {
      if (myWaitUntil('立即搜索')) {
        sleep(2000);
        click('立即搜索');
      } else {
        if (goToSubTask()) {
          sleep(1000);
          click('搜索赚')
        }
      }
      sleep(8000);
      var done = all();
      backToMain();
      if (!done) {
        saveUnDoneFn(function () {
          search();
          if (!isAdmin && isDefLaunch) {
            search();
          }
        }, reakKey);
      } else {
        markDone(reakKey);
      }
    }
  };


  function goToSubTask() {
    var enterT = '看看赚';
    if (myWaitUntil(enterT)) {
      sleep(200);
      clickOneByText(enterT);
      if (myWaitUntil('搜索赚')) {
        sleep(200);
        return true;
      }
    }
  }

  function beforeGoToMain(taskKey) {
    var data = checkZhongQingTwo(taskKey);
    var keyP = data.mark;
    var afterLaunch = data.afterLaunch;
    if (isDone(keyP)) {
      return false;
    }
    var res = startApp();
    afterLaunch();
    if (res) {
      sleep(10000);
    }
    sleep(10000);
    back();
    sleep(3000);
    enterMain();
    sleep(5000);
    return keyP;
  }

  function backToMain() {
    back();
    sleep(5000)
    if (text('关闭').exists()) {
      click('关闭');
      sleep(800)
    }
    back();
    sleep(5000)
    if (text('关闭').exists()) {
      click('关闭');
      sleep(800)
    }
  }

  function startApp() {
    return launch(appName);
  }

  return {
    search: withCatch(search, function () {
      begin();
      otherRun();
    }),
    kankan: withCatch(kankan, function () {
      begin();
      otherRun();
    }),
    zhuanPan: zhuanPan,
    runAll: function () {
      zhuanPan();
      search();
      // kankan();
    }
  }
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
    upDownRead: true,
    oneWipeTime: 5
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
  var oneWipeTime = option.oneWipeTime;
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
  var page = 0;
  var work = () => {
    var inRead = () => {
      page = page + 1;
      sleep(3000);
      time = Date.now();
      afterEnterPage(page);
      read();
      var passTime = Math.floor(((Date.now() - start) / 1000 / 60 / 60) * 1000) / 1000;
      var noDefLeave = beforeLeavePage(page, passTime);
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
    sleep(6000);
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
        if (swipeTime > oneWipeTime) {
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
  if (launch.lastest === name) {
    return false;
  }
  var lastest = launch.lastest;
  if (lastest === '火火视频极速版' || lastest === '趣赚清理' | lastest === '趣查天气') {
    home();
  } else if (lastest) {
    back();
    sleep(100);
    back();
    sleep(100);
    back();
    sleep(100);
    back();
  }
  sleep(isDefLaunch && isAdmin && lastest ? 20000 : 8000);
  if (!isDefLaunch) {
    launch2(name);

  } else {
    if (name) {
      launchApp(name);
      sleep(5000);
      click('允许', 0);
    }
  }
  launch.lastest = name;
  if (launch.lastest) {
    return true;
  }
}

function resetLaunch() {
  launch.lastest = 'ABC';
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

function oneDown() {
  swipe(350, 1570, 350, 570, 400);
}

function scrollIntoView(tar, s, maxSwipe) {
  var a;
  var site = s || device.height;
  if (typeof tar === 'function') {
    a = tar;
  } else {
    a = function () {
      return text(tar).findOne(2000);
    }
  }
  var c = a();
  if (c && c.bounds) {
    var max = maxSwipe || 25;
    var oldTop;
    while (c && c.bounds() && c.bounds().top > site && max--) {
      swipe(350, 1570, 350, 570, 400);
      if (oldTop !== c.bounds().top) {
        oldTop = c.bounds().top;
      } else {
        break;
      }
      sleep(300);
      c = a();
    }
    return c && c.bounds() && c.bounds().top <= site ? c : null;
  }
}

function nextPage(right) {
  if (right) {
    swipe(950, 900, 50, 900, 800);
  } else {
    swipe(50, 900, 950, 900, 800);
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
      swipe(500, 1600, 500, 60, 500);
    },
    goUp: function () {
      swipe(500, 120, 500, 1600, 500);
    },
    beforeDownRead: noneFn,
    beforeOneBegin: noneFn,
    testHasVideoText: function (t) {
      return textContains(t).exists();
    },
    oneReadTime: function () {
      return 6 + ~~(Math.random() * 5);
    },
    clickVideoText: function (text) {
      var tar = textContains(text).findOne(2000);
      if (tar) {
        tar.click();
      }
    }
  }
  opt = opt ? Object.assign(defOpt, opt) : defOpt;

  var afterVideo = opt.afterVideo;
  var textE = opt.textE;
  var goDown = opt.goDown;
  var goUp = opt.goUp;
  var beforeDownRead = opt.beforeDownRead;
  var beforeOneBegin = opt.beforeOneBegin;
  var hasVideoText = opt.hasVideoText;
  var testHasVideoText = opt.testHasVideoText;
  var oneReadTime = opt.oneReadTime;
  var clickVideoText = opt.clickVideoText;
  var upDownWatchVideo = true;
  var start = Date.now();

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
    if (!(minute > 0)) {
      return;
    }
    var start = Date.now();
    var one = (i) => {
      closeNoReact();
      var times = oneReadTime();
      sleepAndDo(times, video);
      var x = ~~(Math.random() * 300 + 400);
      var y = ~~(Math.random() * 100);
      swipe(x, 1550 - y, x + 10, 100 + y, 500);
      sleep(2000);
      if (Date.now() - start < 1000 * 60 * minute) {
        closeVideo();
        var passTime = Math.floor(((Date.now() - start) / 1000 / 60) * 1000) / 1000;
        beforeOneBegin(i + 1, passTime);
        one(i + 1);
      }
    }
    one(0);
  }

  function updownRead(minute) {
    if (!(minute > 0)) {
      return;
    }
    var start = Date.now();
    var one = (i) => {
      closeNoReact();
      var times = 8;
      sleepAndDo(times, video);
      goDown();
      sleepAndDo(0.8, video);
      goUp();
      sleepAndDo(2, video);
      if (Date.now() - start < 1000 * 60 * minute) {
        closeVideo();
        var passTime = Math.floor(((Date.now() - start) / 1000 / 60) * 1000) / 1000;
        beforeOneBegin(i + 1, passTime);
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

  function closeVideo() {
    if (textContains('点击重播').exists()) {
      back();
    }
  }


  function video() {
    hasVideoText = hasVideoText || '看视频再领';
    if (!testHasVideoText(hasVideoText)) {
      return;
    }
    if (upDownWatchVideo) {
      clickVideoText(hasVideoText);
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
  var isOutBreak = false;
  var goOnClickTime = 0;
  while (notEnd()) {
    sleep(2000);
    if (text('关闭').exists()) {
      click('关闭');
      sleep(1500);
    }
    var res = runVideoCheck(tryT * 2);
    if (res) {
      isOutBreak = true;
      break;
    }
    if (tryT > 32) {
      back();
      sleep(5000);
      if (text('继续观看').exists()) {
        if (goOnClickTime > 3) {
          click('放弃');
          break;
        }
        goOnClickTime = goOnClickTime + 1;
        click('继续观看');
        tryT = 10;
      } else {
        click(985, 112);
        break;
      }
    }
    tryT = tryT + 1;
  }
  if (tryT <= 32 && !isOutBreak) {
    sleep(2000);
    if (textContains('是否允许').exists()) {
      back();
      sleep(1000);
    }
    back();

  }
  sleep(3000);
}

function addVideoCheckListener(fn) {
  if (typeof fn === 'function') {
    videoCheckLs.push(fn);
  }
}

function runVideoCheck(time) {
  var isEnd = false;
  var lg = videoCheckLs.length;
  while (lg--) {
    var res = videoCheckLs[lg](time);
    if (res === true) {
      isEnd = true;
      break;
    }
  }
  return isEnd;
}

function videoLeftClose() {
  back();
}

function videoRightClose() {
  click(985, 112);
}

function clickOneByText(t) {
  var a = text(t).findOne(1500);
  if (!a) {
    return;
  }
  click(a.bounds().left + 10, a.bounds().top - 10);
  return true;
}

function clickOneByText2(t) {
  var a = text(t).findOne(1500);
  if (!a) {
    return;
  }
  click(a.bounds().left + 5, a.bounds().top + 5);
  return true;
}

function myWaitUntil(sel, t) {
  t = t || 15;
  var fn = sel;
  if (typeof sel !== 'function') {
    fn = function () {
      return textContains(sel).exists();
    }
  }
  while (t--) {
    sleep(800);
    if (fn()) {
      return true;
    }
  }
}

function initGetLittleDuringTime() {
  var oldPassTime = 0;
  return function (passTime, minOne) {
    var p = passTime - oldPassTime;
    if (p > minOne) {
      toast('passTime__' + p);
      oldPassTime = passTime;
      return p;
    }
    return 0;
  }
}

function runAndMarkByDuring(fn, key, max, addDuring) {
  addDuring = addDuring || max * 0.7;
  var duringKey = key + '__During';
  var store = getStorage();
  var storeDuring = +store.get(duringKey) || 0;
  var unFinishDuring = max - storeDuring;
  var realDuring = Math.min(addDuring, unFinishDuring);
  var leftDuring = realDuring;
  var sKey = getStorageKey();
  var anotherDay = false;
  var shouldCheckT = new Date().getHours() > 21;
  if (!isDone(key) || realDuring > 0) {
    var willDone = realDuring >= unFinishDuring;
    toast('willDone__' + willDone)

    function addInFn(addOne) {
      if (addOne > 0) {
        if (shouldCheckT && !anotherDay && getStorageKey() !== sKey) {
          anotherDay = true;
          storeDuring = 0;
          sKey = getStorageKey();
          willDone = false;
        }
        var nowDuring = storeDuring + addOne;
        store.put(duringKey, nowDuring);
        storeDuring = nowDuring;
        leftDuring = leftDuring - addOne;
        toast('left11___' + (leftDuring));
      }
    }
    var res;
    if (realDuring > 0) {
      toast('left___' + (max - storeDuring));
      res = fn(realDuring, addInFn);
    } else if (!useStorage) {
      res = fn(addDuring, addInFn);
    }
    if (res === false) {
      saveUnDoneFn(function () {
        return runAndMarkByDuring(fn, key, max, addDuring)
      }, key);
      return;
    }
    if (shouldCheckT && !anotherDay && getStorageKey() !== sKey) {
      anotherDay = true;
      storeDuring = 0;
      sKey = getStorageKey();
      willDone = false;
      leftDuring = leftDuring * 0.5;
    }
    if (willDone) {
      markDone(key);
      toast(key + '__Done');
      store.put(duringKey, storeDuring + leftDuring);
      return true;
    } else {
      store.put(duringKey, storeDuring + leftDuring);
      saveUnDoneFn(function () {
        return runAndMarkByDuring(fn, key, max, addDuring)
      }, key);
    }

  } else {
    toast(key + '__Done');
    return true;
  }
}

function setDuring(key, d) {
  getStorage().put(key + '__During', d);
}

function runAndMark(fn, key) {
  if (!isDone(key)) {
    var res = fn();
    if (res) {
      markDone(key);
      toast(key + '__Done');
      return true;
    }
  } else {
    return true;
  }
}

function markDone(key) {
  if (!useStorage) {
    return;
  }
  var s = getStorage();
  s.put(key, 666);
}

function isDone(key) {
  if (!useStorage) {
    return;
  }
  var s = getStorage();
  var done = !!s.get(key);
  if (done) {
    toast('done__' + key);
  }
  return done;
}

function getStorage() {
  return storages.create(this.getStorageKey());
}

function removeUselessStorage() {
  storages.remove(this.getStorageKey(true));
}

function getStorageKey(isLastDate) {
  var a = new Date();
  if (isLastDate) {
    a = new Date(Date.now() - 1000 * 60 * 60 * 24);
  }
  return 'AAA' + a.getFullYear() + +a.getMonth() + a.getDate();
}

function saveUnDoneFn(fn, key) {
  unDoneFnForSave = unDoneFnForSave || [];
  unDoneFnKeyForSave = unDoneFnKeyForSave || [];
  if (key && unDoneFnKeyForSave.indexOf(key) > -1) {
    return;
  }
  unDoneFnKeyForSave.push(key);
  unDoneFnForSave.push(fn);
}

function runUnDoneFn() {
  unDoneFnForRun.length = 0;
  for (var i = 0; i < unDoneFnForSave.length; i++) {
    var a = unDoneFnForRun[i];
    unDoneFnForRun.push(a);
  }
  unDoneFnForSave.length = 0;
  for (var i = 0; i < unDoneFnForRun.length; i++) {
    var fn = unDoneFnForRun[i];
    if (typeof fn === 'function') {
      fn();
    }
  }
}


function closeMiModal() {
  if (textContains('是否允许').exists()) {
    back();
    sleep(1000);
    return true
  }
}

function clickIdCenter(myId) {
  var a = id(myId).findOne(2000);
  if (a) {
    var b = a.bounds();
    click(b.centerX(), b.centerY())
    sleep(100);
    return true;
  }
}

function randomInterest(rate) {
  var a = ~~(Math.random() * 1000);
  var is = a < rate * 1000;
  if (is) {
    click(500, 500);
    sleep(50)
    click(500, 500);
    sleep(100);
  }
}

function withCatch(fn, onError) {
  return function () {
    var arg = [];
    for (var index = 0; index < arguments.length; index++) {
      var element = arguments[index];
      arg[index] = element;
    }
    try {
      fn.apply(null, arg);
      fn()
    } catch (err) {
      console.log(err)
      if (onError === 'function') {
        onError();
      }
    }
  }
}