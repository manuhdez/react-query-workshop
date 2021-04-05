import React from 'react';
import { TodoRecord } from 'types/todo';
import TodoItem from 'components/TodoItem/TodoItem';
import { List, ListContainer } from './TodosList.style';

interface TodosListProps {
  title: string;
  todos: TodoRecord[];
  emptyMsg?: string;
  children?: JSX.Element;
}
export default function TodosList({
  title,
  todos,
  emptyMsg = '',
  children,
}: TodosListProps) {
  return (
    <ListContainer>
      <h2>{title}</h2>
      {children}
      <List>
        {todos.length ? (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <p hidden={!emptyMsg}>{emptyMsg}</p>
        )}
      </List>
    </ListContainer>
  );
}
