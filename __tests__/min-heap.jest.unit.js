const LogSource = require("../lib/log-source");
const MinHeap = require("../lib/min-heap")

describe("Min Heap Behaviors", () => {
  test("It should move the smallest item to top when add an item", () => {
    const source = new LogSource();
    const [log1, log2, log3] = new Array(3).fill(0).map(() => {
      source.pop();
      return { last: source.last };
    })

    const minHeap = new MinHeap();
    expect(minHeap.heap).toEqual([]);

    minHeap.add(log3);
    expect(minHeap.top()).toEqual(log3);

    minHeap.add(log2);
    expect(minHeap.top()).toEqual(log2);

    minHeap.add(log1);
    expect(minHeap.top()).toEqual(log1);
  });

  test("It should return the top item when remove and move the smallest item from the test to the top ", async () => {
    const source = new LogSource();
    const [log1, log2, log3, log4] = new Array(4).fill(0).map(() => {
      source.pop();
      return { last: source.last };
    })

    const minHeap = new MinHeap();
    expect(minHeap.heap).toEqual([]);

    minHeap.add(log2);
    minHeap.add(log3);
    minHeap.add(log1);
    minHeap.add(log4);
    expect(minHeap.top()).toEqual(log1);

    const remove1 = minHeap.remove();
    expect(remove1).toEqual(log1);
    expect(minHeap.top()).toEqual(log2);

    minHeap.remove();
    expect(minHeap.top()).toEqual(log3);

    minHeap.remove();
    expect(minHeap.top()).toEqual(log4);

    minHeap.remove();
    expect(minHeap.top()).toEqual(null);
  });

  test("It should return null when remove from an empty heap", () => {
    const minHeap = new MinHeap();
    expect(minHeap.heap).toEqual([]);

    const item = minHeap.remove();
    expect(item).toBeNull();
  });
});
