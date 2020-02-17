sleep(3000);

begin();

var idL = 'video_detail_bottom_ling_no_login_ling_icon_iv';
function begin() {
    getCoin();

  function getCoin() {
      sleepAndDo(60, function() {
        if(text('重播').exists()) {
          click('重播');
        }
      });
      clickCoin();
      sleep(3000);
      while(text('视频奖励').exists()) {
        back();
        sleep(5000);
        clickCoin();
        sleep(2000);
      }
      sleep(2000);
      getCoin();
  }

  function clickCoin() {
    click(900,1550);
  }

  function sleepAndDo(times, fn) {
    var one = 3;
    if (times > one) {
      sleep(one * 1000);
      fn();
      return sleepAndDo(times - one, fn);
    } else {
      sleep(times);
      fn();
    }
  }
}