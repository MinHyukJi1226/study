# 05. 비동기 함수와 외부 데이터

## 1. Promise의 결과 타입

```typescript
type User = { id: number; name: string };

async function getSampleUser(): Promise<User> {
  return { id: 1, name: 'Min' };
}
```

`Promise<User>`는 기다린 뒤 성공 결과로 `User`를 얻는다는 뜻이에요. 오류의 타입을 지정하거나 실제 API 데이터 검증을 수행하는 표기는 아니에요.

## 2. 외부 데이터는 실행 중 검증하기

서버 응답에 `as User`를 붙여도 실제 필드나 타입은 검사되지 않아요. 응답을 `unknown`으로 받아 확인한 뒤 필요한 객체를 만들어 반환할 수 있어요.

```typescript
type User = { id: number; name: string };

function parseUser(value: unknown): User {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('id' in value) ||
    typeof value.id !== 'number' ||
    !Number.isFinite(value.id) ||
    !('name' in value) ||
    typeof value.name !== 'string'
  ) {
    throw new Error('사용자 데이터 형식이 올바르지 않아요.');
  }

  return { id: value.id, name: value.name };
}

async function fetchUser(id: number, signal?: AbortSignal): Promise<User> {
  const response = await fetch(`/api/users/${id}`, { signal: signal ?? null });
  if (!response.ok) {
    throw new Error(`요청 실패: ${response.status}`);
  }

  const data: unknown = await response.json();
  return parseUser(data);
}
```

`/api/users/:id`는 연결할 서버의 예시 주소예요. 이 검증은 id가 유한한 숫자이고 name이 문자열인지 확인해요. 양수 ID나 이름의 최소 길이 같은 업무 규칙은 별도로 검사해야 해요.

`fetch`는 HTTP 404·500 응답 자체만으로 Promise를 실패시키지 않으므로 `response.ok`를 확인해요. JSON 파싱 실패나 검증 실패도 오류로 전달돼요.
## 3. 구분 가능한 유니온으로 작업 상태 표현하기

작업의 진행 중·성공·실패를 각각 다른 타입으로 표현할 수 있어요. 공통 속성 `status`를 기준으로 성공 결과나 오류 메시지의 존재 여부가 결정돼요.

```typescript
type User = { id: number; name: string };

type RequestState =
  | { status: 'loading' }
  | { status: 'success'; user: User }
  | { status: 'error'; message: string };

function getMessage(state: RequestState): string {
  switch (state.status) {
    case 'loading':
      return '불러오는 중';
    case 'success':
      return state.user.name;
    case 'error':
      return state.message;
  }
}
```

`status === 'success'`인 경우에만 `user`가 존재해요. TypeScript도 이 조건을 따라 타입을 좁혀요.

**상태와 데이터가 맞지 않는 예제**

```typescript
type RequestState =
  | { status: 'loading' }
  | { status: 'success'; user: { id: number; name: string } };

const state: RequestState = { status: 'success' }; // 타입 오류: user 누락
```


## 4. 비동기 함수의 오류 처리

`Promise<User>`는 성공 결과의 타입을 뜻해요. 실패할 때 던지는 값의 타입까지 지정하지는 않아요.

```typescript
async function readName(): Promise<string> {
  throw new Error('이름을 읽지 못했어요.');
}

async function run(): Promise<void> {
  try {
    const name = await readName();
    console.log(name);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(message); // 이름을 읽지 못했어요.
  }
}

run();
```

엄격한 타입 검사에서는 `catch`로 받은 값이 기본적으로 `unknown`이에요. JavaScript는 어떤 값이든 던질 수 있으므로, `Error`인지 확인한 뒤 `message`에 접근해요.
