function f1() {
  console.log("murad");
}
function f1() {
  console.log("muaj");
}
f1(); //Output muaj

// * IIFE method
(function f1() {
  console.log("murad");
})();
(function f1() {
  console.log("muaj");
})();

f1(); //Output muaj
