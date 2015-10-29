onmessage = function (e) {
    var arr = e.data;
    console.log(arr);
    postMessage(arr.reduce(function (sum, e) { return sum + e; }));
};
