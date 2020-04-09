
sleep(5000);
start();
function start(i) {
    i = 1 || 1;
    if(i > 700) {
      return;
    }
    swipe(900,1600,200,1610,400);
    sleep(1000);
    swipe(200,1600,900,1610,400);
    sleep(1000);
    sleep(33* 1000);
    oneUpDown(1);
  // back();
   start(i+1);
}







function oneUpDown(isX) {
    swipe(900, isX?770: 1600, 900, 60, 500);
    sleep(500);
    swipe(900, 300, 900, isX?1100: 1600, 500);
  }