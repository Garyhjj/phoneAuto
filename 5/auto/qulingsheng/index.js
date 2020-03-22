
    //   click(925,497);
    caidan();
function caidan() {
    launchApp('趣铃声');
    sleep(3000);
    click('允许');
    sleep(12000);
    begin();
  
    function begin(minute) {
  
      minute = minute > 0 ? minute : 60;
      var start = Date.now();
      var one = (i) => {
        var times = 12;
        sleepAndDo(times, video);
        swipe(900, 1600, 900, 60, 500);
        sleepAndDo(2, video);
        swipe(900, 120, 900, 1600, 500);
        sleepAndDo(2, video);
        if (Date.now() - start < 1000 * 60 * minute) {
          one(i + 1);
        }
      }
      one(0);
    }
  
    function sleepAndDo(times, fn) {
      var one = 3;
      if (times > one) {
        sleep(one * 1000);
        fn();
        return sleepAndDo(times - one, fn);
      } else {
        sleep(times*1000);
        fn();
      }
    }
  
  
    function video() {
      if (!textContains('看视频再领').exists()) {
        return;
      }
      sleep(5000);
      click(925,497);
      return;
    }
  }