import { ChangeEvent, FormEvent, useState } from 'react';
import { postTodo } from '../api/todos';

export default function TodoForm() {
  const [todoTitle, setTodoTitle] = useState<string>('');

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      done: false,
    };

    postTodo(newTodo);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="todo-input">Add todo:</label>
      <input
        type="text"
        value={todoTitle}
        onChange={handleInputChange}
        placeholder="Add todo tite here"
      />
    </form>
  );
}
