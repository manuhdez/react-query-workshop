import React from 'react';
import styled from 'styled-components';
import { getTodos } from 'api/todos';
import { TodoRecord } from 'types/todo';
import TodoItem from 'components/TodoItem';
import { useQuery } from 'react-query';

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
  const { isLoading, isError, data: todos } = useQuery<TodoRecord[]>(
    'getTodos',
    getTodos
  );

  if (isLoading) return <ListContainer>Loading todos...</ListContainer>;

  if (isError)
    return <ListContainer>There was an error loading todos.</ListContainer>;

  if (!todos?.length) return null;

  return (
    <ListContainer>
      <h1>Todos:</h1>
      <List>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </ListContainer>
  );
}
