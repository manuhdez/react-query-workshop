import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useUpdateTodo, useDeleteTodo } from 'hooks/useTodosCRUD';
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

  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const inputElement = useRef<HTMLInputElement>();

  useEffect(() => {
    if (isEditing) {
      inputElement.current.focus();
    }
  }, [isEditing, inputElement]);

  const setDefaultData = () => {
    setTodoTitle(todo.title);
    setIsDone(todo.done);
  };

  const handleToggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const handleCancelEdit = () => {
    setIsEditing((current) => !current);
    setTodoTitle(todo.title);
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
      await updateTodo.update(data);
    } catch (e) {
      setDefaultData();
    } finally {
      if (isEditing) {
        handleToggleEdit();
      }
    }
  };

  const handleDeleteTodo = () => {
    deleteTodo.delete(todo.id);
  };

  const deleteButton = (
    <Button theme="secondary" onClick={handleDeleteTodo}>
      Delete
    </Button>
  );

  const activeTodoButtons = isEditing ? (
    <>
      <Button theme="secondary" onClick={handleCancelEdit}>
        Cancel
      </Button>
      <Button theme="secondary" onClick={handleSaveButton}>
        Save
      </Button>
    </>
  ) : (
    <Button theme="secondary" onClick={handleToggleEdit}>
      Edit
    </Button>
  );

  return (
    <Item done={isDone}>
      <Checkbox checked={isDone} onChange={handleChangeDone} />
      {isEditing ? (
        <input
          type="text"
          ref={inputElement}
          value={todoTitle}
          onChange={handleChangeTitle}
        />
      ) : (
        <p onClick={handleToggleEdit}>{todoTitle}</p>
      )}
      {isDone ? deleteButton : activeTodoButtons}
    </Item>
  );
}
