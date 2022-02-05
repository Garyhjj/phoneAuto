var PHONE_TYPES = {
  mi5: 'mi5',
  note3: 'note3',
  hong10X: 'hong10X',
  hong9A: 'hong9A',
  huaWei3: 'huaWei3'
}

var currentPhoneType = PHONE_TYPES.hong9A;

var isDefLaunch = true;
var isAdmin = true;
var is10X = false;

var videoCheckLs = [];
var useStorage = true;
var kuaiFuliIdx = currentPhoneType === PHONE_TYPES.mi5 ? 0 : 0;
var kuaiVideoIdx = 0;
var douYinTaskEntryId = 'c1z';
var leDouTaskId = 'mv';
var leDouCloseId = 'gc';
var leDouNoVideoId = 'a5w';


var zhongSiteList = [
  [150, 1210],
  [320, 1210]
]
var zhongVideoSite = [400, 1815];
var zhongQingMainSite = [700, 1815];

var quTouTiaoId1 = 'awx';
var quTouTiaoId2 = 'v7'; // 'a68' : 'a5x';
var kReadingT = isDefLaunch ? 50 : 50;
var zhongVideoT = isDefLaunch ? 0 : 0;
var noVideoFirst = false;
var stopReading = false;
var unDoneFnForSave = [];
var unDoneFnKeyForSave = [];
var unDoneFnForRun = [];

var kankanSleep = 2400;
var runChildFirst = 0;
var isOldZhongQing = false;

var watchAdMaxWaitTime = 32;
var refreshWait = 6000;

var canKanKan = true

var isNote3 = false;
var startDate = (new Date).getDate();
var runDouYinBX = false;
var kuaiShouSmallTaskId = 'redFloat';

var doubleZhongQing = true;
var zhongContentTop = 206;
var zhongContentBottom = 1510;
var jingCaiContentTop = 345;
var jingCaiContentBottom = 1750;
var zhongKuaiContentTop = 340;
var zhongKuaiContentBottom = 2210;
var zhongKuaiVideoY = [600, 1400, 2000];
var zhongKuaiTaskSite = [130, 400, 680, 940];
var zhongKuaiXY;
var zhongKanEndTextBottom = 1900;

switch (currentPhoneType) {
  case PHONE_TYPES.mi5:
    isDefLaunch = true;
    isAdmin = true;
    is10X = false;
    doubleZhongQing = true;
    douYinTaskEntryId = 'c1z'
    zhongSiteList = [
      [420, 770],
      [660, 770]
    ];
    leDouTaskId = 'mp';
    runDouYinBX = false;
    zhongContentTop = 325;
    zhongContentBottom = 1786;
    zhongKuaiContentTop = 345;
    zhongKuaiContentBottom = 1770;
    zhongKuaiVideoY = [600, 1400];
    zhongKuaiTaskSite = [130, 400, 680, 940];
    zhongKuaiXY = [910, 750];
    break;
  case PHONE_TYPES.note3:
    isDefLaunch = true;
    isAdmin = false;
    is10X = false;
    doubleZhongQing = true;
    isNote3 = true;
    zhongSiteList = [
      [150, 1210],
      [320, 1210]
    ];
    isOldZhongQing = false;
    leDouCloseId = 'jp';
    zhongContentTop = 280;
    zhongContentBottom = 1790;
    zhongKuaiContentTop = 340;
    zhongKuaiContentBottom = 1770;
    zhongKuaiVideoY = [600, 1400];
    zhongKuaiTaskSite = [130, 400, 680, 940];
    zhongKuaiXY = [530, 1180];
    kReadingT = 45;
    refreshWait = 3500;
    break;
  case PHONE_TYPES.huaWei3:
    isDefLaunch = false;
    isAdmin = false;
    is10X = false;
    doubleZhongQing = false;
    break;
  case PHONE_TYPES.hong10X:
    isDefLaunch = true;
    isAdmin = false;
    is10X = true;
    doubleZhongQing = false;
    zhongVideoSite = [310, 2300];
    zhongQingMainSite = [650, 2300];
    zhongContentBottom = 2200;
    zhongKuaiContentTop = 340;
    zhongKuaiContentBottom = 2210;
    zhongKuaiVideoY = [600, 1400, 2000];
    refreshWait = 2000;
    zhongKanEndTextBottom = 2335;
    break;
  case PHONE_TYPES.hong9A:
    isDefLaunch = false;
    isAdmin = false;
    is10X = false;
    doubleZhongQing = false;
    leDouTaskId = 'mq';
    leDouCloseId = 'gd';
    leDouNoVideoId = 'a5u';
    zhongVideoSite = [220, 1550];
    zhongQingMainSite = [500, 1550];
    isOldZhongQing = false;
    zhongContentBottom = 1508;
    zhongContentTop = 222;
    zhongKuaiContentTop = 235;
    zhongKuaiContentBottom = 1500;
    zhongKuaiVideoY = [400, 910, 1350];
    zhongKuaiTaskSite = [90, 270, 450, 630];
    zhongKuaiXY = [270, 540];
    refreshWait = 2000;
    zhongKanEndTextBottom = 1590
    break;
}

removeUselessStorage();
initVideoCheckListener();
var rehuoLike = initAllReHuoLike();
var huohuoJob = rehuoLike.huohuoJob;
var quZhuanJob = rehuoLike.quZhuanJob;
var rehuoJob = rehuoLike.rehuoJob;
var tianQiJob = rehuoLike.tianQiJob;
var zhuanJob = rehuoLike.zhuanJob;
var hongyunJob = rehuoLike.hongyunJob;
var liulanQi = rehuoLike.liulanQiJob;
var dongdong = rehuoLike.dongdongJob;
var nangua = rehuoLike.nanguaJob;
var pipi = rehuoLike.pipiJob;
var zhouzhou = rehuoLike.zhouzhouJob;
var leKan = rehuoLike.leKanJob;
var yangyang = rehuoLike.yangyangJob;

var kuaiYinJob = initKuaiYinJob();
var zhongQingOther = initZhongQingOther();

var adList = initWatchAdList();
var xiaoxiaoLe = adList.xiaoxiaoLe;
var leDou = adList.leDou;

var week = new Date().getDay();

sleep(5000);
useStorage = false;

var currentDate = new Date().getDate();

// checkDouYinInKuaiShou();
// kuaishouUpDown(1, true);
// zhongQingLongVideo(100);
// leDou(29, true);
// zhongQingOther.kankan();
// zhongQingOther.kankan2();
// zhongKuaiKanKan();
// sleep(1000 * 10000);

// quTouTiaoR();

// kReading();
// fenHongTask();
// zhongJob(0.94);
// zhongQingLongVideo(0.4);
// shuaBao();
// quTouTiaoWatch()
kuaiShouSmallTask();
// zhongQingOther.getMoreReward();
// yiKanDianReading();
// sleep(1000 * 10000);
// kuaishouUpDown(1, true);
// huohuoJob.other();
// quZhuanJob.runAll();
// rehuoJob.runAll();
// kuaiYinJob.main();
// kuaiYinJob.baoXiang();
// huohuoJob.hongBao();
// device.wakeUp()
// xiaoxiaoLe(20)
// leDou()
// douYinBaoXiang();
// leKan.main();
// yangyang.main();
// sleep(1000 * 10000);
// quZhuanJob.chengJiu();
// zhongQingOther.zhuanPan();
// zhongQingOther.kankan()
// jinRiJob();
// tianQiJob.runAll();
// runReHuoLikeOther();
// zhongQingOther.search();
// meng.task20();
// zhuanJob.runAll();
// hongyunJob.runAll();
// liulanQi.runAll();
// dongdong.main();
// nangua.main();
// pipi.main();
// zhouzhou.main();
// jingCaiob();
// jingCaiLongVideo();
// zhongKuaiJob();
// zhongKuaiVideoJob();
useStorage = true;
// runReHuoLikeCustom();

if (currentPhoneType === PHONE_TYPES.hong9A) {
  hong9ARun();
} else {
  wakeUpDevice()
  home();
  begin();
  otherRun();
}

function hong9ARun() {
  zhongQingLongVideo(0.4);
  zhongJob(1.3);
  zhongKuaiJob();
  zhongKuaiVideoJob();
  zhongJob(1.3);
  zhongQingOther.kankan();
  zhongQingOther.search();
  zhongQingOther.kankan();
  zhongKuaiKanKan();
  runUnDoneFn();
}

function otherRun() {
  if (isAdmin) {
    // douYin(10);
  } else {
    kuaiYinJob.main();
  }

  zhongJob(1.1);
  douYinBaoXiang();

  kReading();
  douYinBaoXiang();

  zhongJob(1.1);
  douYinBaoXiang();

  // runReHuoLikeMain();

  douYinBaoXiang();

  kReading();

  zhongKuaiJob();;

  zhongJob(1.1);

  douYinBaoXiang();

  zhongVideoT = 0;
  zhongQingLongVideo();
  // fengKan(10);
  if (isDefLaunch && !isAdmin) {
    zhongQingOther.search();
  }
  douYinBaoXiang();

  // yiKanDianReading();

  zhongJob(1.1);
  douYinBaoXiang();
  zhongQingLongVideo();
  zhongKuaiVideoJob();
  kReading();
  douYinBaoXiang();
  zhongJob(1.0);
  douYinBaoXiang();
  if (isDefLaunch) {
    zhongQingOther.zhuanPan();
  }

  zhongQingOther.getMoreReward();

  zhongQingLongVideo();

  if (isDefLaunch && !isAdmin) {
    zhongQingOther.search();
  }
  douYinBaoXiang();
  if (!isAdmin) {
    kuaiYinJob.runAll();
  }
  douYinBaoXiang();
  zhongQingOther.getMoreReward();
  // zhongQingLongVideo(0.2);

  runUnDoneFn();
  zhongQingOther.search();
  zhongQingOther.kankan();
  zhongQingOther.kankan();
  runUnDoneFn();
  // leDou();
  zhongQingOther.kankan();
  runUnDoneFn();
  zhongQingOther.kankan();
  zhongQingOther.kankan();
  // runReHuoLikeChengjiu();
  // fenHongTask();
  if (new Date().getHours() < 20) {
    begin();
    otherRun();
  } else {
    while (new Date().getDate() === currentDate) {
      var waitMinutes = 1
      sleep(1000 * 60 * waitMinutes)
    }
    currentDate = new Date().getDate()
    wakeUpDevice()
    home();
    begin();
    otherRun();
  }
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

function initWatchAdList() {
  var xiaoxiaoLe = function (max) {
    watchAdList({
      startAd: function () {
        click(880, is10X ? 1010 : 884);
        // click(880, 1010);
        return true;
      },
      afterAd: function () {
        sleep(800)
        // click(500, 1580);
        click(500, is10X ? 1580 : 1280);
        sleep(800)
      },
      max: max || 20,
      key: 'xiaoxiaoLe'
    })
  }
  var leDou = function (max, direct) {
    if (!direct) {
      launch('疯狂乐斗');
      sleep(8000);
      var i = 4
      while (i--) {
        closeModal();
        sleep(2000)
      }
      myWaitUntil('再通一关');
    }
    if (direct || clickIdCenter(leDouTaskId)) {
      myWaitUntil('领券中心');
      watchAdList({
        startAd: function () {
          if (text('明日再来').exists() || id(leDouNoVideoId).exists()) {
            return false
          }
          clickCenter(function () {
            var hasOther = textStartsWith('安装立即领').exists() || textStartsWith('打开应用后').exists();
            return text('领取').find()[hasOther ? 2 : 1];
          });
          sleep(2000);
          if (text('领券中心').exists()) {
            sleep(2000);
            clickCenter(function () {
              var hasOther = textStartsWith('安装立即领').exists() || textStartsWith('打开应用后').exists();
              return text('领取').find()[hasOther ? 2 : 1];
            });
          }
          return true;
        },
        afterAd: function () {
          var isText = false;
          myWaitUntil(function () {
            if (text('我知道了').exists()) {
              isText = true;
              return true;
            }
            if (id(leDouCloseId).exists()) {
              return true;
            }
          }, 8);
          if (isText) {
            click('我知道了');
          } else {
            clickIdCenter(leDouCloseId)
          }
          sleep(800)
          // if (myWaitUntil('我知道了')) {
          //   click('我知道了');
          //   sleep(800)
          // } else {
          //   myWaitUntil(function() {
          //     return id(leDouCloseId).exists();
          //   });
          //   clickIdCenter(leDouCloseId)
          // }
        },
        max: max || 30,
        key: 'leDou'
      })
    }

    function closeModal() {
      clickIdCenter(leDouCloseId);
    }
  }
  return {
    xiaoxiaoLe: xiaoxiaoLe,
    leDou: leDou
  }
}

function watchAdList(p) {
  var p = p || {};
  var waitTime = p.waitTime || 5;
  var startAd = p.startAd || noneFn;
  var afterAd = p.afterAd || noneFn;
  var max = p.max || 20;
  var key = p.key;
  var leftClose = p.leftClose;
  var i = 0;
  var oldClose = videoLeftClose;
  var oldWait = watchAdMaxWaitTime;
  watchAdMaxWaitTime = 28;
  videoLeftClose = function () {
    back();
    sleep(500);
    if (is10X) {
      click(70, 120);
    } else {
      click(80, 60);
    }
  }
  var localListener = function () {
    var checkLeftTimeList = [9, 11, 13, 15];
    var checkLeftTime = 0
    var checkedTime = 0;
    return function (time) {
      if (text('前往安装').exists() && textStartsWith('安装并打开').exists()) {
        if (is10X) {
          click(70, 120);
        } else {
          click(80, 60);
        }
        myWaitUntil('放弃奖励', 4)
        sleep(2000);
        clickCenter(function () {
          return text('放弃奖励').findOne(1000)
        });
        return true;
      }
      if (checkedTime) {
        if (time > checkedTime + checkLeftTime + 3) {
          var res = clickVideoCloseIcon();
          if (res) {
            return true;
          }
          back();
          sleep(1500);
          if (is10X) {
            click(70, 120);
          } else {
            click(80, 60);
          }
          myWaitUntil('放弃奖励', 4)
          sleep(2000);
          clickCenter(function () {
            return text('放弃奖励').findOne(1000)
          });
          return true;
        }
      } else {
        var lg = checkLeftTimeList.length;
        while (lg--) {
          var tar = checkLeftTimeList[lg];
          if (text(checkLeftTime + '').exists()) {
            toast('ad left' + tar + ' sec')
            checkLeftTime = tar;
            checkedTime = time;
          }
        }
      }
    }
  }()
  addVideoCheckListener(localListener);

  if (key) {
    runAndMarkByDuring(function (realT, addInFn) {
      while (realT--) {
        if (startAd(i++)) {
          quTouTiaoWatch();
          afterAd();
          addInFn(1)
          sleep(waitTime * 1000)
        }
      }
    }, key + '_adList', max, max);
  } else {
    while (max--) {
      if (startAd(i++)) {
        quTouTiaoWatch();
        afterAd();
        sleep(waitTime * 1000)
      }
    }
  }
  videoLeftClose = oldClose;
  watchAdMaxWaitTime = oldWait
  removeVideoCheckListener(localListener);
}

function fenHongTask() {
  runAndMarkByDuring(function (r) {
    var max = r || 10
    launch('分红世界');
    sleep(10000);
    while (max--) {
      myWaitUntil(function () {
        return id('kanshipin_root').exists()
      })
      clickIdCenter('kanshipin_root');
      quTouTiaoWatch();
      myWaitUntil('继续开红包');
      click('继续开红包');
      sleep(2000)
    }
  }, fenHongTask, 20, 10)
}

function yiKanDianReading() {
  var getOnePassTime = initGetLittleDuringTime();
  runAndMarkByDuring(function (realT, addInFn) {
    var startTime = Date.now();
    launch('看亿点');
    sleep(15 * 1000);
    back();
    sleep(3000);
    var playId = 'inew_img_play'
    var t = 10;
    while (t--) {
      if (!id(playId).exists()) {
        twoDown();
      } else {
        break;
      }
    }
    if (scrollIntoView(function () {
        return id(playId).findOne(500)
      }, 1500)) {
      if (clickIdCenter(playId)) {
        while (Date.now() < startTime + realT) {
          sleep(5000);
          if (textContains('点击重试').exists()) {
            click('点击重试')
          }
          var max = 20
          while (max-- && !textContains('重播').exists()) {
            sleep(5000)
          }
          addInFn(getOnePassTime(Date.now() - startTime, 60 * 1000))
          click(500, 1600)
        }
      } else {
        return false
      }
    } else {
      return false
    }
  }, 'yiKanDianReading', 30 * 60 * 1000)
}

function runReHuoLikeCustom() {
  var apps = initAllReHuoLike();
  for (var name in apps) {
    var app = apps[name];
    if (app && typeof app.custom === 'function') {
      app.custom();
    }
  }
}

function runReHuoLikeChengjiu() {
  var apps = initAllReHuoLike();
  for (var name in apps) {
    var app = apps[name];
    if (app && typeof app.hongBao === 'function') {
      app.hongBao();
    }
  }
}

function runReHuoLikeMain() {
  var apps = initAllReHuoLike();
  for (var name in apps) {
    var app = apps[name];
    if (app && typeof app.main === 'function') {
      if (isAdmin && name === 'liulanQiJob') {
        app.main(10);
      } else {
        app.main();
      }
    }
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
  var yangyang = initReHuoLikeJob({
    appName: '羊羊极速视频',
    videoAdText: '金币翻倍',
    hourCoinText: 'aoj',
    successCloseId: 'mr',
    taskEntryName: '福利',
  });
  var leKan = initReHuoLikeJob({
    appName: '乐看极速视频',
    videoAdText: '金币翻倍',
    hourCoinText: 'aiu',
    successCloseId: 'mq',
    taskEntryName: '福利',
  });
  var zhouzhou = initReHuoLikeJob({
    appName: '周周浏览器',
    videoAdText: '看视频再送',
    hourCoinText: 'agn',
    successCloseId: 'mi',
    taskEntryName: '福利',
    custom: function () {
      var id1 = 'ad1';
      return idWatch(id1, liulanQi)
    }
  });
  var pipi = initReHuoLikeJob({
    appName: '皮皮浏览器',
    videoAdText: '看视频再送',
    hourCoinText: 'alc',
    successCloseId: 'm5',
    taskEntryName: '福利',
    custom: function () {
      var id1 = 'ahr';
      return idWatch(id1, liulanQi)
    }
  });
  var nangua = initReHuoLikeJob({
    appName: '南瓜视频极速版',
    videoAdText: '看视频再送',
    hourCoinText: 'akw',
    successCloseId: 'm1',
    taskEntryName: '福利',
  });
  var dongdong = initReHuoLikeJob({
    appName: '东东极速视频',
    videoAdText: '看视频再送',
    hourCoinText: 'ag7',
    successCloseId: 'me',
    taskEntryName: '福利',
  });
  var liulanQi = initReHuoLikeJob({
    appName: '百宝箱浏览器',
    videoAdText: '看视频再送',
    hourCoinText: 'aef',
    successCloseId: 'lw',
    taskEntryName: '福利',
    custom: function () {
      var id1 = 'ab4';
      return idWatch(id1, liulanQi)
    }
  });
  var hongyun = initReHuoLikeJob({
    appName: '红云视频极速版',
    videoAdText: '看视频再送',
    hourCoinText: 'ad2',
    successCloseId: 'll',
    taskEntryName: '福利',
    enterMain: function () {
      click(640, 1825);
    },
  });

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
      nextPage(true);
      nextPage(true);
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
          var ls = text('广告').find();
          var ad = ls.filter(l => {
            var bs = l.bounds();
            return bs.top < device.height && bs.left > 0 && bs.left < device.width
          })[0]
          var noAd = !ad;
          if (noAd && inFirst) {
            inFirst = false
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
    mainText: '天气',
    custom: function () {
      begin();

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
              tianQiJob.closeSuccessModal();
              if (text('观看历史').exists()) {
                back();
                sleep(1000);
              }
            }
            return begin();
          }
        }
      }
    }
  });
  var zhuanJob = initReHuoLikeJob({
    appName: '赚赚清理',
    videoAdText: '看视频再送',
    successCloseId: 'lw',
    hourCoinText: 'ajg',
    enterMain: function () {
      click(410, 1825);
    },
    quickAd: true,
    taskEntryName: '福利',
    // custom: function () {
    //   var id1 = 'ag5';
    //   idWatch(id1, zhuanJob)
    //   var tar = id('uy').findOne(1000);
    //   if (tar) {
    //     var bs = tar.bounds();
    //     click(bs.centerX(), bs.centerY());
    //     if (myWaitUntil('看视频最高')) {
    //       click('看视频最高');
    //     }
    //     quTouTiaoWatch();
    //     zhuanJob.closeSuccessModal();
    //   }
    // }
  });
  var quZhuanJob = initReHuoLikeJob({
    appName: '趣赚清理',
    videoAdText: '看视频再送',
    successCloseId: 'ly',
    hourCoinText: 'aep',
    enterMain: function () {
      click(640, 1825);
    },
    quickAd: true,
    backStopId: 'gt',
    // custom: function () {
    //   var id1 = 'abb';
    //   if (isNote3) {
    //     var ls = [
    //       [130, 280],
    //       [130, 570],
    //       [950, 320]
    //     ];
    //     var lg = ls.length;
    //     while (lg--) {
    //       var tar = ls[lg];
    //       if (tar) {
    //         click(tar[0], tar[1]);
    //         if (myWaitUntil('看视频最高')) {
    //           click('看视频最高');
    //         }
    //         quTouTiaoWatch();
    //         zhuanJob.closeSuccessModal();
    //       }
    //     }
    //   } else {
    //     idWatch(id1, quZhuanJob)
    //   }
    //   var tar = id('t1').findOne(1000);
    //   if (tar) {
    //     var bs = tar.bounds();
    //     click(bs.centerX(), bs.centerY());
    //     if (myWaitUntil('看视频最高')) {
    //       click('看视频最高');
    //       quTouTiaoWatch();
    //       quZhuanJob.closeSuccessModal();
    //     }
    //   }
    // }
  });

  var rehuoJob = initReHuoLikeJob({
    appName: '热火视频极速版',
    videoAdText: '翻倍',
    successCloseId: 'lx',
    hourCoinText: isDefLaunch && !isAdmin ? 'adx' : 'acn',
  });

  var huohuoJob = initReHuoLikeJob({
    appName: '火火视频极速版',
    videoAdText: '看视频再送',
    readTime: 30,
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
    backStopId: 'gi',
    custom: function () {
      huohuoJob.goToTask();
      myWaitUntil('立即提现');
      click('立即提现');
      if (myWaitUntil('我的钱包')) {
        myWaitUntil('立即提现');
        click('立即提现');
      }
    }
  });

  function idWatch(myId, instance) {
    var id1 = myId;
    var ls = id(id1).find();
    var lg = ls.length;
    if (lg === 0) {
      return true;
    }
    toast('idWatch' + lg);
    while (lg--) {
      var tar = ls[lg];
      if (tar) {
        var bs = tar.bounds();
        click(bs.centerX(), bs.centerY());
        if (myWaitUntil('看视频最高')) {
          click('看视频最高');
          quTouTiaoWatch();
          instance.closeSuccessModal();
        }
      }
    }
  }
  if (isAdmin) {
    return {
      // huohuoJob: huohuoJob,
      // zhuanJob: zhuanJob,
      // hongyunJob: hongyun,
      // liulanQiJob: liulanQi,
      // yangyangJob: yangyang,
      // leKanJob: leKan
      // zhouzhouJob: zhouzhou
    }
  }
  return {
    huohuoJob: huohuoJob,
    // quZhuanJob: quZhuanJob,
    // rehuoJob: rehuoJob,
    // zhuanJob: zhuanJob,
    // hongyunJob: hongyun,
    // liulanQiJob: liulanQi,
    // yangyangJob: yangyang,
    // leKanJob: leKan
    // dongdongJob: dongdong,
    // nanguaJob: nangua,
    // zhouzhouJob: zhouzhou
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
    mainText: '首页',
    readTime: 14,
    custom: undefined
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
  var readTime = p.readTime;
  var myCustom = p.custom;
  var quickAd = p.quickAd;

  var main = noneFn;
  var hongBao = noneFn;
  var chengJiu = noneFn;
  var other = noneFn;
  var custom = noneFn;
  var coinTextExistsTime = 0;

  if (appName && videoAdText && hourCoinText && successCloseId) {
    main = function (t) {
      return runAndMarkByDuring(function (realT, addInFn) {
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
          readTime: upDownRead ? 0 : realT,
          upDownReadTime: upDownRead ? realT : 0,
          goDown: function () {},
          goUp: function () {},
          beforeOneBegin: function (i, passTime) {
            if (text('收益已领完').exists()) {
              return false
            }
            if (textContains('充电').exists()) {
              click('取消');
            }
            var coinText = '金蛋大奖';
            if (textContains(coinText).exists()) {
              coinTextExistsTime++;
              if (coinTextExistsTime > 1) {
                var tar = textContains(coinText).findOne(1000);
                click(tar.bounds().left + 15, tar.bounds().top - 15);
                coinTextExistsTime = 0;
              }
            } else {
              closeSuccessModal();
            }
            if (!text(taskEntryName).exists()) {
              sleep(500);
              back();
              click('关闭')
              if (quickAd) {
                sleep(2000);
                if (!text(taskEntryName).exists()) {
                  quTouTiaoWatch();
                  closeSuccessModal();
                }
              }
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
            var res = myWaitUntil(succText, 10);
            closeSuccessModal()
            // if (res) {
            //   sleep(500);
            //   var a = textContains(succText).findOne(2000);
            //   if (a) {
            //     var top = a.bounds().top;
            //     click(950, top - 86);
            //   }
            //   click(950, 888);
            // } else {
            //   closeSuccessModal();
            // }
            if (upDownRead) {
              click(500, 350);
            }
          }
        });
      }, key + 'main', readTime || 60, t || readTime);
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
        var res = begin(ls.length);
        sleep(2000);
        back();
        sleep(3000);
        videoAd();
        return res
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
          closeSuccessModal();
          if (text('日常任务').exists()) {
            break;
          }
          if (hongBaoModalExists()) {
            break
          }
          i = i - 1;
        }
        closeSuccessModal();
        closeHongBaoModal();
        closeSuccessModal();
        sleep(8000);
      }
    }

    custom = function () {
      if (myCustom) {
        runAndMark(function () {
          startApp();
          sleep(2000);
          var res = myCustom();
          return res
        }, key + 'custom');
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
      sleep(3000);
      id1();
      return;
    }

    if (myWaitUntil(function () {
        return id(id1).exists()
      }), 4) {
      var res = clickIdCenter(id1);
      if (res) {
        return;
      }
    }
    var succText = '您又赚了';
    var res = myWaitUntil(succText, 1);
    if (res) {
      var a = textContains(succText).findOne(2000);
      if (a) {
        var top = a.bounds().top;
        click(950, top - 86);
      }
    }
    click(950, 888);
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
    runAll: runAll,
    custom: custom,
    closeSuccessModal: closeSuccessModal,
    goToTask: goToTask
  }
}

function kuaiShouSmallTask() {
  runAndMark(function () {
    var entryId = kuaiShouSmallTaskId;
    var entry = id(entryId).findOne(1200);
    var isNew = PHONE_TYPES.mi5 !== currentPhoneType;
    try {
      if (PHONE_TYPES.hong9A === currentPhoneType || PHONE_TYPES.note3 === currentPhoneType ? 1 : entry) {
        entry && click(entry.bounds().centerX(), entry.bounds().centerY());
        var res = myWaitUntil('日常任务');
        if (res) {
          // swipe(500,1900,500,200,600);
          click('签到');
          sleep(1200)
          var tar1 = '福利';
          var end2 = '已完成';
          var n = 12;
          while (!text(end2).exists() && n-- && textContains('领福利').exists()) {
            watch2()
            sleep(2000);
          }
          var m = 22;
          while (m-- && textStartsWith(tar1).exists()) {
            watch1()
            sleep(2000);
          }
          sleep(6000);
          var isEnd = text(end2).exists();
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
    var ls = textContains('福利').find()
    click('福利', kuaiFuliIdx);
    sleep(3000);
    if (text('快手小店').exists()) {
      back();
      return
    }
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
    var tar = text('领福利').find();
    if (true) {
      click('领福利', kuaiVideoIdx);
      // tar[tar.length - 1].click();
      if (isNew) {
        sleep(6000);
        click(300,800);
      }
      sleep(70 * 1000);
      back();
      sleep(2000);
      if (isNew) {
        back();
      sleep(2000);
      }
      var tr = 3;
      while (tr--) {
        if (text('日常任务').exists()) {
          break;
        } else if (textContains('退出').exists()) {
          click('退出');
          sleep(1000);
          if (isNew) {
            back();
          sleep(2000);
          }
          break;
        } else {
          back();
          sleep(2000);
          if (isNew) {
            back();
          sleep(2000);
          }
        }
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
        if (time > 32) {
          if (textContains('跳过').exists()) {
            click('跳过');
          }
        }
        return clickVideoCloseIcon()
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
        if (clickIdCenter('frame_iv_gif_root')) {
          sleep(2500);
          var slide = id('seekView').findOne(2000);
          if (slide) {
            var bs = slide.bounds();
            // swipe(330, bs.centerY(), 900, bs.centerY(), 400)
            swipe(bs.left + 30, bs.centerY(), 900, bs.centerY(), 400)
            sleep(1800);
          }
          back()
          sleep(3000);
        }
        if (i % 23 === 0) {
          click(130, 1050);
          sleep(2500);
          var slide = id('seekView').findOne(2000);
          if (slide) {
            var bs = slide.bounds();
            console.log(bs.left)
            console.log(bs.top)
            swipe(bs.left + 30, bs.centerY(), 900, bs.centerY(), 400)
            sleep(1800);
          }
          back()
          sleep(3000);
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
        if (!(+t > 8900)) {
          getStorage().remove('shuaBao__During');
          return false;
        }
      }
    }
  }, 'shuaBao', 60, 60);
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
  var modalCloseId1 = 'tv_close_bottom';

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
        clickIdCenter('iv_close_top');
        click(closeText)
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
              clickIdCenter(openAdId)
              sleep(1000);
              click(500, 1120);
              clickIdCenter(openAdId)
              sleep(1000);
              clickIdCenter(openAdId)
              if (myWaitUntil(addText)) {
                sleep(1000);
                click(addText);
                // sleep(3000);
                // swipe(500, 200, 500, 1330, 500)
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
    markDone(key);

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
    markDone(key);
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
    markDone(key);

    function start() {
      var tarId = 'tvTreasureBox';
      var a = id(tarId).findOne(2000);
      if (a) {
        var b = a.bounds();
        click(b.centerX(), b.centerY() - 100);
        click(b.centerX(), b.centerY() - 100)
        sleep(100);
        var addT = '倍领取';
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
      sleep(10000);
      clickIdCenter('note_sign_close');
      click('知道了');
      sleep(2000);
      clickIdCenter('note_sign_close');
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
    sleep(3000);
    click(modalCloseId1);
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
  back();
  sleep(4200);
  back();
  sleep(4200);
  back();
  sleep(4200);
  if (keepReading()) {
    watch();
    sleep(3000);
    back();
  }
  var enter = id(douYinTaskEntryId).findOne(6000);
  closeLater();
  if (enter) {
    enter.click();
    myWaitUntil('去提现');
    sleep(1600);
    back();
    sleep(1200);
    enter.click();
    myWaitUntil('去提现');
    sleep(1600);
    closeLater();
    back();
    sleep(1200);
    enter.click();
    myWaitUntil('去提现');
    sleep(1600);
    click('确定');
    click('确认');
    sleep(5000);
    closeLater();

    if (textStartsWith('立即签到').exists()) {
      click('立即签到');
      if (myWaitUntil('看广告视频再')) {
        click('看广告视频再');
        watch();
        sleep(1000);
      }
      if (myWaitUntil('看广告视频再')) {
        click('看广告视频再');
        watch();
        sleep(1000);
      }
      closeLater();
    }

    if (text('去领取').find().length > 1 && text('去领取').exists()) {
      click('去领取', 0);
      sleep(5000);
      if (!text('去提现').exists()) {
        watch();
        sleep(3000);
      }
      store.put(k, Date.now());
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
        sleep(4200);
        if (!text('去提现').exists()) {
          watch();
          sleep(3000);
        }
        store.put(k, Date.now());
      }
    }
    closeLater();
    if (text('去逛街').exists() && !textContains('10/10').exists()) {
      click('去逛街', 0);
      if (myWaitUntil('了解详情')) {
        click('了解详情', 1);
        sleep(90 * 1000)
        back();
        sleep(3000);
      }
      back();
      sleep(3000);
      click('坚持退出');
      sleep(1000);
    } else {
      runDouYinBX = false;
      return;
    }
    back();
    sleep(1500);
    if (keepReading()) {
      watch();
      sleep(3000);
      back();
    }
    if (descContains('继续观看').exists()) {
      clickCenter('坚持退出');
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
    sleep(30000);
    var i = 10;
    while (i--) {
      sleep(5000);
      back();
      sleep(1200);
      if (keepReading()) {} else if (clickCenter(descStartsWith('再看一个').findOne(1100))) {
        return watch()
      } else if (!textContains('金币收益').exists()) {
        click(500, 1150);
      }
    }

  }

  function keepReading() {
    if (descContains('继续观看').exists()) {
      clickCenter(descContains('继续观看').findOne(1000));
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
  }, 'douYin', 7, r || 30)
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
  }, 'quTouTiaoR', 0.6, 0.6);

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

function ppReading() {
  var SLEEP_TIME = 15;
  var sleepTime = 10;
  var realReadingT = ~~(300 * (SLEEP_TIME / sleepTime));
  var oneRealReadingT;
  var getOnePassTime = initGetLittleDuringTime();
  var durationId = 'a2o';
  var seekbarId = 'a9y';
  var startTime = Date.now();

  function getDuration() {
    function getInScreen(ls) {
      return ls.filter(function (t) {
        var bs = t.bounds();
        return bs.top > 0 && bs.top < device.height
      })
    }
    click(500, 500);
    sleep(1100);
    var tars = id(durationId).find();
    var inScreen = getInScreen(tars)
    var tar = inScreen[0];
    if (tar) {
      var txt = tar.text();
      if (txt) {
        var min = (+(txt[0] + txt[1])) || 0
        var sec = (+(txt[3] + txt[4])) || 0
        var d = min * 60 + sec
        var bars = id(seekbarId).find();
        var bar = getInScreen(bars)[0];
        if (bar && d > 30) {
          var bs = bar.bounds();
          click(bs.left + 50, bs.centerY());
        }
        toast(d);
        return Math.min(d - 12, 160);
      }
    }
    back();
    sleep(3000);
    return
  }
  runAndMarkByDuring(function (realT, addInFn) {

    function start(i) {
      var endTime = startTime + realT * sleepTime * 1000
      if (Date.now() > endTime) {
        return
      }
      if (i < 5) {
        back();
      }
      addInFn(getOnePassTime(i, 6));
      randomInterest(0.3)
      normal();
      var dua = getDuration()
      if (dua > 0) {
        sleep(dua * 1000);
      }
      if (i > oneRealReadingT) {
        return;
      }
      start(i + 1);
    }


    oneRealReadingT = realT;
    sleep(3000);
    // launch('皮皮虾极速版');
    // sleep(15000);
    try {
      var res = start(0);
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, 'ppReading', realReadingT, ~~(realReadingT / 2));

  function normal() {
    var times = 0 + ~~(Math.random() * 3);
    sleep(times * 1000);
    var x = ~~(Math.random() * 300 + 400);
    var y = ~~(Math.random() * 300);
    swipe(x, 1800 - y, x + 10, 100, 500);
    sleep(2000);
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
  var durationId = 1 ? 'total_duration' : 'player_duration';
  var seekbarId = 'player_seekbar';
  var startTime = Date.now();

  function getDuration() {
    function getInScreen(ls) {
      return ls.filter(function (t) {
        var bs = t.bounds();
        return bs.top > 0 && bs.top < device.height
      })
    }
    click(500, 900);
    sleep(1100);
    var tars = id(durationId).find();
    var inScreen = getInScreen(tars)
    var tar = inScreen[0];
    if (tar) {
      var txt = tar.text();
      if (txt) {
        toast(txt);
        var min = (+(txt[0] + txt[1])) || 0
        var sec = (+(txt[3] + txt[4])) || 0
        var d = min * 60 + sec
        var bars = id(seekbarId).find();
        var bar = getInScreen(bars)[0];
        if (bar) {
          var bs = bar.bounds();
          click(bs.left + 50, bs.centerY());
        }
        click(500, 900);
        return Math.min(d - 12, 160);
      }
    }
    back();
    sleep(3000);
    return
  }
  runAndMarkByDuring(function (realT, addInFn) {
    var mayEndCheckTime = 0;

    function start(i) {
      var endTime = startTime + realT * sleepTime * 1000
      if (Date.now() > endTime) {
        return
      }
      if (!textEndsWith('/6').exists()) {
        mayEndCheckTime++;
        toast('mayEnd: ' + mayEndCheckTime)
      } else {
        mayEndCheckTime = 0;
      }
      if (mayEndCheckTime > 4) {
        return;
      }
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
      var startE = 9600;
      if (i < startE) {
        click('我知道了', 0);
        if (i < 5 && !text('拖动滑块').exists()) {
          back();
          sleep(2000)
          click('退出');
        }
        // if (!text('分享').exists()) {
        //   back();
        // }
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
        if (i % 33 === 0) {
          isL = false;
        }
      } else {
        // isL = isLong();
        // if (!isL) {
        //   normal();
        // }
        normal();
      }
      if (textContains('点击进入直播间').exists() || textContains('点击打开').exists()) {
        normal()
        return start(i + 1);
      }
      var dua = getDuration()
      if (dua > 0) {
        sleep(dua * 1000);
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
      kuaiShouSmallTask.a = kuaiShouSmallTask.a || 1;
      if (kuaiShouSmallTask.a > 1) {
        kuaiShouSmallTask();
      }
      kuaiShouSmallTask.a = kuaiShouSmallTask.a + 1;
      var res = start(0);
      kuaiShouSmallTask();
      return res;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, 'kReading', realReadingT, ~~(realReadingT / 3));

  function fanfu() {
    sleep(sleepTime * 1000);
    videoUpDown();
  }

  function normal() {
    var times = 0 + ~~(Math.random() * 3);
    sleep(times * 1000);
    var x = ~~(Math.random() * 300 + 400);
    var y = ~~(Math.random() * 100);
    swipe(x, 1800 - y, x + 10, 100 + y, 500);
    sleep(2000);
  }
}

function checkZhongQingTwo(mark) {
  checkZhongQingTwo.history = checkZhongQingTwo.history || {};
  if (checkZhongQingTwo.history[mark] === undefined) {
    checkZhongQingTwo.history[mark] = runChildFirst;
  }
  var runFirst = true;
  var child = mark + '_two';
  if (doubleZhongQing) {
    if (checkZhongQingTwo.history[mark]) {
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
    checkZhongQingTwo.history[mark] = !checkZhongQingTwo.history[mark];
  }

  var afterLaunch = function () {
    launch.lastest = 'abc';
    // if (isNote3) {
    //   var hasTwo = myWaitUntil('请选择要使用的应用', 10);
    //   launch.lastest === '';
    //   if (hasTwo) {
    //     click(runFirst ? 300 : 750, 1520);
    //   }
    // }
  }
  console.log(mark)
  return {
    mark: mark,
    afterLaunch: afterLaunch,
    runFirst: runFirst
  }
}

function zhongKuaiKanKan() {
  var start = function () {
    var realKey = 'zhongKuaiKanKan';
    launchKuaiZhongQing(2);
    var store = storages.create("zhongKuaiKanKan");

    var latestName = '';

    if (realKey) {
      if (goToSubTask()) {
        sleep(10000);
        startTask();
        if (text('看看赚').exists() && text('已完成').find().length > 18 && (text('进行中').find().length + text('去完成').find().length) < 8) {
          markDone(realKey);
        } else {
          saveUnDoneFn(function () {
            zhongKuaiKanKan();
          }, realKey)
        }
      }
    }

    function goToSubTask() {
      var enterT = '看看赚';
      if (myWaitUntil(enterT)) {
        sleep(200);
        clickOneByText(enterT);
        if (myWaitUntil('每天一次任务', 30)) {
          sleep(200);
          return true;
        }
      }
    }
    


    function startTask() {
      var unFinishNames = getTaskNameByType('去完成').reverse();
      beginReading(unFinishNames);
      // runStoreType('otherSouType', getTaskNameByType('已完成'));
      beginReading(getTaskNameByType('进行中'), 2);
    }

    function beginReading(names, max) {
      var lg = names.length;
      while (lg--) {
        var name = names[lg];
        if (!text(name).exists()) {
          break;
        }
        if (getTaskNameByType('已完成').indexOf(name) > -1) {
          continue;
        }
        var iMax = max ? 2 : 4;
        var tryT = iMax;
        while (tryT--) {
          click(name);
          sleep(9000);
          var y = Math.min(currentPhoneType === PHONE_TYPES.hong9A ? 500 : 610 + (currentPhoneType === PHONE_TYPES.hong9A ? 200 : 300) * tryT, device.height - 120);
          click(500, y);
          if (tryT < 3) {
            sleep(100);
            click(500, 1100);
          }
          sleep(8000);
          var a = getTitle();
          var specialType = matchSpecialType(a);
          if (specialType) {
            putStoreType(specialType, {
              name: name,
              y: y
            });
            runSpecialType(specialType, max ? tryT + 1 : (6 - (iMax - tryT - 1)));
            leave();
            break;
          } else {
            upDown();
            leave();
          }
          latestName = name;
          sleep(4000);
        }
      }
    }

    function runStoreType(type, excludes) {
      var list = getStoreType(type);
      console.log('runType__' + type + '_' + list.length);
      list.forEach(function (l) {
        if (!l.fail && (excludes || []).indexOf(l.name) < 0 && text(l.name).exists()) {
          click(l.name);
          sleep(8000);
          click(500, l.y);
          var res = runSpecialType(type);
          if (!res) {
            l.fail = l.fail || 0;
            l.fail++;
            putStoreType(type, l);
          }
          leave();
          sleep(5000)
        }
      })
      store.put(type, JSON.stringify(list.filter(l => !l.fail))); //清空异常
    }

    function getTaskNameByType(type) {
      var names = [];
      text(type).find().forEach(function (d) {
        if (d.parent() && d.parent().child(0)) {
          names.push(d.parent().child(0).text())
        }
      });
      return names;
    }

    function getStoreType(type, defaultValue) {
      var list = store.get(type);
      if (list) {
        list = JSON.parse(list) || (defaultValue || []);
      } else {
        list = defaultValue || [];
      }
      return list;
    }

    function putStoreType(type, data) {
      var list = getStoreType(type);
      var target = list.find(function (l) {
        return l.name === data.name;
      });
      if (target) {
        for (var key in data) {
          target[key] = data[key];
        }
      } else {
        console.log('save_' + type + '_' + data.name)
        list.push(data);
      }
      store.put(type, JSON.stringify(list));
    }

    function matchSpecialType(title) {
      var a1 = '商家列表';
      var a2 = '聚合商家推荐';
      var a3 = '为您推荐';
      var a4 = '柠檬爱美'
      var a5 = '聚合商家推荐';
      var ls = [a1, a2, a3, a4, a5];
      if (title.indexOf("网页搜索") > -1) {
        return 'otherSouType';
      } else if (title.indexOf('京东热卖') > -1 || title.indexOf('一分钟') > -1) {
        return 'jingDongType';
      } else if (title.indexOf('一点生活趣事') > -1) {
        return 'interestType'
      } else if (ls.indexOf(title) > -1) {
        return 'addListType';
      }
    }

    function getTitle() {
      var t = className("android.view.View").boundsInside(0, 0, 423, currentPhoneType === PHONE_TYPES.hong9A ? 122 : 180).findOne(500);
      var text = t && t.text() || '';
      sleep(1000);
      return text;
    }

    function runSpecialType(type, times) {
      var handlers = {
        otherSouType: function (max) {
          var i = max || 6;
          var isValid = true;
          while (i--) {
            sleep(2000);
            upDown(2);
            swipe(350, 270, 350, 1000, 500);
            sleep(500);
            var hotKeys = ['天气', '温度', 'c++', '王者', '抖音', '开发教程', '水果'];
            if (setText(0, hotKeys[~~(Math.random() * hotKeys.length)] + i)) {
              if (currentPhoneType === PHONE_TYPES.hong9A) {
                click(630, 230);
              } else {
                click(950, 300);
              }
            } else {
              if (i === (max ? max - 1 : 5)) {
                isValid = false;
              }
              break;
            }
          }
          return isValid;
        },
        souGouType: function (max) {
          var i = max || 6;
          var setting = getStoreType('souGouType', {});
          if (!setting) {
            return;
          }
          while (i--) {
            sleep(1200);
            upDown();
            click(setting.searchBtn[0], setting.searchBtn[1]);
          }
          return true;
        },
        jingDongType: function (max) {
          var i = max || 6;
          while (i--) {
            upDown();
            click(500, 1300);
            sleep(1500);
            back();
            sleep(1200);
          }
          return true;
        },
        addListType: function (max) {
          var i = max || 6;
          while (i--) {
            upDown();
            click(500, 500);
            sleep(2500);
            back();
            sleep(1200);
          }
          return true;
        },
        interestType: function (max) {
          var i = max || 6;
          click(500, currentPhoneType === PHONE_TYPES.hong9A ? 460 : 650);
          sleep(6000);
          handlers.otherSouType(i);
        }
      }
      if (handlers[type]) {
        return handlers[type](times);
      }
    }

    function upDown() {
      oneUpDown(kankanSleep);
      oneUpDown(kankanSleep);
      oneUpDown(kankanSleep);
    }

    function oneUpDown(sl) {
      swipe(350, 1000, 350, 270, 800);
      sleep(sl || 1000);
      swipe(350, 270, 350, 1000, 800);
      sleep(1000)
    }

    function leave() {
      back();
      sleep(2000);
      click(currentPhoneType === PHONE_TYPES.hong9A ? 110 : 230, 100);
      sleep(2000);
    }
  }

  start();
}


function zhongKuaiJob(last) {
  runAndMarkByDuring(function (realLast, addInFn) {
    launchKuaiZhongQing(0);
    var error;
    var getOnePassTime = initGetLittleDuringTime();
    var currentPageIndex = 0;
    var pageNames = ["热点", "美文", '健康', '娱乐', '搞笑', '教育', '育儿'];
    var pageLg = pageNames.length;
    try {
      var readTool = initMarkReading({
        mark: '阅读',
        fallBack: function (i) {
          if (i === 0) {
            click(400, 530);
          } else {
            click(500, 750);
          }
        },
        top: zhongKuaiContentTop,
        bottom: zhongKuaiContentBottom
      })
      commonReading({
        readTime: realLast,
        oneReadTime: 40,
        oneWipeTime: pageLg,
        refresh: function () {
          readTool.reset();
          click(120, zhongKuaiContentBottom + 20);
          sleep(3000);
        },
        nextPage: function (isRight) {
          if (isRight && currentPageIndex < pageLg - 1) {
            currentPageIndex++;
          } else if (!isRight && currentPageIndex > 0) {
            currentPageIndex--;
          }
          clickCenter(text(pageNames[currentPageIndex]).findOne(1000));
        },
        leavePage: function () {
          back();
        },
        beforeLeavePage: function (i, passTime) {
          addInFn(getOnePassTime(passTime, 0.03));
        },
        afterLeavePage: function () {},
        beforeOneUpDown: function (i) {
          if (i < 4) {
            if (textContains('查看全文，奖励更多').exists()) {
              click('查看全文，奖励更多');
            } else {
              if (text('立即领取').exists()) {
                back();
              }
            }

          }
        },
        shouldNext: function (i) {
          if (i > 0) {
            readTool.updateList();
          }
          var max = readTool.getListLength() || 2;
          if (i < max) {
            readTool.enterNext();
            sleep(900);
            return true;
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
  }, 'zhongKuaiJob', 1.1, last || 1.1);

}

function zhongKuaiVideoJob(last) {
  runAndMarkByDuring(function (realLast, addInFn) {
    launchKuaiZhongQing(1);
    var error;
    var getOnePassTime = initGetLittleDuringTime();
    var currentPageIndex = 0;
    var pageNames = ["健康", "秒招", '搞笑', '广场舞', '美女', '热点', '影视'];
    var pageLg = pageNames.length;
    try {
      commonReading({
        readTime: realLast,
        oneReadTime: 40,
        oneWipeTime: pageLg,
        oneUpDown: function () {
          sleep(2500);
        },
        refresh: function () {
          click(350, zhongKuaiContentBottom + 20);
          sleep(2000);
        },
        // nextPage: function(isRight) {
        //   if (isRight && currentPageIndex < pageLg - 1) {
        //     currentPageIndex++ ;
        //   } else if (!isRight && currentPageIndex > 0 ) {
        //     currentPageIndex-- ;
        //   }
        //   clickCenter(text(pageNames[currentPageIndex]).findOne(1000));
        // },
        leavePage: function () {
          back();
        },
        beforeLeavePage: function (i, passTime) {
          addInFn(getOnePassTime(passTime, 0.03));
        },
        afterEnterPage: function () {
          click('关闭广告', 0);
          click('重新加载', 0);
        },
        beforeOneUpDown: function (i) {},
        shouldNext: function (i) {
          var yList = zhongKuaiVideoY;
          var max = yList.length;
          if (i < max) {
            click(500, yList[i]);
            sleep(900);
            return true;
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
  }, 'zhongKuaiVideoJob', 0.9, last || 0.9);

}

function zhongLeftTopBack() {
  if (currentPhoneType === PHONE_TYPES.hong9A) {
    click(44, 82);
  } else {
    click(90, 110);
  }
}

function launchKuaiZhongQing(type) {
  if (!zhongKuaiXY) {
    return;
  }
  type = type || 0;
  home();
  sleep(1000);
  home();
  sleep(1000);
  click(zhongKuaiXY[0], zhongKuaiXY[1]);
  sleep(12000);
  click(zhongKuaiTaskSite[type], zhongKuaiContentBottom + 50);
  sleep(3000)
}

function zhongJob(last) {
  var data = checkZhongQingTwo('zhongJob');
  var mark = data.mark;
  var afterLaunch = data.afterLaunch;
  var runFirst = data.runFirst;
  var tryOne = true;
  runAndMarkByDuring(function (realLast, addInFn) {
    if (doubleZhongQing) {
      var idx = runFirst ? 0 : 1
      var site = zhongSiteList[idx]
      launch('中青看点', true, site);
    } else {
      launch('中青看点');
    }

    afterLaunch();
    sleep(20000);
    back();
    sleep(6000);
    back();
    sleep(6000);
    back();
    sleep(6000);
    click(80, zhongContentBottom + 30);
    sleep(1000);
    nextPage(true);
    nextPage(true);
    var hadRead = !!getStorage().get(mark + '__During');
    var error;
    var getOnePassTime = initGetLittleDuringTime();
    try {
      var readTool = initMarkReading({
        mark: '阅读',
        fallBack: function (i) {
          if (i === 0) {
            click(400, 430);
          } else {
            click(500, 580);
          }
        }
      })
      commonReading({
        readTime: realLast,
        oneReadTime: 40,
        oneWipeTime: 10,
        refresh: function () {
          if (isOldZhongQing) {
            return readTool.refresh();
          } else {
            readTool.reset();
            click(120, zhongContentBottom + 20);
            sleep(3000);
          }
        },
        leavePage: function () {
          if (currentPhoneType === PHONE_TYPES.hong9A) {
            click(44, 82);
          } else {
            click(90, 110);
          }
        },
        beforeLeavePage: function (i, passTime) {
          addInFn(getOnePassTime(passTime, 0.03));
          if (text('查看详情').exists() && text('忽略').exists()) {
            click('查看详情');
            sleep(3000);
            back();
            sleep(3000);
          }
        },
        afterLeavePage: function () {
          if (!isOldZhongQing && myWaitUntil(function () {
              return text('转发朋友圈').exists();
            }, 2)) {
            back();
          }
        },
        beforeOneUpDown: function (i) {
          if (tryOne) {
            get20Coin();
            tryOne = false;
          }
          if (i < 4) {
            if (textContains('查看全文，奖励更多').exists()) {
              click('查看全文，奖励更多');
            } else {
              if (text('立即领取').exists()) {
                back();
              }
            }

          }
          if (i === 7) {
            clickIdCenter('oa');
          }
        },
        enterP: function () {
          readTool.enterNext();
          // var i = 5;
          // while (i--) {
          //   click(400, 430);
          //   sleep(2500);
          //   if (!text('热文').exists()) {
          //     break;
          //   }
          // }
        },
        shouldNext: function (i) {
          if (isOldZhongQing && i === 0) {
            if (hadRead) {
              twoDown();
              twoDown();
            }
          }
          var max = readTool.getListLength() || 2;
          if (i < max) {
            const fn = readTool.enterNext();
            sleep(2000);
            if (isOldZhongQing) {
              if (text('热文').exists() && fn) {
                fn();
              }
            }
            return true;
          }
          // var t = '阅读';
          // var ls = textContains(t).find();
          // ls.sort(function (a, b) {
          //   return a.bounds().top - b.bounds().top;
          // });
          // var lg = ls.length;
          // var a;
          // for (var index = 2; index < lg; index++) {
          //   var l = ls[index];
          //   var txt = l.text();
          //   var bounds = l.bounds();
          //   var top = bounds.top;
          //   var left = bounds.left;
          //   if (top > 600 && top < 1700 && left > 0 && left < 700 && +txt[0] > 0) {
          //     a = l;
          //     break;
          //   };
          // }
          // if (a) {
          //   click(a.bounds().left + 10, a.bounds().top - 10);
          // } else {
          //   click(500, 580);
          // }
        }
      });
      // runAndMark(function () {
      //   return get20Coin();
      // }, 'zhong_get20Coin');
      // runAndMark(function () {
      //   var reward = id('gx').findOne(1000);
      //   if (!reward) {
      //     reward = id('hj').findOne(1000);
      //   }
      //   if (reward) {
      //     reward.click();
      //     if (myWaitUntil('阅读5分钟')) {
      //       var max = 3;
      //       while (max-- && text('点击领取').exists()) {
      //         click('点击领取', 0);
      //         myWaitUntil('忽略');
      //         click('忽略');
      //         sleep(1000)
      //         back();
      //       }
      //     }
      //   }
      // }, 'zhong_reward')
    } catch (err) {
      console.log(err);
      error = err;
    }
    if (error) {
      return false;
    }
  }, mark, (week === 1 || week === 5) ? 3.0 : 2.1, last || 1.1);

  function get20Coin() {
    if (isNote3) {
      var i = 5;
      while (i--) {
        click(400, 430);
        sleep(2500);
        if (!text('热文').exists()) {
          break;
        }
      }
      var i = 1
      while (!textContains('阅读惊喜').exists()) {
        oneDown()
        sleep(100)
        i++;
        if (i > 20) {
          break;
        }
      }
      if (!textContains('阅读惊喜').exists()) {
        return
      }
      var max = 23;
      while (max--) {
        click('阅读惊喜', 0)
        if (!myWaitUntil('继续阅读')) {
          break;
        }
        back();
        sleep(300);
      }
      back();
      return true
    }

  }

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
  var runFirst = data.runFirst;
  runAndMarkByDuring(function (realT, addInFn) {
    var res
    if (doubleZhongQing) {
      var idx = runFirst ? 0 : 1
      var site = zhongSiteList[idx]
      res = launch('中青看点', true, site);
    } else {
      res = launch('中青看点');
    }
    afterLaunch();
    if (res) {
      sleep(10000);
    }
    sleep(10000);
    back();
    sleep(3000);
    toVideo();
    myWaitUntil('次播放');
    sleep(5000);
    var getOnePassTime = initGetLittleDuringTime();
    var validTabNames = ["推荐","搞笑","广场舞"];
    try {
      var tool = initMarkReading({
        mark: '次播放',
        fallBack: function () {
          click(500, 350);
        }
      })
      commonReading({
        readTime: realT,
        oneReadTime: 32,
        oneWipeTime: 5,
        oneUpDown: function () {
          sleep(2300);
        },
        nextPage: function (isRight) {
          // var tab = validTabNames.pop();
          // click(tab,0);
          // validTabNames = [tab].concat(validTabNames);
          // sleep(5000);
          nextPage(isRight);
          sleep(1000);
          if (text('没有请求到数据').exists()) {
            nextPage(isRight);
          }
        },
        refresh: function () {
          tool.reset();
          click(350, zhongContentBottom + 20);
          sleep(2000);
          if (text('没有请求到数据').exists()) {
            nextPage(true);
            sleep(2000);
          }
        },
        beforeLeavePage: function (i, passTime) {
          addInFn(getOnePassTime(passTime, 0.03));
        },
        beforeOneUpDown: function (i) {},
        afterEnterPage: function () {
          click('关闭广告', 0);
          click('重新加载', 0);
        },
        shouldNext: function (i) {
          if (!isOldZhongQing) {
            var ls = [500, zhongContentBottom - 30];
            if (i < ls.length) {
              click(500, ls[i]);
              return true;
            }
          } else {
            if (i < 2) {
              tool.enterNext();
              return true;
            }
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
  }, mark, (week === 1 || week === 5) ? 0.5 : 0.5, t);

  function toVideo() {
    var s = zhongVideoSite;
    click(s[0], s[1]);
  }
}

function jingCaiLongVideo(t) {
  runAndMarkByDuring(function (realT, addInFn) {
    var res = launch('晶彩看点');
    if (res) {
      sleep(10000);
    }
    sleep(10000);
    back();
    sleep(3000);
    back();
    sleep(3000)
    toVideo();
    myWaitUntil('次播放');
    sleep(3000);
    var getOnePassTime = initGetLittleDuringTime();
    try {
      var tool = initMarkReading({
        mark: '次播放',
        fallBack: function () {
          click(500, 350);
        }
      })
      commonReading({
        readTime: realT,
        oneReadTime: 32,
        oneWipeTime: 15,
        refresh: tool.refresh,
        beforeLeavePage: function (i, passTime) {
          addInFn(getOnePassTime(passTime, 0.03));
        },
        beforeOneUpDown: function (i) {},
        afterEnterPage: function () {
          click('关闭广告', 0);
          click('重新加载', 0);
        },
        shouldNext: function (i) {
          if (i < 2) {
            tool.enterNext();
            return true;
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
  }, 'jingCaiLongVideo', 0.6, t);

  function toVideo() {
    var s = zhongVideoSite;
    click(s[0], s[1]);
  }
}

function initZhongQingOther() {
  var keyP = 'zhongQing';
  var appName = '中青看点';

  var kankanCloseID1 = 'big_pic_close_btn';

  var mainSite = zhongQingMainSite;
  var enterMain = function () {
    click(mainSite[0], mainSite[1]);
    back();
    sleep(3000);
    click(mainSite[0], mainSite[1]);
    back();
    sleep(3000);
    click(mainSite[0], mainSite[1]);
    back();
    sleep(3000);
  }

  var search = noneFn;
  var kankan = noneFn;
  var zhuanPan = noneFn;
  var getMoreReward = noneFn;
  var kankan2 = noneFn;

  getMoreReward = function () {
    if (!isNote3) {
      return
    }
    var myK = keyP + 'getMoreReward';
    var reakKey = beforeGoToMain(myK);
    runAndMark(function () {
      if (reakKey) {
        var r = myWaitUntil('抽奖赚');
        if (!r) {
          return;
        }
        scrollIntoView('立即领取', device.height - 400);
        click('立即领取', 0);
        if (myWaitUntil('试玩3个')) {
          var max = 4;
          while (max-- && text('待领取').exists()) {
            click('待领取', 1)
          }
        }
        click(920, 600);
      }
    }, reakKey);
  }

  zhuanPan = function () {
    var myK = keyP + 'ZhuanPan';
    var reakKey = beforeGoToMain(myK);
    runAndMark(function () {
      if (reakKey) {
        var r = myWaitUntil('抽奖赚');
        if (!r) {
          click(500, 720);
        }
        sleep(5000);
        clickOneByText('抽奖赚');
        sleep(isAdmin ? 6500 : 2500);
        back();
        sleep(5000);
        var res = start(0);
        // clickOneByText('抽奖赚');
        // sleep(8000);
        // var ls = [200, 430, 670, 890];
        // var yH = 1800;
        // ls.forEach(x => {
        //   click(x, yH);
        //   quTouTiaoWatch();
        //   sleep(2000);
        //   click(920, 540);
        // })
        // sleep(5000);
        backToMain();
        if (text('签到领红包').exists()) {
          click('签到领红包')
        } else {
          clickIdCenter('a71')
        }
        click(500, 720);
        sleep(500);
      }
      return true;
    }, reakKey);


    function start(i) {
      i = i || 0;
      clickOneByText('抽奖赚');
      sleep(isAdmin ? 6500 : 2500);
      while (i < 103) {
        click(530, 1000);
        sleep(100);
        back();
        sleep(2000);
        myWaitUntil(function () {
          return clickOneByText('抽奖赚');
        })
        clickOneByText('抽奖赚')
        clickOneByText('抽奖赚')
        sleep(isAdmin ? 6500 : 2500);
        // var textType = ''
        // myWaitUntil(function () {
        //   if (text('继续抽奖').exists()) {
        //     textType = '继续抽奖'
        //     return true;
        //   }
        //   if (text('关闭').exists()) {
        //     textType = '关闭'
        //     return true;
        //   }
        //   return false;
        // })
        // if (textType) {
        //   clickCenter(text(textType).findOne(1000));
        //   sleep(1000)
        // } else {
        //   if (i < 3) {
        //     if (text('今日次数已用完').exists()) {
        //       back();
        //       break;
        //     }
        //   }
        // }
        i++;
      }
      back();
      return true;
    }
  }

  var runFirstTimes = 0;

  kankan2 = function () {
    var myK = keyP + 'Kankan';
    checkZhongQingTwo.history = checkZhongQingTwo.history || {};
    if (checkZhongQingTwo.history[myK]) {
      runFirstTimes = runFirstTimes + 1;
    }
    var realKey = beforeGoToMain(myK);

    var store = getKanKanStorage();

    if (!checkZhongQingTwo.history[myK] && runFirstTimes < 2) {
      checkZhongQingTwo.history[myK] = true;
    } else {
      runFirstTimes = 0;
    }

    var latestName = '';
    if (isDone(realKey)) {
      return;
    }
    if (realKey) {
      if (goToSubTask()) {
        sleep(10000);
        startTask();
        if (text('看看赚').exists() && text('已完成').find().length > 30 && (text('进行中').find().length + text('去完成').find().length) < 8) {
          markDone(realKey);
        } else {
          saveUnDoneFn(function () {
            kankan2();
          }, realKey)
        }
        backToMain();
      }
    }


    function startTask() {
      var unFinishNames = getTaskNameByType('去完成').reverse();
      console.log('one start');
      beginReading(unFinishNames);
      console.log('one end');
      beginReading(getTaskNameByType('进行中'), 2);
    }

    function beginReading(names, max) {
      var lg = names.length;
      while (lg--) {
        var name = names[lg];
        if (!text(name).exists()) {
          break;
        }
        if (getTaskNameByType('已完成').indexOf(name) > -1) {
          continue;
        }
        var iMax = max ? 2 : 4;
        var tryT = iMax;
        var bottomText;
        var left;
        while (tryT--) {
          click(name);
          sleep(9000);
          if (!bottomText) {
            bottomText = getBottomText();
            if (isTextShowEnd(bottomText)) {
              leave();
              break;
            }
            left = getLeftCount(bottomText);
          }
          
          var y = Math.min(currentPhoneType === PHONE_TYPES.hong9A ? 500 : 610 + (currentPhoneType === PHONE_TYPES.hong9A ? 200 : 300) * tryT, device.height - 120);
          click(500, y);
          if (tryT < 3) {
            sleep(100);
            click(500, 1100);
          }
          sleep(8000);
          var a = getTitle();
          var specialType = matchSpecialType(a);
          if (specialType) {
            putStoreType(specialType, {
              name: name,
              y: y
            });
            runSpecialType(specialType, left ? (left - (iMax - tryT - 2)) : (max ? tryT + 1 : (6 - (iMax - tryT - 2))));
            leave();
            break;
          } else {
            upDown();
            leave();
          }
          latestName = name;
          sleep(4000);
        }
      }
    }

    function getBottomText() {
      var t = className("TextView").boundsInside(0, zhongKanEndTextBottom - 75, device.width, zhongKanEndTextBottom).findOne(500);
      var text = t && t.text() || '';
      sleep(1000);
      return text;
    }

    function isTextShowEnd(text) {
      return text.indexOf('青豆奖励') > -1 || text.indexOf('任务已完成') > -1 ||  text.indexOf('已看6篇') > -1;
    }

    function getLeftCount(text) {
      if (!text) {
        return 6;
      }
      var max = +text[1];
      var done = +text[13];
      var left = max - done;
      return left > 0 ? left : 6;
    }

    function runStoreType(type, excludes) {
      var list = getStoreType(type);
      console.log('runType__' + type + '_' + list.length);
      list.forEach(function (l) {
        if (!l.fail && (excludes || []).indexOf(l.name) < 0 && text(l.name).exists()) {
          click(l.name);
          sleep(8000);
          click(500, l.y);
          var day = new Date().getDate();
          var res = runSpecialType(type, l.day === day ? 2 : undefined);
          l.day = day;
          if (!res) {
            l.fail = l.fail || 0;
            l.fail++;
            putStoreType(type, l);
          }
          leave();
          sleep(5000)
        }
      })
      store.put(type, JSON.stringify(list.filter(l => !l.fail || l.fail < 2))); //清空异常
      sleep(1000);
    }

    function getTaskNameByType(type) {
      var names = [];
      text(type).find().forEach(function (d) {
        if (d.parent() && d.parent().child(0)) {
          names.push(d.parent().child(0).text())
        }
      });
      return names;
    }

    function getStoreType(type, defaultValue) {
      var list = store.get(type);
      if (list) {
        list = JSON.parse(list) || (defaultValue || []);
      } else {
        list = defaultValue || [];
      }
      return list;
    }

    function putStoreType(type, data) {
      var list = getStoreType(type);
      var target = list.find(function (l) {
        return l.name === data.name;
      });
      if (target) {
        for (var key in data) {
          target[key] = data[key];
        }
      } else {
        console.log('save_' + type + '_' + data.name)
        list.push(data);
      }
      store.put(type, JSON.stringify(list));
    }

    function matchSpecialType(title) {
      var a1 = '商家列表';
      var a2 = '聚合商家推荐';
      var a3 = '为您推荐';
      var a4 = '柠檬爱美'
      var a5 = '聚合商家推荐';
      var ls = [a1, a2, a3, a4, a5];
      if (title.indexOf("网页搜索") > -1) {
        return 'otherSouType';
      } else if (title.indexOf('京东热卖') > -1 || title.indexOf('一分钟') > -1) {
        return 'jingDongType';
      } else if (title.indexOf('京东超市') > -1) {
        return 'jingDongChaoShiType';
      } else if (title.indexOf('一点生活趣事') > -1) {
        return 'interestType'
      } else if (ls.indexOf(title) > -1) {
        return 'addListType';
      } else if (title.indexOf('点击红包') > -1) {
        return 'hongBaoType';
      }
    }

    function getTitle() {
      var t = className("TextView").boundsInside(0, 0, device.width, currentPhoneType === PHONE_TYPES.hong9A ? 122 : 180).findOne(500);
      var text = t && t.text() || '';
      sleep(1000);
      return text;
    }

    function runSpecialType(type, times) {
      var handlers = {
        otherSouType: function (max) {
          var i = max || 6;
          var isValid = true;
          while (i--) {
            sleep(2000);
            upDown(2);
            swipe(350, 270, 350, 1000, 500);
            sleep(500);
            var hotKeys = ['天气', '温度', 'c++', '王者', '抖音', '开发教程', '水果'];
            if (setText(0, hotKeys[~~(Math.random() * hotKeys.length)] + i)) {
              if (currentPhoneType === PHONE_TYPES.hong9A) {
                click(630, 230);
              } else {
                click(950, 300);
              }
            } else {
              if (i === (max ? max - 1 : 5)) {
                isValid = false;
              }
              break;
            }
          }
          return isValid;
        },
        souGouType: function (max) {
          var i = max || 6;
          var setting = getStoreType('souGouType', {});
          if (!setting) {
            return;
          }
          while (i--) {
            sleep(1200);
            upDown();
            click(setting.searchBtn[0], setting.searchBtn[1]);
          }
          return true;
        },
        jingDongType: function (max) {
          var i = max || 6;
          while (i--) {
            upDown();
            click(500, 1300);
            sleep(1500);
            // back();
            zhongLeftTopBack();
            sleep(1200);
          }
          return true;
        },
        jingDongChaoShiType: function (max) {
          var i = max || 6;
          while (i--) {
            click(~~Math.random() * (device.width - 150) + 110, ~~Math.random() * (zhongContentBottom - 300) + 500);
            sleep(1500);
            upDown();
            // back();
            zhongLeftTopBack();
            sleep(2200);
          }
          return true;
        },
        addListType: function (max) {
          var i = max || 6;
          while (i--) {
            upDown();
            click(500, 500);
            sleep(2500);
            // back();
            zhongLeftTopBack();
            sleep(1200);
          }
          return true;
        },
        interestType: function (max) {
          var i = max || 6;
          click(500, currentPhoneType === PHONE_TYPES.hong9A ? 460 : 650);
          sleep(6000);
          handlers.otherSouType(i);
        },
        hongBaoType: function (max) {
          var i = max || 6;
          click(500, currentPhoneType === PHONE_TYPES.hong9A ? 600 : 870);
          sleep(1000);
          click(500, currentPhoneType === PHONE_TYPES.hong9A ? 600 : 870);
          sleep(5000);
          click(500, 500);
          click(350, 550);
          handlers.otherSouType(i);
        },
      }
      if (handlers[type]) {
        return handlers[type](times);
      }
    }

    function upDown() {
      oneUpDown(kankanSleep);
      oneUpDown(kankanSleep);
    }

    function oneUpDown(sl) {
      swipe(350, 1000, 350, 270, 800);
      sleep(sl || 1000);
      swipe(350, 270, 350, 1000, 800);
      sleep(1000)
    }

    function leave() {
      back();
      sleep(2000);
      click(currentPhoneType === PHONE_TYPES.hong9A ? 160 : 230, 100);
      sleep(2000);
    }
  }

  kankan = function (halfAuto) {
    var title;
    var maxT = 0;
    var foundSpecial = false;
    var lastClickFn = null;
    var hasAdModal = false;
    var endCache = false;
    var finishedLg = 0;
    if (halfAuto) {
      startTask();
    } else {
      if (!canKanKan) {
        return
      }
      var myK = keyP + 'Kankan';
      var realKey = beforeGoToMain(myK);
      if (realKey) {
        if (goToSubTask()) {
          sleep(10000);
          scrollIntoView('每天一次任务', 700);
          startTask();
          if (text('看看赚').exists() && !text('去完成').findOne(800) && text('进行中').find().length < 4) {
            markDone(realKey);
          } else {
            saveUnDoneFn(function () {
              kankan();
            }, realKey)
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

      function closeAdModal() {
        clickCenter(className("android.view.View").boundsInside(809, 300, 920, 1200).findOne(100));
      }

      function clickAdModal() {
        var ad = className("android.view.View").boundsInside(809, 300, 920, 1200).findOne(100);
        if (ad) {
          var bs = ad.bounds();
          click(500, bs.top + 100);
          return true;
        }
      }

      function closeBigAdModal() {
        clickCenter(className("android.view.View").boundsInside(940, 505, 1020, 1080).findOne(100));
      }

      function getTitle() {
        var t = className("TextView").boundsInside(0, 0, device.width, currentPhoneType === PHONE_TYPES.hong9A ? 122 : 180).findOne(500);
        var text = t && t.text() || '';
        sleep(1000);
        return text;
      }

      function waitTitleChange() {
        var text = "";
        var r = myWaitUntil(function () {
          text = getTitle();
          return text && text !== title;
        })
        return r ? text : "";
      }

      function findAd(i) {
        if (i === 0) {
          foundSpecial = false;
          lastClickFn = null;
          hasAdModal = false;
        }
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
        var ad9 = '新闻天天看';
        var type = '';

        title = getTitle();;
        type = title;
        toast(title);
        if (!title) {
          return 1;
        }
        var list = [{
            match: function (n) {
              return n === '标点资讯';
            },
            wait: function () {
              return myWaitUntil(function () {
                return text('广告').find().length > 2
              }, 8)
            },
            main: function () {
              click(500, 680);
              checkSpecialType();
              return true;
            }
          },
          {
            match: function (n) {
              return n === '私人厨房' || isClickSecondSimpleType();
            },
            wait: function () {
              sleep(2000);
              return true
            },
            main: function () {
              i === 0 && upDown(2);
              click(500, 680);
              checkSpecialType();
              return true;
            }
          },
          {
            match: function (n) {
              return titleIncludes('为你推送') || titleIncludes('新闻天天看');
            },
            wait: function () {
              sleep(2000);
              return true
            },
            main: function () {
              i === 0 && upDown(2);
              if (clickAdModal()) {
                checkSpecialType();
              } else {
                watchList(300, i);
              };
              return true;
            }
          },
          {
            match: function (n) {
              return isClickFirstSimpleType();
            },
            wait: function () {
              sleep(2000);
              return true
            },
            main: function () {
              if (foundSpecial && lastClickFn) {
                lastClickFn();
              } else {
                var y = Math.min(295 * i + 400, device.height - 130);
                click(500, y);
                lastClickFn = function () {
                  click(500, y);
                }
              }
              foundSpecial = checkSpecialType();
              return true;
            }
          }
        ]

        const target = list.find(l => l.match(title));
        if (target) {
          target.wait();
          if (i === 0 || foundSpecial) {
            if (!target.skipAd && clickAdModal()) {
              hasAdModal = true;
              foundSpecial = checkSpecialType();
            }
          } else if (hasAdModal) {
            closeAdModal();
          }
          return target.main();
        }
        sleep(3000);
        if (isClickFirstSimpleType()) {
          if (foundSpecial && lastClickFn) {
            lastClickFn();
          } else {
            var y = Math.min(295 * i + 500, device.height - 130);
            click(500, y);
            lastClickFn = function () {
              click(500, y);
            }
          }
          foundSpecial = checkSpecialType();
          return true;
        }
        if (isClickFirstTypeWithAd()) {
          closeAdModal();
          if (foundSpecial && lastClickFn) {
            lastClickFn();
          } else {
            var y = Math.min(295 * i + 500, device.height - 130);
            click(500, y);
            lastClickFn = function () {
              click(500, y);
            }
          }
          foundSpecial = checkSpecialType();
          return true;
        }
        if (isClickSecondSimpleType()) {
          closeAdModal();
          if (foundSpecial && lastClickFn) {
            lastClickFn();
          } else {
            var y;
            if (currentPhoneType === PHONE_TYPES.hong9A) {
              y = Math.min(190 * i + 460, device.height - 40);
            } else {
              y = Math.min(295 * i + 680, device.height - 130);
            }
            click(500, y);
            lastClickFn = function () {
              click(500, y);
            }
          }
          foundSpecial = checkSpecialType();
          return true;
        }
        if (titleIncludes('新闻天天看')) {
          upDown(2);
          closeAdModal();
          click(500, 295 * i + 300);
          if (waitTitleChange()) {
            upDown(2);
            var max = 2;
            if (text('下一页').exists() && max--) {
              click('下一页');
              sleep(1500);
              upDown(2);
            }
          }
          return true;
        }
        if (title === '天天看点' || title.indexOf('爱豆免费小说') > -1) {
          closeAdModal();
          click(500, 1300);
          checkSpecialType();
          return true;
        }
        if (titleIncludes('热词') || titleIncludes('实时') || titleIncludes('热榜')) {
          var m = 3;
          while (m--) {
            sleep(800);
            if (setText(0, '天气' + ~~(Math.random() * 10))) {
              break;
            }
          }
          click('搜索', 0)
          checkSpecialType();
          return true;
        }

        i === 0 && upDown(2);
        if (clickAdModal()) {
          var res = checkSpecialType();
          if (!res) {
            return 1;
          }
        } else {
          if (foundSpecial && lastClickFn) {
            lastClickFn();
          } else {
            var y = Math.min(295 * i + 500, device.height - 130);
            click(500, y);
            lastClickFn = function () {
              click(500, y);
            }
          }
          foundSpecial = checkSpecialType();
        }
        return true;

        function watchList(from, times) {
          from = from || 300;
          times = times || 0;
          click(500, Math.min(295 * times + 300, device.height - 130));
          sleep(2000);
          upDown(2);
        }

        function invalidType() {
          return ['今日资讯', '最新资讯'].indexOf(title) > -1;
        }

        function isClickFirstSimpleType() {
          return ['热点新闻', '每日资讯', '快影资讯', '花生有料', '私人厨房'].indexOf(title) > -1 || titleIncludes('wap');
        }

        function isClickFirstTypeWithAd() {
          return ['八卦资讯'].indexOf(title) > -1;
        }

        function isClickSecondSimpleType() {
          return ['标点资讯', '一点生活趣事'].indexOf(title) > -1;
        }

        function titleIncludes(val) {
          return title.indexOf(val) > -1
        }

        myWaitUntil(function () {
          if (text(ad).exists()) {
            type = ad;
            return true
          } else if (textEndsWith(ad6WithEnd).exists()) {
            type = ad6WithEnd;
            return true;
          } else if ([ad2, ad3].indexOf(title) > -1 || text(ad31).exists()) {
            type = ad2;
            return true
          } else if ([ad4, ad41].indexOf(title) > -1) {
            type = ad4;
            return true
          } else if (title === ad5) {
            type = ad5;
            return true
          } else if (idEndsWith(ad8).exists()) {
            type = ad8;
            return true
          }
          return false;
        }, 10);
        toast(type);
        if (title.indexOf(ad9) > -1) {
          closeAdModal();
          if (!tryEnter()) {
            var max = 3;
            if (text('下一页').exists() && max--) {
              click('下一页');
              sleep(1500);
              upDown(2);
            }
          }
          return true;
        } else if (title === '今日资讯') {
          closeBigAdModal();
          sleep(300);
          click(500, 360);
          checkSpecialType();
          return true;
        } else if (type === '第一热词') {
          closeAdModal();
          sleep(300);
          click(500, 360);
          checkSpecialType();
          return true;
        } else if (type === ad2) {
          clickFirst();
          checkSpecialType();
          return true;
        } else if (type === ad4) {
          var tar = text(ad4).findOne(2000);
          if (tar) {
            click(500, tar.bounds().top + 160);
            checkSpecialType();
          } else {
            tryEnter()
          }
          return true;
        } else if (type === ad5) {
          sleep(4000);
          var tar = myWaitUntil('ggg==');
          toast(tar);
          if (tar) {
            click(500, 1000);
            checkSpecialType();
          } else {
            tryEnter()
          }
          return true;
        } else if (type === ad6WithEnd) {
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
          } else {
            tryEnter();
          }
          return true;
        } else if (type === ad7) {
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
          } else {
            tryEnter()
          }
        } else if (type === ad) {
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
            } else {
              tryEnter()
            }
            return true;
          }
        } else {
          closeAdModal();
          tryEnter();
          return true;
        }
      }

      function tryEnter() {
        upDown(2);
        sleep(1000);
        click(500, 900);
        return checkSpecialType();
      }

      function checkSpecialType() {
        var title1
        if (!halfAuto) {
          title1 = waitTitleChange();
          sleep(1300);
          if (!title1) {
            return;
          }
        } else {
          if (isEnd()) {
            return true;
          }
          title1 = getTitle();
        }

        if (otherSouType(title1)) {
          return true;
        } else if (baiDuType(title1)) {
          return true;
        } else if (souGouType(title1)) {
          return true;
        } else if (halfAuto) {
          if (baiDuType(title1)) {
            return true;
          } else if (jingDongType(title1)) {
            return true;
          } else if (addListType(title1)) {
            return true;
          }
        }
        // if (baiDuType(title1)) {
        //   return true;
        // } else if (souGouType(title1)) {
        //   return true;
        // } else if (otherSouType(title1)) {
        //   return true;
        // } else if (addListType(title1)) {
        //   return true;
        // } else if (tongChengType(title1)) {
        //   return true;
        // }
        if (!halfAuto) {
          upDown(2);
        }
      }

      function jingDongType(title) {
        if (title.indexOf('京东热卖') > -1) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          var mm = 8;
          var i = 8;
          while (i--) {
            upDown(2);
            if (mm - i >= maxT && isEnd()) {
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

      function tongChengType(title) {
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

      function addListType(t) {
        var a1 = '商家列表';
        var a2 = '聚合商家推荐';
        var a3 = '为您推荐';
        var a4 = '柠檬爱美'
        var a5 = '聚合商家推荐';
        var ls = [a1, a2, a3, a4, a5];
        if (ls.indexOf(t) > -1) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          var lg = 7;
          if (type === a4) {
            lg = 1;
          }
          var mm = 8;
          var i = 8;
          while (i--) {
            upDown(2);
            if (mm - i >= maxT && isEnd()) {
              break;
            }
            clickFirst();
            sleep(2000);
            back();
            sleep(1200);
          }
          return true;
        }
      }

      function souGouType(title) {
        var a = text('搜索').findOne(1000);
        if (a) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          if (a) {
            var mm = 8;
            var i = 8;
            while (i--) {
              sleep(1200);
              upDown(2);
              if (mm - i >= maxT && isEnd()) {
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
            var mm = 8;
            var i = 8;
            while (i--) {
              sleep(1200);
              upDown(2);
              if (mm - i >= maxT && isEnd()) {
                break;
              }
              click(a.bounds().centerX(), a.bounds().centerY());
            }
          }
          return true;
        }
      }

      function otherSouType(title) {
        var mainT = '相关搜索';
        if (title.indexOf("网页搜索") > -1) {
          if (halfAuto && !shouldRun()) {
            return true;
          }
          var mm = 6;
          var i = 6;
          while (i--) {
            sleep(2000);
            upDown(2);
            swipe(350, 270, 350, 1000, 500);
            sleep(500);
            var hotKeys = ['天气', '温度', 'c++', '王者', '抖音', '开发教程', '水果'];
            if (setText(0, hotKeys[~~(Math.random() * hotKeys.length)] + i)) {
              if (currentPhoneType === PHONE_TYPES.hong9A) {
                click(630, 230);
              } else {
                click(950, 300);
              }
            } else {
              return true;
              myWaitUntil(mainT, 5);
              // var isNear = text('其他人还搜了').exists() && i > 1;
              // var t = isNear ? '其他人还搜了' : mainT;
              var t = mainT;
              scrollIntoView(t, device.height - 300);
              var a = text(t).findOne(1000);
              if (a) {
                click(i % 2 === 0 ? 730 : 300, a.bounds().centerY() + 160);
              } else {
                back();
              }
            }

            if (mm - i >= (maxT || 2) && isEnd()) {
              break;
            }
          }
          return true;
        }
      }

      function isEnd() {
        if (!halfAuto) {
          return false;
        }
        if (endCache && !halfAuto) {
          return true;
        }
        var t = className("TextView").boundsInside(0, zhongKanEndTextBottom - 75, device.width, zhongKanEndTextBottom).findOne(500);
        var text = t && t.text() || '';
        sleep(1000);
        return endCache = (text.indexOf('青豆奖励') > -1 || text.indexOf('任务已完成') > -1);
      }

      function clickFirst() {
        click(500, 500);
      }
      // begin();
      function begin(l, f) {
        function aa1(i, btn) {
          btn.click();
          var bottomText = '';
          if (i > (maxT || 5)) {
            return
          }
          sleep(2000);
          if (maxT === 0) {
            sleep(5000);
            maxT = 5
          }
          sleep(200);
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
          var hasAd = findAd(i);
          if (hasAd === 1) {
            leave();
            return;
          }
          // if (!hasAd) {
          //   changeSite(i);
          //   click(300, 570);
          //   var a = checkSpecialType();
          //   if (!a) {
          //     sleep(3000);
          //     upDown(2);
          //   } else if (!isEnd()) {
          //     back();
          //     sleep(3000);
          //     click(300, 550);
          //     checkSpecialType();
          //   }
          // }
          // var done;
          // if (isEnd()) {
          //   done = true;
          // }
          leave();
          if (text('已完成').find().length !== finishedLg) {
            return;
          }
          // if (done) {
          //   return;
          // }
          return aa1(i + 1, btn)
        }
        var readingTime = 0;

        function beginReading(target) {
          if (!target) {
            return;
          }
          endCache = false;
          finishedLg = text('已完成').find().length;
          aa1(0, target);
          sleep(2000);
          readingTime = readingTime + 1;
          if (readingTime > 48) {
            return;
          }
          return beginReading()
        }
        var ls = text('去完成').find().reverse();
        var lg1 = ls.length;
        while (lg1--) {
          var tar = text('去完成').find()[0];
          if (!tar) {
            break;
          }
          scrollIntoView(function () {
            return tar = text('去完成').find()[0];
          }, device.height - 50)
          var bounds = tar.bounds();
          maxT = 0;
          beginReading({
            click: function () {
              click(bounds.centerX(), bounds.centerY() - 30);
            }
          });
        }
        var ls1 = text('进行中').find();
        var lg2 = ls1.length;
        var mL = lg2;
        while (lg2--) {
          ls1 = text('进行中').find();
          var idx = mL - lg2 - 1;
          console.log(mL - lg2 - 1, mL)
          mL = ls1.length;
          if (!idx < 0) {
            break;
          }
          maxT = 0;
          beginReading({
            click: function () {
              click('进行中', idx);;
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
        swipe(350, 1000, 350, 270, 800);
        sleep(sl || 1000);
        swipe(350, 270, 350, 1000, 800);
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
      var isSpecial = false;
      while (lgAll--) {
        ls = text('去搜索').find();
        clickCenter(ls[lgAll]);
        sleep(5000);
        var max = 4;
        isSpecial = false;
        if (textStartsWith('总计可获得').exists()) {
          isSpecial = true;
          var a = textStartsWith('总计可获得').findOne(1000);
          max = (+parseFloat(a.text().replace('总计可获得', ''))) / 40;
        } else {
          var a = textStartsWith('已奖励').findOne(1000);
          if (a) {
            max = +a.text()[a.text().length - 1]
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
          if (text(max).find().length > 1) {
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
      return doneT > 2;

      function zhongqingSearch(times) {
        function aa(i) {
          var max = times || 4;
          var t = max;
          if (i > max || textContains(t + '/' + t).exists()) {
            return
          }
          sleep(3000);
          var tar = text('热').findOne(2000);
          if (tar) {
            tar.click();
          } else {
            if (isSpecial) {
              click(230, 1220);
            } else {
              click('换一批');
              return aa(i + 1)
            }
          }
          if (isSpecial) {
            sleep(1500);
            back();
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
            upDown(4);
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
      click(500, 720);
      if (done) {
        markDone(reakKey);
      }
      // if (!done) {
      //   saveUnDoneFn(function () {
      //     search();
      //     if (!isAdmin && isDefLaunch) {
      //       search();
      //     }
      //   }, reakKey);
      // } else {
      //   markDone(reakKey);
      // }
    }
  };


  function goToSubTask() {
    var enterT = '看看赚';
    if (myWaitUntil(enterT)) {
      sleep(200);
      clickOneByText(enterT);
      if (myWaitUntil('搜索赚', 30)) {
        sleep(200);
        return true;
      }
    }
  }

  function beforeGoToMain(taskKey) {
    var data = checkZhongQingTwo(taskKey);
    var keyP = data.mark;
    var afterLaunch = data.afterLaunch;
    var runFirst = data.runFirst;
    if (isDone(keyP)) {
      return false;
    }
    var res = startApp(runFirst);
    afterLaunch();
    if (res) {
      sleep(10000);
    }
    sleep(10000);
    back();
    sleep(4000);
    back();
    sleep(4000);
    back();
    sleep(4000);
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

  function startApp(isFirst) {
    if (doubleZhongQing) {
      var idx = isFirst ? 0 : 1
      var site = zhongSiteList[idx]
      launch('中青看点', true, site);
    } else {
      launch('中青看点');
    }
  }

  return {
    search: withCatch(search, function () {
      begin();
      otherRun();
    }),
    kankan0: withCatch(kankan, function () {
      console.log('kankan after error');
      begin();
      otherRun();
    }),
    kankan: withCatch(kankan2, function () {
      console.log('kankan after error');
      begin();
      otherRun();
    }),
    kankan2: withCatch(kankan2, function () {
      console.log('kankan after error');
      begin();
      otherRun();
    }),
    zhuanPan: zhuanPan,
    getMoreReward: getMoreReward,
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
    afterLeavePage: noneFn,
    afterEnterPage: noneFn,
    beforeOneUpDown: noneFn,
    leavePage: function () {
      back();
    },
    canReadTwo: true,
    refresh: defRefresh,
    enterP1: defEnterP1,
    enterP: defEnterP,
    upDownRead: true,
    oneWipeTime: 7,
    nextPage: nextPage,
    oneUpDown: oneUpDown
  }
  option = option ? Object.assign(def, option) : def;
  var oneReadTime = option.oneReadTime;
  var beforeLeavePage = option.beforeLeavePage;
  var afterLeavePage = option.afterLeavePage;
  var leavePage = option.leavePage;
  var readTime = option.readTime;
  var beforeOneUpDown = option.beforeOneUpDown;
  var canReadTwo = option.canReadTwo;
  var afterEnterPage = option.afterEnterPage;
  var refresh = option.refresh;
  var enterP = option.enterP;
  var enterP1 = option.enterP1;
  var upDownRead = option.upDownRead;
  var oneWipeTime = option.oneWipeTime;
  var shouldNext = option.shouldNext;
  var toNextPage = option.nextPage;
  var startUpDown = option.oneUpDown;
  oneReadTime = oneReadTime || 60;
  stopReading = false;

  var pageTime = 0;
  var time;
  var read = (i) => {
    if (Date.now() - time > 1000 * oneReadTime) {
      return;
    }
    i = i || 1;
    if (upDownRead) {
      startUpDown(2500);
    } else {
      twoDown(2500);
    }
    closeNoReact();
    if (i < 50) {
      beforeOneUpDown(i);
      sleep(2000);
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
  var leave = function () {
    leavePage();
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
      afterLeavePage();
    }
    if (shouldNext) {
      var max = 6;
      while (shouldNext(pageTime) && max--) {
        pageTime++;
        inRead();
      }
    } else {
      enterP();
      inRead();
      if (canReadTwo) {
        enterP1();
        inRead();
      }
    }
    refresh();
    pageTime = 0;
    sleep(refreshWait);
    onePageRefreshTime += 1;
    readTime = readTime || 1.3
    if (readTime <= 0) {
      readTime = 2;
    }
    if (Date.now() - start < 1000 * 60 * 60 * readTime && !stopReading) {
      if (onePageRefreshTime > 1) {
        onePageRefreshTime = 0;
        toNextPage(dirRight);
        sleep(refreshWait);
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


function launch(name, useClickOpen, idx) {
  if (launch.lastest === name) {
    return false;
  }
  var lastest = launch.lastest;
  if (lastest) {
    if (!isDefLaunch) {
      launch2('一键优化')
    } else {
      home();
      sleep(1200);
      home();
      sleep(1200);
      if (isAdmin) {
        click(150, 750);
      } else {
        click(927, 947);
      }
    }
  }
  // if (lastest === '火火视频极速版' || lastest === '趣赚清理' | lastest === '趣查天气') {
  //   home();
  // } else if (lastest) {
  //   back();
  //   sleep(100);
  //   back();
  //   sleep(100);
  //   back();
  //   sleep(100);
  //   back();
  // }
  // sleep(isDefLaunch && isAdmin && lastest ? 20000 : 8000);
  sleep(5000);
  if (!isDefLaunch || useClickOpen) {
    if (useClickOpen) {
      if (!isDefLaunch) {
        launch2('一键优化')
      } else {
        home();
        sleep(1200);
        home();
        sleep(1200);
        if (isAdmin) {
          click(150, 750);
        } else {
          click(927, 947);
        }
      }
      sleep(3000);
    }
    launch2(name, idx);

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
  sleep(sl || 1000);
}

function twoDown(sl) {
  swipe(350, 770, 350, 270, 400);
  sleep(sl || 1000);
  swipe(350, 770, 350, 270, 400);
  sleep(sl || 1000)
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
  const maxWidth = device.width;
  if (right) {
    swipe(maxWidth - 80, 900, 50, 900, 800);
  } else {
    swipe(50, 900, maxWidth - 80, 900, 800);
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

function launch2(name, idx) {
  idx = idx || 0
  home();
  sleep(2000);
  home();
  sleep(2000);

  if (typeof idx === 'object') {
    click(idx[0], idx[1]);
    return;
  }

  var ls = text(name).find();
  var realIdx = ls.length > idx ? idx : 0
  var tar = ls[realIdx];
  var max = 16;
  while (!tar || tar.bounds().left < 8 || tar.bounds().left > 900) {
    if (max < 1) {
      launchApp(name);
      var hasTwo = myWaitUntil('请选择要使用的应用', 10);
      if (hasTwo) {
        click(idx === 0 ? 300 : 750, 1520);
      }
      return
    }
    swipe(950, 600, 50, 600, 400);
    sleep(2500);
    ls = text(name).find();
    realIdx = ls.length > idx ? idx : 0
    tar = ls[realIdx];
    toast(realIdx)
    max--
  }
  var bounds = tar.bounds();
  var y = bounds.top - 100
  click(bounds.left + 60, y);
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
        var res = beforeOneBegin(i + 1, passTime);
        if (res === false) {
          return
        }
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
        var res = beforeOneBegin(i + 1, passTime);
        if (res === false) {
          return
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
  var hasCancel = false;
  var hasSwipe = false;
  while (notEnd()) {
    sleep(2000);
    if (text('关闭').exists()) {
      click('关闭');
      sleep(1500);
    }
    if (tryT < 8) {
      if (!hasCancel) {
        hasCancel = clickIdCenter('iv_cancel');
      }
      if (!hasSwipe) {
        if (textEndsWith('领取奖励').exists()) {
          oneUpDown();
          hasSwipe = true;
        }
      }
    }
    var res = runVideoCheck(tryT * 2);
    if (res) {
      isOutBreak = true;
      break;
    }
    if (tryT > watchAdMaxWaitTime) {
      videoLeftClose();
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
        videoRightClose();
        break;
      }
    }
    tryT = tryT + 1;
  }
  if (tryT <= watchAdMaxWaitTime && !isOutBreak) {
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

function removeVideoCheckListener(fn) {
  videoCheckLs = videoCheckLs.filter(function (c) {
    return c !== fn
  })
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
  click(985, is10X ? 160 : 112);
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
  if (isDone(key)) {
    return false
  }
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

function getKanKanStorage() {
  return storages.create("kankan");
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
  if (unDoneFnForSave.length === 0) {
    return false
  }
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
  return true
}


function closeMiModal() {
  if (textContains('是否允许').exists()) {
    back();
    sleep(1000);
    return true
  }
}

function clickIdCenter(myId) {
  if (!id(myId).exists()) {
    return;
  }
  var a = id(myId).findOne(2000);
  if (a) {
    if (a.clickable()) {
      a.click();
    } else {
      var b = a.bounds();
      click(b.centerX(), b.centerY())
    }
    sleep(100);
    return true;
  }
}

function clickCenter(a) {
  if (typeof a === 'function') {
    a = a();
  }
  if (a) {
    if (a.clickable()) {
      a.click();
    } else {
      var b = a.bounds();
      click(b.centerX(), b.centerY())
    }
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

function wakeUpDevice() {
  if (!isScreenOn()) {
    device.wakeUp();
    console.log('wakeup')
    sleep(800);
    swipe(500, 1500, 500, 900, 202);
    sleep(2000)
  }
}

function isScreenOn() {
  return device.isScreenOn();
}

function clickVideoCloseIcon() {
  if (id('tt_video_ad_close').exists()) {
    sleep(800);
    if (!clickIdCenter('tt_video_ad_close')) {
      videoRightClose();
    }
    sleep(1200);
    if (text('继续试玩').exists()) {
      click('继续试玩');
      sleep(800);
      oneUpDown();
      sleep(1800)
      if (!clickIdCenter('tt_video_ad_close')) {
        videoRightClose();
      }
    }
    return true;
  };
  if (id('tt_video_ad_close_layout').exists()) {
    sleep(800);
    if (!clickIdCenter('tt_video_ad_close_layout')) {
      videoRightClose();
    }
    sleep(1200);
    if (text('继续试玩').exists()) {
      click('继续试玩');
      sleep(800);
      oneUpDown();
      sleep(1800)
      if (!clickIdCenter('tt_video_ad_close_layout')) {
        videoRightClose();
      }
    }
    return true;
  };
}

function getWidthInsideList(ls, p) {
  var option = p || {};
  var bottom = option.bottom || zhongContentBottom;
  var top = option.top || zhongContentTop;
  return ls.filter(function (e) {
    const bs = e.bounds();
    var r = bs.right
    return r < device.width - 2 && r > 0 && bs.top > top && bs.bottom < bottom;
  }).sort(function (a, b) {
    return a.bounds().top - b.bounds().top;
  })
}

function initMarkReading(p) {
  var option = p || {};
  var mark = option.mark;
  var fallBack = option.fallBack;
  var time = option.startAt || 0;
  var bottom = option.bottom || zhongContentBottom;
  var top = option.top || zhongContentTop;

  var refreshed = true;
  var currentList = null;
  var failTime = 0;

  function refresh() {
    refreshed = true;
    var ls = currentList || [];
    var idx = ls.length > time ? time : ls.length - 1;
    var endOne = ls[idx];
    if (endOne) {
      scrollIntoView(function () {
        return endOne;
      }, zhongContentTop, 4);
    } else {
      back();
      sleep(4000);
      twoDown();
      twoDown();
    }
    currentList = null;
    time = 0;
    failTime = 0;
  }

  function reset() {
    currentList = null;
    time = 0;
    failTime = 0;
    refreshed = true;
  }

  function enterNext() {
    if (!refreshed) {
      time++;
    }
    refreshed = false;
    myWaitUntil(function () {
      return typeof mark === 'function' ? mark() : textEndsWith(mark).exists();
    });
    currentList = currentList || getList() || [];
    sleep(800);
    if (failTime > 2) {
      runFallBack(time);
      refresh();
      return;
    }
    var ls = currentList;
    toast(ls.length);
    if (!ls || ls.length < time + 1) {
      failTime++;
      refresh();
      runFallBack(time);
      return;
    }
    failTime = 0;
    if (ls.length > 0) {
      // var txt = ls[time].text();
      // var res = scrollIntoView(function () {
      //   return text(txt).findOne(1000);
      // }, device.height - 320, 6, 4);
      // if (res) {
      //   clickIntoPage(text(txt).findOne(1000) || ls[time])
      //   return txt;
      // } else {
      //   runFallBack(time);
      //   refresh();
      // }
      clickIntoPage(ls[time])
      return function () {
        clickIntoPage(ls[time])
      };
    } else {
      runFallBack(time);
      refresh();
    }
  }

  function clickIntoPage(target) {
    if (target && target.bounds) {
      var b = target.bounds()
      var x = 500;
      var y = Math.min(b.top, zhongContentBottom - 5);
      click(x, y)
    } else {
      runFallBack()
    }
  }

  function getList() {
    return typeof mark === 'function' ? getWidthInsideList(mark(), {
      bottom: bottom,
      top: top
    }) : getWidthInsideList(textEndsWith(mark).find(), {
      bottom: bottom,
      top: top
    })
  }

  function runFallBack(i) {
    if (fallBack) {
      fallBack(i)
    }
  }

  function getListLength() {
    return (currentList || []).length;
  }

  function updateList() {
    currentList = getList() || [];
  }

  return {
    enterNext: enterNext,
    refresh: refresh,
    clickIntoPage: clickIntoPage,
    getListLength: getListLength,
    reset: reset,
    getList: getList,
    updateList: updateList
  }
}