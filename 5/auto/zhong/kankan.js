sleep(5000);
begin();
// noteType()
// videoType();
// firstClickType();
// var g = textContains('松开加载').findOne(6000);
// click(500, 1700)

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
    btn.click();
    var waitTime = 0;
    while (!textContains('青豆').exists()) {
      sleep(2000)
      waitTime = waitTime + 1;
      if (waitTime > 12) {
        break;
      }
    }
    sleep(6000)
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
    upDown(2);
    var done;
    if (textContains('青豆奖励').exists()) {
      done = true;
    }
    back();
    sleep(2000);
    click(230, 100);
    sleep(2000);
    if (done) {
      return;
    }
    return aa1(i + 1, btn)
  }
  var readingTime = 0;

  function beginReading(target) {
    // var target = text('去完成').findOne(6000);
    // if (!target) {
    //   target = text('进行中').findOne(6000);
    // }
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
  var ls1 = text('进行中').find();
  var lg2 = ls1.length;
  var yinyun = text('幸运红包').findOne(3000);
  if (lg2 === 0 && yinyun) {
    yinyun.click();
    sleep(65 * 1000);
    back();
    sleep(2000);
    click(230, 100);
    sleep(2000);
  }
  videoType();
  noteType();
  firstClickType();
  var ls = text('去完成').find();
  var lg1 = ls.length;
  while (lg1--) {
    beginReading(ls[lg1]);
  }
  while (lg2--) {
    beginReading(ls1[lg2]);
  }
}

function noteType() {
  var ls = ['全民看看', '捷讯小说'];
  var lg = ls.length;
  while (lg--) {
    var tar = text(ls[lg]).findOne(3000);
    if (tar) {
      tar.click();
      var waitTime = 0;
      while (!textContains('青豆').exists()) {
        sleep(2000)
        waitTime = waitTime + 1;
        if (waitTime > 12) {
          break;
        }
      }
      sleep(5000);
      var t = 0;
      while (t < 8) {
        t = t + 1;
        upDown(2);
        sleep(2000);
        if (textContains('青豆奖励').exists() || textContains('任务已完成').exists()) {
          break;
        }
        var button = text('下一章').findOne(6000);
        if (button) {
          button.click();
          sleep(5000);
        }
      }
      leave();
    }
  }

}

function firstClickType() {
  var ls = ['玩赚看点', '巨头前沿', '蚂蚁资讯', '育儿常识', '完美小说', '奇闻趣事'];
  var lg = ls.length;
  while (lg--) {
    var ls1 = text(ls[lg]).find();
    var lg1 = ls1.length;
    while(lg1 --) {
      var tar = ls1[lg1];
      if (tar) {
        var t = 0;
        while (t < 8) {
          tar.click();
          sleep(5000);
          var waitTime = 0;
          if(textContains('任务已完成').exists()) {
             back();
             sleep(3000);
             break;
          }else {
            while (!textContains('青豆').exists()) {
              sleep(2000)
              waitTime = waitTime + 1;
              if (waitTime > 12) {
                break;
              }
            }
            sleep(10000);
            t = t + 1;
            click(500, 450);
            sleep(3000);
            upDown(2);
            sleep(2000);
            var done = false;
            if (textContains('青豆奖励').exists() || textContains('任务已完成').exists()) {
              done = true;
            }
            leave();
            if(done) {
              t = 100;
            }
          }
        }
      }
    }
  }
}

function videoType() {
  var ls = ['下贤视频'];
  var lg = ls.length;
  while (lg--) {
    var tar = text(ls[lg]).findOne(3000);
    if (tar) {
      tar.click();
      var waitTime = 0;
      while (!textContains('青豆').exists()) {
        sleep(2000)
        waitTime = waitTime + 1;
        if (waitTime > 12) {
          break;
        }
      }
      sleep(5000);
      var t = 0;
      while (t < 8) {
        t = t + 1;
        click(300, 1350);
        while (!textContains('松开加载').exists()) {
          sleep(2000)
          waitTime = waitTime + 1;
          if (waitTime > 12) {
            break;
          }
        }
        var inS = textContains('松开加载').findOne(6000);
        if (inS) {
          click(500, 1700)
          sleep(3000);
          upDown(2);
          sleep(2000);
          back();
          sleep(3000);
        }
        if (textContains('青豆奖励').exists() || textContains('任务已完成').exists()) {
          break;
        }
      }
      leave();
    }
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
//  zhongqingKankan();
// module.exports = zhongqingKankan;
