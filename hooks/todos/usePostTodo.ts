import { postTodo } from 'api/todos';
import { useMutation, useQueryClient } from 'react-query';

export default function usePostTodo() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, mutateAsync } = useMutation(
    'postTodo',
    postTodo,
    {
      onSuccess: () => queryClient.fetchQuery('getTodos'),
    }
  );
  return { isLoading, isError, data, postTodo: mutateAsync };
}
