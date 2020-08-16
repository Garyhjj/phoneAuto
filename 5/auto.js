var isDefLaunch = true;
var isAdmin = false;

var videoCheckLs = [];
var useStorage = true;

var quTouTiaoId1 = isDefLaunch ? 'avi' : 'aw_';
var quTouTiaoId2 = isDefLaunch ? 'uu' : 'v4'; // 'a68' : 'a5x';
var caidanReadingT = isDefLaunch ? 60 : 33;
var kReadingT = isDefLaunch ? 1000 : 1000;
var zhongVideoT = isDefLaunch ? 0 : 0;
var easyVideoT = 5;
var noVideoFirst = false;
var stopReading = false;
var isQuLingShengVideo3 = false;
var tiantianCanLittle = false;
var unDoneFnForSave = [];
var unDoneFnKeyForSave = [];
var unDoneFnForRun = [];

if (!isAdmin && isDefLaunch) {
  quTouTiaoId1 = 'awx';
  quTouTiaoId2 = 'v7';
}
removeUselessStorage();
initVideoCheckListener();
sleep(5000);
useStorage = false;

// kuaiYinLiuLan();
// zhongQingZhuanPan();
// quTouTiaoWaBao();
// quTouTiaoQiu();
// kuai7Chengjiu();
// caidanOthers();
// zhongQingLongVideo(100);
// quTouTiaoLaoHuji();
// sleep(1000 * 10000);
// kuai7LeftGames();
// kuai7LiuLan(60);
// kuai7GuaKa();
// kuai7Chengjiu();
// kuai7RightGames();
// kuai7RightGames2();
// sleep(1000 * 10000);

// tianTianLeftGame();
// tianTianGuaFen();
// tianTianRightGame();
// tiantianLittle();

// tianTianBaoXiang();
// tiantianChengJiu();
// quTouTiaoLaoHuji();
// storages.remove(this.getStorageKey());
// sleep(1000 * 10000);

// quTouTiaoGuaFen();
// quTouTiaoXiaoShuo();
// getStorage().remove('huohuo');
// getStorage().remove('huohuo__During');
// toast(getStorage().get('huohuo__During'))
// huohuo(30);
// huohuoHongBao();
// huohuoOthers();
// huohuoChengjiu();
// sleep(1000 * 10000);

// quLingSheng();
// qulingBaoXiang();
// resetLaunch();
// qulingShengPai();
// resetLaunch();
// qulingShengChengjiu();
// resetLaunch();
// qulingXiaoShuo();
// sleep(1000 * 10000);

// xiangKanJob();
// douYin();
// easyVideo();
// zhongQingSearch();
// zhongQingSearch();

// xiangKanVideo();
// zhongQingVideoKa();
// noVideoFirst = false;
// tiantianCanLittle = true;
// tianTian(1);
// quTouTiaoR();
// quLingSheng();
// caidanDown();
// quKankan();
// xiangKanVideo();
// easyVideo();
// kReading();
// zhongVideoT = 0;
// zhongJob(45);
// zhongQingLongVideo(100);
// shuaBao();
// zhongQingZhuanPan();
// sleep(1000 * 10000);
useStorage = true;

home();
begin();

if (isAdmin) {
  douYin(25);
} else {
  kuai7GuaKa();
}

huohuo(30);
huohuoOthers();

huohuo(40);
huohuoHongBao();
huohuoOthers();
huohuoChengjiu();

if (!isAdmin) {
  kuai7LeftGames();
  kuai7LiuLan(60);
  kuai7GuaKa();
  kuai7Chengjiu();
  kuai7RightGames();
  kuai7RightGames2();
}

if (new Date().getDay() === 5) {
  xiangKanJob(0.8);
}

if (!isAdmin) {
  shuaBao();
}

zhongVideoT = 0;
zhongJob(0.5);
zhongQingLongVideo(25);
if (isDefLaunch) {
  zhongQingSearch();
  if (!isAdmin) {
    zhongQingSearch();
    kuaiYinLiuLan();
  }
}

runUnDoneFn();

// qulingShengPai();

quLingSheng(19);

if (!isAdmin) {
  shuaBao();
}


zhongQingLongVideo();

xiangKanVideo();

zhongJob(45);
runUnDoneFn();
zhongQingLongVideo(100);
kReading();
runUnDoneFn();

if (!isDefLaunch) {
  zhongQingSearch();
}

runUnDoneFn();
runUnDoneFn();
quLingSheng();
kuai7GuaKa();
runUnDoneFn();

home();

console.log(new Date().toString())
function begin() {
  sleep(2000)

  if (isDefLaunch) {
    //  tianTian();

    // quLingSheng();
    if (isAdmin) {
      // caidanDown();
    }

    xiangKanJob(0.6);

    zhongJob(0.48);
    // tianTian();

    xiangKanJob(0.6);

    if (!isAdmin) {
      quTouTiaoR();
      zhongQingZhuanPan();
    }

  } else {
    // tianTian();

    // quLingSheng();
    runAndMarkByDuring(function (r) {
      lauchDuoFu();
      duofuReading(r);
    }, 'duoFuReading', 0.1, 0.1);


    xiangKanJob(0.6);

    zhongJob(0.5);

    // caidanDown();
    // tianTian();

    xiangKanJob(0.6);
    zhongQingZhuanPan();

  }
}

function initVideoCheckListener() {
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

function tiantianChengJiu() {
  goToD();

  var all = findAll();
  var lg = all.length;
  while (lg--) {
    sleep(1500);
    click('0金币', 0);
    quTouTiaoWatch();
    var res = myWaitUntil('恭喜获得');
    if (res) {
      sleep(4500);
      back();
    } else {
      sleep(7000);
      back();
    }
  }
  sleep(2000);
  back();

  function findAll() {
    return textContains('0金币').find().filter(function (res) {
      return res.bounds().top < 1900
    });
  }

  function goToD() {
    launchTianTian();
    clickOneByText('我的');
    sleep(3000);
    var i = 8;
    while (i) {
      var c = id('iv_close').findOne(500);
      if (c) {
        c.click();
      }
      sleep(2000);
      if (text('我的钱包').exists()) {
        break;
      }
      i = i - 1;
    }
    sleep(3000);
    clickOneByText('成就勋章');
    sleep(8000);
  }
}


function tianTianRightGame() {
  var keyP = 'tianTianRightGame';
  if (isDone(keyP)) {
    return;
  }
  goToD();
  // quTouTiaoWaBaoAuto('领金币', true);
  var a1 = runAndMark(function () {
    return quTouTiaoNiuDanAuto('集红包');
  }, keyP + 'NiuDan');

  var a2 = runAndMark(function () {
    myWaitUntil('金币余额');
    sleep(1500);
    click('金币余额', 0);
    myWaitUntil('立即提现');
    sleep(2500);
    return quTouTiaoNiuDanAuto(function () {
      click(910, 1500);
      return true;
    });
  }, keyP + 'NiuDan2');

  if (a1 && a2) {
    markDone(keyP);
  }
  sleep(1000);
  if (text('立即提现').exists()) {
    back();
  }

  function goToD() {
    launchTianTian();
    clickOneByText('我的');
    sleep(3000);
    var i = 8;
    while (i) {
      var c = id('iv_close').findOne(500);
      if (c) {
        c.click();
      }
      sleep(2000);
      if (text('我的钱包').exists()) {
        break;
      }
      i = i - 1;
    }
    sleep(10000);
  }
}

function tianTianBaoXiang() {
  goToD();
  quTouTiaoBaoXiangAuto('拿福利');

  function goToD() {
    launchTianTian();
    clickOneByText('任务');
    var i = 8;
    while (i) {
      sleep(2000);
      if (text('我的金币').exists()) {
        break;
      }
      i = i - 1;
    }
    sleep(10000);
  }
}

function qulingBaoXiang() {
  var keyP = 'qulingBaoXiang';
  if (isDone(keyP)) {
    return;
  }
  goToD();
  var a1 = runAndMark(function () {
    return quTouTiaoQiuWithEnter('天天乐');
  }, keyP + 'ttL');
  if (!a1) {
    sleep(2000);
    var a2 = runAndMark(function () {
      return quTouTiaoQiuWithEnter('天天乐');
    }, keyP + 'ttL');
    if (a2) {
      markDone(keyP);
    }
  } else {
    markDone(keyP);
  }

  // quTouTiaoBaoXiangAuto('天降宝箱');

  function goToD() {
    launchQuling();
    if (!textContains('天降宝箱').exists()) {
      var res = clickOneByText('任务');
      if (!res) {
        return;
      }
    }
    sleep(3000);
    var i = 8;
    while (i) {
      sleep(2000);
      click('放弃奖励');
      if (text('天降宝箱').exists()) {
        break;
      }
      i = i - 1;
    }
    sleep(10000);
  }
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

function tiantianLittle() {
  launchTianTian();
  clickOneByText('首页');
  myWaitUntil('热门活动');
  var idTop = 'tv_top_task';
  var idSmall = 'tv_red_desc';
  var idSmall2 = 'tv_coin_size';
  var textMiddle = '看视频领金币';
  var noTextMiddle = '明日再来';
  // idTopGo();
  idSmallGo();
  idSmall2Go();
  middleGo();

  function idTopGo() {
    if (!tiantianLittle.noIdTop) {
      var a = id(idTop).findOne(200);
      if (!a) {
        tiantianLittle.noIdTop = true;
        return;
      }
      if (a && a.text().indexOf('金币') > -1) {
        click(a.bounds().left + 5, a.bounds().top + 5);
        sleep(2000);
        if (textContains('热门活动').exists()) {
          return;
        }
        quTouTiaoWatch();
        click(300, 5);
        back();
        sleep(2000);
      }
    }
  }

  function idSmallGo() {
    var noVideoSmall = null;
    var aL = id(idSmall).find().filter(function (s) {
      var txt = s.text();
      if (txt.indexOf('找到一个红包') > 0) {
        noVideoSmall = s;
      }
      return txt.indexOf('金币') > -1 && txt.indexOf('瓜分金币') < 0
    });
    var lg = aL.length;
    while (lg--) {
      var a = aL[lg];
      click(a.bounds().left + 5, a.bounds().top - 5);
      sleep(6000);
      if (textContains('热门活动').exists()) {
        continue;
      }
      quTouTiaoWatch();
      click(300, 5);
      sleep(3000);
      if (textContains('看视频再领').exists()) {
        click('看视频再领');
        quTouTiaoWatch();
      }
      back();
      sleep(2000);
    }
    if (noVideoSmall) {
      click(noVideoSmall.bounds().left + 5, noVideoSmall.bounds().top - 5);
      sleep(2000);
      back();
      sleep(2000);
    }
  }

  function idSmall2Go() {
    var aL = id(idSmall2).find().filter(function (s) {
      var tx = s.text();
      return +tx > 0 && s.bounds().left < 450;
    });
    var lg = aL.length;
    while (lg--) {
      var a = aL[lg];
      click(a.bounds().left + 5, a.bounds().top + 5);
      sleep(2000);
      back();
      sleep(2000);
    }
  }

  function middleGo() {
    if (!tiantianLittle.noMiddle && (!tiantianLittle.lastMiddle ||
        Date.now() - tiantianLittle.lastMiddle > 1000 * 60 * 5.1)) {
      tiantianLittle.lastMiddle = Date.now();
      clickOneByText('任务');
      myWaitUntil('每日任务');
      var ls = text(textMiddle).find();
      var lg = ls.length;
      while (lg--) {
        // clickOneByText(textMiddle);
        var t = ls[lg];
        click(t.bounds().left + 5, t.bounds().top + 2);
        sleep(3000);
        if (textContains('每日任务').exists()) {
          continue;
        }
        quTouTiaoWatch();
        click(300, 5);
        sleep(500);
      }
      var ls2 = text(noTextMiddle).find();
      if (ls2.length > 2) {
        tiantianLittle.noMiddle = true;
      }
    }

  }

}

function tianTianLeftGame() {
  var keyP = 'tianTianLeftGame'
  var hasGo = false;
  if (isDone(keyP)) {
    return;
  }
  goToD();
  hasGo = true;
  var isFirst = true;
  var a = text('热门活动').findOne(200);
  toast(!!a)
  if (!a) {
    return;
  }
  var a1 = runAndMark(function () {
    return quTouTiaoAdGame({
      enter: function () {
        click(500, a.bounds().top + 350);
        if (isFirst) {
          sleep(2000);
          isFirst = false;
        }
        return true;
      },
      signalText: '还剩',
      runOneGame: function (t) {
        click('看视频抽大奖');
        if (t !== 8) {
          quTouTiaoWatch();
        }
        sleep(4000);
        closeHuoHuoModal();
        return true;
      },
      testTryT: function (n) {
        return textContains(n + ' 次机会').exists();
      }
    });
  }, keyP + 'shouji');

  var a2 = runAndMark(function () {
    click(550, a.bounds().top + 150);
    return quTouTiaoLaoHuji();
  }, keyP + 'laoHuJi');
  if (hasGo) {
    swipe(350, 570, 350, 1570, 400);
    sleep(500);
  }

  if (a1 && a2) {
    markDone(keyP);
  }

  function goToD() {
    launchTianTian();
    sleep(1000);
    clickOneByText('首页');
    myWaitUntil('热门活动');
    scrollIntoView('热门活动', 1100);
    sleep(2000);
  }
}

function tianTianGuaFen() {
  var keyP = 'tiantainMiddle';
  if (isDone(keyP)) {
    return;
  }
  goToD();
  var a1 = runAndMark(function () {
    return quTouTiaoGuaFen();
  }, keyP + 'guaFen')
  sleep(2000);
  if (!text('我的金币').exists()) {
    sleep(2000);
    back();
    sleep(2000);
    back();
    sleep(2000);
  }
  var a2 = runAndMark(function () {
    return quTouTiaoQiuWithEnter('天天乐');
  }, keyP + 'le')

  if (a1 && a2) {
    markDone(keyP);
  }

  function goToD() {
    launchTianTian();
    clickOneByText('任务');
    sleep(3000);
    var i = 16;
    while (i) {
      sleep(2000);
      click('放弃奖励');
      if (text('我的金币').exists()) {
        break;
      }
      i = i - 1;
    }
    sleep(5000);
    click(880, 200);
    sleep(8000);
  }
}

function launchTianTian() {
  var res = launch('每日爱清理');
  if (res) {
    sleep(3000);
    if (isAdmin) {
      click('停止扫描');
    }
    sleep(3000);
    if (isAdmin) {
      click('停止扫描');
    }
    sleep(3000);
    if (isAdmin) {
      click('停止扫描');
    }
    sleep(5000);
    if (isAdmin) {
      click('停止扫描');
    }
    sleep(3000);
    click('以后更新');
    sleep(3000);
    click('暂不领取');
  }
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

function qulingXiaoShuo() {
  goToD();
  quTouTiaoXiaoShuo(1);

  function goToD() {
    launchQuling();
    var a = text('我的').findOne(1500);
    if (!a) {
      return;
    }
    click(a.bounds().left + 10, a.bounds().top - 10);
    var i = 8;
    while (i) {
      sleep(2000);
      if (text('看书赚钱').exists()) {
        break;
      }
      i = i - 1;
    }
    sleep(5000);
    click('看书赚钱');
    sleep(10000);
    click(500, 1700);
    sleep(5000);
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

function qulingShengPai() {
  var keyP = 'qulingShengPai';
  var ls = [
    [150, 1400],
    [850, 1400],
    [320, 1610],
    [710, 1610]
  ];
  var tar = 0;
  var failT = 0;
  var a = runAndMark(function () {
    goToD();
    var res = begin();
    toast(res);
    if (res) {
      back();
    } else {
      click('放弃奖励');
    }
    if (textContains('点击花色进行').exists()) {
      back();
    }
    return res;
  }, keyP);
  if (!a) {
    saveUnDoneFn(qulingShengPai, keyP);
  }

  function begin(i) {
    i = i || 0;
    if (textContains('观看视频').exists()) {
      failT = 0;
      click('观看视频');
      var res = myWaitUntil('达到今日上限', 2);
      if (res) {
        return true;
      }
      quTouTiaoWatch();
      sleep(2000);
      i = 0;
    } else if (textContains('立即开奖').exists()) {
      if (textContains('很遗憾').exists()) {
        failT = failT + 1;
        if (failT > 2) {
          failT = 0;
          myWaitUntil(function () {
            return !textContains('很遗憾').exists();
          })
          var tarIdx = ~~(Math.random() * 4);
          tar = ls[tarIdx];
        }
      } else {
        var tarIdx = ~~(Math.random() * 4);
        tar = ls[tarIdx];
      }
      if (tar) {
        click(tar[0], tar[1]);
        sleep(150);
      }
      i = i + 1;
      click('立即开奖');
      sleep(2000);
    } else {
      return;
    }
    if (i > 5) {
      back();
      sleep(2000);
      clickOneByText('谁是扑克王');
      sleep(3000);
      click(150, 1400);
    }
    sleep(1500);
    begin(i);
  }

  function goToD() {
    launchQuling();
    var a = text('任务').findOne(1500);
    if (!a) {
      return;
    }
    click(a.bounds().left + 10, a.bounds().top - 10);
    var i = 8;
    while (i) {
      sleep(2000);
      if (text('日常任务').exists()) {
        break;
      }
      i = i - 1;
    }
    sleep(5000);
    var b = text('谁是扑克王').findOne(1500);
    if (!b) {
      b = text('玩游戏').findOne(1500);
      click('玩游戏', 1);
      if (!b) {
        return;
      }
    } else {
      click(b.bounds().left + 20, b.bounds().top - 30);
    }
    sleep(7000);
    // click(850, 1400);
    click(150, 1400);
    sleep(2000);
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

function qulingShengChengjiu() {
  var keyP = 'qulingShengChengjiu';
  if (isDone(keyP)) {
    return;
  }
  goToD();
  var a1 = runAndMark(function () {
    return quTouTiaoWaBaoAuto('赚金币');
  }, keyP + 'WaBao');
  var a2 = runAndMark(function () {
    return quTouTiaoNiuDanAuto('拿福利');
  }, keyP + 'NiuDan');
  sleep(2000);
  // quTouTiaoJiaWaWaAuto(function() {
  //   click(550, 1080);
  //   sleep(1500);
  //   return true;
  // });

  // var can3 = clickOneByText('勋章殿堂');
  // if (can3) {
  //   sleep(8000);
  //   if (text('可领取').exists()) {
  //     click('可领取', 0);
  //     quTouTiaoWatch();
  //     sleep(3000);
  //     while (textContains('快速领取下一个').exists()) {
  //       textContains('快速领取下一个').findOne(1000).click();
  //       quTouTiaoWatch();
  //       sleep(3000);
  //       click('取消');
  //     }
  //   }
  // }

  if (a1 && a2) {
    markDone(keyP);
  }

  function goToD() {
    launchQuling();
    var a = text('我的').findOne(1500);
    if (!a) {
      return;
    }
    click(a.bounds().left + 10, a.bounds().top - 10);
    var i = 8;
    while (i) {
      sleep(2000);
      if (text('勋章殿堂').exists()) {
        break;
      }
      i = i - 1;
    }
    sleep(5000);
  }
}

function launchQuling() {
  var res = launch('趣铃声');
  if (res) {
    resetLaunch();
    sleep(20000);
    click('以后更新');
  }

  clickOneByText('放弃金币');
  sleep(2000);
  var c = id('iv_close').findOne(2000);
  if (c) {
    c.click();
  }
  clickOneByText('放弃金币');
  sleep(2000);
  var c = id('iv_close').findOne(2000);
  if (c) {
    c.click();
  }
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

function huohuoOthers() {
  var keyP = 'huohuoOthers'
  if (isDone(keyP)) {
    return;
  }
  goToD();
  var a3 = runAndMark(function () {
    return quTouTiaoAdGame({
      enter: function () {
        click(100, 150);
        sleep(1000);
        return true;
      },
      signalText: '还剩下',
      runOneGame: function (t) {
        click(520, 856);
        if (t !== 7) {
          quTouTiaoWatch();
        }
        sleep(4000);
        closeHuoHuoModal();
        return true;
      },
      testTryT: function (n) {
        return textContains(n + '次机会').exists();
      }
    });
  }, keyP + 'guaFen');
  // var a4 = runAndMark(function () {
  //   sleep(2000);
  //   click(500, 300);
  //   myWaitUntil('提现记录');
  //   var res = quTouTiaoBaoXiangAuto(function () {
  //     var tar = id('a0u').findOne(1000);
  //     if (tar) {
  //       tar.click();
  //       return true;
  //     }
  //   });
  //   if (textContains('提现记录').exists()) {
  //     back();
  //   }
  //   return res;
  // }, keyP + 'baoXiang');
  // var a1 = runAndMark(function () {
  //   scrollIntoView('日常任务', 600);
  //   sleep(2000);
  //   return quTouTiaoQiuWithEnter('天天乐');
  // }, keyP + 'Qiu');
  // var a2 = runAndMark(function () {
  //   sleep(3000);
  //   scrollIntoView('日常任务', 600);
  //   return quTouTiaoAdGame({
  //     enter: function () {
  //       click('天天抽');
  //       sleep(2000);
  //       return true;
  //     },
  //     signalText: '今日还剩',
  //     runOneGame: function (t) {
  //       if (t > 5) {
  //         return true;
  //       }
  //       click(500, 1640);
  //       if (t !== 5) {
  //         quTouTiaoWatch();
  //       }
  //       return true;
  //     },
  //     testTryT: function (n) {
  //       return textContains(n + '次机会').exists();
  //     }
  //   });
  // }, keyP + 'Taintain')



  if (a3) {
    markDone(keyP);
  }

  function goToD() {
    launch('火火视频极速版');
    sleep(15000);
    closeBackStopModal();
    goToHuoHuoTask();
    var i = 8;
    while (i) {
      sleep(1000);
      closeHuoHuoModal();
      if (text('日常任务').exists()) {
        break;
      }
      if (huohuoHongBaoModalExists()) {
        break
      }
      i = i - 1;
    }
    sleep(5000);
    closeHuoHuoModal();
    closeHuoHuoHongBaoModal();
    closeHuoHuoModal();
    closeBackStopModal();
    sleep(8000);
  }
}

function huohuoHongBao() {
  var keyPrefix = 'huohuoHongBao';
  goToD();
  // runAndMark(function () {
  //   return quTouTiaoJiaWaWaAuto('领奖品');
  // }, keyPrefix + 'JiaWaWa');
  // sleep(2000);
  // runAndMark(function () {
  //   return quTouTiaoWaBaoAuto('赚金币', true);
  // }, keyPrefix + 'WaBao');
  // sleep(2000);
  // runAndMark(function () {
  //   return quTouTiaoNiuDanAuto('抢福利', 8);
  // }, keyPrefix + 'WaBao');
  // sleep(2000);

  begin();

  function begin() {
    while (text('领红包').exists()) {
      var a = text('领红包').findOne(1000);
      click(a.bounds().left + 10, a.bounds().top - 30);
      sleep(3000);
      if (text('看视频红包').exists()) {
        click(550, 1230);
        quTouTiaoWatch();
        sleep(3000);
        closeHuoHuoModal();
      }
      return begin();
    }
    runAndMark(function () {
      if (id('abc').exists()) {
        id('abc').findOne(2000).click();
        quTouTiaoWatch();
        sleep(3000);
        closeHuoHuoModal();
        return true;
      }
    }, keyPrefix + 'hour' + new Date().getHours())
  }

  function goToD() {
    launch('火火视频极速版');
    sleep(15000);
    closeBackStopModal();
    goToHuoHuoTask();
    var i = 8;
    while (i) {
      sleep(1000);
      closeHuoHuoModal();
      if (text('日常任务').exists()) {
        break;
      }
      if (huohuoHongBaoModalExists()) {
        break
      }
      i = i - 1;
    }
    sleep(5000);
    closeHuoHuoModal();
    closeHuoHuoHongBaoModal();
    closeHuoHuoModal();
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

function huohuoChengjiu() {
  runAndMark(function () {
    goToD();
    var ls = text('可领取').find();
    begin(ls.length);
    sleep(2000);
    back();
  }, 'huohuoChengjiu');

  function begin(all) {
    while (text('可领取').exists() && all--) {
      click('可领取', 0);
      sleep(2000);
      if (text('确认').exists()) {
        click('确认');
        sleep(2000);
        click('可领取', 0);
      }
      quTouTiaoWatch();
      sleep(8000);
      closeHuoHuoModal();
    }
    var ls = textContains('+0金币').find();
    return ls.length > 10;
  }

  function goToD() {
    launch('火火视频极速版');
    sleep(15000);
    closeBackStopModal();
    goToHuoHuoTask();
    var i = 8;
    while (i) {
      sleep(1000);
      closeHuoHuoModal();
      if (text('日常任务').exists()) {
        break;
      }
      if (huohuoHongBaoModalExists()) {
        break
      }
      i = i - 1;
    }
    sleep(5000);
    closeHuoHuoModal();
    closeHuoHuoHongBaoModal();
    closeHuoHuoModal();
    scrollIntoView('日常任务', 600);
    var a = text('勋章殿堂').findOne(1500);
    if (!a) {
      return;
    }
    click('勋章殿堂');
    sleep(8000);
  }
}

function huohuo(t) {
  runAndMarkByDuring(function (realT, addInFn) {
    toast(realT)
    launch('火火视频极速版');
    sleep(10000);
    closeBackStopModal();
    var i = 8;
    var a;
    while (i) {
      sleep(800);
      if (text('小视频').exists()) {
        break;
      }
      i = i - 1;
    }
    click(500, 1825);
    sleep(4000);
    click(320, 500);
    sleep(2000);
    var getOnePassTime = initGetLittleDuringTime();
    quTouTiaoVideo({
      readTime: realT || 40,
      beforeOneBegin: function (i, passTime) {
        if (textContains('金蛋大奖').exists()) {
          var tar = textContains('金蛋大奖').findOne(1000);
          click(tar.bounds().left + 15, tar.bounds().top - 15);
          sleep(2000);
        }
        if (!text('首页').exists()) {
          sleep(500);
          back();
        }
        if (textContains('立即领取').exists()) {
          click('立即领取');
          sleep(2000);
          back();
        }
        closeHuoHuoModal();
        addInFn(getOnePassTime(passTime, 0.1));
      },
      hasVideoText: '看视频再送',
      oneReadTime: function () {
        return 6 + ~~(Math.random() * 5);
      },
      afterVideo: function () {
        var res = myWaitUntil('您又赚了', 6);
        if (res) {
          sleep(1500);
          var a = textContains('您又赚了').findOne(2000);
          if (a) {
            950.500
            var top = a.bounds().top;
            click(950, top - 86);
          }
        } else {
          closeHuoHuoModal();
        }
      }
    });
  }, 'huohuo', 75, t || 40);
}

function closeHuoHuoModal() {
  // var id3 = 'jw';
  var id3 = 'kj';
  var id4 = 'ki';
  if (id(id3).exists()) {
    id(id3).findOne(200).click();
  } else if (id(id4).exists()) {
    id(id4).findOne(200).click();
  }
  var id5 = 'go';
  if (id(id5).exists()) {
    id(id5).findOne(200).click();
  }
  sleep(1500);
}

function closeHuoHuoHongBaoModal() {
  if (huohuoHongBaoModalExists()) {
    click(890, 500);
    sleep(2000);
  }
}

function huohuoHongBaoModalExists() {
  return text('看视频红包').exists();
}

function goToHuoHuoTask() {
  var a = text('任务').findOne(1500);
  if (!a) {
    a = text('领取红包').findOne(1500);
  }
  if (a) {
    click(a.bounds().left + 10, a.bounds().top - 10);
  } else {
    click(920, 1850);
  }
}

function closeBackStopModal() {
  if (id('gi').exists()) {
    id('gi').findOne(200).click();
    sleep(800);
  }
  click('不再提醒');
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
          back();
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
  }, 'shuaBao', 70, 60);
}

function kuai7Chengjiu() {
  goToD();
  myWaitUntil('成就殿堂');
  click('成就殿堂');
  myWaitUntil('已领取金币');
  if (text('领取').exists()) {
    click('领取');
    quTouTiaoWatch();
    var t = 15;
    while (myWaitUntil('继续领取') && t--) {
      click('继续领取');
      quTouTiaoWatch();
    }
  }
  back();

  function goToD() {
    launchKuai7();
    myWaitUntil('我的', 15);
    sleep(2000);
    clickOneByText('我的');
    sleep(3000);
  }
}

function kuai7RightGames2() {
  var keyP = 'kuai7RightGames2';
  if (isDone(keyP)) {
    return;
  }
  goToD();
  var a1 = runAndMark(zhuanPan, keyP + 'zhuanPan');
  // var a2 = runAndMark(function(){
  //   if(textContains('去观看').exists()) {

  //   }
  // }, keyP + '5次')
  if (a1) {
    markDone(keyP);
  }

  function zhuanPan() {
    if (!textContains('免费抽').exists()) {
      return;
    }
    click('免费抽');
    myWaitUntil('次机会');
    sleep(10000);
    back();
    sleep(2000);
    click('免费抽');
    myWaitUntil('次机会');
    var i = 7;
    while (i--) {
      if (textContains(i + ' 次机会').exists()) {
        break;
      }
    }
    click('看视频');
    while (i--) {
      quTouTiaoWatch();
      var res = myWaitUntil('看视频再抽一次');
      if (res) {
        sleep(200);
        click('看视频再抽一次');
      } else {
        break;
      }
    }
    var res = textContains(0 + ' 次机会').exists();
    back();
    return res;
  }

  function goToD() {
    launchKuai7();
    myWaitUntil('赚钱技巧', 15);
    sleep(2000);
    clickOneByText('赚钱技巧');
    sleep(3000);
    scrollIntoView(function () {
      return textContains('刮刮卡').findOne(2000);
    }, 900)
  }
}

function kuai7RightGames() {
  var keyP = 'kuai7RightGames';
  if (isDone(keyP)) {
    return;
  }
  goToD();
  var a2 = runAndMark(function () {
    sleep(2000);
    return quTouTiaoQiuWithEnter('天天乐');
  }, keyP + 'Qiu');

  // var a3 = runAndMark(function () {
  //   sleep(2000);
  //   click('提现兑换');
  //   myWaitUntil('提现记录');
  //   return quTouTiaoBaoXiangAuto(function () {
  //     click(900, 1360);
  //     sleep(1500);
  //     return true;
  //   });
  // }, keyP + 'BaoXiang');

  if (a2) {
    markDone(keyP);
  }

  function goToD() {
    launchKuai7();
    myWaitUntil('我的', 15);
    sleep(2000);
    clickOneByText('我的');
    sleep(3000);
  }
}

function kuai7LeftGames() {
  var keyP = 'kuai7LeftGames';
  if (isDone(keyP)) {
    return;
  }
  goToD();
  twoDown();
  twoDown();
  // var a1 = runAndMark(function () {
  //   return quTouTiaoNiuDanAuto(function () {
  //     click(780, 1080);
  //     return true;
  //   });
  // }, keyP + 'NiuDan');
  // sleep(2000);
  // var a2 = runAndMark(function () {
  //   return quTouTiaoJiaWaWaAuto(function () {
  //     click(260, 1500);
  //     return true;
  //   });
  // }, keyP + 'JiaWaWa')
  // sleep(2000);
  var a3 = runAndMark(function () {
    click(780, 1500);
    return quTouTiaoLaoHuji();
  }, keyP + 'laoHuJi');

  if (a3) {
    markDone(keyP);
  }

  function goToD() {
    launchKuai7();
    myWaitUntil('搜一搜', 15);
    sleep(2000);
    clickOneByText('搜一搜');
    sleep(3000);
  }
}

function launchKuai7() {
  launch('快7浏览器');
  sleep(14000);
  back();
  sleep(3000)
  back();
  sleep(2000)
  var a = id('img_close').findOne(2000);
  if (a) {
    a.click();
    sleep(800);
  }
}

function kuai7GuaKa() {
  var keyP = 'kuai7GuaKa';
  var hour = new Date().getHours();
  if (hour > -1 && hour < 8) {
    keyP = keyP + '1';
  } else if (hour >= 8 && hour < 14) {
    keyP = keyP + '2';
  } else if (hour >= 14 && hour < 20) {
    keyP = keyP + '3';
  } else {
    keyP = keyP + '4';
  }
  if (isDone(keyP)) {
    saveFn();
    return;
  }
  goToD();
  sleep(3000);
  if (!textContains('看视频继续').exists()) {
    myWaitUntil('开始刮卡', 12);
    click('开始刮卡');
    sleep(3000);
    var lg = textContains('ggg==').find().length - 1;
    if (lg > 0) {
      while (lg--) {
        if (textContains('看视频继续').exists()) {
          break;
        }
        if(textContains('开始刮卡').exists()) {
          click('开始刮卡');
          sleep(1000)
        }
        click(500, 600);
        var res = myWaitUntil('再刮一下', 5);
        if (!res) {
          quTouTiaoWatch();
          var res1 = myWaitUntil('再刮一下', 9);
          if (!res1) {
            back();
            sleep(3000);
            continue;
          }
        }
        sleep(3000);
        swipe(80, 1110, 900, 1110, 500);
        sleep(800);
        swipe(80, 1810, 900, 1810, 500);
        sleep(800);
        swipe(80, 1110, 900, 1110, 500);
        sleep(800);
        swipe(80, 1810, 900, 1810, 500);
        var res2 = myWaitUntil('知道了', 6);
        back();
        sleep(3000);
      }
    }
  }
  if (textContains('看视频继续').exists()) {
    markDone(keyP);
  }
  saveFn();

  function saveFn() {
    if (!isDone('kuai7GuaKa4')) {
      saveUnDoneFn(function () {
        kuai7GuaKa();
      }, 'kuai7GuaKa');
    }
  }

  function goToD() {
    launchKuai7();
    myWaitUntil('搜一搜', 15);
    sleep(2000);
    clickOneByText('刮刮乐');
  }
}

function kuaiYinLiuLan(r) {
  var keyP = 'kuaiYinLiuLan';
  runAndMarkByDuring(function (readR, addInFn) {
    launch('快音');
    sleep(14000);
    back();
    sleep(3000)
    back();
    sleep(2000)
    click(80, 1850);
    var getOnePassTime = initGetLittleDuringTime();
    quTouTiaoVideo({
      readTime: readR || 40,
      hasVideoText: '点击最高翻',
      beforeOneBegin: function (i, passTime) {
        if (i < 7) {
          click(80, 1850);
          back();
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
        return 8 + ~~(Math.random() * 6);
      }
    });
  }, keyP, 35 + Math.floor(Math.random() * 5), r || 32);

}

function kuai7LiuLan(r) {
  var keyP = 'kuai7LiuLan';
  runAndMarkByDuring(function (readR, addInFn) {
    launchKuai7();
    click(530, 1850);
    var getOnePassTime = initGetLittleDuringTime();
    quTouTiaoVideo({
      readTime: readR || 40,
      hasVideoText: '点击最高翻',
      beforeOneBegin: function (i, passTime) {
        if (i < 7) {
          back();
        }
        clickOneByText('开心收下');
        if (textContains('金蛋大奖').exists()) {
          var tar = textContains('金蛋大奖').findOne(1000);
          click(tar.bounds().left + 15, tar.bounds().top - 15);
          sleep(2000);
        }
        if (!text('搜一搜').exists()) {
          sleep(500);
          back();
        }
        if (text('立即下载').exists()) {
          swipe(500, 1600, 500, 60, 500);
        }
        if (text('查看详情').exists()) {
          swipe(500, 1600, 500, 60, 500);
        }
        click('暂不领取');
        if (i % 11 === 0) {
          clickOneByText('小视频');
        }
        addInFn(getOnePassTime(passTime, 1.2));
      },
      oneReadTime: function () {
        return 14 + ~~(Math.random() * 10);
      },
      clickVideoText: function (t) {
        var tar = textContains(t).findOne(2000);
        if (tar) {
          click(tar.bounds().left + 15, tar.bounds().top + 5);
        }
      }
    });
    click('我的');
    var res = myWaitUntil(function () {
      toast(id('tv_read_time').exists())

      return id('tv_read_time').exists();
    })
    toast(res)
    if (res) {
      var a = id('tv_read_time').findOne(2000);
      if (a) {
        var txt = a.text();
        var t = parseFloat(txt);
        if (+t > 50) {} else {
          setDuring(keyP, +t);
          return false;
        }
      }
    }
  }, keyP, 60 + Math.floor(Math.random() * 5), r || 72);

}

function douYin(r) {
  runAndMarkByDuring(function (realR, addInFn) {
    launch('抖音极速版');
    sleep(10000);
    var getOnePassTime = initGetLittleDuringTime();
    quTouTiaoVideo({
      readTime: realR || 30,
      beforeOneBegin: function (i, passTime) {
        click('以后再说');
        addInFn(getOnePassTime(passTime, 1.5));
      },
      oneReadTime: function () {
        return 2 + ~~(Math.random() * 5);
      }
    });
  }, 'douYin', 30, r || 30)
}

function easyVideo() {
  var isN = false;
  begin('高手短视频');
  begin('变身记短视频');
  begin('趣宠短视频');
  begin('快逗短视频');
  begin('音浪短视频');
  isN = true;
  if (!(isDefLaunch && isAdmin)) {
    begin('小吃货短视频');
  }
  begin('有颜短视频');

  function begin(name) {
    launch(name);
    sleep(15000);
    if (isN) {
      if (isDefLaunch && !isAdmin) {
        click('取消');
        sleep(1500);
        click(300, 500);
      }
    }
    quTouTiaoVideo({
      upDownReadNoVideoTime: easyVideoT,
      hasVideoText: '看视频奖励',
      beforeOneBegin: function () {
        if (isN) {
          if (isDefLaunch && !isAdmin) {
            if (textContains('看视频奖励').exists()) {
              back();
            }
          } else {
            back();
          }
        } else {
          back();
        }
      }
    });
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
  runAndMarkByDuring(function (r, addInFn) {
    launch('趣头条');
    sleep(23000);
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
        id(id2).findOne(1000).click();
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

function xiangKanJob(t) {
  runAndMarkByDuring(function (realT, addInFn) {
    launch(isDefLaunch && !isAdmin ? '想看资讯' : '想看');
    sleep(16000);
    nextPage(true);
    nextPage(true);
    nextPage(true);
    nextPage(true);
    var getOnePassTime = initGetLittleDuringTime();
    commonReading({
      readTime: realT || 1.2,
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
      beforeLeavePage(i, passTime) {
        var txt1 = '读完文章，送您一个彩蛋';
        if (text(txt1).exists()) {
          click(txt1);
          sleep(2000);
          click('继续看文章');
          sleep(1000);
        }
        addInFn(getOnePassTime(passTime, 0.03));
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
    });
  }, 'xiangKanJob', 1.0, t);
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

function caidanOthers() {
  if (isDefLaunch && !isAdmin) {
    return;
  }
  var keyP = 'caidanOthers';
  launch('彩蛋视频');
  sleep(20000);
  back();
  sleep(2000);
  goToTask();

  runAndMark(function () {
    sleep(3000);
    back();
    sleep(3000);
    back();
    sleep(3000);
    goToTask();
    return true;
  }, keyP + 'start');
  if (id('iv_close').exists()) {
    back();
    sleep(3000);
  }
  oneLittle();
  runAndMark(function () {
    return guaFen();
  }, keyP + 'guaFen');

  runAndMark(function () {
    return chengJiu();
  }, keyP + 'chengJiu');

  runAndMark(function () {
    return quTouTiaoNiuDanAuto(function () {
      click(950, 1710);
      return true;
    });
  }, keyP + 'NiuDan1');

  runAndMark(function () {
    return quTouTiaoNiuDanAuto(function () {
      click('立即领取', 0);
      return true;
    });
  }, keyP + 'NiuDan2');

  // runAndMark(function () {
  //   return quTouTiaoJiaWaWaAuto('抓金币');
  // }, keyP + 'JiaWaWa')

  runAndMark(function () {
    return quTouTiaoBaoXiangAuto('飞机扔宝');
  }, 'BaoXiang');

  runAndMark(function () {
    return coinOther();
  }, keyP + 'coinOther');

  runAndMark(function () {
    return zhuanPan();
  }, keyP + 'zhuanPan');

  oneLittle();
  timeCoin();


  function coinOther() {
    click(350, 330);
    myWaitUntil('立即提现');
    sleep(2500);
    var res = quTouTiaoJiaWaWaAuto(function () {
      click(920, 490);
      return true;
    }, 6);
    back();
    sleep(3500);
    return res;
  }

  function goToTask() {
    click(530, 1860);
    myWaitUntil('我的金币', 15);
    myWaitUntil(function () {
      return !textContains('加载中').exists();
    });
    sleep(1500);
  }

  function oneLittle() {
    if (text('去赚钱').exists()) {
      click('去赚钱', 0);
      quTouTiaoWatch();
      sleep(1000);
      back();
      sleep(3000);
      goToTask();
      if (!textContains('我的金币').exists()) {
        goToTask();
      }
      sleep(5000);
    }
  }

  function guaFen() {
    click(935, 390);
    myWaitUntil('次机会');
    sleep(2500);
    var t = 8;
    while (t--) {
      if (textContains(t + ' 次机会').exists()) {
        toast(t);
        break;
      }
    }
    while (text('瓜分ta').exists() && t--) {
      click('瓜分ta', 0);
      quTouTiaoWatch();
      sleep(1500);
    }
    var res = textContains(0 + ' 次机会').exists();
    if (text('瓜分金币').exists()) {
      back();
      sleep(2500);
    }
    return res;
  }

  function zhuanPan() {
    click('免费领取');
    var res = myWaitUntil('还剩余');
    if (!res) {
      return;
    }
    sleep(5000);
    var t = 8;
    while (text('看视频抽大奖').exists() && t--) {
      click('看视频抽大奖', 0);
      quTouTiaoWatch();
      myWaitUntil('看视频抽大奖');
    }
    var res = !text('0次机会').exists();
    if (text('限时抽大奖').exists()) {
      back();
      sleep(2500);
    }
    return res;
  }

  function chengJiu() {
    if (text('勋章殿堂').exists()) {
      click('勋章殿堂', 0);
      var res = myWaitUntil('待领取');
      sleep(1500);
      var t = 13;
      while (text('待领取').exists() && res && t--) {
        clickOneByText2('待领取');
        quTouTiaoWatch();
        sleep(1500);
        if (textContains('恭喜获得').exists()) {
          back();
          sleep(800);
        }
      }
      var res = text('已领取').find();
      back();
      sleep(1500);
      return res.length > 12;
    }
  }

  function timeCoin() {
    var lg = text('收金币').find().length;
    var t = lg > 2 ? 5 : lg;
    while (text('收金币').exists() && t--) {
      click('收金币', 0);
      quTouTiaoWatch();
      sleep(2500);
      var res = myWaitUntil('恭喜您获得');
      if (res) {
        back();
      }
      sleep(1000);
    }
  }
}

function caidanDown() {
  runAndMarkByDuring(function (r, addInFn) {
    launch('彩蛋视频');
    sleep(20000);
    var getOnePassTime = initGetLittleDuringTime();
    quTouTiaoVideo({
      readTime: r,
      hasVideoText: '立即翻倍',
      beforeOneBegin: function (i, passTime) {
        if (i < 7) {
          back();
        }
        if (text('立即下载').exists()) {
          swipe(500, 1600, 500, 60, 500);
        }
        if (text('查看详情').exists()) {
          swipe(500, 1600, 500, 60, 500);
        }
        addInFn(getOnePassTime(passTime, 1.5));
      }
    });
  }, 'caidanDown', 45, 45);
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
  var oneRealReadingT;
  runAndMarkByDuring(function (realT) {
    oneRealReadingT = realT;
    sleep(3000);
    launch('快手极速版');
    sleep(8000);
    try {
      return start(0);
    } catch (err) {
      console.log(err);
      return false;
    }
  }, 'kReading', realReadingT + 30, realReadingT);



  function start(i) {
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
    if (i < 20) {
      click('我知道了', 0);
      if (!text('拖动滑块').exists()) {
        back();
      }
    }
    closeNoReact();
    if (isL) {
      fanfu();
      if (i % 33 === 0) {
        isL = false;
      }
    } else {
      normal();
      isL = isLong();
    }
    if (i > oneRealReadingT) {
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
  runAndMarkByDuring(function (realLast, addInFn) {
    launch('中青看点');
    sleep(25000);
    back();
    sleep(2500);
    back();
    sleep(2500);
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
        enterP1: function () {
          var t = '阅读';
          var ls = textContains(t).find();
          var lg = ls.length;
          var a;
          while (lg--) {
            var l = ls[lg];
            var txt = l.text();
            var bounds = l.bounds();
            var top = bounds.top;
            var left = bounds.left;
            if (top > 350 && top < 1700 && left > 0 && left < 700 && +txt[0] > 0) {
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
    zhongVideo(zhongVideoT);
    if (error) {
      return false;
    }
  }, 'zhongJob', 1.6, last);


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

function xiangKanVideo() {
  var oneMax = 50;
  var fn;
  var oldT = 0;
  var id1 = 'btnBottomDelete';
  var id2 = 'btnDelete'
  runAndMarkByDuring(function (realT, addInFn) {
    fn = addInFn;
    oneMax = realT;
    launch(isDefLaunch && !isAdmin ? '想看资讯' : '想看');
    sleep(16000);
    back();
    sleep(2000);
    click(300, 1800);
    sleep(4000);
    back();
    sleep(2000);
    closeAd();
    click(500, 480);
    xkVideo(0);
  }, 'xiangKanVideo', 80, 20);

  function closeAd() {
    var ls = [id1, id2];
    var lg = ls.length;
    while (lg--) {
      var a = ls[lg];
      var tar = id(a).findOne(1000);
      if (tar) {
        tar.click();
        sleep(2000);
      }
    }
  }

  function xkVideo(i) {
    if (i > oneMax) return;
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
    closeAd();
    click(500, 1480);
    if (i % 3 === 0 && i > 0) {
      fn(i - oldT);
      oldT = i;
    }
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
  sleep(1000 * 60 * 24 * 1.8);
}

function zhongQingLongVideo(t) {
  runAndMarkByDuring(function (realT, addInFn) {
    var res = launch('中青看点');
    if (res) {
      sleep(25000);
    }
    sleep(10000);
    back();
    sleep(3000);
    click(400, 1815);
    myWaitUntil('次播放');
    sleep(3000);
    click(500, 350);
    var failT = 0;
    var i = realT || 35;
    var lastI = i;
    while (i--) {
      if (text('首页').exists()) {
        click(500, 350);
      }
      sleep(3000);
      click('关闭广告', 0);
      click('重新加载', 0);
      if (id('a3f').exists()) {
        var a2 = id('a3f').findOne(200)
        if (a2) {
          a2.click();
        }
      }
      sleep(1000 * 23);
      oneDown();
      sleep(500);
      oneDown();
      sleep(500);
      var ls = textContains('次播放').find();
      toast(ls.length);
      if (ls.length > 1) {
        failT = 0;
        var res = scrollIntoView(function () {
          ls = textContains('次播放').find();
          return ls[1];
        });
        if (res) {
          click(400, res.bounds().top - 30);
        }
      } else {
        failT = failT + 1
      }
      if (failT > 1) {
        back();
        sleep(3000);
        click('刷新');
        sleep(3000);
        myWaitUntil('次播放');
        click(400, 1815);
        sleep(3000);
      }
      if (i % 3 === 0) {
        addInFn(lastI - i);
        lastI = i;
      }
    }
  }, 'zhongQingLongVideo', 150, t);
}

function zhongQingZhuanPan() {
  runAndMark(function () {
    var res = launch('中青看点');
    if (res) {
      sleep(25000);
    }
    sleep(10000);
    back();
    sleep(3000);
    click(700, 1815);
    sleep(8000);
    var r = myWaitUntil('抽奖赚');
    if (!r) {
      return;
    }
    sleep(5000);
    return start(0);
  }, 'zhongQingZhuanPan');


  function start(i) {
    i = i || 0;
    clickOneByText('抽奖赚');
    var res = myWaitUntil('剩余次数', 4);
    if (!res) {
      click('关闭');
      sleep(4000);
    }
    sleep(1200);
    click(530, 1000);
    sleep(800);
    if (i % 11 === 0 && textContains('本场已完成').findOne(800)) {
      back();
      sleep(1000)
      back();
      sleep(1000)
      return true;
    }
    back();
    myWaitUntil('抽奖赚');

    if (i < 102) {
      start(i + 1);
    }
    return text('0').exists();
  }
}

function zhongQingSearch() {
  var keyP = 'zhongQingSearch';
  if (isDone(keyP)) {
    return;
  }
  launch('中青看点');
  sleep(25000);
  back();
  sleep(3000);
  click(700, 1815);
  sleep(5000);
  click('立即搜索');
  sleep(5000);
  var done = false;
  try {
    done = all();
  } catch (e) {
    console.log(e);
  }
  if (!done) {
    saveUnDoneFn(function () {
      zhongQingSearch();
      if (!isAdmin && isDefLaunch) {
        zhongQingSearch();
      }
    }, keyP);
  } else {
    markDone(keyP);
  }

  function all() {
    var doneT = 0;
    var allT = 0;
    var ls = text('去搜索').find();
    allT = ls.length;
    var lgAll = ls.length - 0;
    while (lgAll--) {
      ls = text('去搜索').find();
      ls[lgAll].click();
      sleep(5000);
      var max = 4;
      for (var j = 1; j < 16; j++) {
        if (textContains(j + '次搜索').exists()) {
          max = j - 1;
          break;
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
      if (textContains((max + 1) + '/' + (max + 1)).exists()) {
        doneT = doneT + 1;
      }
      toast('done__' + doneT);
      back();
      myWaitUntil('去搜索');
      sleep(1000);
    }
    toast('doneT' + doneT)
    toast('allT' + allT)
    return doneT > 0 && (doneT - allT === 0);

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
  runAndMarkByDuring(function (realT, addInFn) {
    launchQuling();
    var focusType = isQuLingShengVideo3 ? '小视频' : '铃声';
    var otherType = isQuLingShengVideo3 ? '铃声' : '小视频';
    var i = 5;
    while (i--) {
      sleep(3000);
      toVideo();
    }
    if (!text('热门').exists()) {
      back();
      return false;
    }
    var getOnePassTime = initGetLittleDuringTime();
    var params = {
      afterVideo: function () {
        var c = id('iv_close').findOne(2000);
        if (c) {
          c.click();
        }
        sleep(800);
        toVideo();
      },
      readTime: 3,
      upDownReadNoVideoTime: 0,
      upDownReadTime: 0,
      hasVideoText: '看视频',
      testHasVideoText: function () {
        if (textContains('看视频').exists()) {
          if (!text('立即查看').exists() && id('iv_close').exists()) {
            return true;
          }
        }
      },
      goDown: function () {
        clickOneByText(otherType);
      },
      goUp: function () {
        toVideo();
      },
      beforeDownRead: function () {
        toVideo();
      },
      beforeOneBegin: function (i, passTime) {
        var c = id('iv_close').findOne(500);
        if (c) {
          c.click();
          sleep(300);
        }
        var y = 3;
        while (text('暂不领取').exists() && y--) {
          click('暂不领取');
        }
        var c1 = id('base_card_dialog_close').findOne(500);
        if (c1) {
          c1.click();
          sleep(300);
        }
        click(300, 5);
        addInFn(getOnePassTime(passTime, 1.5));
        if (i % 7 === 0) {
          clickOneByText(otherType);
          sleep(4000);
          toVideo();
          sleep(2000);
          clickOneByText2('以后更新');
        }
      },
      oneReadTime: function () {
        return 6 + ~~(Math.random() * 5);
      }
    }
    // quTouTiaoVideo(params);
    quTouTiaoVideo(Object.assign(params, {
      readTime: realT || 50,
      upDownReadNoVideoTime: 0,
      upDownReadTime: 0,
    }))

    function toVideo() {
      clickOneByText(focusType);
    }
  }, 'quLingSheng', 40, readTime);
}

function quLingSheng2(readTime) {
  launch('趣铃声');
  var i = 5;
  while (i--) {
    sleep(3000);
    toVideo();
  }
  click(550, 1500);
  sleep(2000);
  click('以后更新');
  toVideo();
  quTouTiaoVideo({
    afterVideo: function () {
      var c = id('iv_close').findOne(2000);
      if (c) {
        c.click();
      }
      sleep(800);
      toVideo();
    },
    readTime: readTime || 28,
    hasVideoText: '45123',
    goDown: function () {
      click('小视频');
    },
    goUp: function () {
      toVideo();
    },
    beforeDownRead: function () {
      toVideo();
    },
    beforeOneBegin: function () {
      var c = id('iv_close').findOne(500);
      if (c) {
        c.click();
        sleep(300);
      }
      var c1 = id('base_card_dialog_close').findOne(500);
      if (c1) {
        c1.click();
        sleep(300);
      }
      click(300, 5);
    },
    oneReadTime: function () {
      return 8 + ~~(Math.random() * 5);
    }
  });

  function toVideo() {
    click('铃声');
  }
}


function tianTian(isFanFu) {
  launchTianTian();
  sleep(2000);
  click('视频');
  var nextShouldLittle = false;
  quTouTiaoVideo({
    readTime: isFanFu ? 5 : 30,
    upDownReadNoVideoTime: isFanFu ? 3 : 0,
    upDownReadTime: isFanFu ? 45 : 0,
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
      if (i % 7 === 0) {
        if (isFanFu || tiantianCanLittle) {
          nextShouldLittle = true;
          tiantianCanLittle = true;
        } else {
          clickOneByText('首页');
          sleep(1300);
          clickOneByText('视频');
          sleep(1300);
        }
      }
      if (i < 7) {
        if (text('重试').exists()) {
          click('重试');
        }
        click('暂不领取');
        var c = id('iv_close').findOne(2000);
        if (c) {
          c.click();
        }
      }
      click('继续加油');
      click(300, 5);
    },
    oneReadTime: function () {
      return 9 + ~~(Math.random() * 5);
    },
    afterVideo: function () {
      back();
      if (nextShouldLittle && isFanFu) {
        nextShouldLittle = false;
        tiantianCanLittle = false;
        sleep(1100);
        tiantianLittle();
        clickOneByText('视频');
        sleep(2000);
      }
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
  if (lastest === '火火视频极速版' || lastest === '每日爱清理' || lastest === '天天爱清理') {
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

function scrollIntoView(tar, s) {
  var a;
  var site = s || 1400;
  if (typeof tar === 'function') {
    a = tar;
  } else {
    a = function () {
      return text(tar).findOne(2000);
    }
  }
  var c = a();
  if (c && c.bounds) {
    while (c && c.bounds() && c.bounds().top > site) {
      swipe(350, 1570, 350, 570, 400);
      sleep(800);
      c = a();
    }
    return c;
  }
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
      textContains(text).findOne(2000).click();
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
