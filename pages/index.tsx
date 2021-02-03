import { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  return (
    <main>
      <h1>Todos:</h1>
      <ul>
        {todos.map((todo) => (
          <li>{todo?.name}</li>
        ))}
      </ul>
    </main>
  );
}
