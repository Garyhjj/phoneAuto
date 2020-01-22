kReading();

function kReading() {
  var tx = ['广告'];
  var isL = false;
  home();
  sleep(3000);
  launch('快手极速版');
  sleep(8000);
  try {
    start(0);
  } catch (err) {
    console.log(err);
  }
  home();


  function start(i) {
    if (i < 20) {
      click('我知道了', 1);
    }
    if (isL) {
      fanfu();
    } else {
      normal();
      isL = isLong();
    }
    if (i > 300) {
      return;
    }
    start(i + 1);
  }

  function fanfu() {
    sleep(20 * 1000);
    oneUpDown();
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
    // if(id('slide_ad_icon').exists()) {
    //     return true;
    // }
    return false;
  }

  function oneUpDown(isX) {
    swipe(900, isX ? 770 : 1600, 900, 60, 500);
    sleep(500);
    swipe(900, 100, 900, isX ? 780 : 1600, 500);
  }

  function normal() {
    const times = 10 + ~~(Math.random() * 15);
    sleep(times);
    const x = ~~(Math.random() * 300 + 400);
    const y = ~~(Math.random() * 100);
    swipe(x, 1800 - y, x + 10, 100 + y, 500);
    sleep(2000);
  }

  function launch(name) {
    if (name) {
      launchApp(name);
      sleep(1500);
      click('允许', 1);
    }
  }
}
