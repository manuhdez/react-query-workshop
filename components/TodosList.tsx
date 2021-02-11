import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTodos } from 'api/todos';
import { TodoRecord } from 'types/todo';
import TodoItem from 'components/TodoItem';

const ListContainer = styled.section`
  padding: 1rem;
  border-radius: var(--corner-radius);
  box-shadow: var(--shadow-light);

  h1 {
    margin-top: 0.5rem;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function TodosList() {
  const [todos, setTodos] = useState<TodoRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const { data, status } = await getTodos();
      if (status === 200) {
        setTodos(data);
      } else {
        throw new Error();
      }
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!todos.length) return null;

  return (
    <ListContainer>
      <h1>Todos:</h1>
      <p hidden={!isLoading || hasError}>Loading todos...</p>
      <p hidden={!hasError || isLoading}>There was an error loading todos.</p>
      <List hidden={isLoading || hasError}>
        {todos.map((todo) => (
          <TodoItem item={todo} key={todo.id} />
        ))}
      </List>
    </ListContainer>
  );
}
