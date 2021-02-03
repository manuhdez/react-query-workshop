import TodoForm from '../components/TodoForm';
import TodosList from '../components/TodosList';
import HomeLayout from '../styles/HomeLayout';

export default function Home() {
  return (
    <HomeLayout>
      <TodoForm />
      <TodosList />
    </HomeLayout>
  );
}
