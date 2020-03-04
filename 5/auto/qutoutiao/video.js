sleep(5000);
zhongVideo();

function zhongVideo() {
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
      if (!skip) {
        const times = 8 + ~~(Math.random() * 6);
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
    sleep(3 * 1000);
    if (text('+50').exists()) {
      sleep(16 * 1000)
    } else {
      sleep((times - 3) * 1000);
    }
  }


  function video() {

  }

  function launch(name) {
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
    const bounds = tar.bounds();
    click(bounds.left + 60, bounds.top + 100);
  }
}
