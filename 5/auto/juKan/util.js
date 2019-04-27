var util = require('util.js');
var launch = util.launch;

function lauchJu() {
    home();
    sleep(5000);
    launch('聚看点');
    if (!isActivityExists(juKan, 15000)) {
        lauchJu();
    };
    sleep(15000);
    back();
    sleep(3000);
    click('继续赚钱');
    sleep(3000);
    back();
    sleep(3000);
    click('继续赚钱');
}

module.exports = {
    lauchJu: lauchJu
}