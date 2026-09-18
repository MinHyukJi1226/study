// 04. 배열과 객체 — 실행: node 04-arrays-and-objects.js

// 1. 배열: 인덱스는 0부터 시작해요.
const fruits = ['apple', 'banana'];
console.log(fruits[0], fruits.length); // apple 2
fruits.push('orange'); // 끝에 추가: 원본 변경
const lastFruit = fruits.pop(); // 마지막 요소 제거 후 반환: 원본 변경
fruits[0] = 'grape';
console.log(fruits, lastFruit); // ['grape', 'banana'] orange
console.log(fruits[99]); // undefined
console.log(Array.isArray(fruits)); // true
// const로 선언한 배열도 요소를 바꿀 수 있어요. 다른 배열로 재할당은 불가능해요.

// 2. 자주 사용하는 배열 메서드
const numbers = [1, 2, 3, 4];
console.log(numbers.map(n => n * 2)); // [2, 4, 6, 8]: 변환한 새 배열
console.log(numbers.filter(n => n % 2 === 0)); // [2, 4]: 조건에 맞는 새 배열
console.log(numbers.find(n => n > 2)); // 3: 첫 번째 일치 요소, 없으면 undefined
console.log(numbers.some(n => n > 3)); // true: 하나라도 일치
console.log(numbers.every(n => n > 0)); // true: 모두 일치
console.log(numbers.includes(2)); // true: 값 포함 여부
numbers.forEach(n => console.log(n)); // 1, 2, 3, 4: 각 요소에 작업 수행
// forEach는 undefined를 반환해요. 변환된 배열이 필요하면 map을 사용해요.
console.log(numbers.reduce((sum, n) => sum + n, 0)); // 10: 초기값 0부터 누적
// 위 메서드들은 자체적으로 원본 배열을 변경하지 않지만,
// 콜백 내부에서 객체나 배열을 직접 수정하면 원본에 영향을 줄 수 있어요.

const unsorted = [10, 2, 1];
const sorted = [...unsorted].sort((a, b) => a - b);
console.log(sorted, unsorted); // [1, 2, 10] [10, 2, 1]
// sort는 원본을 변경하므로 복사 후 정렬했어요.
// 비교 함수를 생략하면 문자열 기준으로 정렬해요.

// slice(start, end): end 직전까지 얕게 복사한 새 배열 반환, 원본 유지
const letters = ['a', 'b', 'c', 'd'];
console.log(letters.slice(1, 3)); // ['b', 'c']
console.log(letters); // ['a', 'b', 'c', 'd']

// splice(start, deleteCount, ...items): 원본 수정, 삭제된 요소를 배열로 반환
const removedLetters = letters.splice(1, 2, 'x');
console.log(removedLetters); // ['b', 'c']
console.log(letters); // ['a', 'x', 'd']: 1번부터 2개를 삭제하고 'x' 추가

// 3. 객체: 키와 값으로 구성돼요.
const user = { name: 'Min', age: 20 };
console.log(user.name, user['age']); // Min 20
const key = 'name';
console.log(user[key]); // Min: 변수의 값을 키로 사용
user.age = 21;
user.city = 'Seoul';
delete user.city;
console.log(user.missing); // undefined
console.log(Object.keys(user)); // ['name', 'age']
console.log(Object.values(user)); // ['Min', 21]
console.log(Object.entries(user)); // [['name', 'Min'], ['age', 21]]

// 변수명과 속성명이 같으면 축약할 수 있어요.
const name = 'Kim';
const age = 30;
const profile = { name, age }; // { name: name, age: age }
console.log(profile);

// 4. 구조 분해 할당
const { name: userName, age: userAge, city = '미정' } = user;
console.log(userName, userAge, city); // Min 21 미정
const [first, second] = fruits;
console.log(first, second); // grape banana
// 기본값은 undefined일 때 적용돼요. null에는 적용되지 않아요.

// 5. 선택적 연결(옵셔널 체이닝): ?. 왼쪽이 null/undefined면 undefined 반환
console.log(user.address?.city); // undefined
console.log(user.address?.city ?? '주소 없음'); // 주소 없음
// 선언되지 않은 변수나 모든 종류의 오류를 막는 기능은 아니에요.

// 6. 참조와 비교
const sharedUser = user; // 객체 복제가 아니라 같은 객체를 공유
sharedUser.age = 99;
console.log(user.age); // 99
console.log(sharedUser === user); // true: 같은 객체
console.log({ name: 'Min' } === { name: 'Min' }); // false: 서로 다른 객체
console.log([1, 2] === [1, 2]); // false

// 7. 전개 구문(spread): 배열 요소나 객체 속성을 펼쳐요.
const moreFruits = [...fruits, 'peach'];
const updatedUser = { ...user, age: 22 }; // 뒤에 쓴 속성이 앞의 속성을 덮어써요.
console.log(moreFruits, updatedUser.age, user.age); // [..., 'peach'] 22 99
// 얕은 복사: 중첩된 객체는 여전히 공유해요.
const original = { address: { city: 'Seoul' } };
const copied = { ...original };
copied.address.city = 'Busan';
console.log(original.address.city); // Busan

// 8. 나머지(rest): 남은 값들을 모아요. spread와 모양은 같지만 역할이 달라요.
const [head, ...tail] = numbers;
console.log(head, tail); // 1 [2, 3, 4]
function sum(...values) { // 나머지 매개변수는 마지막에 와야 해요.
  return values.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(...numbers)); // 10: 호출할 때 spread로 인자를 펼침
