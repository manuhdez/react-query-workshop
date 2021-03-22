import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTodo, getTodos, updateTodo } from 'api/todos';

export function useGetTodos() {
  const { isLoading, isError, data } = useQuery('getTodos', getTodos);

  return { isLoading, isError, data };
}

export const useUpdateTodo = () => {
  const { isLoading, isError, data, mutateAsync } = useMutation(
    'updateTodo',
    updateTodo
  );

  return { isLoading, isError, data, update: mutateAsync };
};

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, mutateAsync } = useMutation(
    'deleteTodo',
    deleteTodo,
    {
      onSettled: () => queryClient.fetchQuery('getTodos'),
    }
  );

  return { isLoading, isError, data, delete: mutateAsync };
}
