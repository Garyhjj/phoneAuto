var ra = new RootAutomator();
events.on('exit', function () {
  ra.exit();
});

sleep(5000);
begin();
function begin() {
    var read = (i) => {
      i = i || 1;
      oneUpDown(3000);
      if (i < 50) {
        sleep(3000);
        read(i + 1);
      }
    }
    var refresh = () => {
      click1(50, 1200);
    }
    var enterP = () => {
      click1(300, 350);
    }
    var leave = () => {
      click1(50, 70);
    }
    var start
    var work = (readTime) => {
      enterP();
      sleep(3000);
      sleep(1000);
      read();
      leave();
      sleep(1000);
      refresh();
      sleep(2000);
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


function oneUpDown (sl) {
    ra.swipe(350, 770, 350, 270, 600, 2);
    sleep(600);
    click1(350, 120);
    sleep(sl || 400);
    ra.swipe(350, 270, 350, 770, 600, 2);
    sleep(600);
    click1(350, 120);
}