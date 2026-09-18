// 03. 함수 — 실행: node 03-functions.js

// 1. 함수 선언문: 선언문보다 앞에서 호출할 수 있어요.
console.log(add(2, 3)); // 5
function add(a, b) {
  return a + b;
}
// 반환문이 없거나 return;만 있으면 undefined를 반환해요.

// 2. 함수 표현식: 함수를 값으로 변수에 저장해요.
const subtract = function (a, b) {
  return a - b;
};
console.log(subtract(5, 2)); // 3
// const로 선언한 subtract는 초기화 전에 호출할 수 없어요.

// 3. 화살표 함수
const multiply = (a, b) => a * b; // 표현식 하나면 return 생략 가능
const double = number => number * 2; // 단순한 매개변수 하나일 때 괄호 생략 가능
const divide = (a, b) => {
  return a / b; // 중괄호 본문에서 값을 반환하려면 명시적인 return 필요
};
console.log(multiply(2, 3), double(4), divide(8, 2)); // 6 8 4
// 기본값, 구조 분해, 나머지 매개변수가 있으면 하나여도 괄호가 필요해요.
const doubleDefault = (number = 1) => number * 2;
console.log(doubleDefault()); // 2
// 중괄호 본문에 return이 없으면 undefined를 반환해요.
const showMessage = () => {
  console.log('hello');
};
const messageResult = showMessage(); // hello
console.log(messageResult); // undefined

// 객체를 바로 반환할 때는 괄호로 감싸요.
const makeUser = name => ({ name: name });
console.log(makeUser('Min')); // { name: 'Min' }

// 4. 기본 매개변수: 인자를 생략하거나 undefined를 전달하면 적용돼요.
function greet(name = '방문자') {
  return `안녕, ${name}`;
}
console.log(greet()); // 안녕, 방문자
console.log(greet(null)); // 안녕, null: null에는 기본값이 적용되지 않아요.

// 5. 콜백: 다른 함수에 인자로 전달하는 함수
function calculate(a, b, operation) {
  return operation(a, b);
}
console.log(calculate(2, 3, add)); // 5
console.log(calculate(2, 3, (a, b) => a * b)); // 6
// add는 함수를 전달하고, add(2, 3)은 실행 결과를 전달해요.
// 콜백이라고 반드시 비동기인 것은 아니에요.

// 6. 스코프: 변수를 사용할 수 있는 범위
const color = 'blue';
if (true) {
  const color = 'red'; // 다른 스코프의 같은 이름: 섀도잉
  console.log(color); // red
}
console.log(color); // blue
// let과 const는 블록 스코프, var는 함수 스코프예요.
function showScope() {
  if (true) {
    var visible = 10;
    let hidden = 20;
    console.log(hidden); // 20
  }
  console.log(visible); // 10
  // console.log(hidden); // ReferenceError
}
showScope();
// visible은 showScope 함수 밖에서는 접근할 수 없어요.

// 7. 클로저: 함수가 선언된 곳의 바깥 변수에 계속 접근할 수 있어요.
function createCounter() {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}
const nextCount = createCounter();
console.log(nextCount()); // 1
console.log(nextCount()); // 2
// createCounter 실행이 끝나도 반환된 함수가 count를 유지해요.
// 변수의 접근 범위는 호출 위치가 아닌 선언 위치를 기준으로 결정돼요.

// 8. this: 일반 함수는 호출 방식에 따라 달라져요.
const user = {
  name: 'Min',
  getName() {
    return this.name;
  },
};
console.log(user.getName()); // Min: user가 this
const otherUser = { name: 'Kim', getName: user.getName };
console.log(otherUser.getName()); // Kim: 같은 함수여도 this가 달라져요.
const getName = user.getName;
// getName(); // user와의 연결이 사라져요. 환경에 따라 오류 또는 다른 결과 발생
const boundGetName = user.getName.bind(user);
console.log(boundGetName()); // Min: bind로 this 고정

// 화살표 함수는 자신의 this를 만들지 않고 바깥의 this를 사용해요.
const account = {
  name: 'Lee',
  makeReader() {
    return () => this.name;
  },
};
const readName = account.makeReader();
console.log(readName()); // Lee: makeReader 호출 때의 this 사용
