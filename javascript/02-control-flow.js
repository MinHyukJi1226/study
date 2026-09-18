// 02. 조건문과 반복문 — 실행: node 02-control-flow.js

// 1. if / else if / else: 조건을 boolean으로 판단해요.
const score = 85;
if (score >= 90) {
  console.log('A');
} else if (score >= 80) {
  console.log('B'); // B
} else {
  console.log('C');
}

// 2. switch: 값은 엄격한 비교(===) 방식으로 비교해요.
const role = 'editor';
switch (role) {
  case 'admin':
    console.log('관리자');
    break;
  case 'editor':
    console.log('편집자'); // 편집자
    break;
  default:
    console.log('방문자');
}
// break가 없으면 다음 case의 코드까지 이어서 실행될 수 있어요.

// 3. for: 초기화 → 조건 확인 → 본문 실행 → 증감 → 조건 확인
for (let i = 0; i < 3; i += 1) {
  console.log(i); // 0, 1, 2
}
// console.log(i); // ReferenceError: let i는 반복문 안에서만 사용 가능

// 4. while: 조건을 먼저 확인해요.
let count = 0;
while (count < 2) {
  console.log(count); // 0, 1
  count += 1;
}

// do...while: 본문을 최소 한 번 실행한 다음 조건을 확인해요.
let remaining = 0;
do {
  console.log(remaining); // 0
  remaining -= 1;
} while (remaining > 0);

// 5. continue는 이번 반복을 건너뛰고, break는 반복문을 종료해요.
for (let number = 1; number <= 5; number += 1) {
  if (number === 2) continue;
  if (number === 4) break;
  console.log(number); // 1, 3
}

// 6. for...of: 배열, 문자열 등 순회 가능한 값의 요소를 꺼내요.
const fruits = ['apple', 'banana'];
for (const fruit of fruits) {
  console.log(fruit); // apple, banana
}
// const는 각 반복마다 새로 만들어지는 변수이므로 사용할 수 있어요.

// for...in: 객체의 열거 가능한 문자열 키를 순회해요. 상속된 키도 포함될 수 있어요.
const user = { name: 'Min', age: 20 };
for (const key in user) {
  if (Object.hasOwn(user, key)) {
    console.log(key, user[key]); // name Min / age 20
  }
}
// 배열의 값을 순회할 때는 for...of를 사용해요.
