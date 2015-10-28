/**
 * @fileoverview A Worker pool comprising of WebWorkers.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 */

WebWorkerPool = function(options) {
  this.workers_ = [];
  this.free_workers_ = [];
  this.work_queue_ = [];

  initWorkers(options);
};

WebWorkerPool.prototype.postMessage = function(fn, on_done) {
  if (this.free_workers_.length > 0) {
    worker = this.free_workers_.pop();
    worker.port.postMessage(new WorkUnit(fn, on_done, worker));
  } else {
    work_queue_.add(new WorkUnit(fn, on_done, null));
  }
};

WebWorkerPool.prototype.initWorkers = function(options) {
  for (var i = 0; i < options.worker_pool_size; ++i) {
    worker = new SharedWorker("worker.js"));
    worker.port.start();
    this.workers_.add(worker);
    this.free_workers_.add(worker);
  }
};

// Callback performed once the worker thread finishes up.
WebWorkerPool.prototype.onmessage = function(e) {
  var work_now_completed = e.data;
  work_now_completed.NotifyWorkDone();
  if (this.work_queue_.length > 0) {
    var work = this.work_queue_.pop();
    work.set_worker(work_now_completed.worker());
    work_now_completed.worker().port.postMessage(work);
  } else {
    this.free_workers_.add(work_now_completed.worker());
  }
};
