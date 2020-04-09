sleep(5000);


function zhongQingSearch() {
  home();
  sleep(3000);
  launch('中青看点');
  sleep(25000);
  back();
  sleep(3000);
  click(700, 1797);
  sleep(5000);
  click('立即搜索');
  sleep(5000);
  all();

  function all() {
    var ls = text('去搜索').find();
    var lgAll = ls.length - 0;
    while (lgAll--) {
      ls = text('去搜索').find();
      ls[lgAll].click();
      sleep(5000);
      var max = 4;
      for (var j = 5; j < 12; j++) {
        if (textContains(j + '次搜索').exists()) {
          max = j - 1;
          break;
        }
      }
      zhongqingSearch(max);
      sleep(3000);
      back();
      sleep(6000);
    }

    function zhongqingSearch(times) {
      function aa(i) {
        var max = times || 4;
        var t = max + 1;
        if (i > max || textContains(t + '/' + t).exists()) {
          return
        }

        sleep(3000);
        var tar = text('热').findOne(2000);
        if (tar) {
          tar.click();
        } else {
          click('换一批');
          return aa(i + 1)
        }
        while (!textContains('搜索').exists() && !textContains('百度一下').exists()) {
          sleep(1000);
        }
        sleep(3000);
        const upDown = (j) => {
          oneUpDown(4000)
          if (j > 1) {
            return
          } else {
            upDown(j + 1)
          }
        }
        if (!textContains('页面失联了').exists()) {
          upDown(1);
          sleep(2000);
          swipe(500, 300, 500, 1000, 500);
          sleep(3000);
          if (click('百度一下', 0)) {

          } else {
            sleep(1000);
            click(850, 320);
            click(600, 600);
          }
          sleep(2000);
          upDown(1);
        }
        back()
        sleep(2000);
        if (!textContains('搜索赚').exists()) {
          sleep(1000);
          click(230, 100);
        }
        sleep(1500);
        return aa(i + 1)
      }
      aa(0);
    }

    function oneUpDown(sl) {
      swipe(350, 770, 350, 270, 800);
      sleep(sl || 1000);
      swipe(350, 270, 350, 770, 800);
    }
  }
}

function launch(name) {
  home();
  sleep(2000);
  home();
  sleep(2000);
  var tar = text(name).findOne(2000);
  while (!tar || tar.bounds().left < 8 || tar.bounds().left > 900) {
    swipe(950, 600, 50, 600, 400);
    sleep(2500);
    tar = text(name).findOne(2000);
  }
  const bounds = tar.bounds();
  console.log(bounds, bounds.top, bounds.left)
  click(bounds.left + 60, bounds.top + 100);
}