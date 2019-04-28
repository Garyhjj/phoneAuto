var entryID = 'll_tab2_layout';
var videoID = 'rl_video';

sleep(5000);
begin();

function begin(minute) {
    minute = minute > 0 ? minute : 30;
    var entry = id(entryID).findOne(5000);
    var start = Date.now();
    var one = () => {
        entry.click();
        sleep(2000);
        var video = id('l1').findOne(5000);
        video.click();
        const times = 35 + ~~(Math.random() * 20);
        sleep(1000 * times);
        back();
        sleep(2000);
        if (Date.now - start < 1000 * 60 * minute) {
            one();
        }
    }
    one();
}