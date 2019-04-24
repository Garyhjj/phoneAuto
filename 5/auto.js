function begin() {
  sleep(2000)
  lauchDuoFu();
  duofuReading();
  zhongqingJob();
  lauchJu();
  juReading();
  // textContains('分钟').findOne().click();
}

begin();


function eastReading(rt) {
  var read = (i) => {
    i = i || 1;
    oneUpDown(3000);
    if (i < 11) {
      sleep(3000);
      read(i + 1);
    }
  }
  var refresh = () => {
    swipe(400, 350, 400, 900, 800)
  }
  var enterP = () => {
    click(400, 600)
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
    if (click('查看详情')) {
      sleep(3000);
      leave();
      sleep(3000);
    }
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

function zhongqingJob() {
  lauchZQ();
  zhongqingReading();
  intoZhongQingRenWu(1);
  zhongqingKankan();
  backToMainZhongQing()
  intoZhongQingRenWu(2);
  zhongqingSearch();
  // 
  // click('搜索赚')
}
function backToMainZhongQing() {
  let i = 3;
  while (i--) {
    back();
    sleep(3000)
  }
  click(230, 100);
  sleep(2000);
  click(150,1880);
  sleep(2000);
}
function intoZhongQingRenWu(type) {
  click(980,1880);
  sleep(4000);
  click('任务中心');
  var str
  if (type === 1) {
    str = '看看赚'
  } else if (type === 2) {
    str = '搜索'
  }
  while (!textContains(str).exists()) {
    sleep(1000);
  }
  textContains(str).findOne().click();
  while (!textContains('任务说明').exists()) {
    sleep(1000);
  }
}

function zhongqingReading(rt) {
  var read = (i) => {
    i = i || 1;
    oneUpDown(3000);
    if (i < 50) {
      sleep(3000);
      read(i + 1);
    }
  }
  var refresh = () => {
    swipe(400, 350, 400, 900, 800)
  }
  var enterP = () => {
    click(400, 430)
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
    if (click('查看详情')) {
      sleep(3000);
      leave();
      sleep(3000);
    }
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

function zhongqingSearch(isSub) {
  function aa(i, isSub) {
    if (i > 10) {
      return
    }

    sleep(3000);
    click(500, isSub ? 1200 : 670);
    while (!textContains('搜索').exists() && !textContains('百度一下').exists()) {
      sleep(1000);
    }
    sleep(3000);
    const upDown = (j) => {
      oneUpDown(2000)
      if (j > 1) {
        return
      } else {
        upDown(j + 1)
      }
    }
    upDown(1);
    sleep(2000);
    swipe(500, 300, 500, 1000, 500);
    sleep(3000);
    if (click('百度一下',0)) {

    } else {
      sleep(1000);
      click(850,320)
      
    }
    sleep(2000);
    upDown(1);

    back();
    sleep(1000);
    click(230, 100);
    sleep(1500);
    return aa(i + 1, isSub)
  }
  if (!isSub) {
    aa(0);
  }
  aa(2, true)

}

function zhongqingkankanBefore() {
  swipe(500, hasTop ? 460 : 650, 500, 100, 800);
  sleep(1000);
}

function zhongqingKankan(l, f) {
  function aa1(i, btn) {
    if (i > 9) {
      return
    }
    btn.click();
    var waitTime = 0;
    while (!textContains('青豆').exists()) {
      sleep(2000)
      waitTime = waitTime + 1;
      if (waitTime > 12) {
        break;
      }
    }
    sleep(2000)
    const changeSite = (y) => {
      if (y > 0) {
        swipe(350, 870, 350, 270, 700);
        sleep(800);
        return changeSite(y - 1)
      }
    }
    changeSite(i);
    click(300, 700);
    sleep(3000);
    const upDown = (j) => {
      oneUpDown(3000);
      if (j > 2) {
        return
      } else {
        return upDown(j + 1)
      }
    }
    upDown(2);
    var done;
    if (textContains('青豆奖励').exists()) {
      done = true;
    }
    back();
    sleep(2000);
    click(230, 100);
    sleep(2000);
    if (done) {
      return;
    }
    return aa1(i + 1, btn)
  }

  const ls = [];
  const formatLs = (col) => {
    const begin = 200,
      height = 130;
    col = col || 9;
    ls.length = 0;
    for (var i = 0; i < col; i++) {
      var y = begin + height * i;
      ls.push([300, y]);
      ls.push([900, y]);
    }
  }
  var readingTime = 0;

  function beginReading() {
    var target = text('去完成').findOne(6000);
    if (!target) {
      target = text('进行中').findOne(6000);
    }
    if (!target) {
      return;
    }
    aa1(0, target);
    sleep(2000);
    readingTime = readingTime + 1;
    if (readingTime > 60) {
      return;
    }
    return beginReading()
  }
  return beginReading()
}

function lauchZQ() {
  home();
  sleep(5000);
  launch('中青看点');
  sleep(15000);
  back();
  sleep(3000);
  back();
  sleep(3000);
}


function lauchDuoFu() {
  launch('多福看看');
  sleep(10000);
}

function duofuReading(rt) {
  var read = (i) => {
    i = i || 1;
    oneUpDown(3000);
    if (i < 20) {
      sleep(3000);
      read(i + 1);
    }
  }
  var refresh = () => {
    swipe(400, 350, 400, 900, 800)
  }
  var enterP = () => {
    click(400, 430)
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
    readTime = readTime || 2.4
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

function lauchJu() {
  home();
  sleep(5000);
  launch('聚看点');
  sleep(15000);
  back();
  sleep(3000);
  click('继续挣钱');
  sleep(2000);
  back();
  sleep(3000);
}

function juReading(rt) {
  var read = (i) => {
    i = i || 1;
    oneUpDown(3000);
    if (i < 16) {
      sleep(2000);
      read(i + 1);
    }
  }
  var refresh = () => {
    swipe(400, 350, 400, 900, 800)
  }
  var enterP = () => {
    click(400, 380)
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
    if (click('关闭广告')) {
      sleep(2000);
    }
    if(textContains('继续赚钱').exists()) {
      textContains('继续赚钱').findOne().click();
      sleep(1500);
    }
    // if(click('领取')) {
    //   sleep(2000);
    // }
    sleep(1000);
    refresh();
    sleep(4000);
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

function oneUpDown(sl) {
  swipe(350, 770, 350, 270, 800);
  sleep(sl || 1000);
  swipe(350, 270, 350, 770, 800);
}

function launch(name) {
  if (name) {
    launchApp(name);
    sleep(1500);
    click('允许');
  }
}
