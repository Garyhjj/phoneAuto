var util = require('../util.js');
var oneUpDown = util.oneUpDown;
function zhongqingKankan(l, f) {
    function aa1(i, btn) {
      if (i > 9) {
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
    var yinyun = text('幸运红包').findOne(3000);
    if (yinyun) {
      yinyun.click();
      sleep(65 * 1000);
      back();
      sleep(2000);
      click(230, 100);
      sleep(2000);
    }
    var ls = text('去完成').find();
    var lg1 = ls.length;
    while (lg1--) {
      beginReading(ls[lg1]);
    }
    var ls1 = text('进行中').find();
    var lg2 = ls1.length;
    while (lg2--) {
      beginReading(ls[lg2]);
    }
  }

  //  zhongqingKankan();
  module.exports = zhongqingKankan;