import TodoForm from 'components/TodoForm/TodoForm';
import TodosList from 'components/TodosList/TodosLists';
import HomeLayout from 'styles/HomeLayout';

export default function Home() {
  return (
    <HomeLayout>
      <TodoForm />
      <TodosList />
    </HomeLayout>
  );
}
