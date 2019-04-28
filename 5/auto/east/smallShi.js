sleep(5000);
begin();

function begin (minute) {
    minute = minute> 0? minute: 30;
    var entry = id('l1').findOne(5000);
    entry.click();
    sleep(2000);
    var video = id('a_f').findOne(5000);
    video.click();
    var start = Date.now();
    var one = () => {
        const times = 10 + ~~(Math.random()*15);
        sleep(1000 * times);
        swipe(900,900,150,900,300);
        sleep(2000);
        if(Date.now - start < 1000 *60 * minute) {
            one();
        }
    }
    one();
}