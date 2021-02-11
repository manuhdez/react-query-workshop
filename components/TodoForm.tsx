import { ChangeEvent, FormEvent, useState } from 'react';
import { postTodo } from 'api/todos';
import { Form, TextInput } from 'styles/Form';
import { Button } from 'styles/Button';

export default function TodoForm() {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(target.value);
  };

  const handleInputFocus = () => {
    setHasError(false);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!todoTitle) return;

    setHasError(false);
    setIsLoading(true);

    const newTodo = {
      title: todoTitle,
      done: false,
    };

    try {
      const response = await postTodo(newTodo);
      if (response.status === 201) {
        setTodoTitle('');
      } else {
        throw new Error();
      }
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <TextInput hasError={hasError}>
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
