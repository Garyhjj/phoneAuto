sleep(5000);
begin();
// click(945,570);

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
  if (textContains('看视频得奖励').exists()) {
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
    click(945,570);
    sleep(2000);
  } else {
    sleep(1000);
    return closeJiangli();
  }

}
