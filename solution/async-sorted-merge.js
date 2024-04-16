"use strict";

const MinHeap = require("../lib/min-heap");

module.exports = async (logSources, printer) => {
  return new Promise((resolve, reject) => {
    let logsHeap = new MinHeap();
    for (let i = 0; i < logSources.length; i++) {
      // add logSources to the min heap
      logsHeap.add(logSources[i]);
    }

    //popAsync the smallest date log, wait until next log is pulled, then and add it back to heap
    try {
      (async() => {
        while(logsHeap.heap.length > 0) {
          const minLog = logsHeap.remove();
          printer.print(minLog.last);
          await minLog.popAsync();
          if (!minLog.drained) {
            logsHeap.add(minLog);
          }
        }
        printer.done();
        resolve(() => console.log("Async sort complete."));
      })();
    } catch(e) {
      reject(e);
    }
  });
};
