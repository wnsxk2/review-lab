export function addTodo(todos, title) {
  const cleaned = title.trim();

  if (cleaned.length === 0) {
    throw new Error('제목을 입력하세요');
  }

  if (cleaned.length > 20) {
    throw new Error('제목은 20글자 이하여야 합니다');
  }

  return [...todos, { title: cleaned, done: false }];
}
