var ra = new RootAutomator();
events.on('exit', function () {
  ra.exit();
});

sleep(5000);
begin();

function begin(rt) {
  launch();
  var articleId = 'cl_item_homeChildContent_root';
  var afterEnterID = 'swipe_target';
  var read = (i) => {
    i = i || 1;
    oneUpDown();
    if (i < 15) {
      sleep(1500);
      read(i + 1);
    }
  }

  function refresh() {
    var rID = 'tv_baseLayout_clickRefresh';
    if (id(rID).exists()) {
      id(rID).findOne().click();
      sleep(5000);
    } else {
      ra.swipe(400, 350, 400, 900, 800, 2);
      sleep(600);
      click1(300, 20);
      sleep(1000);
    }
  }
  var enterP = (btn) => {
    // click1(300, 350);
    btn.click();
  }
  var leave = () => {
    click1(50, 70);
  }

  function readone() {
    ra.swipe(400, 500, 400, 200, 200, 2);
    sleep(600);
    click1(300, 120);
    sleep(2000);
  }
  var start
  var continueRefreshTime = 0;
  var work = (readTime) => {
    refresh();
    continueRefreshTime = continueRefreshTime + 1;
    sleep(5000);
    var ls = id(articleId).find();
    var lg = ls.length;
    while (lg--) {
      if (lg === 1) continue;
      continueRefreshTime = 0;
      enterP(ls[lg]);
      sleep(3000);
      sleep(1000);
      var enterContent = id(afterEnterID).findOne(10000);
      read();
      leave();
      sleep(1000);
    }
    if (continueRefreshTime > 10) {
      home();
      sleep(2000);
      home();
      sleep(8000)
      return begin(0.6)
    }
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

  function launch() {
    home();
    sleep(2000);
    home();
    sleep(8000);
    launchApp('二头条');
    sleep(800);
    click1(600, 1150);
    sleep(15000);
  }
};



function click1(x, y) {
  ra.tap(x, y, 50);
  sleep(100);
  ra.tap(x, y, 1);
}


function oneUpDown(sl) {
  ra.swipe(350, 970, 350, 270, 600, 2);
  sleep(600);
  click1(350, 120);
  sleep(sl || 400);
  ra.swipe(350, 270, 350, 970, 600, 2);
  sleep(600);
  click1(350, 120);
}
