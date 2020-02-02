sleep(5000);
zhongVideo();

function zhongVideo() {
  home();
  launch('中青看点');
  sleep(3000);
  click('允许');
  sleep(13000);
  // click(500,1797);
  click(280,1797);
  sleep(3000);
  click('小视频');
  sleep(2000);
  click(200,300);
  begin();
  home();

  function begin(minute) {

    minute = minute > 0 ? minute : 90;
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
      if(!skip) {
        const times = 8 + ~~(Math.random() * 8);
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
    if(text('广告').exists()) {
      if (text('免费领取').exists()) {
        while(!text('待领取').exists()) {
            sleep(2000);
        }
        click('待领取');
      }else {
        swipe(300, 1700, 300, 190, 500);
      }
    } 
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
    click(bounds.left +60, bounds.top + 100);
  }
}
