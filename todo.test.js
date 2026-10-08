import test from 'node:test';
import assert from 'node:assert/strict';
import { addTodo } from './todo.js';

test('할 일을 추가하고 기존 배열을 바꾸지 않는다', () => {
  const original = [{ title: '독서', done: false }];
  const result = addTodo(original, '수학 공부');

  assert.deepEqual(result, [
    { title: '독서', done: false },
    { title: '수학 공부', done: false },
  ]);

  assert.deepEqual(original, [{ title: '독서', done: false }]);
  assert.notStrictEqual(result, original);
});

test('제목 앞뒤 공백을 제거한다', () => {
  assert.equal(addTodo([], '  운동  ')[0].title, '운동');
});

test('공백뿐인 제목을 거절한다', () => {
  assert.throws(() => addTodo([], '   '), /제목을 입력하세요/);
});

test('빈 제목을 거절한다', () => {
  assert.throws(() => addTodo([], ''), Error);
});

test('1글자와 20글자 제목을 허용한다', () => {
  for (const title of ['가', '가'.repeat(20)]) {
    assert.deepEqual(addTodo([], title), [{ title, done: false }]);
  }
});

test('공백 제거 후 20글자 제목을 허용한다', () => {
  const title = '가'.repeat(20);
  assert.equal(addTodo([], `  ${title}  `)[0].title, title);
});

test('공백 제거 후 21글자 제목은 오류로 거절하고 기존 배열을 보존한다', () => {
  const original = [{ title: '독서', done: true }];
  assert.throws(() => addTodo(original, `  ${'가'.repeat(21)}  `), Error);
  assert.deepEqual(original, [{ title: '독서', done: true }]);
});

test('글자 수는 JavaScript 문자열 length로 계산한다', () => {
  const allowed = '😀'.repeat(10);
  assert.equal(allowed.length, 20);
  assert.equal(addTodo([], allowed)[0].title, allowed);
  assert.throws(() => addTodo([], `${allowed}가`), Error);
});
