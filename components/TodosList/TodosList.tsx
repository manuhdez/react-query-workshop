import React from 'react';
import { useGetTodos } from 'hooks/useTodosCRUD';
import TodoItem from 'components/TodoItem/TodoItem';
import { List, ListContainer } from './TodosList.styles';

export default function TodosList() {
  const { isLoading, isError, data: todos } = useGetTodos();

  const getLoadingFeedback = (): JSX.Element | null => {
    if (isLoading) {
      return <p>Loading todos...</p>;
    }
    if (isError) {
      return <p>There was a connection error.</p>;
    }
    return null;
  };

  const loadingFeedback = getLoadingFeedback();

  return (
    <ListContainer>
      <h1>Todos</h1>
      {loadingFeedback || (
        <List>
          {todos.length ? (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <p>No todos yet</p>
          )}
        </List>
      )}
    </ListContainer>
  );
}
