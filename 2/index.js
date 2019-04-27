const zhongqing = require('./zhongqing'),
    zhongqing1 = require('./zhongqing1'),
    tou = require('./tou'),
    tou2 = require('./tou2'),
    haicao = require('./haicao'),
    haicao2 = require('./haicao2'),
    book = require('./book1'),
    book2 = require('./book2'),
    weiTouTiao = require('./weiTouTiao'),
    {
        doAllSchedule
    } = require('../util');

let list = [{
    app:  tou2,
    last: 1000 * 60 * 150
}];

schedueList = [];




async function aa(i, isSub) {
    
    if(i > 10) {
        return
    }
    // await  zhongqing.controller.wait(2000);
    // await zhongqing.controller.click(700, isSub?760:360);
    await  zhongqing.controller.wait(3000);
    await zhongqing.controller.click(500, isSub?970:570);
    await  zhongqing.controller.wait(2000);
    const upDown = async (j) => {
        await zhongqing.controller.swipe(350, 770,350, 270,600);
        await zhongqing.controller.wait(400);
        await zhongqing.controller.swipe(350, 270,350, 770,600);
        if(j > 1) {
            return
    
        }else {
            return upDown(j+1)
        }
    }

    // await upDown(1);

    await zhongqing.controller.click(700, 500);
    await zhongqing.controller.wait(800);
    await zhongqing.controller.click(700, 530);
    await zhongqing.controller.wait(1500);
    await upDown(0);

    await zhongqing.controller.back();
    await zhongqing.controller.wait(800);
    await zhongqing.controller.click(130, 50);
    await zhongqing.controller.wait(1500);
    return aa(i+1,isSub)
    
    // if (i < 40) {
    //     await zhongqing.controller.click(350, 570);
    //     await zhongqing.controller.wait(36000);
    //     await zhongqing.controller.back();
    //     await zhongqing.controller.wait(1000);
    //     aa(i + 1);
    // }
}

async function aa1(i, site) {
    // site = [100, 490]
    if(i > 6) {
        return
    }
    await zhongqing.controller.click(site[0], site[1]);
    await  zhongqing.controller.wait(3000);
    const changeSite = async (y) => {
        if(y > 0) {
            await zhongqing.controller.swipe(350, 870,350, 270,700);
            await  zhongqing.controller.wait(800);
            return changeSite(y - 1)
        }
    }
    
   await changeSite(i);
    await zhongqing.controller.click(300, 600);
    await  zhongqing.controller.wait(1000);
    // await zhongqing.controller.click(300, 650);
    const upDown = async (j) => {
        await zhongqing.controller.swipe(350, 770,350, 270,600);
        await zhongqing.controller.wait(1000);
        await zhongqing.controller.swipe(350, 270,350, 770,600);
        if(j > 2) {
            return
    
        }else {
            return upDown(j+1)
        }
    }

    await upDown(1);

    // await zhongqing.controller.click(700, 230);
    // await zhongqing.controller.wait(800);
    // await zhongqing.controller.click(700, 330);
    // await  zhongqing.controller.wait(1500);
    // await upDown(1);

    await zhongqing.controller.back();
    await zhongqing.controller.wait(2000);
    await zhongqing.controller.click(150, 50);
    await zhongqing.controller.wait(2000);;
    return aa1(i+1,site)
    
    // if (i < 40) {
    //     await zhongqing.controller.click(350, 570);
    //     await zhongqing.controller.wait(36000);
    //     await zhongqing.controller.back();
    //     await zhongqing.controller.wait(1000);
    //     aa(i + 1);
    // }
}
const ls = [[100, 200],[500, 170],[100, 240],[500, 240],[100, 360],
[500, 360],[100, 510],[500, 510], [100, 630], [500, 630],[100, 780],
[500, 780], [100, 930], [500, 930]
,[100, 1080], [500, 1080],[100, 1160], [500, 1160]];

const formatLs = (col) => {
    const begin = 200,
    height = 130;
    col = col || 9;
    ls.length = 0;
    for (let i = 0; i< col; i++)  {
        const y = begin + height * i;
        ls.push([100,y]);
        ls.push([500,y]);
    }
}


const backToMain =async () => {
    const ctr = zhongqing.controller;
    let i = 3;
    while(i --) {
        await ctr.back();
        await ctr.wait(2000)
    }
    await ctr.click(150, 50);
    await ctr.wait(2000);
    await ctr.click(100, 1240);
    await ctr.wait(1000);
    await doAllSchedule([{
        app:  zhongqing,
        last: 1000 * 60 * 130
    }], schedueList);
}
const beginReading = async (last) => {
    formatLs(last?6:9);
    let lg = ls.length;
    await zhongqing.controller.swipe(500,560,500,100,800);
    await zhongqing.controller.wait(2000);
    while(lg -- ) {
        await aa1(0,ls[lg]);
        await zhongqing.controller.wait(3000);
    }
    if(last) {
        // return doAllSchedule([{
        //     app:  tou,
        //     last: 1000 * 60 * 30 
        // }], schedueList);
    }
    // backToMain();
    await zhongqing.controller.swipe(500,1160,500,140,800);
    await zhongqing.controller.wait(3000);
    await beginReading(true)
}


const shipingGuangGao = async (i) => {
    i = i || 0;
    if(i > 20) {
        return;
    }
    await zhongqing.controller.click(680,220);
    await zhongqing.controller.wait(1000*60*55);
    await zhongqing.controller.click(680,80);
    await zhongqing.controller.wait(1000*60*55);
    return shipingGuangGao(i++)
}
 

// list = [];
// backToMain();
// beginReading();

// (async () => {await aa(0);await aa(2, true)})();

// (() => {
    // zhongqing.controller.swipe(500,560,500,100,800);
    // zhongqing.controller.click(680,220);
    
    // formatLs(6)
    // zhongqing.controller.swipe(500,1160,500,140,800);
// })()


module.exports = () => doAllSchedule(list, schedueList);