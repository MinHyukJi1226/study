// 05. 비동기와 오류 처리 — 실행: node 05-async-and-errors.js

// 1. throw와 try / catch / finally
function divide(a, b) {
  if (b === 0) throw new Error('0으로 나눌 수 없어요.');
  return a / b;
}
try {
  console.log(divide(10, 0));
} catch (error) {
  console.log(error.message); // 0으로 나눌 수 없어요.
} finally {
  console.log('처리 완료'); // 성공/실패와 관계없이 실행
}

// JavaScript는 Error 객체 외에 문자열이나 null 같은 값도 던질 수 있어요.
// 직접 오류를 만들 때는 new Error(...)를 사용하면 메시지와 스택을 활용하기 좋아요.
// 외부 코드의 오류를 받을 때는 Error 객체인지 확인한 뒤 message를 읽어요.
try {
  throw '문자열 오류'; // Error 객체가 아닌 값을 받는 상황을 보여주는 예제
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(message); // 문자열 오류
}

// 2. Promise: 비동기 작업의 성공 또는 실패를 나타내는 객체
// pending(대기) → fulfilled(성공) 또는 rejected(실패)
// 한 번 성공하거나 실패하면 상태가 다시 바뀌지 않아요.
// setTimeout은 일정 시간 후 콜백을 실행하도록 예약하는 실행 환경의 API예요.
function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => resolve('대기 완료'), milliseconds);
  });
}
// 실제 API 호출처럼 이미 Promise를 반환하는 함수라면 새 Promise로 감쌀 필요 없어요.

// new Promise에 전달한 함수(executor)는 생성 즉시 동기적으로 실행돼요.
// then에 전달한 콜백은 현재 동기 코드가 끝난 뒤 실행돼요.
console.log('Promise 생성 전');
const immediate = new Promise(resolve => {
  console.log('executor 실행');
  resolve('성공');
});
immediate.then(result => console.log('then 실행:', result));
console.log('Promise 생성 후');
// 위 네 출력의 상대적인 순서:
// Promise 생성 전 → executor 실행 → Promise 생성 후 → then 실행: 성공
// Promise로 감싸는 것만으로 오래 걸리는 계산이 별도 스레드에서 실행되지는 않아요.

// 3. async 함수는 항상 Promise를 반환해요.
async function getNumber() {
  return 10; // Promise가 성공한 값으로 10을 제공
}
getNumber().then(number => console.log('then 결과:', number)); // 10
// then은 성공 처리, catch는 실패 처리에 사용해요.
Promise.reject(new Error('실패 예제'))
  .catch(error => console.log('catch 결과:', error.message));

// 4. await: 현재 async 함수의 진행을 기다리게 해요.
// 프로그램 전체나 다른 비동기 작업의 실행을 멈추지는 않아요.
async function run() {
  console.log('작업 시작');
  const result = await delay(10);
  console.log(result); // 대기 완료

  // await한 Promise의 실패는 try / catch로 처리할 수 있어요.
  try {
    await Promise.reject(new Error('비동기 오류'));
  } catch (error) {
    console.log(error.message); // 비동기 오류
  }

  // 5. 순차 실행: 이전 작업 완료 후 다음 작업 시작
  const first = await delay(10);
  const second = await delay(10);
  console.log('순차:', first, second);

  // 동시 진행: 서로 독립적인 비동기 작업을 함께 시작하고 결과를 기다려요.
  const results = await Promise.all([delay(10), delay(10)]);
  console.log('동시:', results); // ['대기 완료', '대기 완료']
  // 결과 순서는 완료 순서가 아닌 입력 순서예요.
  // 하나라도 실패하면 Promise.all도 실패해요. 다른 작업이 자동 취소되지는 않아요.

  // 6. 반복과 async
  const items = [1, 2];
  // 순서대로 기다리기
  for (const item of items) {
    await delay(5);
    console.log('순차 요소:', item);
  }
  // 함께 시작하고 모두 기다리기
  const doubled = await Promise.all(items.map(async item => {
    await delay(5);
    return item * 2;
  }));
  console.log(doubled); // [2, 4]
  // forEach는 async 콜백이 반환하는 Promise를 기다려주지 않아요.
}

run().catch(error => console.error('예상하지 못한 오류:', error));
console.log('바깥 코드'); // '작업 시작' 이후, '대기 완료' 이전에 출력
// 동기 코드가 먼저 끝난 뒤 Promise의 then이나 await 이후 코드가 이어져요.
// 타이머의 시간은 정확한 실행 시각을 보장하지 않아요.
