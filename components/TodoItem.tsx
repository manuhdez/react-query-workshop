import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { updateTodo } from 'api/todos';
import { Button } from 'styles/Button';
import Checkbox from 'styles/Checkbox';
import { TodoRecord } from 'types/todo';

interface ItemProps {
  done: boolean;
}

const Item = styled.li<ItemProps>`
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  margin-bottom: 1rem;
  border-radius: var(--corner-radius);
  box-shadow: var(--shadow-light);
  transition: transform 200ms ease-out;

  ${Checkbox} {
    margin-right: 1.5rem;
  }

  span {
    position: relative;
    line-height: 1rem;

    &::before {
      position: absolute;
      content: '';
      height: 2px;
      top: 50%;
      background: var(--dark);
      transform: translate(-0.5rem, -50%);
      transition: width 200ms ease-out;
      width: ${({ done }) => (done ? 'calc(100% + 1rem)' : '0')};
    }
  }

  button {
    margin-left: auto;
  }

  &:hover {
    transform: translateY(-3px) scale(1.025);
  }
`;

interface TodoItemProps {
  todo: TodoRecord;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [todoTitle, setTodoTitle] = useState<string>(todo.title);
  const [isDone, setIsDone] = useState<boolean>(todo.done);

  const setDefaultData = () => {
    setTodoTitle(todo.title);
    setIsDone(todo.done);
  };

  const handleButtonClick = () => {
    if (isEditing) {
      saveTodoChanges();
    }
    setIsEditing((current) => !current);
  };

  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(target.value);
  };

  const handleChangeDone = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsDone(target.checked);
    saveTodoChanges();
  };

  const saveTodoChanges = async () => {
    try {
      await updateTodo({
        ...todo,
        title: todoTitle,
        done: isDone,
      });
    } catch (e) {
      setDefaultData();
    }
  };

  return (
    <Item done={isDone}>
      <Checkbox checked={isDone} onChange={handleChangeDone} />
      {isEditing ? (
        <input type="text" value={todoTitle} onChange={handleChangeTitle} />
      ) : (
        <span>{todoTitle}</span>
      )}
      <Button theme="secondary" onClick={handleButtonClick}>
        {isEditing ? 'Save' : 'Edit'}
      </Button>
    </Item>
  );
}
