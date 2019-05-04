var zhongQing = 'com.weishang.wxrd.activity.MainActivity';

var ra = new RootAutomator();
events.on('exit', function () {
  ra.exit();
});

var click1 = (x, y) => {
  ra.tap(x, y, 50);
  sleep(100);
  ra.tap(x, y, 1);
}

const oneUpDown = (sl) => {
  ra.swipe(350, 770, 350, 270, 600, 2);
  sleep(600);
  click1(350, 120);
  sleep(sl || 400);
  ra.swipe(350, 270, 350, 770, 600, 2);
  sleep(600);
  click1(350, 120);
}

const oneHour = 1000 * 60 * 60;

var zhongqingReading = (function () {
  var read = (i) => {
    i = i || 1;
    oneUpDown(3000);
    if (i < 50) {
      sleep(3000);
      read(i + 1);
    }
  }
  var refresh = () => {
    click1(50, 1200);
  }
  var enterP = () => {
    click1(300, 350);
  }
  var leave = () => {
    click1(50, 70);
  }
  var start
  var work = (readTime) => {
    console.log(Date.now(), start, readTime)
    enterP();
    sleep(3000);
    // click1(715, 300);
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
  function nextTitle() {
    ra.swipe(700, 500, 20, 520, 300, 2);
    sleep(600);
    click1(300, 120);
    sleep(1000);
  }
  return function (rt) {
    start = Date.now();
    nextTitle();
    work(rt);
  }
})();

var zhongqingSearch = (function () {
  function aa(i, isSub) {

    if (i > 10) {
      return
    }

    sleep(3000);
    click1(500, isSub ? 970 : 570);
    sleep(5000);
    const upDown = (j) => {
      oneUpDown(2000)
      if (j > 1) {
        return
      } else {
        upDown(j + 1)
      }
    }

    click1(630, 420);
    sleep(2000);
    click1(630, 420)
    sleep(2000);
    upDown(2);

    back();
    sleep(1000);
    click1(130, 50);
    sleep(1500);
    return aa(i + 1, isSub)
  }
  return function (isSub) {
    if (!isSub) {
      aa(0);
    }
    aa(2, true)
  }
})()


var zhongqingKanKan = (function () {
  function aa1(i, site) {
    // site = [100, 490]
    if (i > 6) {
      return
    }
    click1(site[0], site[1]);
    sleep(3000);
    const changeSite = (y) => {
      if (y > 0) {
        ra.swipe(350, 870, 350, 270, 700, 2);
        sleep(600);
        click1(350, 120);
        sleep(800);
        return changeSite(y - 1)
      }
    }
    // click1(715, 350)
    changeSite(i);
    click1(300, 600);
    sleep(3000);
    // click1(715, 350, 1);
    // sleep(1000);
    const upDown = (j) => {
      oneUpDown(3000);
      if (j > 2) {
        return
      } else {
        return upDown(j + 1)
      }
    }
    upDown(1);
    back();
    sleep(2000);
    click1(150, 50);
    sleep(10000);;
    return aa1(i + 1, site)
  }

  const ls = [];
  const formatLs = (col) => {
    const begin = 200,
      height = 130;
    col = col || 9;
    ls.length = 0;
    for (var i = 0; i < col; i++) {
      var y = begin + height * i;
      ls.push([100, y]);
      ls.push([500, y]);
    }
  }

  function beginReading(last, from) {
    formatLs(last ? 6 : 9);
    from = from || 0;
    var lg = ls.length - from;
    sleep(2000);
    while (lg--) {
      aa1(0, ls[lg]);
      sleep(20000);
    }
    if (last) {
      return;
    }
    ra.swipe(500, 1200, 500, 140, 800, 2);
    sleep(2000);
    click1(250, 100);
    sleep(1000);
    sleep(3000);
    beginReading(true)
  }
  return beginReading
})()
var zhongqingTool = (function () {
  function backToMain() {
    let i = 3;
    while (i--) {
      back();
      sleep(3000)
    }
    click1(150, 50);
    sleep(2000);
    click1(100, 1240);
    sleep(2000);
  }
  var intoZhongqingKankan = () => {
    click1(700, 1200);
    sleep(2000);
    click1(130, 530);
    sleep(8000);
    click1(460, 760);
    sleep(6000);
  }
  var intoZhongqingSearch = () => {
    click1(700, 1200);
    sleep(2000);
    click1(130, 530);
    sleep(8000);
    click1(560, 760);
    sleep(6000);
  }
  return {
    backToMain: backToMain,
    intoZhongqingKankan: intoZhongqingKankan,
    intoZhongqingSearch: intoZhongqingSearch,
    open: function (isClone) {
      home();
      sleep(2000);
      home();
      sleep(2000);
      launchApp("中青看点");
      sleep(9000);
      click1(isClone ? 550 : 250, 900);
      sleep(20000);
      back();
      sleep(4000);
      back();
      sleep(4000);
    }
  }
})()

var zhongqingKankanBefore = (hasTop) => {
  ra.swipe(500, hasTop ? 460 : 600, 500, 100, 800, 2);
  sleep(2000);
  click1(250, 100);
  sleep(1000);
}

var zhongqingShiPing = (function () {
  return function dd(ih) {
    ih = ih || 0;
    if (ih > 10) {
      return;
    }
    click1(680, 220);
    sleep(1000 * 55);
    click1(680, 80);
    sleep(1000 * 68);
    return dd(ih + 1);
  }
})()


var hongbaoMainReading = (function () {
  function nextTitle() {
    ra.swipe(700, 500, 20, 520, 300, 2);
    sleep(600);
    click1(300, 120);
    sleep(1000);
  }

  function refresh() {
    ra.swipe(400, 350, 400, 900, 800, 2);
    sleep(600);
    click1(300, 120);
    sleep(1000);
  }

  function nextPaper() {
    ra.swipe(400, 350, 400, 900, 800);
  }

  function readone() {
    ra.swipe(400, 500, 400, 350, 200, 2);
    sleep(600);
    click1(300, 120);
    sleep(2000);
  }

  function enterPaper() {
    click1(400, 350);
    sleep(2000);
  }
  var maxRead = 20;
  var read = 0;
  var start;
  return function work(last) {
    if (!start) {
      start = Date.now();
      nextTitle();
    }
    last = last || 1.3;
    if (Date.now() - start > 1000 * 60 * 60 * last) {
      return;
    }
    if (read > maxRead) {
      nextTitle();
      sleep(2000);
      read = 0;
    }
    refresh();
    sleep(2000);
    enterPaper();
    sleep(1000);
    aa(0);

    function aa(l) {
      sleep(2000);
      readone();
      if (l < 7) {
        aa(l + 1)
      } else {
        sleep(1000);
        back();
        sleep(1000);
        read++;
        work(last);
      }
    }
  }
})();

var hongbaoLauch = function (isClone) {
  home();
  sleep(2000);
  home();
  sleep(8000);
  launchApp("红包头条");
  sleep(10000);
  back();
  sleep(3000);
}

function zhongqingJob(opts) {
  opts = opts || {

  }
  var isClone = opts.isClone;
  var open = opts.open;
  var reading = opts.reading;
  var search = opts.search;
  var kankan = opts.kankan;
  if (open) {
    zhongqingTool.open(isClone);
  }
  if (reading > 0) {
    zhongqingReading(reading);
  }

  if (search) {
    zhongqingTool.intoZhongqingSearch();
    zhongqingSearch();
  }
  if (kankan) {
    if (search) {
      zhongqingTool.backToMain();
    }
    zhongqingTool.intoZhongqingKankan();
    var shiPing = kankan.shiPing;
    if (shiPing) {
      zhongqingShiPing();
    }
    var subKankan = kankan.subKankan || false;
    var from = kankan.from || 0;
    zhongqingKankanBefore(true);
    zhongqingKanKan(subKankan, from);
  }
}
var souhuReading = (function () {
  function nextTitle() {
    ra.swipe(700, 500, 20, 520, 300, 2);
    sleep(600);
    click1(300, 30);
    sleep(1000);
  }
  var read = (i) => {
    i = i || 1;
    ra.swipe(350, 870, 350, 270, 600, 2);
    sleep(600);
    click1(350, 20);
    sleep(3000);
    ra.swipe(350, 270, 350, 870, 600, 2);
    sleep(600);
    click1(350, 20);
    if (i < 13) {
      sleep(3000);
      read(i + 1);
    }
  }
  var refresh = () => {
    click1(50, 1200);
  }
  var enterP = () => {
    click1(300, 490);
  }
  var leave = () => {
    back();
  }
  var start
  var work = (readTime) => {
    enterP();
    sleep(3000);
    // click1(715, 300);
    sleep(1000);
    read();
    leave();
    sleep(1000);
    refresh();
    sleep(2000);
    readTime = readTime || 1.1
    if (readTime <= 0) {
      readTime = 2;
    }
    if (Date.now() - start < 1000 * 60 * 60 * readTime) {
      return work(readTime);
    }
  }

  return function (rt) {
    start = Date.now();
    nextTitle();
    work(rt);
  }
})();

function begin() {
  sleep(5000);
  // souhuReading();
  zhongqingJob({
    open: true,
    reading: 2.2
  });
  hongbaoLauch();
  hongbaoMainReading(1.3);
  zhongqingJob({
    isClone: true,
    open: true,
    reading: 2.2
  })
  hongbaoLauch();
  hongbaoMainReading(0.15);
  zhongqingJob({
    open: true,
    search: true,
    kankan: {
      shiPing: true,
    }
  });
  hongbaoLauch();
  hongbaoMainReading(0.5);
  zhongqingJob({
    isClone: true,
    open: true,
    search: true,
    kankan: {
      shiPing: true,
    }
  });
  hongbaoLauch();
  hongbaoMainReading(0.15);
}

function ca() {
  return currentActivity()
}

function inZhongQing() {
  return ca().indexOf('weishang') > -1
}
begin();
// zhongqingKanKan(false, 1)
