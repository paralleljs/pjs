/**
 * @fileoverview Each worker thread.
 */

importScripts('work_unit.js');

onconnect = function(e) {
  var port = e.ports[0];
  port.onmessage = function(e) {
    var work_to_do = e.data;
    work_to_do.doWork(this);
    port.postMessage(work_to_do);
  };
};

port.start();
