// Assume a WebWorkerPool exists.
WebWorkerPool = function(pool_size) {
};

// Library namespace
Parallel = {

  main = function(main_func) {
    // A list of generators.
    this.generators_ = [wrap_generator(main_func))];
    
    this.prototype.start = function() {
      var pool = WebWorkerPool(8);
      pool.distribute(generate(this.generators_);
    };

    return this;
  };

  reduce = function(arr, func) {
    if (arr.size > 1024) {
      yield pool.distribute(arr, func);
    }
  }
  
  // Take a func, and make that a generator by forcing yield semantics on it.
  // The assumption is that func will be a generator somewhere down the stack.
  wrap_generator = function(func) {
    return yield(func);
  }
  
  
};
