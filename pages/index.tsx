import TodoForm from 'components/TodoForm/TodoForm';
import TodosList from 'components/TodosList/TodosList';
import HomeLayout from 'styles/HomeLayout';

export default function Home() {
  return (
    <HomeLayout>
      <TodoForm />
      <TodosList />
    </HomeLayout>
  );
}
