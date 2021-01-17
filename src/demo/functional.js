// const array = [1, 2, 3, 4, 66, 76, 6];
// let k = 3;

// function filterNumbers(num, array) {
//   let newArray = [];
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] % num === 0) {
//       newArray.push(array[i]);
//     }
//   }

//   return newArray;
// }

// function filterNumbers(num, array) {
//   return array.filter((el) => el % num === 0);
// }

// let result = filterNumbers(k, array);
// console.log("AAAAA======>>", result)


// function sum(a){
//     let b = a + 15;
//     return function(c){
//         let d = b + c;
//         return d;
//     }
// }

// let result = sum(5);
// console.log(result)
// console.log(result(20));

// // kam karox enq kanchel ajnpes vor miangamic 2 n el kanchvi

// console.log(sum(5)(20));



// Decorator

function decorator(callBack){
    console.log("<<<--------function is started--------->>>");
    return callBack;
}

function sum(a,b){
    return a+b;
}

console.log(decorator(sum)(7,7))
console.log(decorator((x,y)=> {
    return x*y;
})(10,20));