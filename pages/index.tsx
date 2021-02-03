import { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import TodoForm from '../components/TodoForm';
import TodosList from '../components/TodosList';

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
      <TodoForm />
      <TodosList todos={todos} />
    </main>
  );
}
