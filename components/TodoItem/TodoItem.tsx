import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useUpdateTodo from 'hooks/todos/useUpdateTodo';
import useDeleteTodo from 'hooks/todos/useDeleteTodo';
import IconButton from 'components/IconButton/IconButton';
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

  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();

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
      await updateTodo(data);
    } catch (e) {
      setDefaultData();
    } finally {
      if (isEditing) {
        handleToggleEdit();
      }
    }
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const deleteButton = (
    <IconButton icon="🗑" handleClick={handleDeleteTodo} altText="Delete" />
  );

  const activeTodoButtons = isEditing ? (
    <>
      <IconButton icon="❌" handleClick={handleCancelEdit} altText="Cancel" />
      <IconButton icon="💾" handleClick={handleSaveButton} altText="Save" />
    </>
  ) : (
    <IconButton icon="✏️" handleClick={handleToggleEdit} altText="Edit" />
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
