sleep(5000);
zhongVideo();

function zhongVideo() {
  qVideo();
  home();

  function qVideo(minute) {
    click(550, 1840);
    minute = minute > 0 ? minute : 90;
    var start = Date.now();
    var one = (i) => {
      const times = 1 + ~~(Math.random() * 1);
      sleepAndDo(times);
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

  function sleepAndDo(times) {
    var id1 = 'avi';
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