// Destructuring is a fancy way of declaring multiple variables at once

// By "extracting" values from an object with their property names

let taqe = [
    { name: 'Taqe', age: 24 },
    { name: 'Ali', age: 23 },
];

let { name, age } = taqe[0];
console.log(`My name is ${name}, and i'm ${age} years old`);//just a classic example 🙂

// plus If we only care about some of the properties, we can omit the others
let { name: name1 } = taqe[1];//i changed the name here to name1 cus name is already decleared
console.log(name1);

//object are not in order that mean my destructruring varible names order doesn't matter

//arrays on theother hand and in order therefor order is important
let [one, two, three] = [1, 2, 3];
console.log(one, three);


//the array constructor has two additional static methods to create arrays: from() and of()

//from() is used for converting array-like constructs into an array instance
//The first argument to Array.from() is an arraylike object, which is anything that is iterable or has a property length and indexed elements. 

//strings will be broken up into an array instance using from()

console.log(Array.from("Taqe")); //["T", "a", "q", "e"]

//Sets and Maps can be converted into a new array instance using from()

const m = new Map()
    .set(1, 2)
    .set(3, 4);

const s = new Set().add(1).add(2).add(3).add(4);

console.log(Array.from(m));
console.log(Array.from(s));

//any iterable object can be used
const iter = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;

    }
}

console.log(Array.from(iter));

//the arguments objects can now easily be casted into an array:
function getArgsArray() {
    return Array.from(arguments);
}
console.log(getArgsArray(6,7,8,9));

//Array.from() also accepts a second optional map function argument.this allows you to augment the new array's values without creating an intermediate array first, which is the case if the same were performed with Array.from().map(). a third optional argument specifies the value of (this) inside the map function 
//Array.from(object, mapFunction, thisValue);

const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, (x) => x**2);
const a3 = Array.from(a1, function(x) {return x**this.exponent}, {exponent: 2});

console.log(a2);
console.log(a3);


