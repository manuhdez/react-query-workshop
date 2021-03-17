import { BASE_URL } from './index';
import { Todo, TodoRecord } from 'types/todo';
import { UpdateTodoResponse } from 'types/api';

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

export const updateTodo = async (
  todo: TodoRecord
): Promise<UpdateTodoResponse> => {
  const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return { data, status: response.status };
};
