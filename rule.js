const controller = require('./5/tou').controller;

async function nextTitle() {
    await controller.swipe(500, 700, 520, 70, 500);
    return await controller.wait(500);
}
async function enterPaper() {
    await controller.click(400, 430);
}

const back = async () => {
    await controller.click(50, 70);
    await controller.wait(500);
}

async function afterRead() {
    await back();
    await nextTitle();
    await enterPaper();
}

enterPaper();

module.exports = {
    // 模块介绍
    summary: 'my customized rule for AnyProxy',
    // 发送请求前拦截处理
    * beforeSendRequest(requestDetail) {
        console.log(requestDetail.url);
        const url = requestDetail.url;
        if (url.indexOf('http://rpnews.itaoxiaoshuo.com//auth/start_video_playing.do') > -1) {
            const pas = url.slice(url.indexOf('?') + 1);
            const pasList = pas.split('&').map(_ => _.split('='));
            const duration = +pasList.find(_ => _[0] === 'duration')[1];
            console.log(duration);
            if (duration > 120) {
                afterRead();
            } else {
                setTimeout(() => {
                    afterRead();
                }, (duration + 8) * 1000)
            }
        }
    },
    // 发送响应前处理
    // *beforeSendResponse(requestDetail, responseDetail) { /* ... */ },
    // // 是否处理https请求
    // *beforeDealHttpsRequest(requestDetail) { /* ... */ },
    // // 请求出错的事件
    // *onError(requestDetail, error) { /* ... */ },
    // // https连接服务器出错
    // *onConnectError(requestDetail, error) { /* ... */ }
};