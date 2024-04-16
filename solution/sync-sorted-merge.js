"use strict";

const MinHeap = require("../lib/min-heap")

module.exports = (logSources, printer) => {
  let logsHeap = new MinHeap();
  for(let i = 0; i < logSources.length; i++) {
    // add logSources to the min heap
    logsHeap.add(logSources[i]);
  }

  // pop the smallest date log, pull the next log then add it back to heap
  while(logsHeap.heap.length > 0) {
    const minLog = logsHeap.remove();
    printer.print(minLog.last);
    minLog.pop();
    if (!minLog.drained) {
      logsHeap.add(minLog);
    }
  }
  printer.done();
  return console.log("Sync sort complete.");
};
