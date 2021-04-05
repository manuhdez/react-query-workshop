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

export const postTodo = async (todo: Todo): Promise<TodoRecord> => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const updateTodo = async (todo: TodoRecord): Promise<TodoRecord> => {
  const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const deleteTodo = async (id: number): Promise<TodoRecord> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};
