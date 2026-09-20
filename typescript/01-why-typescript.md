# 01. JavaScript에서 TypeScript로

## 1. JavaScript에서 놓치기 쉬운 문제

JavaScript는 실행 중 값의 타입에 따라 동작해요. 함수가 받을 데이터의 형태를 코드로 강제하지 않으면, 잘못된 값이 들어가도 예상 밖의 결과를 만들며 실행될 수 있어요.

```javascript
function calculateTotal(price, quantity) {
  return price + quantity;
}

console.log(calculateTotal(1000, '2')); // '10002': 숫자 덧셈 대신 문자열 연결
```

TypeScript는 함수의 입력과 출력에 타입을 붙여, 실행 전에 잘못된 사용을 찾게 해줘요.

```typescript
function calculateTotal(price: number, quantity: number): number {
  return price + quantity;
}

calculateTotal(1000, '2'); // 타입 오류: 두 번째 인자는 number여야 함
```

다만 이 함수는 가격과 수량을 **더하고** 있어요. 의도가 총액 계산이라면 곱해야 하지만, TypeScript는 업무 의도까지 알지 못하므로 이 논리 오류는 잡지 못해요.

```typescript
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

console.log(calculateTotal(1000, 2)); // 2000
```

타입 검사는 실행 전 코드 사용법을 검사하는 것이에요. 모든 버그를 없애는 장치는 아니에요.

## 2. TypeScript가 도움이 되는 상황

| JavaScript에서 생길 수 있는 문제 | TypeScript가 돕는 방식 |
|---|---|
| 숫자를 받아야 하는 함수에 문자열 전달 | 매개변수 타입으로 검사 |
| 객체의 필수 속성 누락 또는 이름 오타 | 객체 타입으로 검사 |
| 값이 없는데 속성에 접근 | null과 undefined 여부 확인 요구 |
| 콜백에 잘못된 인자 전달 | 함수 타입으로 검사 |
| 데이터 구조 변경 후 일부 코드만 수정 | 영향을 받는 사용 위치에서 오류 표시 |

타입 정보는 자동 완성에도 사용돼요. 어떤 속성과 함수를 사용할 수 있는지 편집기에서 확인할 수 있어요.

## 3. TypeScript가 바꾸지 않는 것

TypeScript의 타입 표기는 JavaScript로 변환할 때 지워져요.

**TypeScript**

```typescript
const price: number = 1000;
console.log(price);
```

**타입 표기를 제거한 JavaScript**

```javascript
const price = 1000;
console.log(price);
```

따라서 다음 동작은 그대로예요.

- `this`, 클로저, 객체 참조, 얕은 복사 규칙
- 비동기 작업과 Promise의 실행 방식
- 부동소수점 계산 오차
- API 응답이나 사용자 입력이 실제로 어떤 값인지

`as User`라고 적어도 서버의 JSON이 진짜 `User`인지 검사하지 않아요. 외부 데이터는 실행 중 검증이 필요해요.

## 4. 파일과 타입 검사

| 파일 | 용도 |
|---|---|
| `.ts` | 일반 함수, 데이터 타입, API 함수 등 |
| `.d.ts` | 라이브러리 등의 타입 정보를 선언하는 파일 |
| `tsconfig.json` | TypeScript 검사·변환 옵션 설정 |

`strict`는 엄격한 타입 검사 옵션 묶음이에요. 학습 예제의 null 검사와 암묵적 any 오류는 이 설정을 기준으로 해요.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

이것은 타입 검사 옵션 중 `strict`만 보여주는 예시예요. 실제 프로젝트에서는 모듈 방식과 실행 환경에 맞는 다른 설정도 함께 사용해요.

타입 제거와 타입 검사는 별개예요. 개발 서버에서 화면이 보인다고 타입 검사까지 통과한 것은 아니에요. 프로젝트의 검사 스크립트를 사용하거나, 설치된 TypeScript로 다음 명령을 실행해요.

```sh
npx tsc --noEmit
```

`--noEmit`은 결과 JS 파일을 만들지 않고 검사만 해요. 여러 tsconfig를 사용하는 프로젝트에서는 실제 소스가 포함된 설정을 대상으로 검사해야 해요.
