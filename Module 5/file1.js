var a = 10; //var is a global scope
var a = 20;
console.log(a); // 20
let a = 10;
let a = 20;
console.log(a); // error

// ? its called IIFE = Immediately Invoked Function Expression
(() => {
  let a = 10;
  console.log(a);
})();

(() => {
  let a = 20; // block scope
  console.log(a);
})();
// output a = 10
// output a = 20
