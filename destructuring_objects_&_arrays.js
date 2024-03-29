'use strict';
// Destructuring is a fancy way of declaring multiple variables at once

// By "extracting" values from an object with their property names

let taqe = [
  { name: 'Taqe', age: 24 },
  { name: 'Ali', age: 23 }
];

let { name, age } = taqe[0];
// console.log(`My name is ${name}, and i'm ${age} years old`);//just a classic example 🙂

// plus If we only care about some of the properties, we can omit the others
let { name: name1 } = taqe[1]; //i changed the name here to name1 cus name is already decleared
// console.log(name1);

//object are not in order that mean my destructruring varible names order doesn't matter

//arrays on theother hand and in order therefor order is important
let [one, two, three] = [1, 2, 3];
// console.log(one, three);

//the array constructor has two additional static methods to create arrays: from() and of()

//from() is used for converting array-like constructs into an array instance
//The first argument to Array.from() is an arraylike object, which is anything that is iterable or has a property length and indexed elements.

//strings will be broken up into an array instance using from()

// console.log(Array.from("Taqe")); //["T", "a", "q", "e"]

//Sets and Maps can be converted into a new array instance using from()

const m = new Map().set(1, 2).set(3, 4);

const s = new Set().add(1).add(2).add(3).add(4);

// console.log(Array.from(m));
// console.log(Array.from(s));

//any iterable object can be used
const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  }
};

// console.log(Array.from(iter));

//the arguments objects can now easily be casted into an array:
function getArgsArray() {
  return Array.from(arguments);
}
// console.log(getArgsArray(6,7,8,9));

//Array.from() also accepts a second optional map function argument.this allows you to augment the new array's values without creating an intermediate array first, which is the case if the same were performed with Array.from().map(). a third optional argument specifies the value of (this) inside the map function
//Array.from(object, mapFunction, thisValue);

const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, (x) => x ** 2);
const a3 = Array.from(
  a1,
  function (x) {
    return x ** this.exponent;
  },
  { exponent: 2 }
);

// console.log(a2);
// console.log(a3);

//simple Array methods

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov} €</div>
  </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



//Reduce Method
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => (acc += mov), 0);

  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = (acc) => {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => (acc += mov), 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => (acc += mov), 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => (acc += int), 0)
    .toFixed(2);

  labelSumInterest.textContent = `${interest}`;
};

// Map Method
const createUserNames = (accounts) => {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

createUserNames(accounts);

const updateUI = (acc) => {
  //? Display Movements
  displayMovements(acc.movements);
  //? Display balance & summary
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};
//* Event handler
let currentAccount;
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //? Display UI and message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    //? clear inputs fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //*Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //* Doing The Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //*Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value)

  if(amount > 0 && currentAccount.movements.some(mov => 
    mov >= amount * 0.1
  )) {
    //* Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex((acc) => {
      return acc.username === currentAccount.username;
    });
    //* Delete account
    accounts.splice(index, 1);

    //* Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];
//slice
// console.log(arr.slice(2)); //['c', 'd', 'e']
// console.log(arr.slice(2, 4)); //['c', 'd']

//REVERSE
// let arr2 = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr2.reverse()); //['e', 'd', 'c', 'b', 'a']

//looping arrays:forEach
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`you deposited ${movement}`);
//   }
//   else {
//     console.log(`you withdrew ${Math.abs(movement)}`);
//   }
//   ;
// }

//getting the  using the index parameter
// movements.forEach((movement, index) => {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: you deposited ${movement}`);
//   }
//   else {
//     console.log(`Movement ${index + 1}: you withdrew ${Math.abs(movement)}`);
//   }
//   ;
// })

//forEach With Maps and Sets
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(`${key}: ${value}`);
// })

//Set
// const currenciesUnique = new Set([
//   ['USD', 'GBP', 'USD', 'EUR', 'EUR']
// ]);

// currenciesUnique.forEach((value, _, set) => {
//   console.log(`${value}: ${value}`);
// })

// const testData1 = {
//   juliaData: [3, 5, 2, 12, 7],
//   kateData: [4, 1, 15, 8, 3],
// };

// const testData2 = {
//   juliaData: [9, 16, 6, 8, 3],
//   kateData: [10, 5, 6, 1, 4],
// };

// const testData3 = {
//   juliaData: testData1.juliaData.slice(1, 4),
//   kateData: [4, 1, 15, 8, 3],
// };

// const testData4 = {
//   juliaData: testData2.juliaData.slice(1, 4),
//   kateData: [10, 5, 6, 1, 4],
// }

// console.log(test.test1);

// const checkDogs = (dogsJulia, dogsKate) => {
//   dogsJulia.forEach((val, i) => {
//     if(val >= 3) {
//       console.log(`Dog number ${i +1} is an adult`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });

//   dogsKate.forEach((val, i) => {
//     if(val >= 3) {
//       console.log(`Dog number ${i +1} is an adult`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// }

// const checkDogs = (dogsJulia, dogsKate) => {
//   const juliaArr = dogsJulia;
//   juliaArr.forEach((val, i) => {
//     if (val >= 3) {
//       console.log(`Dog number ${i + 1} is an adult`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// }

// checkDogs(testData3.juliaData, testData3.kateData);

// const eurToUsd = 1.1;

// const convertor = movements.map((mov) => {
//   return mov * eurToUsd;
// });

// const movementDiscription = movements.map((mov, i) =>
//   `Movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`

// )

//filter
// const deposits = movements.filter((mov) =>
//    mov > 0
// )
// console.log(deposits);

// //reduce
// const balance = movements.reduce((acc, cur) =>
//    acc += cur
// , 0)

// console.log(balance);

//Maximum value

// const Maximum = movements.reduce((acc, mov) => (acc > mov) ? acc : mov, 0)

// console.log(Maximum);

//code challenge
// const TEST_DATA_1 = [5, 2, 4, 1, 15, 8, 3];
// const TEST_DATA_2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = (ages) => {
// const dogsInHumanAge = ages.map((age) =>
//   (age <= 2) ? 2 * age : 16 + age * 4
//   ).filter((age) => age >= 18).reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   ).toFixed(0);

//   return dogsInHumanAge;
// }

// console.log(calcAverageHumanAge(TEST_DATA_1));
// console.log(calcAverageHumanAge(TEST_DATA_2));

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//     );

//     // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

//     return average;
//   };
// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);

//* The Find Method

// const firstWithdrawal = movements.find( mov => mov < 0)

// console.log(firstWithdrawal);
// console.table(accounts)

// const account = accounts.find(acc => acc.owner === 'Jessica Davis')

// console.table(account);

//* EVERY
//! evey only returns true if all the elements in the array satisfy the condition that we passed in 
// console.log(movements.every(mov => mov > 0)); //! false
// console.log(account4.movements.every(mov => mov > 0)); //* true


//* Flat & flatMap
// const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3, [4, [5, 6]], 7, 8]];
// console.log(arrDeep.flat(3));

// const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov)=> acc + mov, 0);
// console.log(overalBalance);

// const overalBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov)=> acc + mov, 0);
// console.log(overalBalance2);


//* Sorting with Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort()); //! sort mutated the array
// console.log(owners);


//* Sorting with Numbers
// console.log(movements);

//* return < 0 A, B (keep order)
//* return > 0 B, A (switch order)

//Ascending
// movements.sort((a, b) => {
//   if(a > b)
//   return 1;
// if(b > a)
// return -1;
// });

// movements.sort((a, b) => a - b);
// console.log(movements);

//Descending
// movements.sort((a, b) => {
//   if(a > b)
//   return -1;
// if(b > a)
// return 1;
// });

// movements.sort((a, b) => b - a);
// console.log(movements);



//* Array Methods Practice
// 1.
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);

console.log(bankDepositSum);

// 2. how many deposits there have been in the bank at leaste $1,000.

// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;

// const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => {
//   if(mov >= 1000){
//     acc++
//   }
//   return acc;
// }, 0)

const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) =>(mov >= 1000 ? acc + 1 : acc), 0)
console.log(numDeposits1000);


// 3. create new object instead of just number or just a string
const sums = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
  // cur > 0 ? sums.deposit += cur : sums.withdrawals += cur;
  sums[cur > 0 ? 'deposit' : 'withdrawals'] += cur;
  return sums;
}, {deposit: 0, withdrawals: 0});

console.table(sums);

// 4. create a simple function to convert  any string to a title case
const convertTitleCase = (title) => {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);
  const expections = ['a', 'an', 'the', 'but', 'or', 'and', 'on', 'in', 'with'];

  const titleCase = title.toLocaleLowerCase().split(' ').map(word => expections.includes(word) ? word : capitzalize(word)).join(' ')
  return capitzalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not to long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));