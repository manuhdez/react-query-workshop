import { updateTodo } from 'api/todos';
import { useMutation } from 'react-query';

export default function useUpdateTodo() {
  const { isLoading, isError, data, mutateAsync } = useMutation(
    'updateTodo',
    updateTodo
  );
  return { isLoading, isError, data, updateTodo: mutateAsync };
}
