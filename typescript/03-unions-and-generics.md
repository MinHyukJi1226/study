# 03. 유니온, 타입 좁히기, 제네릭

## 1. 유니온과 리터럴 타입

`A | B`는 A 또는 B를 허용해요. 문자열 값 자체를 타입으로 쓰면 허용할 값을 제한할 수 있어요.

```typescript
type Status = 'idle' | 'loading' | 'success' | 'error';
let status: Status = 'idle';
status = 'loading';
status = 'pending'; // 타입 오류: 허용한 문자열이 아님
```

작업 상태나 허용된 명령을 표현할 때 유용해요.

## 2. null과 타입 좁히기

`strictNullChecks`가 켜져 있으면 `null`과 `undefined`를 다른 타입과 구분해요. `strict`에 포함된 설정이에요.

```typescript
type User = { name: string };

function getUserName(user: User | null): string {
  if (user === null) {
    return '로그인 필요';
  }
  return user.name; // 이 지점에서는 User
}

console.log(getUserName(null)); // 로그인 필요
```

조건문을 통과하면서 가능한 타입이 줄어드는 것을 **타입 좁히기(narrowing)**라고 해요.

```typescript
function formatId(id: number | string): string {
  if (typeof id === 'number') {
    return id.toFixed(0);
  }
  return id.toUpperCase();
}

console.log(formatId('ab')); // AB
```

## 3. any와 unknown

| 타입 | 의미 | 속성을 바로 사용 가능? |
|---|---|---|
| `any` | 해당 값에 대한 타입 검사를 대부분 우회 | 가능 |
| `unknown` | 아직 타입을 모르는 값 | 확인 후 가능 |

**타입 검사를 통과하지만 실행하면 실패하는 예제**

```typescript
const value: any = 10;
value.toUpperCase(); // 실행 오류: 숫자에는 이 메서드가 없음
```

**검사부터 요구하는 예제**

```typescript
function uppercase(value: unknown): string {
  return value.toUpperCase(); // 타입 오류: unknown을 먼저 확인해야 함
}
```

```typescript
function uppercase(value: unknown): string {
  if (typeof value !== 'string') {
    return '문자열 아님';
  }
  return value.toUpperCase();
}

console.log(uppercase(10)); // 문자열 아님
```

API 응답처럼 믿을 수 없는 데이터는 `unknown`으로 받아 검사하면 타입 안전성을 유지하기 좋아요.

## 4. as와 느낌표는 검증이 아니에요

```typescript
const raw: unknown = 10;
const text = raw as string;
text.toUpperCase(); // 실행 오류: as는 숫자를 문자열로 변환하지 않음
```

`as`는 개발자가 타입을 알고 있다고 검사기에 알려주는 **타입 단언**이에요. 값 변환이나 실행 중 검증은 하지 않아요. 숫자를 문자열로 바꾸려면 `String(10)`을 사용해요.

```typescript
function getLength(value: string | null): number {
  return value!.length;
}

getLength(null); // 실행 오류: !는 null을 없애주지 않음
```

`value!`는 검사기에게 null이나 undefined가 아니라고 단언해요. 확신할 근거가 없다면 조건문이나 `?.`, `??`로 실제 부재를 처리하세요.

## 5. 제네릭: 타입도 인자로 받기

```typescript
function identity<T>(value: T): T {
  return value;
}

const name = identity('Min'); // string 값
const count = identity<number>(10);
console.log(name, count); // Min 10
```

`T`는 타입을 담는 자리예요. 값은 `()`로, 타입은 `<>`로 전달해요. 대부분은 인자로 타입을 추론하므로 `identity('Min')`처럼 쓸 수 있어요. `any`와 달리 입력과 출력 타입의 관계를 유지해요.

```typescript
type ApiResult<T> = {
  data: T;
  receivedAt: string;
};

type User = { id: number; name: string };
const result: ApiResult<User> = {
  data: { id: 1, name: 'Min' },
  receivedAt: '2026-09-19',
};
console.log(result.data.name); // Min
```

`ApiResult<User>`는 `data`에 `User` 형태의 값을 담는 타입이에요.
