"use strict";

const MinHeap = require("../lib/min-heap");

module.exports = async (logSources, printer) => {
  return new Promise((resolve, reject) => {
    let logsHeap = new MinHeap();
    for (let i = 0; i < logSources.length; i++) {
      // add logSources to the min heap
      logsHeap.add(logSources[i]);
    }

    // popAsync the smallest date log, no need to wait it to fulfill
    // the last and the drained value of the log is updated right away when popAsync is called
    try {
      while(logsHeap.heap.length > 0) {
        const minLog = logsHeap.remove();
        printer.print(minLog.last);
        minLog.popAsync().then((log) => {
          // process log data if needed in parallel with print
        }).catch((e) => {
          throw e;
        })
        if (!minLog.drained) {
          logsHeap.add(minLog);
        }
      }
      printer.done();
      resolve(console.log("Async sort complete."))
    } catch(e) {
      reject(e);
    }
  });
};

// recursive approach, works the same way
const repeat = (logsHeap, printer) => {
  if (logsHeap.heap.length < 1) {
    return
  }

  const minLog = logsHeap.remove();
  printer.print(minLog.last);
  minLog.popAsync().then(() => {
    // process logs
  })

  if (!minLog.drained) {
    logsHeap.add(minLog);
  }

  repeat(logsHeap, printer)
}