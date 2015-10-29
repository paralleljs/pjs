onmessage = function (e) {
    var fn = e.data[0];
    var result = fn();
    postMessage(result);
};
