import { BASE_URL } from './index';

interface Todo {
  name: string;
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`, {
    headers: {
      'Content-Type': 'application',
    },
  });

  return await response.json();
};
