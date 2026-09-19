# 06. 모듈

모듈은 파일 단위로 코드를 나누고 필요한 값이나 함수만 공개하는 방식이에요. 각 ES 모듈은 자체 스코프를 가지며 엄격 모드가 적용돼요.

## 1. 실행 준비

이 문서는 아래의 파일 이름대로 저장해 실습해요. `main.js`의 예제는 항목마다 내용을 교체해서 실행하세요.

```text
module-practice/
  package.json
  helpers.js
  main.js
```

**package.json**

```json
{
  "type": "module"
}
```

Node.js는 가장 가까운 상위 `package.json`의 `"type": "module"` 설정을 보고 `.js` 파일을 ES 모듈로 처리해요. `.mjs` 확장자를 사용해도 ES 모듈로 명시할 수 있어요.

## 2. export로 공개하기

**helpers.js**

```javascript
export const TAX_RATE = 0.1;

export function add(a, b) {
  return a + b;
}

const currency = 'KRW';
export { currency };

export default function formatPrice(price) {
  return `${price.toLocaleString('en-US')}원`;
}
```

- **Named export**: 이름을 지정해서 공개해요. 한 파일에서 여러 개를 내보낼 수 있어요.
- **Default export**: 기본 내보내기예요. 한 파일에 하나만 지정할 수 있어요.

`export { currency }`처럼 이미 선언한 값을 나중에 공개할 수도 있어요.

## 3. import로 가져오기

**main.js**

```javascript
import formatPrice, { TAX_RATE, add, currency } from './helpers.js';

console.log(add(2, 3)); // 5
console.log(formatPrice(1000)); // 1,000원
console.log(TAX_RATE, currency); // 0.1 KRW
```

`module-practice` 폴더에서 실행해요.

```sh
node main.js
```

Named import는 내보낸 이름과 일치해야 해요. Default import는 가져오는 쪽에서 이름을 정할 수 있어요. 상대 경로의 `./`는 현재 파일이 있는 폴더를 뜻해요.

### 별칭 사용하기

다음 내용으로 `main.js`를 교체해요.

```javascript
import printPrice, { add as sum } from './helpers.js';

console.log(sum(2, 3)); // 5
console.log(printPrice(1000)); // 1,000원
```

`as`는 named import에 다른 이름을 붙여요. `printPrice`는 default export를 가져오면서 직접 정한 이름이에요.

### 한 객체로 가져오기

다음 내용으로 `main.js`를 교체해요.

```javascript
import * as helpers from './helpers.js';

console.log(helpers.add(2, 3)); // 5
console.log(helpers.default(1000)); // 1,000원
```

모듈 네임스페이스 객체에는 default를 포함한 모든 export가 들어 있어요. Default export는 `helpers.default`로 접근해요.

## 4. import하면 실행되는 코드

모듈을 가져오면 그 모듈의 최상위 코드도 실행돼요. 함수를 가져오는 것 자체가 함수 본문을 실행하는 것은 아니에요.

예를 들어 `helpers.js` 맨 아래에 다음 줄을 추가하면:

```javascript
console.log('helpers 모듈 실행');
```

`main.js`에서 `add`만 가져와도 `helpers 모듈 실행`이 먼저 출력돼요. 같은 실행 환경에서 동일한 모듈을 다시 가져오면 기존 모듈을 재사용하므로 최상위 코드는 다시 실행되지 않아요.

## 5. 브라우저에서 사용하기

HTML에서 다음처럼 연결해요.

```html
<script type="module" src="./main.js"></script>
```

브라우저 실습은 로컬 HTTP 서버로 페이지를 열어 진행해요. 파일을 직접 더블 클릭해 `file://`로 열면 모듈 로딩이 제한될 수 있어요.

`import / export`는 ES Modules 문법이고, `require / module.exports`는 CommonJS 문법이에요. 지금은 ES Modules부터 익히면 돼요.
