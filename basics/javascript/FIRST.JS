// const foo = ['one', 'two', 'three'];


//console.log(foo[0]); // one


// let x = f()  can be reassighned whereas var x = f() cannot be reassigned.

// const x = f() cannot be reassigned.  

//let x = 1;

//console.log(x = 90); // imediate change in the value of x and it will print 90

//console.log([0, x = 90, 0,100]);

// y = x = 90;
// y = [90, x = 100];
// x[90] = 100;//means x is an array and we are assigning 100 to the index 90 of the array x.


//console.log(x); // 100
//console.log(y); // [90, 100]



//topic equatinf expressions :

// let x = 90;
// var t = '90';

// if (x === t) {// === is a strict equality operator that checks for both value and type equality. It will return true only if both operands are of the same type and have the same value.
//     console.log('x is equal to t');
// }

// let x = 90;
// let y = 100;

// if(x!==y){ // Returns true if the operands are of the same type but not equal, or are of different type.
//     console.log('x is equal to y');
// }


// let x = '90';
// let y = +(x);
// console.log(typeof x); // string
// console.log(typeof y); // number

// let n = !'cat';
// console.log(n); // false


//comma operator
function getFullName() {
  return this.firstName + " " + this.lastName;
}
const person1 = {
  firstName: "Chris",
  lastName: "Martin",
};

const person2 = {
  firstName: "Chester",
  lastName: "Bennington",
};

// Attach the same function
person1.getFullName = getFullName;
person2.getFullName = getFullName;

console.log(person1.getFullName()); // "Chris Martin"
console.log(person2.getFullName()); // "Chester Bennington"