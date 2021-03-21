import { useQuery } from 'react-query';
import { getTodos } from 'api/todos';

export function useGetTodos() {
  const { isLoading, isError, data } = useQuery('getTodos', getTodos);

  return { isLoading, isError, data };
}