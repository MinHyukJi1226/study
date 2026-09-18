// 01. 기본 문법 — 실행: node 01-basics.js

// 1. 변수: 기본은 const, 재할당이 필요하면 let
const message = 'hi';
let score = 10;
score = 20;
console.log(message, score); // hi 20
// score를 let으로 다시 선언하면 SyntaxError
// message = 'hello'; // TypeError: const는 재할당 불가능
// const limit; // SyntaxError: 초기값 필요
// const는 재할당을 막아요. 객체 내부의 변경까지 막지는 않아요.

// var는 재선언이 가능하고, 선언 전 접근이나 넓은 변수 범위로 실수하기 쉬워요.
// 기본적으로 const를 사용하고, 재할당이 필요하면 let을 사용해요.

// 2. 원시 타입: string, number, boolean, undefined, null, bigint, symbol
const name = 'Min';
const price = 1000; // 정수와 실수 모두 number
const active = true;
let empty; // undefined로 초기화
const selected = null; // 의도적으로 값이 없음을 표현
console.log(typeof name, typeof price, typeof active); // string number boolean
console.log(empty, selected); // undefined null
console.log(typeof null); // object: 오래된 언어 특성. null은 원시값이에요.
console.log(typeof 10n, typeof Symbol('id')); // bigint symbol
// 배열과 일반 객체는 typeof 결과가 object예요. 자세한 내용은 04번 파일.

// JavaScript는 동적 타입 언어: 변수에 다른 타입의 값을 넣을 수 있어요.
let value = 10;
value = 'ten';
console.log(typeof value); // string

// 3. 비교와 명시적 타입 변환
console.log(10 === '10'); // false: 타입 변환 없이 비교
console.log(10 == '10'); // true: 타입 변환 후 비교. 기본적으로 ===를 사용해요.
console.log(10 !== '10'); // true
console.log(Number('10'), String(10), Boolean(0)); // 10 '10' false
console.log('5' + 1); // '51': +는 문자열 연결에도 사용돼요.
console.log('5' - 1); // 4: 숫자로 변환
console.log(Number('hello')); // NaN: 숫자 변환 실패
console.log(Number.isNaN(Number('hello'))); // true
// NaN은 자기 자신과 ===로 비교해도 false예요.

// 4. 연산자와 truthy / falsy
console.log(7 / 2, 7 % 2, 2 ** 3); // 3.5 1 8
let count = 0;
count += 1;
console.log(count); // 1
// falsy: false, 0, -0, 0n, '', null, undefined, NaN
// 나머지 값은 대부분 truthy예요. '0', 'false', 빈 배열과 빈 객체도 truthy예요.
console.log(Boolean('false')); // true
console.log(!true); // false
// &&와 ||는 boolean으로 변환한 결과가 아니라 피연산자 값을 반환해요.
console.log('hello' && 'world'); // world
console.log('' || '기본값'); // 기본값
console.log(0 || 100); // 100: ||는 모든 falsy 값에 기본값 적용
console.log(0 ?? 100); // 0: ??는 null 또는 undefined에만 기본값 적용
console.log(null ?? '기본값'); // 기본값
const label = score >= 10 ? '통과' : '재도전'; // 삼항 연산자
console.log(label); // 통과
console.log(`이름: ${name}, 점수: ${score}`); // 템플릿 리터럴: 백틱과 ${...}

// 단락 평가: 왼쪽 값으로 결과가 결정되면 오른쪽 표현식은 실행하지 않아요.
false && console.log('실행되지 않음');
true || console.log('실행되지 않음');
0 ?? console.log('실행되지 않음');

// 숫자의 정밀도: number는 64비트 부동소수점이에요.
// 일부 소수를 정확히 표현할 수 없어 계산 결과에 오차가 생길 수 있어요.
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
// 정수를 안전하게 표현하는 범위는 -(2 ** 53 - 1)부터 2 ** 53 - 1까지예요.
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.isSafeInteger(9007199254740992)); // false
// 범위를 넘는 정수를 정확하게 다뤄야 할 때는 bigint를 사용할 수 있어요.
console.log(9007199254740992n + 1n); // 9007199254740993n
// 1n + 1; // TypeError: bigint와 number는 산술 연산에서 직접 섞을 수 없어요.

// 5. 변수 이름: 카멜케이스를 관례로 사용해요.
const totalPrice = 3000;
const item1 = 'apple'; // 숫자는 첫 글자 이후에 사용 가능
// 이름은 대소문자를 구분하고, _와 $도 사용 가능해요.
// 숫자로 시작하거나 공백, 하이픈(-), 예약어를 사용할 수 없어요.
console.log(totalPrice, item1);

// 6. 호이스팅과 TDZ
// 실행 전에 선언이 처리되어 위로 끌어올려진 것처럼 보이는 특성이에요.
// 실제 코드가 이동하는 것은 아니에요.
console.log(oldNumber); // undefined: var는 먼저 undefined로 초기화돼요.
var oldNumber = 10; // 값 할당은 이 줄을 실행할 때 발생
console.log(oldNumber); // 10
// let과 const도 선언이 먼저 처리되지만, 선언문 실행 전에는 접근 불가능해요.
// console.log(laterNumber); // ReferenceError
let laterNumber = 20;
// console.log(fixedNumber); // ReferenceError
const fixedNumber = 30;
console.log(laterNumber, fixedNumber); // 20 30
// 스코프 시작부터 초기화 전까지의 접근 불가 구간이 TDZ(일시적 사각지대)예요.
// 변수는 선언한 뒤에 사용하세요.
