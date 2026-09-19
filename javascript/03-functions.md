# 03. 함수

## 1. 함수 선언문: 선언문보다 앞에서 호출할 수 있어요.

```javascript
console.log(add(2, 3)); // 5
function add(a, b) {
  return a + b;
}
```

반환문이 없거나 `return;`만 있으면 `undefined`를 반환해요.

## 2. 함수 표현식: 함수를 값으로 변수에 저장해요.

```javascript
const subtract = function (a, b) {
  return a - b;
};
console.log(subtract(5, 2)); // 3
```

`const`로 선언한 `subtract`는 초기화 전에 호출할 수 없어요.

## 3. 화살표 함수

```javascript
const multiply = (a, b) => a * b; // 표현식 하나면 return 생략 가능
const double = number => number * 2; // 단순한 매개변수 하나일 때 괄호 생략 가능
const divide = (a, b) => {
  return a / b; // 중괄호 본문에서 값을 반환하려면 명시적인 return 필요
};
console.log(multiply(2, 3), double(4), divide(8, 2)); // 6 8 4
```

기본값, 구조 분해, 나머지 매개변수가 있으면 하나여도 괄호가 필요해요.

```javascript
const doubleDefault = (number = 1) => number * 2;
console.log(doubleDefault()); // 2
```

중괄호 본문에 `return`이 없으면 `undefined`를 반환해요.

```javascript
const showMessage = () => {
  console.log('hello');
};
const messageResult = showMessage(); // hello
console.log(messageResult); // undefined
```

객체를 바로 반환할 때는 괄호로 감싸요.

```javascript
const makeUser = name => ({ name: name });
console.log(makeUser('Min')); // { name: 'Min' }
```

## 4. 기본 매개변수: 인자를 생략하거나 `undefined`를 전달하면 적용돼요.

```javascript
function greet(name = '방문자') {
  return `안녕, ${name}`;
}
console.log(greet()); // 안녕, 방문자
console.log(greet(null)); // 안녕, null: null에는 기본값이 적용되지 않아요.
```

## 5. 콜백: 다른 함수에 인자로 전달하는 함수

```javascript
function calculate(a, b, operation) {
  return operation(a, b);
}
console.log(calculate(2, 3, add)); // 5
console.log(calculate(2, 3, (a, b) => a * b)); // 6
```

`add`는 함수를 전달하고, `add(2, 3)`은 실행 결과를 전달해요.

콜백이라고 반드시 비동기인 것은 아니에요.

## 6. 스코프: 변수를 사용할 수 있는 범위

```javascript
const color = 'blue';
if (true) {
  const color = 'red'; // 다른 스코프의 같은 이름: 섀도잉
  console.log(color); // red
}
console.log(color); // blue
```

`let`과 `const`는 블록 스코프, `var`는 함수 스코프예요.

```javascript
function showScope() {
  if (true) {
    var visible = 10;
    let hidden = 20;
    console.log(hidden); // 20
  }
  console.log(visible); // 10
  console.log(hidden); // ReferenceError
}
showScope();
```

`visible`은 `showScope` 함수 밖에서는 접근할 수 없어요.

## 7. 클로저: 함수가 선언된 곳의 바깥 변수에 계속 접근할 수 있어요.

```javascript
function createCounter() {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}
const nextCount = createCounter();
console.log(nextCount()); // 1
console.log(nextCount()); // 2
```

`createCounter` 실행이 끝나도 반환된 함수가 `count`를 유지해요.

변수의 접근 범위는 호출 위치가 아닌 선언 위치를 기준으로 결정돼요.

## 8. this: 객체의 데이터를 다루는 함수

일반 함수를 `객체.메서드()`로 호출하면 함수 안의 `this`는 그 객체가 돼요. `this.name`은 그 객체에 저장된 `name`을 읽어요.

```javascript
function getName() {
  return this.name;
}

const min = { name: 'Min', getName: getName };
const kim = { name: 'Kim', getName: getName };

console.log(min.getName()); // Min
console.log(kim.getName()); // Kim
```

`getName: getName`에서 왼쪽은 속성 이름, 오른쪽은 함수예요. 이름이 같으므로 `{ name: 'Min', getName }`으로 줄여 쓸 수도 있어요. 객체에 함수를 저장하는 것과 함수를 실행하는 것은 달라요. 실행은 `()`를 붙였을 때 일어나요.

### 함수를 다른 객체로 가져오기

```javascript
const otherUser = { name: 'Lee', getName: min.getName };
console.log(otherUser.getName()); // Lee
```

`min.getName`은 함수만 가져와요. `min`과의 연결을 유지하지 않으므로, `otherUser.getName()`으로 호출하면 `this`는 `otherUser`예요.

### 객체 없이 호출하기와 bind

```javascript
const detachedGetName = min.getName;
detachedGetName(); // 엄격 모드에서는 this가 undefined여서 TypeError

const boundGetName = min.getName.bind(min);
console.log(boundGetName()); // Min
```

`bind(min)`은 `this`를 `min`으로 고정한 새 함수를 반환해요. `bind` 자체가 원래 함수를 실행하는 것은 아니에요. 객체 없이 호출하는 일반 함수의 `this`는 비엄격 모드에서는 전역 객체가 되지만, 엄격 모드에서는 `undefined`예요. ES 모듈에는 엄격 모드가 적용돼요.

### 응용: 객체의 상태 바꾸기

```javascript
function takeDamage(damage) {
  this.hp -= damage;
  return `${this.name}의 남은 체력: ${this.hp}`;
}

const warrior = { name: '전사', hp: 100, takeDamage };
const mage = { name: '마법사', hp: 60, takeDamage };

console.log(warrior.takeDamage(20)); // 전사의 남은 체력: 80
console.log(mage.takeDamage(10)); // 마법사의 남은 체력: 50
```

`this`는 누구의 데이터를 다룰지, 매개변수 `damage`는 이번에 얼마나 줄일지를 정해요.

### 화살표 함수의 this

화살표 함수는 자신의 `this`를 만들지 않고 바깥 범위의 `this`를 사용해요.

```javascript
const account = {
  name: 'Lee',
  makeReader() {
    return () => this.name;
  },
};

const readName = account.makeReader();
console.log(readName()); // Lee
```

`account.makeReader()`로 호출했으므로 `makeReader` 안의 `this`는 `account`예요. 그 안에서 만든 화살표 함수도 같은 `this`를 사용하므로, 반환된 함수를 `readName()`으로 호출해도 `account.name`을 읽어요.
