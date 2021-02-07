import { ChangeEvent, FormEvent, useState } from 'react';
import { postTodo } from '../api/todos';
import { Form, TextInput } from '../styles/Form';
import { Button } from '../styles/Button';

export default function TodoForm() {
  const [todoTitle, setTodoTitle] = useState<string>('');

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!todoTitle) return;

    const newTodo = {
      title: todoTitle,
      done: false,
    };

    postTodo(newTodo);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <TextInput>
        <label htmlFor="todo-input">Add todo:</label>
        <input
          type="text"
          value={todoTitle}
          onChange={handleInputChange}
          placeholder="Cleaning the desk..."
        />
      </TextInput>
      <Button type="submit">Save</Button>
    </Form>
  );
}
