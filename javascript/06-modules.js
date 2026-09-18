// 06. 모듈 — ES Modules의 export / import
// 모듈은 파일 단위로 코드를 나누고 필요한 값이나 함수만 공개하는 방식이에요.
// 각 모듈은 자체 스코프를 가지며, ES Modules에는 strict mode가 적용돼요.

// 1. named export: 한 파일에서 여러 개를 공개할 수 있어요.
export const TAX_RATE = 0.1;
export function add(a, b) {
  return a + b;
}

// 이미 선언한 값을 별도로 공개할 수도 있어요.
const currency = 'KRW';
export { currency };

// 2. default export: 한 파일에 하나만 지정할 수 있어요.
export default function formatPrice(price) {
  return `${price.toLocaleString('en-US')}원`;
}

// 3. 다른 파일에서 가져오기
// 아래 예제는 이 파일과 같은 폴더에 있는 별도 파일에서 사용해요.
// import formatPrice, { TAX_RATE, add, currency } from './06-modules.js';
// console.log(add(2, 3)); // 5
// console.log(formatPrice(1000)); // 1,000원
// console.log(TAX_RATE, currency); // 0.1 KRW

// named import는 내보낸 이름과 일치해야 해요. as로 별칭을 지정할 수 있어요.
// import { add as sum } from './06-modules.js';
// console.log(sum(2, 3)); // 5

// default import는 가져오는 쪽에서 이름을 정할 수 있어요.
// import printPrice from './06-modules.js';
// console.log(printPrice(1000)); // 1,000원

// default를 포함한 모든 export를 모듈 네임스페이스 객체로 가져올 수도 있어요.
// import * as helpers from './06-modules.js';
// console.log(helpers.add(2, 3)); // 5
// console.log(helpers.default(1000)); // 1,000원: default export 접근

// 모듈을 import하면 해당 모듈의 최상위 코드도 실행돼요.
// add만 import해도 이 파일 맨 아래의 console.log 두 개가 실행돼요.
// 함수를 가져오는 것 자체가 그 함수의 본문을 실행하는 것은 아니에요.
// 같은 실행 환경에서 동일한 모듈을 다시 import하면 보통 기존 모듈을 재사용해요.
// 재사용되는 모듈의 최상위 코드는 다시 실행되지 않아요.

// 4. 실행 환경
// Node.js에서 .js 파일을 ES Module로 명시하려면,
// 가까운 package.json에 "type": "module"을 설정해요.
// 또는 확장자를 .mjs로 사용하면 돼요.
// 브라우저에서는 <script type="module" src="./06-modules.js"></script>로 연결해요.
// import/export는 ES Modules 문법이고, require/module.exports는 CommonJS 문법이에요.
// 학습할 때는 위의 ES Modules 문법부터 익히면 돼요.

console.log(add(2, 3)); // 5
console.log(formatPrice(1000)); // 1,000원
