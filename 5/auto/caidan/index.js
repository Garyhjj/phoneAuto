sleep(5000);
begin();

// var c = textContains('立即下载').findOne(500).bounds().top;
// console.log(c);
// click(985, 112)
// watch()
function begin (minute) {
    minute = minute> 0? minute: 60;
    var start = Date.now();
    var one = (i) => {
        const times = 10 + ~~(Math.random()*15);
        sleepAndDo(times, video);
        const x = ~~(Math.random() * 300 +400);
        const y = ~~(Math.random() * 100);
        swipe(x,1800 -y,x +10,100+y,500);
        sleep(2000);
        if(Date.now() - start < 1000 *60 * minute) {
            one(i+ 1);
        }
    }
    one(0);
}

function sleepAndDo(times, fn) {
    var one = 3;
    if(times > one) {
        sleep(one*1000);
        fn();
        return sleepAndDo(times - one, fn);
    }else {
        sleep(times);
        fn();
    }
}


function video() {
    if(!text('立即翻倍').exists()) {
        return;
    }
    text('立即翻倍').click();
    watch();
}


function watch() {
    sleep(15000);
    const close = getCloseWay(0);
    close();
    sleep(2000);
}
  
  function getCloseWay(i) {
    var getALL = () => {
      return textContains('立即下载').findOne(500)
      || textContains('立即查看').findOne(500)
      ||  textContains('点击下载').findOne(500)
    }
    var s = getALL();
    if( i > 13) {
        return  function () {
            click(985, 112);
            sleep(2000);
        };
    }
    if(s) {
      if (s.bounds().top < 1620) {
        sleep(2000);
        return function () {
          click(985, 112);
          sleep(2000);
        };
      }
    }
    sleep(2000);
    return getCloseWay(i+1);
  }