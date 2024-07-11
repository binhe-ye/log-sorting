Challenge: Log Sorting

<br>

## Instructions

We have a number of [**log sources**](https://github.com/sesolabor/coding-challenge/blob/master/lib/log-source.js). Each log source contains N log entries. Each entry is a javascript object with a timestamp and message. We don't know the number of log entries each source contains - however - we do know that the entries within each source are sorted 🕒 **chronologically** 🕒.

### The Objectives:

1. **_Drain all of the log sources_** for both the synchronous and asynchronous solutions.
   - [Synchronous](https://github.com/sesolabor/coding-challenge/blob/31313e303c53cebb96fa02f3aab473dd011e1d16/lib/log-source.js#L37)
   - [Asynchronous](https://github.com/sesolabor/coding-challenge/blob/31313e303c53cebb96fa02f3aab473dd011e1d16/lib/log-source.js#L45)
1. Print all of the entries, across all of the sources, in chronological order.
   - We don't need to store the log entries, just print them to stdout.
1. Do this _efficiently_. There are time and space complexities afoot!


## Solutions

1. **_Sort all logs(brute force)_**
   - Create an array with N * k elements, k is the logSources count
   - Sort the array and output all logs
   - Time complexity `O(N * k * log(N*k))`
   - Space complexity `O(N * k)`
   - There isn't enough memory the store N*k logs,
   this will not work

2. **_Merge sort_**
   - Merge 2 sorted logSource, merge k/2 times
   - Recursively merge logSources until all are merged
   - Time complexity `O(N * k * log(k))`
   - Space complexity `O(N * k)`
   - Same issue as above with the space complexity 

3. **_Use min heap(Recommended)_**
   - Create a min Heap and insert first element of all logSource,
   in this particular demo, we insert the logSource instance into the Heap,
   when we do heapify, we compare the **_log.last.date_** // k*log(k) for initial the heap
   - Pop logSource from the heap and output the last log
   - Update the last log of the popped logSource
   - Add the logSource back the heap if logSource is not drained
   - Keep doing it until the heap is empty // (N - 1) * k times loop
   - Time complexity `O(N * k * log(k))`
   - Space complexity `O(K)`
   - This is the solution we use in the code

4. **_Use Binary search_**
   - This is similar to min heap approach, the difference is that instead of using a heap,
   we can use a sorted array and use binary search to insert new item
   - Create an array and insert all logSource and sort by log.last.date. // `O(k*log(k))`
   - Remove first logSource and output it
   - Update the last log of the removed logSource
   - Insert the logSource back the array using binary search if logSource is not drained
   - Keep doing it until the array is empty // (N - 1) * k times Binary search loop
   - Time complexity `O(N * k * log(k))`
   - Space complexity `O(K)`
   - This solution is similar to the min heap approach

## Run Solutions
set `sourceCount` to tun 
`npm start`

Tests are added for the min heap class
`npm test`


