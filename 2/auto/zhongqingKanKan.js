var ra = new RootAutomator();
events.on('exit', function () {
  ra.exit();
});

sleep(5000);

begin();
function begin() {
    function aa1(i, site) {
      // site = [100, 490]
      if (i > 6) {
        return
      }
      click1(site[0], site[1]);
      sleep(3000);
      const changeSite = (y) => {
        if (y > 0) {
          ra.swipe(350, 870, 350, 270, 700, 2);
          sleep(600);
          click1(350, 120);
          sleep(800);
          return changeSite(y - 1)
        }
      }
      changeSite(i);
      click1(300, 600);
      sleep(3000);
      const upDown = (j) => {
        oneUpDown(3000);
        if (j > 2) {
          return
        } else {
          return upDown(j + 1)
        }
      }
      upDown(1);
      back();
      sleep(2000);
      click1(150, 50);
      sleep(10000);;
      return aa1(i + 1, site)
    }
    const ls = [];
    const formatLs = (col) => {
      const begin = 200,
        height = 130;
      col = col || 9;
      ls.length = 0;
      for (var i = 0; i < col; i++) {
        var y = begin + height * i;
        ls.push([100, y]);
        ls.push([500, y]);
      }
    }
    function beginReading(last, from) {
      formatLs(last ? 6 : 9);
      from = from || 0;
      var lg = ls.length - from;
      sleep(2000);
      while (lg--) {
        aa1(0, ls[lg]);
        sleep(20000);
      }
      if (last) {
        return;
      }
      ra.swipe(500, 1200, 500, 140, 800, 2);
      sleep(2000);
      click1(250, 100);
      sleep(1000);
      sleep(3000);
      beginReading(true)
    }
    return beginReading()
  }



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