//1.  _______REVERSE THE ARRAY__________

// var arr = [2, 3, 4, 5, 6, 7];
// var n = 6;

// function reverseArray(arr, N) {
//     // console.log(arr);
//     let start = 0;
//     let end = N - 1;


//     while (start < end) {
//         temp = arr[start];
//         arr[start] = arr[end];
//         arr[end] = temp;
//         start++;
//         end--;
//     }
//     return arr;
// }

// console.log("Reveresed Array is ", reverseArray(arr, n));



//2. _________FIND THE ELEMENT IN ARRAY WHICH IS NOT SMALLER THAN ITS NEIGHBOURS________

// var arr = [1, 4, 6, 23, 2, 18];
// var n = 6;

// function largerThanNeighbours(arr, n) {
//     if (n == 1) return 0;
//     if (arr[0] > arr[1]) console.log(0);
//     if (arr[n - 1] > arr[n - 2]) console.log(n-1);

//     for (let i = 1; i < n -1; i++) {
//         if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
//             console.log(i);
//             // return i;
//         }
//     }
// }

// console.log("Larger element is at index ");
// largerThanNeighbours(arr, n)



//3. _________FIND THE MINIMUM AND MAXIMUM ELEMENT IN AN ARRAY_________

// var arr = [1, 4, 6, 23, 2, 18];
// var n = 6;

// function minelement(arr, n) {
//     let Min = arr[0];
//     for (let i = 0; i < n; i++) {
//         Min = Math.min(Min, arr[i]);
//     }
//     return Min;
// }

// function maxelement(arr, n) {
//     let Max = arr[0];
//     for (let i = 0; i < n; i++) {
//         Max = Math.max(Max, arr[i]);
//     }
//     return Max;
// }

// console.log("Minimum element is ", minelement(arr, n));
// console.log("Maximum element is ", maxelement(arr, n));


//4._________SORT THE ARRAY__________

// var arr = [1, 4, 6, 23, 2, 18];
// var n = 6;

// function sortArray(arr, n) {
//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             let temp;
//             if (arr[j] < arr[i]) {
//                 temp = arr[j];
//                 arr[j] = arr[i];
//                 arr[i] = temp;
//             }
//         }
//     }
//     return arr;
// }

// console.log("Sorted array is ", sortArray(arr, n));



//5.  ______________-K’th Smallest/Largest Element in Unsorted Array_________

// var arr = [1, 4, 6, 23, 2, 18];
// var n = 6;
// var k = 3;

// function kthSmallest(arr, n, k) {
//     arr.sort((a, b) => a - b);
//     return (arr[k - 1]);
// }

// console.log('kth smallest element array is ', kthSmallest(arr, n, k));



//6.  _____________Count number of occurrences of an integer in a sorted array____________
// var arr = [4, 4, 4, 4, 2, 4];
// var n = 6;
// var x = 4;

// function occurrence(arr, x) {
//     let temp = 0;
//     for (let i = 0; i < n; i++) {
//         if (arr[i] == x)
//             temp++;
//     }
//     return temp;
// }

// console.log(`Occurence of ${x} is `, occurrence(arr, x));


//7.  __________Find Subarray with given sum___________

// var arr = [1, 4, 20, 3, 10, 15];
// var n = 6;
// var sum = 11;

// function subArray(arr, n, sum) {
//     for (let i = 0; i < n; i++) {
//         let currentsum = arr[i];
//         for (let j = i + 1; j < n; j++) {
//             if (currentsum + arr[j] == sum) {
//                 console.log(`Subarray from index ${i} to ${j}`);
//             }
//             currentsum = currentsum + arr[j];
//         }
//     }
//     console.log("No subarray found");
//     return;
// }

// subArray(arr, n, sum);


//8._______________REMOVE DUPLICATE ELEMENTS FROM ARRAY________________


// var arr = [1, 2, 2, 2, 3, 3, 4];
// var n = 7;

// let newArr = [];
// function removeDuplicate(arr, n) {
//     for (let i = 0; i < n; i++) {
//         let count = 0;
//         for (let j = 0; j < newArr.length; j++) {
//             if (newArr[j] == arr[i]) {
//                 count++;
//             }
//         }
//         if (count == 0) {
//             newArr.push(arr[i])
//         }
//     }
//     return newArr;
// }
// console.log("New array is ", removeDuplicate(arr, n));

//____________________________________
// const newArr = new Set(arr);
// const uniqueArr = Array.from(newArr)

// console.log("New array is ", uniqueArr);




//9. _____________MOVE ALL NEGATIVE ELEMENTS ON ONE SIDE OF THE ARRAY____________
// var arr = [1, 2, 3, -2, -4, -5];
// var n = 7;

// function negativeElementToOneSide(arr, n) {
//     let temp, j = 0;
//     for (let i = 0; i < n - 1; i++) {
//         if (arr[i] < 0) {
//             temp = arr[i];
//             arr[i] = arr[j];
//             arr[j] = temp;
//             j++;
//         }
//     }
//     return arr;
// }

// console.log("updated array is ", negativeElementToOneSide(arr, n));


//10. _____________FIND THE UNION OF TWO ARRAYS______________
// var arr1 = [1, 2, 3, 3, 2, 4];
// var arr2 = [2, 3, 3, 2, 4];

// function unionofTwoArrays(arr1, arr2) {
//     const newarr1 = new Set(arr1);
//     const newarr2 = new Set(arr2);
//     const union = [...new Set([...newarr1, ...newarr2])];
//     return union;
// }

// console.log("Union of two arrays ", unionofTwoArrays(arr1, arr2));


//11. ____________INTERSECTION OF TWO ARRAYS___________________
// var arr1 = [1, 2, 3, 3, 2, 4];
// var arr2 = [2, 3, 3, 2, 4];
// let arr3 = [];

// function intersectionofTwoArrays(arr1, arr2) {
//     for (let i = 0; i <= arr1.length - 1; i++) {
//         for (let j = 0; j <= arr2.length - 1; j++) {
//             if (arr1[i] == arr2[j]) {
//                 arr3.push(arr1[i]);
//             }
//         }
//     }
//     return [...new Set(arr3)];
// }

// console.log("Intersection of two arrays ", intersectionofTwoArrays(arr1, arr2));



//12. ___________ROTATE THE ARRAY CLOCKWISE ONE TIME______________
// var arr = [1, 2, 3, 4, 5, 6];
// var n = 6;

// var last = arr[n - 1];
// for (let i = n - 1; i >= 0; i--) {
//     arr[i] = arr[i - 1];
// }
// arr[0] = last;


// console.log(arr);


//13.  _______________FIND MISSING ELEMENT IN AN ARRAY______________
// var arr = [1, 2, 4, 6, 3, 7, 8]
// var n = 8;
// let temp;

// for (let j = 1; j <= 8; j++) {
//     for (let i = 0; i < n - 1; i++) {
//         if (j == arr[i]){
//             // console.log(j);
//             continue;
//         }
           
//     }
// }

// console.log(val)



// const cluster = require('cluster');
// const os = require('os');
// const express = require('express');

// const numCPUs = os.cpus().length;

// console.log(numCPUs);

// if (cluster.isMaster) {
//   console.log(`Master process ${process.pid} is running`);


//   for (let i = 0; i < numCPUs; i++) {
//     const worker = cluster.fork();

//     // Send a message to the worker from the master
//     worker.send({ msg: 'Hello Worker' });

//     //Listen for messages from the worker
//     // worker.on('message', (message) => {
//     //   console.log(`Master received message from worker ${worker.process.pid}:`, message);
//     // });
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker process ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } else {
//   console.log(`Worker process ${process.pid} is running`);

//   // Listen for messages from the master
//   process.on('message', (message) => {
//     console.log(`Worker ${process.pid} received message from master:`, message);

//     // Send a message back to the master
//     // process.send({ msg: `Hello Master from worker ${process.pid}` });
//   });

//   // Example of an Express server running in each worker
//   const app = express();
//   app.get('/', (req, res) => {
//     res.send(`Hello from worker ${process.pid}`);
//   });

//   app.listen(3000, () => {
//     console.log(`Worker ${process.pid} started server on port 3000`);
//   });
// }




setTimeout(() => {
  console.log('timeout');
}, 2000);
setImmediate(() => {
  console.log('immediate');
});
console.log("I am very first");
process.nextTick(() => {
  console.log("Process.nextTick() is calling");
});
new Promise((resolve, reject) => {
  console.log("I am promise");
  resolve();  
})
.then(() => {
  console.log("Promise resolved");
})

// setTimeout(() => {
//   console.log("setTimeout callback executed");
// }, 0);

// setInterval(() => {
//   console.log("setInterval callback executed");
// }, 2000);

// setImmediate(() => {
//   console.log("I am setImmediate()");
// });














