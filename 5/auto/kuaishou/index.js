
sleep(5000);
start();
function kuaishouUpDown() {
    if (text('拖动滑块').exists()) {
        function trySwipe(j) {
          j = j || 0;
          if (j > 2) {
            return;
          }
          var xSite = [900, 850, 800, 750, 700, 650];
          var lg = xSite.length;
          var succ = false;
          while (text('拖动滑块').exists() && lg--) {
            swipe(120, 975, xSite[lg] + 5, 975, 800);
            sleep(2500);
            if (!text('拖动滑块').exists()) {
              succ = true;
              break;
            }
          }
          if (succ) {
            console.log('success__' + xSite[lg]);
            return true;
          } else {
            trySwipe(j + 1);
          }
        }
        trySwipe(0);
        if (text('拖动滑块').exists()) {
          toast('failed');
          console.log('k__failed');
          return false;
        }
      }
    sleep(15 * 1000);
    oneUpDown();
    kuaishouUpDown();
    function oneUpDown(isX) {
      swipe(900, isX?770: 1600, 900, 60, 500);
      sleep(500);
      swipe(900, 200, 900, isX?1180: 1600, 500);
    }
}







