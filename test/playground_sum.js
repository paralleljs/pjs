onmessage = function (e) {
    var arr = e.data;
    postMessage(arr.reduce(function (sum, e) { return sum + e; }));
};
