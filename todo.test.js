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
});

test('제목 앞뒤 공백을 제거한다', () => {
  assert.equal(addTodo([], '  운동  ')[0].title, '운동');
});

test('공백뿐인 제목을 거절한다', () => {
  assert.throws(() => addTodo([], '   '), /제목을 입력하세요/);
});
