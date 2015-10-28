/**
 * @fileoverview Describes a single WorkUnit.
 */


// A work unit is a function that works on the worker thread, and posts a light
// weight callback to be run on the parent thread.
WorkUnit = function(fn, on_done, worker) {
  this.work_fn_ = fn;
  this.on_done_ = on_done;
  this.worker_ = worker;
};

// Sets the current worker.
WorkUnit.prototype.set_worker = function(worker) {
  this.worker_ = worker;
};

// do the actual work now.
WorkUnit.prototype.doWork = function() {
  this.result_ = this.work_fn_();
};

// called in the parent thread.
WorkUnit.prototype.NotifyWorkDone = function() {
  this.on_done_(this.result_);
};

WorkUnit.prototype.worker = function() {
  return this.worker_;
};
