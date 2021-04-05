import React, { useMemo } from 'react';
import useGetTodos from 'hooks/todos/useGetTodos';
import TodosList from './TodosList/TodosList';
import { ListContainer } from './TodosLists.styles';

export default function TodosLists() {
  const { isLoading, isError, data: todos = [] } = useGetTodos();

  const completedTodos = useMemo(() => todos.filter((todo) => todo.done), [
    todos,
  ]);

  const pendingTodos = useMemo(() => todos.filter((todo) => !todo.done), [
    todos,
  ]);

  if (isLoading) return <ListContainer>Loading todos...</ListContainer>;
  if (isError)
    return <ListContainer>There was a connection error.</ListContainer>;

  return (
    <ListContainer>
      <TodosList
        title="Todos"
        emptyMsg="Nothing to do. Enjoy your free time."
        todos={pendingTodos}
      />
      <TodosList
        title="Completed"
        emptyMsg="There are no completed tasks yet."
        todos={completedTodos}
      />
    </ListContainer>
  );
}
