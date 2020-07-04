//请求横屏截图
sleep(1000 * 6);
requestScreenCapture(true);


// //获取在点(100, 100)的颜色值
// var color = images.pixel(img, 847, 538);
// //显示该颜色值
// toast(colors.toString(color));
// console.log(colors.toString(color))

// var color1 = images.pixel(img, 822, 590);

// console.log(colors.toString(color1))
// console.log(colors.isSimilar(color1, color))

// #ffeeeeee

// huakuai 120,975
// yinying 
sleep(5000);

testHuaKuai();

function testHuaKuai() {
    console.log(111)

    if (text('拖动滑块').exists()) {
        console.log(222)
        sleep(2000);
        //截图
        var img = captureScreen();
        var res = findColorInRegion(img, '#ffeeeeee', 400, 538, 500, 1, 8);

        console.log(res.x, res.y);
 

        swipe(120, 975, res.x + 10, 975, 800);
        // var width = 900;
        // while (width) {
        //     var color = images.pixel(img, width, 538);
        //     console.log(color);
        //     if (colors.isSimilar('#ffeeeeee', color)) {
        //         break;
        //     }
        //     width = width - 20;
        // }
        // console.log(width)
        // swipe(120, 975, width -10, 975, 800);
    }
}