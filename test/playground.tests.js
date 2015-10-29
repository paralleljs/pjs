describe('Random Web Worker Tests', function () {
    it('sums', function (done) {
        var worker = new Worker('playground_sum.js');
        worker.onmessage = function (e) {
            expect(e.data).toEqual(6);
            done();
        };
        worker.postMessage([1, 2, 3]);
    });

    it('dispatches work', function (done) {
        var worker = new Worker('playground_worker.js');
        worker.onmessage = function (e) {
            expect(e.data).toEqual(5);
            done();
        };
        worker.postMessage(function () { return 5; });
        console.log('dispatched');
    });
});
