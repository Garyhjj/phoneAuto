const queueTick = [];
let waiting = false;

function nextTick(fn) {
    queueTick.push(fn);
    console.log('add')
    if (!waiting) {
        waiting = true;
        console.log('do')
        process.nextTick(() => {
            // tslint:disable-next-line:prefer-for-of
            waiting = false;
            const copy = queueTick.slice(0);
            queueTick.length = 0;
            for (let i = 0; i < copy.length; i++) {
                copy[i]();
            }
            console.log('done')
        });
    }
}

nextTick(() => console.log(1))
nextTick(() => console.log(2))
nextTick(() => console.log(3))
nextTick(() => console.log(4))

nextTick(() => nextTick(() => {
    console.log(5);
    Promise.resolve().then(() => nextTick(() => console.log(6)))
}))

console.log('\x1b[32m', '', 'I  am cyan');