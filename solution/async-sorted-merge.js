"use strict";

const MinHeap = require("../lib/min-heap");

module.exports = async (logSources, printer) => {
  return new Promise((resolve, reject) => {
    let logsHeap = new MinHeap();
    for (let i = 0; i < logSources.length; i++) {
      // add logSources to the min heap
      logsHeap.add(logSources[i]);
    }

    try {
      // while(logsHeap.heap.length > 0) {
      //   const minLog = logsHeap.remove();
      //   printer.print(minLog.last);
      //   minLog.popAsync().then((log) => {
      //     // process log data if needed in parallel with print
      //   }).catch((e) => {
      //     throw e;
      //   })
      //   if (!minLog.drained) {
      //     logsHeap.add(minLog);
      //   }
      // }
      // printSortedLogs(logsHeap, printer, resolve);
      // printer.done();
      // resolve(console.log("Async sort complete."))

      // recursive approach to avoid create too many concurrent promises due to space limit
      function sortAndPrintLogs() {
        if (logsHeap.heap.length < 1) {
          printer.done();
          return resolve(console.log("Async sort complete."))
        }

        const minLog = logsHeap.heap[0];
        printer.print(minLog.last);
        // heap remove and add operations will run at the same time with popAsync
        logsHeap.remove();
        minLog.popAsync().then(() => {
          // function sortAndPrintLogs should be called after popAsync() is fulfilled
          // to avoid generating too many concurrently running promises which costs extra spaces
          // we can move sortAndPrintLogs out of the popAsync to run faster if we don't care about the spaces
          sortAndPrintLogs();
        });

        if (!minLog.drained) {
          logsHeap.add(minLog);
        }
        // we can move sortAndPrintLogs here to speed up if space is not an issue
        // sortAndPrintLogs();
      }
      sortAndPrintLogs();
    } catch(e) {
      reject(e);
    }
  });
};
