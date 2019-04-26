var util = require('../util.js');
var oneUpDown = util.oneUpDown;

function eastReading(rt) {
    var read = (i) => {
      i = i || 1;
      oneUpDown(3000);
      if (i < 15) {
        sleep(2000);
        read(i + 1);
      }
    }
    var refresh = () => {
      swipe(400, 350, 400, 900, 800)
    }
    var enterP = () => {
      click(400, textContains('恭喜你获得').exists() ? 920 : 600)
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

  module.exports = eastReading