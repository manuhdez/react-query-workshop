import { useState, useEffect } from 'react';
import { getTodos } from '../api/todos';
import { TodoRecord } from '../types/todo';

export default function TodosList() {
  const [todos, setTodos] = useState<TodoRecord[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  if (!todos.length) return null;

  return (
    <section>
      <h1>Todos:</h1>
      <ul>
        {todos.map(({ id, title, done }) => (
          <li key={id}>
            <span>{title}</span>
            <input type="checkbox" checked={done} />
          </li>
        ))}
      </ul>
    </section>
  );
}
