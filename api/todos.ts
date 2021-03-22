import { BASE_URL } from './index';
import { Todo, TodoRecord } from 'types/todo';

export const getTodos = async (): Promise<TodoRecord[]> => {
  const response = await fetch(`${BASE_URL}/todos`, {
    headers: {
      'Content-Type': 'application',
    },
  });

  return await response.json();
};

export const postTodo = (todo: Todo) => {
  return fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateTodo = async (todo: TodoRecord) => {
  console.log({ todo });
  return await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteTodo = async (id: number) => {
  console.log({ id });
  return await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
