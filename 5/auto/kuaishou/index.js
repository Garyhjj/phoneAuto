
sleep(5000);
start();
function start() {
    sleep(27 * 1000);
    oneUpDown();
    start();
}







function oneUpDown(isX) {
    swipe(900, isX?770: 1600, 900, 60, 500);
    sleep(500);
    swipe(900, 100, 900, isX?780: 1600, 500);
  }