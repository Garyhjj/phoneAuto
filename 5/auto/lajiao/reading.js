sleep(5000);
begin();
// var video = id('headerImage').findOne(5000);
// console.log(video)
function begin (minute) {
    minute = minute> 0? minute: 40;
    // var entry = id('headerImage').findOne(5000);
    // entry.click();
    sleep(2000);
    var video = id('headerImage').findOne(5000);
    var bounds = video.bounds();
    click(bounds.centerX(), bounds.centerY());
    var start = Date.now();
    var one = () => {
        const times = 10 + ~~(Math.random()*15);
        sleep(1000 * times);
        swipe(600,1600,600,200,400);
        sleep(2000);
        if(Date.now() - start < 1000 *60 * minute) {
            one();
        }
    }
    one();
}