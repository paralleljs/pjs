function absoluteWorkerPath(relativePath) {
    var href = window.location.href;
    return href.substring(0, href.lastIndexOf('/')) + '/' + relativePath;
}

describe('Random Web Worker Tests', function () {

    it('does some work', function (done) {
        var worker = new Worker(absoluteWorkerPath('test/playground_sum.js'));
        worker.onmessage = function (e) {
            expect(e.data).toEqual(6);
            done();
        };
        worker.postMessage([1, 2, 3]);
    });

    // See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Example_1_Create_a_generic_asynchronous_eval()
    xit('dispatches a closure', function (done) {
        var worker = new Worker(absoluteWorkerPath('test/playground_worker.js'));
        worker.onmessage = function (e) {
            expect(e.data).toEqual(5);
            done();
        };
        worker.postMessage([function () { return 5; }]);
    });
});
