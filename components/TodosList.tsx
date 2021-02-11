import { useState, useEffect } from 'react';
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

  if (!todos?.length) return null;

  if (isLoading) return <ListContainer>Loading todos...</ListContainer>;

  if (isError)
    return <ListContainer>There was an error loading todos.</ListContainer>;

  return (
    <ListContainer>
      <h1>Todos:</h1>
      <List>
        {todos.map((todo) => (
          <TodoItem item={todo} key={todo.id} />
        ))}
      </List>
    </ListContainer>
  );
}
