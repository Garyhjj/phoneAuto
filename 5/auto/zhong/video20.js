sleep(5000);
// begin2();

var a = textContains('立即查看').findOne(500)
toast(a.bounds().top);
// console.log(a.bounds().top)
function begin2() {
  firstEnter();
  watch();
  sleep(10000);
  var a = text('看视频得青豆').findOne(4000);
  if(a) {
      return begin2();
  }
  secondEnter();
  watch(true);
  closeLast();
  sleep(20000);
  return begin2();
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

function watch(check) {
  sleep(15000);
  const close = getCloseWay();
  close();
  sleep(2000);
  if (findSecondStep(true) && check) {
    secondEnter();
    return watch();
  }
}

function getCloseWay() {
  var getALL = () => {
    return textContains('立即下载').findOne(500)
    || textContains('立即查看').findOne(500)
    ||  textContains('点击下载').findOne(500)
  }
  var s = getALL();
  if(s) {
    if (s.bounds().top < 1620) {
      return function () {
        click(985, 112);
        sleep(2000);
        if(getALL()) {
          back();
        }
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