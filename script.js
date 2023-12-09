// const reduce = (array, rule, buildingUp) => {
//     for(let i = 0; i < array.length; i++){
//         buildingUp = rule(buildingUp , array[i]);
//     }
//     return buildingUp;
// }

// const adding = (a, b) => a + b;
// // const summing = reduce([1,2,3], adding, 1)

// // console.log(summing);


// const array1 = [1, 2, 3, 4];

// // 0 + 1 + 2 + 3 + 4
// const initialValue = 0;

// const sumWithInitial = array1.reduce(
//   adding,
//   initialValue,
// );

// console.log(sumWithInitial);


// const intersection = (arrays) => {
//     return arrays.reduce((acc, curr) => {
//         console.log(acc, curr);
//       return curr.filter(el => acc.includes(el));
//     });
//   };
  
//   console.log(intersection([[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]]));
// //   should log: [5, 15]

// let num = 10;

// const add3 = (x) => {
//     num++;
//     return x + 3;
// };

// const result = add3(7);
// console.log(result, num);

// const func1 = () => {
//     let count = 0;
//     const add3 = (num) => {
//         count++
//         return num + 3;
//     }
//     return add3;
// };

// const generatedFunc = func1();
// console.log(generatedFunc);
// const result = generatedFunc(2);
// console.log(result);

const outre = () => {
    let counter = 0
        const incrementCounter = () => {
            if(counter >= 2){
                console.log("can't run!");
                return counter;
            }
            counter++;
            console.log(counter);
            // return counter;
        }
        return incrementCounter
};

const newfun = outre();
newfun();
newfun();
newfun();
// newfun();





// const intersection = (array) => {
//     let result=[];
//     for(let i = 0; i <array.length; i++){
//         for(let j = 0; j < array.length[i]; j++){
//             let element = array[i][j];
//             console.log(element);
//             if(array[i] == array[j]){
//                 result.push(array[i]);
//             }
//         }
//     }
//     return result;
// };

// let arrays = [[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]]
// console.log(intersection(arrays));



// let arrayOfArrays = [[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]];
// let result = [];

// for (let i = 0; i < arrayOfArrays.length; i++) {
//     for (let j = 0; j < arrayOfArrays[i].length; j++) {
//         if(arrayOfArrays[j] === arrayOfArrays[j+1]){
//             result.push(arrayOfArrays[j]);
//         }
//     }
// }
// console.log(result);


// function after(count, func) {
//     let counter = 0;
//     function incrementCounter () {
//               counter ++;
//             //   console.log(counter);
//             }
//             if(count == counter){
//                 func();
//             } 
// }


// const called = function() { console.log('hello') };
// const afterCalled = after(3, called);
// afterCalled(); // => nothing is printed
// afterCalled(); // => nothing is printed
// afterCalled(); // => 'hello' is printed



// CHALLENGE 5
// function after(count, func) {
// 	let numCalls = 0
//   function calledAfter() {
//     numCalls++;
//     if(numCalls == count) {
//       func()
//     }
//   }
  
//   return calledAfter
// }

// /*** Uncomment these to check your work! ***/
// const called = function() { console.log('hello') };
// const afterCalled = after(3, called);
// afterCalled(); // => nothing is printed
// afterCalled(); // => nothing is printed
// afterCalled(); // => 'hello' is printed

// function once(func) {
// 	let output;
//   function callOnce(x) {    
//     if(output > 0){
//       return output;
//     } else {
//       output = func(x)
//       return output;
//     }
//   }
//   return callOnce;
// }

// function addByTwo(num){
//     return num + 2;
// }

// // /*** Uncomment these to check your work! ***/
// const onceFunc = once(addByTwo);
// console.log(onceFunc(4));  // => should log 6
// console.log(onceFunc(9001));  // => should log 6






// function outer() {
//     let counter = 0;
//     function incrementCounter() {
//         counter++;
//     }
//     incrementCounter();
// }

// outer();


// function createFunction(){
//     function hello(){
//         console.log("hello");
//     }

//     return hello;
// }

// const func1 = createFunction();
// func1();

// function createFunctionPrinter(input) {
//     function printingInput (){
//         console.log(input);
//     }

//     return printingInput;
// }

// const printSample = createFunctionPrinter('sample');
//     printSample();

// function outer() {
//     let counter = 0; // this variable is outside incrementCounter's scope
//     function incrementCounter () {
//       counter ++;
//       console.log('counter', counter);
//     }
//     return incrementCounter;
//   }
  
//   const willCounter = outer();
//   const jasCounter = outer();

//   willCounter();
// willCounter();
// willCounter();

// jasCounter();
// willCounter();


// function addByX(x) {
//     function adding(num){
//         let result = 0
//         result= num + x;
//         console.log(result);
//     }
//     return adding;
// }

// const addByTwo = addByX(2);
// addByTwo(1); // => should return 3
// addByTwo(2); // => should return 4

// const addByThree = addByX(3);
// addByThree(1); // => should return 4
// addByThree(2); // => should return 5

// function outer() {
//     let counter = 0;
//         function incrementCounter() {
//             if(counter < 2){
//                 counter++;
//             }
//             console.log(counter);
//         } 
    
    
//         return incrementCounter;
//     };

//     const myNewFunc = outer();

//     myNewFunc();
    // myNewFunc();
    // myNewFunc();
    // myNewFunc();

    // const anotherFunction = outer();

    // anotherFunction();
    // anotherFunction();
    // anotherFunction();
    // anotherFunction();
    // anotherFunction();
    // anotherFunction();
    // anotherFunction();
    // anotherFunction();
    // anotherFunction();

    // myNewFunc();
    // myNewFunc();






// function createFunction() {
//     function multiplyBy2 (num) {
//         return num*2;
//     }
//     return multiplyBy2;
// }

// const generatedFunc = createFunction();
// const result = generatedFunc(3);
// console.log(result);


// function addS(word) {
//     return word += 's';
// }

// console.log(addS('pizza'));
// console.log(addS('bagel'));

// function map(array, callback) {
//     let output = [];
//     for(let i = 0; i < array.length; i++ ){
//         output.push(callback(array[i]));
//     }
//     // console.log(output);
//     return output;
// };

// function addTwo(num) {
//     return num += 2;
// }

// console.log(map([1,2,3], addTwo));


