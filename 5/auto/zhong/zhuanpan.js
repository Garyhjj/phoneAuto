function start(i){
    i =i || 0;
    click(902,1050);
    sleep(6000);
    click(530,1000);
    sleep(3000);
    back();
    sleep(3000);
    if(i<100){
        start(i+1);
    }
}

sleep(5000);
start(0);