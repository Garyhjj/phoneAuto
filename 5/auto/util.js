function oneUpDown(sl) {
    swipe(350, 770, 350, 270, 800);
    sleep(sl || 1000);
    swipe(350, 270, 350, 770, 800);
}

function launch(name) {
    if (name) {
        launchApp(name);
        sleep(1500);
        click('允许', 1);
    }
}


function isActivityExists(ac, waitTime) {
    if (ca().indexOf(ac) > -1) {
        return true;
    }
    var begin = Date.now();
    while (Date.now() - begin < waitTime) {
        if (ca().indexOf(ac) > -1) {
            return true;
        }
        sleep(2000);
    }
}

function ca() {
    return currentActivity()
}

module.exports = {
    oneUpDown: oneUpDown,
    launch: launch,
    isActivityExists: isActivityExists,
    ca: ca
};