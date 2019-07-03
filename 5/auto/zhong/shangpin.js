sleep(5000);
begin2(0);

// var a = textContains('销量').find();
// toast(a.length);
// console.log(a.length)
var ls = ['女装','百货','男装', '美妆', '鞋包','内衣', '水果', '母婴'];
function begin2(i) {
  i = i|| 0;
  i = i+ 1;
  if(i === 1) {
    var name = ls.shift();
    if(name) {
      click(name);
      sleep(5000);
    }else {
      return;
    }
  }
  var a = textContains('销量').find();
  var bounds = a[i].bounds();
  click(bounds.left - 100, bounds.top - 120);
  secondEnter();
  watch();
  closeLast();
  sleep(1000);
  back();
  sleep(3000);
  return begin2(i === 4?0: i+ 1);
}

function firstEnter() {
  var a = text('看视频得青豆').findOne(2000);
  if(!a) {
      return firstEnter();
  }else {
      a.click();
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