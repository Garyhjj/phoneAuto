const zhongqing = require('./zhongqing'),
  tou = require('./tou'),
  tou1 = require('./tou1'),
  haicao = require('./haicao'),
  book1 = require('./book1'),
  book2 = require('./book2'),
  {
    doAllSchedule
  } = require('../util');

let list = [{
  app: zhongqing,
  last: 1000 * 60 * 300
}];

schedueList = [];




async function aa(i) {

  if (i > 18) {
    return
  }
  await zhongqing.controller.click(1000, 430);
  await zhongqing.controller.wait(1500);
  await zhongqing.controller.click(100, 570);
  await zhongqing.controller.wait(3000);
  const upDown = async (j) => {
    await zhongqing.controller.swipe(350, 770, 350, 270, 800);
    await zhongqing.controller.wait(500);
    await zhongqing.controller.swipe(350, 270, 350, 770, 800);
    if (j > 1) {
      return

    } else {
      return upDown(j + 1)
    }
  }

  await upDown(1);

  await zhongqing.controller.click(1000, 330);
  await zhongqing.controller.wait(800);
  await zhongqing.controller.click(700, 530);
  await zhongqing.controller.wait(1500);
  await upDown(1);

  await zhongqing.controller.back();
  await zhongqing.controller.wait(800);
  await zhongqing.controller.click(230, 100);
  await zhongqing.controller.wait(1500);;
  return aa(i + 1)

  // if (i < 40) {
  //     await zhongqing.controller.click(350, 570);
  //     await zhongqing.controller.wait(36000);
  //     await zhongqing.controller.back();
  //     await zhongqing.controller.wait(1000);
  //     aa(i + 1);
  // }
}

const clicksTitles = [[300, 620],[300, 780],[300, 900],[300, 1060],[300, 1320]]
async function aa1(i, site) {
  // site = [100, 490]
  if (i > 5) {
    return
  }
  await zhongqing.controller.click(site[0], site[1]);
  await zhongqing.controller.wait(3000);
  const changeSite = async (y) => {
    if (y > 0) {
      // const max = Math.floor(Math.random()*1000)+ 700,
      // min = Math.floor(Math.random()*400)+ 100;
      const max = 1000;
      min = 400;
      await zhongqing.controller.swipe(350, max, 350, min, 300);
      await zhongqing.controller.wait(300);
      return changeSite(y - 1)
    }
  }

  await changeSite(i);
  const tar = clicksTitles.shift();
  await zhongqing.controller.click(tar[0], tar[1]);
  clicksTitles.push(tar);
  await zhongqing.controller.wait(1000);
  const upDown = async (j) => {
    await zhongqing.controller.swipe(350, 1070, 350, 370, 600);
    await zhongqing.controller.wait(500);
    await zhongqing.controller.swipe(350, 370, 350, 1070, 600);
    if (j > 1) {
      return

    } else {
      return upDown(j + 1)
    }
  }

  await upDown(1);

  await zhongqing.controller.back();
  await zhongqing.controller.wait(800);
  await zhongqing.controller.click(230, 100);
  await zhongqing.controller.wait(800);;
  return aa1(i + 1, site)

  // if (i < 40) {
  //     await zhongqing.controller.click(350, 570);
  //     await zhongqing.controller.wait(36000);
  //     await zhongqing.controller.back();
  //     await zhongqing.controller.wait(1000);
  //     aa(i + 1);
  // }
}
const ls = [
  [300, 250],
  [900, 250],
  [300, 360],
  [900, 360],
  [300, 550],
  [900, 550],
  [300, 740],
  [900, 740],
  [300, 920],
  [900, 920],
  [300, 1110],
  [900, 1110],
  [300, 1300],
  [900, 1300],
  [300, 1490],
  [900, 1490],
  [300, 1680],
  [900, 1680],
  [300, 1870],
  [900, 1870]
];



const beginReading = async () => {
  let lg = ls.length -9;
  while (lg--) {
    await aa1(0, ls[lg]);
    await zhongqing.controller.wait(1000);
  }
}
list = []
beginReading();

// aa(0)
module.exports = () => doAllSchedule(list, schedueList);
