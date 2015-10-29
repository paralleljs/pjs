onmessage = function (e) {
    console.log('worker');
    var fn = e.data;
    var result = fn();
    console.log('worker result', result);
    postMessage(result);
};
