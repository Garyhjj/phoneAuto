var ra = new RootAutomator();
events.on('exit', function () {
    ra.exit();
});

sleep(5000);
begin();


function begin() {
    function nextTitle() {
        ra.swipe(700, 500, 20, 520, 300, 2);
        sleep(600);
        click1(300, 30);
        sleep(1000);
    }
    var read = (i) => {
        i = i || 1;
        oneUpDown(3000);
        if (i < 13) {
            sleep(3000);
            read(i + 1);
        }
    }
    var refresh = () => {
        click1(50, 1200);
    }
    var enterP = () => {
        click1(300, 490);
    }
    var leave = () => {
        back();
    }
    var start
    var work = (readTime) => {
        enterP();
        sleep(3000);
        // click1(715, 300);
        sleep(1000);
        read();
        leave();
        sleep(1000);
        refresh();
        sleep(2000);
        readTime = readTime || 1.1
        if (readTime <= 0) {
            readTime = 2;
        }
        if (Date.now() - start < 1000 * 60 * 60 * readTime) {
            return work(readTime);
        }
    }
    start = Date.now();
    nextTitle();
    work(rt);
};


function oneUpDown(sl) {
    ra.swipe(350, 770, 350, 270, 600, 2);
    sleep(600);
    click1(350, 120);
    sleep(sl || 400);
    ra.swipe(350, 270, 350, 770, 600, 2);
    sleep(600);
    click1(350, 120);
}