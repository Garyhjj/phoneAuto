sleep(5000);
begin2();


function begin2() {
  firstEnter();
  secondEnter();
  watch();
  closeLast();
  sleep(3000);
  return begin2();
}

function firstEnter() {
  click('领取奖励');
  sleep(2000);
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
  textContains('+40青豆').waitFor();
  click(950, 788);
  sleep(2000);
  if(textContains('+40青豆').findOne(1000)) {
    click(950, 615);
    sleep(2000);
  }
}

// begin();
// click('领取奖励');
// click('点我继续领青豆');

// //请求横屏截图
// requestScreenCapture(true);
// //截图
// var img = captureScreen();
// //获取在点(100, 100)的颜色值
// var color = images.pixel(img, 985, 112);
// //显示该颜色值
// toast(colors.toString(color));
// console.log(color,3212);

// var a = textContains('点击下载').findOne(2000);
// console.log(a.bounds().top) //1266

// var b = textContains('立即下载').findOne(2000);
// console.log(b.bounds().top) //1110

// var b = textContains('立即查看').findOne(2000);
// console.log(b.bounds().top) //1728 
function begin(i) {
  i = i || 0;
  click(600, 1350);
  hasEnter();
  sleep(35 * 1000);
  back();
  sleep(2000);
  if (!hasLeave()) {
    click(985, 112);
    sleep(2000);
  }
  closeJiangli();
  if (i > 20 || textContains('20/20').exists()) {
    return;
  }
  sleep(9000);
  return begin(i + 1)
}

function hasEnter() {
  if (textContains('领9元现金').exists()) {
    sleep(1000);
    return hasEnter();
  } else {
    return;
  }
}

function hasLeave() {
  return textContains('看视频得奖励').exists()
}

function closeJiangli() {
  if (text('点我赚更多青豆').exists()) {
    sleep(2000);
    click(945, 570);
    sleep(2000);
  } else {
    sleep(1000);
    return closeJiangli();
  }

}
