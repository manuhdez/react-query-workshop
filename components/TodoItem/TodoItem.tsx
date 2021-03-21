import { ChangeEvent, useState } from 'react';
import { updateTodo } from 'api/todos';
import { Button } from 'styles/Button';
import Checkbox from 'styles/Checkbox';
import { TodoRecord } from 'types/todo';
import { Item } from './TodoItem.styles';

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

  const handleToggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(target.value);
  };

  const handleChangeDone = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsDone(target.checked);
    handleSaveUpdatedTodo({ ...todo, done: target.checked });
  };

  const handleSaveButton = async () => {
    handleSaveUpdatedTodo();
  };

  const handleSaveUpdatedTodo = async (updatedTodo: TodoRecord = null) => {
    const data = updatedTodo || { ...todo, title: todoTitle, done: isDone };
    try {
      await updateTodo(data);
    } catch (e) {
      setDefaultData();
    } finally {
      if (isEditing) {
        handleToggleEdit();
      }
    }
  };

  return (
    <Item done={isDone}>
      <Checkbox checked={isDone} onChange={handleChangeDone} />
      {isEditing ? (
        <input type="text" value={todoTitle} onChange={handleChangeTitle} />
      ) : (
        <p onClick={handleToggleEdit}>{todoTitle}</p>
      )}
      <Button
        theme="secondary"
        onClick={isEditing ? handleSaveButton : handleToggleEdit}
      >
        {isEditing ? 'Save' : 'Edit'}
      </Button>
    </Item>
  );
}
