var util = require('../util.js');
var launch = util.launch;

function lauchDuoFu() {
    launch('多福看看');
    sleep(10000);
  }

module.exports = {
    lauchDuoFu: lauchDuoFu
}