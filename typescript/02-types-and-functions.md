# 02. 기본 타입과 함수

## 1. 타입 표기와 추론

변수 이름 뒤에 `: 타입`을 붙여요. 초기값으로 타입이 명확하면 생략해도 TypeScript가 추론해요.

```typescript
let age: number = 20;
let userName = 'Min'; // string으로 추론
const isLoggedIn = true;

age = 21;
userName = 'Kim';
```

추론된 타입도 재할당을 검사해요.

```typescript
let age = 20;
age = '스무 살'; // 타입 오류: number 변수에 string 할당
```

기본 타입에는 소문자 `string`, `number`, `boolean`을 사용해요. Kotlin의 `Int`와 `Double`처럼 나누지 않고 일반적인 숫자는 `number`로 표현해요. 타입 표기와 추론 모두 같은 검사에 사용돼요.

## 2. 배열과 튜플

```typescript
const scores: number[] = [80, 90];
const names: Array<string> = ['Min', 'Kim'];
const position: [number, number] = [10, 20];

scores.push(100);
console.log(position[0]); // 10
```

`number[]`는 숫자 배열이고, `[number, number]`는 각 위치의 타입과 길이를 표현하는 튜플이에요.

## 3. 객체 타입과 type

`type`으로 타입에 이름을 붙여요. 객체를 만드는 문법은 아니에요.

```typescript
type User = {
  id: number;
  name: string;
  nickname?: string;
};

const user: User = { id: 1, name: 'Min' };
console.log(user.nickname?.toUpperCase() ?? '별명 없음'); // 별명 없음
```

`nickname?`은 속성을 생략할 수 있다는 뜻이에요. 읽을 때 `undefined`일 수 있으므로 확인이 필요해요. 객체의 `?`는 타입 선언 문법이고, `?.`는 실제 실행 중 접근을 처리하는 JavaScript 연산자예요.

```typescript
type User = { id: number; name: string };
const user: User = { id: 1 }; // 타입 오류: name 누락
```

## 4. interface와 구조적 타입

`interface`도 객체의 구조를 정의할 수 있어요.

```typescript
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permission: string;
}

const admin: Admin = { id: 1, name: 'Min', permission: 'edit' };
const user: User = admin;
console.log(user.name); // Min
```

TypeScript는 주로 이름이 아니라 **필요한 속성의 구조가 맞는지**로 호환성을 판단해요. 위의 `admin`은 `User`에 필요한 속성을 가지고 있으므로 대입할 수 있어요. 새 객체 리터럴을 직접 대입할 때는 불필요한 속성에 대한 추가 검사도 적용돼요.

`type`은 객체뿐 아니라 유니온 등에도 이름을 붙일 수 있어요. `interface`는 객체 확장에 사용할 수 있고 같은 이름의 선언이 합쳐질 수 있어요. 객체의 형태를 정의할 때 둘 다 사용할 수 있어요.
## 5. 함수의 입력과 출력

```typescript
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;

console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6
```

괄호 안은 매개변수 타입, 괄호 뒤는 반환 타입이에요. 반환 타입은 추론 가능하지만, 함수의 약속을 명확히 하고 싶을 때 적어요.

```typescript
function greet(name: string = '방문자'): string {
  return `안녕, ${name}`;
}

function printMessage(message: string): void {
  console.log(message);
}

printMessage(greet()); // 안녕, 방문자
```

`void`는 반환값을 이용하지 않는 함수에 사용해요.

## 6. 함수를 받는 타입

```typescript
type Operation = (a: number, b: number) => number;

function calculate(a: number, b: number, operation: Operation): number {
  return operation(a, b);
}

console.log(calculate(2, 3, (a, b) => a + b)); // 5
```

`(a: number, b: number) => number`는 실행 코드가 아니라 함수의 타입이에요. 콜백의 매개변수 `a`, `b`는 전달 위치에서 타입이 추론돼요. `(id: number) => void`는 숫자 하나를 받고 반환값을 사용하지 않는 함수 타입이에요.

## 7. readonly

```typescript
type User = {
  readonly id: number;
  name: string;
};

const user: User = { id: 1, name: 'Min' };
user.name = 'Kim';
user.id = 2; // 타입 오류: readonly 속성 재할당
```

`readonly`는 해당 타입을 통해 수정하지 못하게 검사해요. 실행 중 객체를 동결하는 기능도, 중첩 데이터 전체를 불변으로 만드는 기능도 아니에요.
