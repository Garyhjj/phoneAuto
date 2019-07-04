sleep(5000);
begin2(0);

// var a = textContains('开心小农场').findOne(2000);
// toast(a.bounds().top);

function begin2(i) {
  firstEnter();
  play();
  back();
  secondEnter();
  watch();
  closeLast();
  sleep(3000);
  return begin2(i === 3?0: i+ 1);
}

function play(i) {
    i = i|| 0;
    swipe(290,1100,310,430,400);
    sleep(500);
    swipe(570,1170,440,330,400);
    sleep(500);
    swipe(800,860,800,480,400);
    sleep(500);
    if(i<70) {
        return play(i+1);
    }
}
function firstEnter() {
  var a = text('开心小农场').findOne(2000);
  if(!a) {
      return firstEnter();
  }else {
      var b = a.bounds();
      click(b.left +30, b.top -150);
      sleep(10000);
      click(900,577);
      sleep(2000);
      click(900,577);
      sleep(2000);
  }
}

function findSecondStep(justOne) {
  var text = '点我继续领青豆';
  const a = textContains(text).findOne(2000);
  if (a) {
    return a;
  } else {
    if (justOne) {
      return
    } else {
      return findSecondStep();
    }
  }
}

function secondEnter() {
  var btn = findSecondStep();
  let hasEnter = false;
  while (!hasEnter) {
    console.log(333)
    btn.click();
    sleep(2000);
    if (!findSecondStep(true)) {
      hasEnter = true;
    }
  }
  sleep(1000);
}

function watch() {
  sleep(15000);
  const close = getCloseWay();
  close();
  sleep(2000);
  if (findSecondStep(true)) {
    secondEnter();
    return watch();
  }
}

function getCloseWay() {
  var a = textContains('点击下载').findOne(2000);
  if (a) {
    if (a.bounds().top < 1300) {
      return function () {
        click(100, 60)
      };
    } else {
      sleep(2000);
      return getCloseWay();
    }
  }
  var b = textContains('立即下载').findOne(2000);
  if (b) {
    if (b.bounds().top < 1300) {
      return function () {
        click(985, 112)
      };
    } else {
      sleep(2000);
      return getCloseWay();
    }
  }
  var c = textContains('立即查看').findOne(2000);
  if (c) {
    if (c.bounds().top < 1620) {
      return function () {
        click(985, 112)
      };
    } else {
      sleep(2000);
      return getCloseWay();
    }
  }
  return getCloseWay();
}

function closeLast() {
  textContains('+40青豆').waitFor(); // 679
  var a = textContains('+40青豆').findOne(1000);
  click(950, a.bounds().top - 64);
  console.log(a.bounds().top - 64)
  sleep(6000);
  if(textContains('+40青豆').findOne(1000)) {
    click(950, 615);
    sleep(2000);
  }
}