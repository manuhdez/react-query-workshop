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
  item: TodoRecord;
}

export default function TodoItem({ item }: TodoItemProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoData, setTodoData] = useState(item);

  const handleButtonClick = () => {
    if (isEditable) {
      handleSaveTodoChanges();
    }

    setIsEditable((current) => !current);
  };

  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoData((todo) => ({ ...todo, title: target.value }));
  };

  const handleChangeDone = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoData((todo) => ({ ...todo, done: target.checked }));
    handleSaveTodoChanges();
  };

  const handleSaveTodoChanges = async () => {
    try {
      await updateTodo(todoData);
    } catch (e) {
      setTodoData(item);
    }
  };

  const { title, done } = todoData;

  return (
    <Item done={done}>
      {isEditable ? (
        <input type="text" value={title} onChange={handleChangeTitle} />
      ) : (
        <span>{title}</span>
      )}
      <Checkbox checked={done} onChange={handleChangeDone} />
      <Button theme="secondary" onClick={handleButtonClick}>
        {isEditable ? 'Save' : 'Edit'}
      </Button>
    </Item>
  );
}
