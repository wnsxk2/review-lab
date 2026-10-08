export function addTodo(todos, title) {
  const cleaned = title.trim();

  if (cleaned.length === 0) {
    throw new Error('제목을 입력하세요');
  }

  return [...todos, { title: cleaned, done: false }];
}
