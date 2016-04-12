## Initial design sketch for ||js

### Motivation
Provide an API to batch work and dispatch them in parallel.

### Intended API
The API should look something like:
```js
var arr = [ // really long array ];
var square = Parallel.reduce(arr, lambda i: i *i);
// square is now a concrete object that can be queried.
```

However, the way it's different from LinQ like query syntax is because of the underlying dispatch. Consider `arr` to be an array of 1024 * 1024 numbers. ||js maintains a pool of webworkers, in which it dispatches slices of the array `arr` for the reduce function. Thus, in this case, if we had a pool of 8 webworkers, the array will be sliced equally into 8 parts, and dispatched to the webworker, who would take the input and function, process it, and then return back the array to the callee.

Traditional APIs, at this point, would embed square as a `Promise<Array>`. However, we claim that by the time program execution reaches `square`, it would be a complete object.


#### Parallel.reduce()
This function is used to dispatch a giant array into multiple webworker tasks.

#### Parallel.main()
This is the main function, which is wraps multiple functions together. These functions are main blocks of your javascript program.


### Sample Bootstrapping:
```js
// Some bootstrapping is required. Consider a web-app of the following style:
function onStart() {
...
}
setTimeout(function everySecond() { ... }), 1000);

// Would be now rewritten as:
Parallel.main(onStart)
  .withTimeout(everySecond, 1000)
  .withTimeout(everyMinute, 60 * 1000)
  .withOnce(After2minutes, 2 * 60 * 1000)
  .start();

```


