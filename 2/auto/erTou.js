var ra = new RootAutomator();
events.on('exit', function () {
  ra.exit();
});

sleep(5000);
begin();
function begin(rt) {
  var read = (i) => {
    i = i || 1;
    oneUpDown();
    if (i < 15) {
      sleep(1500);
      read(i + 1);
    }
  }

  function refresh() {
    ra.swipe(400, 350, 400, 900, 800, 2);
    sleep(600);
    click1(300, 20);
    sleep(1000);
  }
  var enterP = () => {
    click1(300, 350);
  }
  var leave = () => {
    click1(50, 70);
  }
  function readone() {
    ra.swipe(400, 500, 400, 200, 200, 2);
    sleep(600);
    click1(300, 120);
    sleep(2000);
  }
  var start
  var work = (readTime) => {
    refresh();
    sleep(2000);
    enterP();
    sleep(3000);
    sleep(1000);
    read();
    leave();
    sleep(1000);
    readTime = readTime || 2.2
    if (readTime <= 0) {
      readTime = 2;
    }
    if (Date.now() - start < 1000 * 60 * 60 * readTime) {
      return work(readTime);
    }
  }
  start = Date.now();
  work(rt);
};



function click1(x, y) {
  ra.tap(x, y, 50);
  sleep(100);
  ra.tap(x, y, 1);
}


function oneUpDown(sl) {
  ra.swipe(350, 970, 350, 270, 600, 2);
  sleep(600);
  click1(350, 120);
  sleep(sl || 400);
  ra.swipe(350, 270, 350, 970, 600, 2);
  sleep(600);
  click1(350, 120);
}
