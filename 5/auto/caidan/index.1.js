sleep(5000);
caidan();

// var c = textContains('点击重播').findOne(500).bounds().top;
// console.log(c);
// click(985, 112)
// watch()
// console.log(text('彩蛋视频').findOne(2000).bounds().left)
function caidan() {
  home();
  launch('彩蛋视频');
  sleep(3000);
  click('允许');
  sleep(8000);
  begin();
  home();

  function begin(minute) {

    minute = minute > 0 ? minute : 90;
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
      if(!skip) {
        const times = 8 + ~~(Math.random() * 15);
        sleepAndDo(times, video);
      }
      const x = ~~(Math.random() * 300 + 400);
      const y = ~~(Math.random() * 100);
      swipe(x, 1800 - y, x + 10, 100 + y, 500);
      sleep(2000);
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
    text('立即翻倍').click();
    watch();
  }


  function watch() {
    sleep(13000);
    var list = ['立即下载', '查看详情'];
    var tarText;
    var tarTop;
    list.forEach(l => {
      if (textContains(l).exists()) {
        tarText = l;
        tarTop = textContains(l).findOne(500).bounds().top;
      }
    });
    sleep(10000);
    var tryTime = 0;
    if (tarText) {
      while (textContains(tarText).findOne(500).bounds().top === tarTop && tryTime < 11) {
        sleep(5000);
        tryTime = tryTime + 1;
      }
      sleep(5000);
      if (textContains('点击重播').exists()) {
        back();
      } else {
        click(985, 112);
      }
    } else {
      sleep(40 * 1000);
      click(985, 112);
      back();
    }
    sleep(1000);
  }

  function launch(name) {
    home();
    sleep(2000);
    home();
    sleep(2000);
    var tar = text(name).findOne(2000);
    while(!tar || tar.bounds().left < 8 || tar.bounds().left > 900) {
      swipe(950, 600, 50, 600, 400);
      sleep(2500);
      tar = text(name).findOne(2000);
    }
    const bounds = tar.bounds();
    console.log(bounds, bounds.top, bounds.left)
    click(bounds.left +60, bounds.top + 100);
  }
}
