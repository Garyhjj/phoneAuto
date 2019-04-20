var ra = new RootAutomator();
events.on('exit', function () {
  ra.exit();
});

var click1 = (x, y) => {
  ra.tap(x, y, 50);
  sleep(100);
  ra.tap(x, y, 1);
}

var swipe1 = (x1, y1, x2, y2) => {
  ra.swipe(x1, y1, x2, y2);
}

const oneUpDown = (sl) => {
  ra.swipe(350, 770, 350, 270, 600);
  sleep(sl || 400);
  ra.swipe(350, 270, 350, 770, 600);
}

const oneHour = 1000 * 60 * 60;

var zhongqingReading = (function () {
  var read = (i) => {
    i = i || 1;
    swipe1(300, 700, 300, 400);
    sleep(3000);
    swipe1(300, 400, 300, 700);
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
  var work = () => {
    enterP();
    sleep(3000);
    click1(715, 300);
    sleep(1000);
    read();
    leave();
    sleep(1000);
    refresh();
    sleep(2000);
    if (Date.now() - start < oneHour * 2) {
      return work();
    }
  }

  return function () {
    if (!start) {
      start = Date.now();
    }
    work();
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

    click1(700, 460);
    sleep(1000);
    click1(700, 470);
    sleep(2000);
    upDown(0);

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
        ra.swipe(350, 870, 350, 270, 700);
        sleep(800);
        return changeSite(y - 1)
      }
    }
    click1(715, 350)
    changeSite(i);
    click1(300, 600);
    sleep(3000);
    click1(715, 350, 1);
    sleep(1000);
    const upDown = (j) => {
      oneUpDown(3000);
      if (j > 2) {
        return
      } else {
        return upDown(j + 1)
      }
    }
    upDown(0);
    back();
    sleep(2000);
    click1(150, 50);
    sleep(2000);;
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

  return function beginReading(last, from) {
    formatLs(last ? 6 : 9);
    var lg = ls.length;
    sleep(2000);
    from = from || 0;
    while (lg-- > from) {
      aa1(0, ls[lg]);
      sleep(3000);
      break;
    }
    return;
    ra.swipe(500, 1200, 500, 140, 800);
    sleep(3000);
    beginReading(true)
  }
})()

var zhongqingKankanBefore = () => {
  ra.swipe(500, 600, 500, 100, 800);
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
    sleep(1000 * 60 * 55);
    click1(680, 80);
    sleep(1000 * 60 * 55);
    return dd(i++)
  }
})()


var hongbaoMainReading = (function () {
  function nextTitle() {
    ra.swipe(700, 500, 100, 520, 200);
  }

  function nextPaper() {
    // return controller.swipe(500, 400, 520, 70, 500);
    ra.swipe(400, 350, 400, 900, 800);
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
    }
    last = last || 1.3;
    if (Date.now() - start > oneHour * last) {
      return;
    }
    if (read > maxRead) {
      nextTitle();
      sleep(2000);
      read = 0;
    }
    ra.swipe(400, 350, 400, 900, 800);
    sleep(2000);
    enterPaper();
    sleep(1000);
    aa();
    var i = 1;

    async function aa() {
      sleep(2000);
      ra.swipe1(400, 500, 400, 350, 200);
      i++;
      if (i < 13) {
        aa()
      } else {
        sleep(1000);
        leavePaper();
        sleep(1000);
        read++;
        work();
      }
    }
  }
})();

var hongbaoLauch = function (isClone) {
  launch("红包头条");
  sleep(2000);
  click1(isClone ? 550 : 250, 900)
}

function begin() {
  sleep(2000);
  //   zhongqingKankanBefore();
  //   zhongqingKanKan();
  zhongqingReading();
  //   zhongqingShiPing();
  //   zhongqingSearch(true);
  // hongbaoMainReading()
}

begin();
