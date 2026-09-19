# 05. 비동기와 오류 처리

## 1. throw와 try / catch / finally

`throw`는 오류를 던지고, `catch`는 그 오류를 받아 처리해요. `finally`는 성공과 실패에 관계없이 마무리할 작업을 넣는 곳이에요.

```javascript
function divide(a, b) {
  if (b === 0) throw new Error('0으로 나눌 수 없어요.');
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(message); // 0으로 나눌 수 없어요.
} finally {
  console.log('처리 완료');
}
```

직접 오류를 만들 때는 `new Error(...)`를 사용하면 메시지와 스택을 활용하기 좋아요. JavaScript는 문자열이나 `null`도 던질 수 있으므로, 외부 코드에서 받은 값이 항상 `Error` 객체라고 가정하면 안 돼요.

```javascript
try {
  throw '문자열 오류'; // Error가 아닌 값을 받는 상황을 보여주는 예제
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(message); // 문자열 오류
}
```

## 2. Promise와 실행 순서

`Promise`는 작업의 성공 또는 실패를 나타내는 객체예요. 대기 중인 `pending`에서 성공한 `fulfilled` 또는 실패한 `rejected`로 바뀌며, 성공이나 실패가 확정된 뒤에는 상태가 다시 바뀌지 않아요.

`new Promise`에 전달한 함수는 즉시 동기적으로 실행돼요. `resolve`는 성공 결과를 전달하고, `reject`는 실패를 전달해요. `then`의 성공 콜백은 성공 결과를 받고, `catch`는 실패를 처리해요.

```javascript
console.log('1. 생성 전');

const resultPromise = new Promise(resolve => {
  console.log('2. executor 실행');
  resolve('성공');
});

resultPromise.then(result => console.log('4. then:', result));
console.log('3. 생성 후');
```

출력 순서는 `1 → 2 → 3 → 4`예요. Promise가 이미 성공했어도 `then`의 콜백은 현재 동기 코드가 끝난 뒤 실행돼요. Promise로 감싸는 것만으로 계산이 별도 스레드에서 실행되지는 않아요.

```javascript
Promise.reject(new Error('실패 예제'))
  .catch(error => console.log(error.message)); // 실패 예제
```

이미 Promise를 반환하는 함수를 사용할 때는 새 Promise로 감쌀 필요가 없어요.

## 3. async와 await

`async` 함수는 항상 Promise를 반환해요. `await`는 결과를 기다리는 동안 현재 async 함수의 진행을 중단하지만, 프로그램 전체를 멈추지는 않아요.

```javascript
async function getNumber() {
  return 10;
}

async function showNumber() {
  console.log('1. 함수 시작');
  const number = await getNumber();
  console.log('3. 결과:', number);
}

showNumber().catch(error => console.error(error));
console.log('2. 바깥 코드');
```

출력 순서는 `1 → 2 → 3`이고 결과는 `10`이에요. 일반 스크립트에서는 `await`를 async 함수 안에서 사용해요. ES 모듈에서는 최상위에서도 사용할 수 있어요.

## 4. 비동기 오류 처리

`await`한 Promise가 실패하면 그 지점에서 오류가 던져지므로 `try / catch`로 처리할 수 있어요.

```javascript
async function loadData() {
  try {
    await Promise.reject(new Error('불러오기 실패'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(message); // 불러오기 실패
  }
}

loadData().catch(error => console.error(error));
```

Promise를 반환하는 함수를 `await` 없이 호출만 하면, 나중에 발생하는 Promise의 실패를 주변의 동기 `try / catch`로 잡을 수 없어요. `await`하거나 반환된 Promise에 `.catch(...)`를 연결해야 해요.

## 5. 순차 실행과 동시 진행

앞 작업이 끝난 뒤 다음 작업을 시작하려면 차례로 `await`해요. 서로 독립적인 작업을 함께 시작하고 결과를 모으려면 `Promise.all`을 사용해요.

```javascript
function delay(milliseconds, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), milliseconds);
  });
}

async function compare() {
  const first = await delay(10, 'A');
  const second = await delay(10, 'B');
  console.log('순차:', first, second); // 순차: A B

  const results = await Promise.all([
    delay(20, 'A'),
    delay(5, 'B'),
  ]);
  console.log('동시:', results); // 동시: ['A', 'B']
}

compare().catch(error => console.error(error));
```

`Promise.all`의 결과 순서는 완료 순서가 아니라 입력 순서예요. 하나라도 실패하면 반환된 Promise도 실패하지만, 다른 작업이 자동으로 취소되지는 않아요.

`setTimeout`은 나중에 콜백을 실행하도록 예약하는 실행 환경의 API예요. 지정한 시간은 정확한 실행 시각을 보장하지 않아요.

## 6. 반복문에서 비동기 작업하기

순차 처리는 `for...of`와 `await`, 동시 진행은 `map`과 `Promise.all`로 표현할 수 있어요.

```javascript
function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
}

async function processItems() {
  const items = [1, 2];

  for (const item of items) {
    await delay(5);
    console.log('순차 요소:', item); // 순차 요소: 1 → 순차 요소: 2
  }

  const doubled = await Promise.all(items.map(async item => {
    await delay(5);
    return item * 2;
  }));
  console.log(doubled); // [2, 4]
}

processItems().catch(error => console.error(error));
```

`forEach`는 async 콜백이 반환하는 Promise를 기다려주지 않아요. `await items.forEach(...)`로 작성해도 모든 작업의 완료를 기다릴 수 없어요.
