

sleep(5000);
zhongqingSearch();

function zhongqingSearch(isSub) {
    function aa(i, isSub) {
      if (i > 15) {
        return
      }
  
      sleep(3000);
      click(500, isSub ? 1200 : 670);
      while (!textContains('搜索').exists() && !textContains('百度一下').exists()) {
        sleep(1000);
      }
      sleep(3000);
      const upDown = (j) => {
        oneUpDown(2000)
        if (j > 1) {
          return
        } else {
          upDown(j + 1)
        }
      }
      upDown(1);
      sleep(2000);
      swipe(500, 300, 500, 1000, 500);
      sleep(3000);
      if (click('百度一下', 0)) {
  
      } else {
        sleep(1000);
        click(850, 320)
  
      }
      sleep(2000);
      upDown(1);
  
      back();
      sleep(1000);
      click(230, 100);
      sleep(1500);
      return aa(i + 1, isSub)
    }
    if (!isSub) {
      aa(0);
    }
    aa(2, true)
  
  }
  function oneUpDown(sl) {
    swipe(350, 770, 350, 270, 800);
    sleep(sl || 1000);
    swipe(350, 270, 350, 770, 800);
  }