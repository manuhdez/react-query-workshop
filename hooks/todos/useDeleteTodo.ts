import { deleteTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';

export default function useDeleteTodo() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, mutateAsync } = useMutation(
    'deleteTodo',
    deleteTodo,
    {
      onSettled: () => queryClient.fetchQuery('getTodos'),
    }
  );
  return { isLoading, isError, data, deleteTodo: mutateAsync };
}
