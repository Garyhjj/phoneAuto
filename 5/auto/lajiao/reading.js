sleep(5000);
begin();
// var video = id('headerImage').findOne(5000);
// console.log(video)
function begin (minute) {
    minute = minute> 0? minute: 60;
    // var entry = id('headerImage').findOne(5000);
    // entry.click();
    // sleep(2000);
    // swipe(400,300,400,1500,800);
    // sleep(2000);
    // var video = id('headerImage').findOne(5000);
    // var bounds = video.bounds();
    // click(bounds.centerX(), bounds.centerY());
    var start = Date.now();
    var one = (i) => {
        const times = 10 + ~~(Math.random()*15);
        sleep(1000 * times);
        const x = ~~(Math.random() * 300 +400);
        const y = ~~(Math.random() * 100);
        swipe(x,1600 -y,x +10,200+y,400);
        sleep(2000);
        // if(i > 10) {
        //     back();
        //     begin(minute)
        //     return;s
        // }
        if(Date.now() - start < 1000 *60 * minute) {
            one(i+ 1);
        }
    }
    one(0);
}