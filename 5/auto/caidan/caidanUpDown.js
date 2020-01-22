sleep(5000);
caidan();

// var c = textContains('点击重播').findOne(500).bounds().top;
// console.log(c);
// click(985, 112)
// watch()

function caidan() {
//  home();
//  launch('彩蛋视频');
//  sleep(3000);
 // click('允许');
 // sleep(8000);
  begin();
  home();

  function begin(minute) {

    minute = minute > 0 ? minute : 90;
    var start = Date.now();
    var one = (i) => {
      var list = ['立即下载', '查看详情'];
      var skip = false;
      var lg = list.length;
    //  while (lg--) {
     //   if (textContains(list[lg]).exists()) {
        //{  skip = true;
     //     break;
      //  }
    //  }
      if(!skip) {
        const times = 30;
        sleepAndDo(times, video);
      }
      const x = ~~(Math.random() * 300 + 400);
      const y = ~~(Math.random() * 100);
     swipe(x, 1800 - y, x + 10, 100 + y, 500);
        sleep(2000);
      swipe(x, 230 + y, x + 10, 1800 - y, 500);
        
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
      click('取消',1);
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
     // back();return;
    text('立即翻倍').click();
    watch();
  }


  function watch() {
    sleep(13000);
    var list = ['立即下载', '查看详情', '立即登录'];
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
      while (textContains(tarText).findOne(500)&&
             textContains(tarText).findOne(500).bounds().top === tarTop && tryTime < 25) {
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
    if (name) {
      launchApp(name);
      sleep(1500);
      click('允许', 1);
    }
  }
}