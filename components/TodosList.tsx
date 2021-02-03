import { TodoRecord } from '../types/todo';

interface TodosListProps {
  todos: TodoRecord[];
}

export default function TodosList({ todos }: TodosListProps) {
  if (!todos.length) return null;

  return (
    <ul>
      {todos.map(({ id, title, done }) => (
        <li key={id}>
          <span>{title}</span>
          <input type="checkbox" checked={done} />
        </li>
      ))}
    </ul>
  );
}
