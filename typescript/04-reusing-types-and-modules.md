# 04. 타입 재사용과 모듈

## 1. 기존 타입 재사용하기

```typescript
type User = { id: number; name: string; email: string };

type UserPreview = Pick<User, 'id' | 'name'>;
type NewUser = Omit<User, 'id'>;
type UserPatch = Partial<NewUser>;
type Status = 'loading' | 'success' | 'error';

const labels: Record<Status, string> = {
  loading: '불러오는 중',
  success: '완료',
  error: '실패',
};

const patch: UserPatch = { name: 'Kim' };
console.log(labels.success, patch.name); // 완료 Kim
```

- `Pick`: 필요한 속성만 선택
- `Omit`: 지정한 속성 제외
- `Partial`: 모든 속성을 선택 사항으로 변경
- `Record`: 키와 값의 타입 지정

`Partial`은 중첩 객체까지 재귀적으로 바꾸지는 않아요. 이 타입들은 데이터를 실제로 가공하는 함수가 아니에요.

## 2. keyof와 타입 위치의 typeof

```typescript
const initialUser = { id: 1, name: 'Min' };
type User = typeof initialUser;
type UserKey = keyof User; // 'id' | 'name'
type UserName = User['name']; // string

const key: UserKey = 'name';
const name: UserName = initialUser[key];
console.log(name); // Min
```

실행 코드의 `typeof value`는 문자열을 반환하지만, 타입 위치의 `typeof`는 값에서 타입 정보를 가져와요. `keyof`는 타입의 키를 유니온으로 만들어요.
## 3. as const와 satisfies

```typescript
const directions = ['left', 'right'] as const;
type Direction = (typeof directions)[number]; // 'left' | 'right'

type Theme = { mode: 'light' | 'dark'; spacing: number };
const theme = {
  mode: 'dark',
  spacing: 8,
} satisfies Theme;

console.log(theme.mode); // dark
```

`as const`는 리터럴을 좁은 타입으로 유지하고, 배열을 readonly 튜플로 추론하게 해요. 실행 중 배열을 동결하지는 않아요. `satisfies`는 형태가 타입에 맞는지 검사하면서 표현식의 구체적인 타입 정보를 유지하는 데 유용해요.

## 4. 타입을 파일로 분리하기

여러 함수에서 같은 데이터 형태를 사용하면 타입을 별도 파일에 정의하고 가져올 수 있어요.

**user.ts**

```typescript
export type User = {
  id: number;
  name: string;
};

export function formatUser(user: User): string {
  return `${user.id}: ${user.name}`;
}
```

**main.ts**

```typescript
import { formatUser } from './user.js';
import type { User } from './user.js';

const user: User = { id: 1, name: 'Min' };
console.log(formatUser(user)); // 1: Min
```

`formatUser`는 실행에 필요한 함수라서 일반 `import`로 가져와요. `User`는 타입 정보이므로 `import type`으로 가져와요. 타입 전용 import는 출력 JavaScript에서 제거돼요.

위 경로는 TypeScript를 JavaScript로 변환한 뒤 ES 모듈로 실행하는 구성을 기준으로 `.js`를 적었어요. TypeScript는 검사할 때 대응하는 `user.ts`를 찾을 수 있어요. 실제 프로젝트의 import 경로 규칙은 사용하는 모듈 설정과 실행 도구에 따라 달라져요.
