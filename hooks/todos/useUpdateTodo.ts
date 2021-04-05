import { updateTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';

export default function useUpdateTodo() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, mutateAsync } = useMutation(
    'updateTodo',
    updateTodo,
    {
      onSuccess: () => queryClient.fetchQuery('getTodos'),
    }
  );
  return { isLoading, isError, data, updateTodo: mutateAsync };
}
