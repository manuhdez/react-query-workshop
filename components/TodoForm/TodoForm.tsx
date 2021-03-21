import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { postTodo } from 'api/todos';
import { Form, TextInput } from 'styles/Form';
import { Button } from 'styles/Button';
import { useMutation, useQueryClient } from 'react-query';
import { Todo, TodoRecord } from 'types/todo';

export default function TodoForm() {
  const [todoTitle, setTodoTitle] = useState<string>('');

  const queryClient = useQueryClient();

  const handleMutationSuccess = () => {
    queryClient.fetchQuery('getTodos');
    setTodoTitle('');
  };

  const mutation = useMutation<TodoRecord, unknown, Todo>(postTodo as never, {
    onSuccess: handleMutationSuccess,
  });

  const { mutate, isLoading, isError, reset } = mutation;
  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(target.value);
  };

  const handleInputFocus = () => {
    reset();
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!todoTitle) return;

    const newTodo: Todo = {
      title: todoTitle,
      done: false,
    };

    mutate(newTodo);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <TextInput hasError={isError}>
        <label htmlFor="todo-input">Add todo:</label>
        <input
          type="text"
          value={todoTitle}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Cleaning the desk..."
        />
      </TextInput>
      <Button type="submit" disabled={isLoading || !todoTitle}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </Form>
  );
}
