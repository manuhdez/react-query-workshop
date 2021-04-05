import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form, TextInput } from 'styles/Form';
import { Button } from 'styles/Button';
import usePostTodo from 'hooks/todos/usePostTodo';
import { Todo } from 'types/todo';

export default function TodoForm() {
  const [todoTitle, setTodoTitle] = useState<string>('');

  const { isLoading, isError, postTodo } = usePostTodo();

  const getNewTodo = (): Todo => ({ title: todoTitle, done: false });

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(target.value);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!todoTitle) return;
    const newTodo = getNewTodo();
    await postTodo(newTodo, { onSuccess: () => setTodoTitle('') });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <TextInput hasError={isError}>
        <label htmlFor="todo-input">Add todo:</label>
        <input
          type="text"
          value={todoTitle}
          id="todo-input"
          onChange={handleInputChange}
          placeholder="Cleaning the desk..."
        />
      </TextInput>
      <Button type="submit" theme="primary" disabled={isLoading || !todoTitle}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </Form>
  );
}
