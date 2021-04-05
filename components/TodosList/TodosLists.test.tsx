import { render, screen } from '@testing-library/react';
import useGetTodos from 'hooks/todos/useGetTodos';
import { mockTodos } from 'mocks/todos';
import TodosLists from './TodosLists';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock('hooks/todos/useGetTodos');

jest.mock('hooks/todos/useUpdateTodo', () => () => ({ updateTodo: jest.fn() }));

jest.mock('hooks/todos/useDeleteTodo', () => () => ({ deleteTodo: jest.fn() }));

describe('<TodosList />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('while loading todos', () => {
    beforeEach(() => {
      (useGetTodos as jest.Mock).mockReturnValue({
        isLoading: true,
        isError: false,
        data: [],
      });

      render(<TodosLists />);
    });

    test('user can see a loading message while fetching todos', () => {
      expect(useGetTodos as jest.Mock).toHaveBeenCalledTimes(1);
      const loadingMessage = screen.getByText(/Loading/i);
      expect(loadingMessage).toBeInTheDocument();
    });
  });

  describe('with an error loading todos', () => {
    beforeEach(() => {
      (useGetTodos as jest.Mock).mockReturnValue({
        isLoading: false,
        isError: true,
        data: [],
      });

      render(<TodosLists />);
    });

    test('user can see a message if there is an error fetching todos', () => {
      expect(useGetTodos as jest.Mock).toHaveBeenCalledTimes(1);
      const errorMessage = screen.getByText(/error/);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('with an empty list of todos', () => {
    beforeEach(() => {
      (useGetTodos as jest.Mock).mockReturnValue({
        isLoading: false,
        isError: false,
        data: [],
      });

      render(<TodosLists />);
    });

    test('user can see a message if the list of todos is empty', () => {
      expect(useGetTodos as jest.Mock).toHaveBeenCalledTimes(1);
      const emptyMessage = screen.getByText(/enjoy your free time/i);
      expect(emptyMessage).toBeInTheDocument();
    });
  });

  describe('with a list of todos loaded', () => {
    beforeEach(() => {
      (useGetTodos as jest.Mock).mockReturnValue({
        isLoading: false,
        isError: false,
        data: mockTodos,
      });

      render(<TodosLists />);
    });

    test('user can see one list of completed and one of uncompleted todos', () => {
      expect(useGetTodos as jest.Mock).toHaveBeenCalledTimes(1);

      const uncompletedTitle = screen.getByRole('heading', { name: /todos/i });
      const completedTitle = screen.getByRole('heading', {
        name: /completed/i,
      });
      expect(uncompletedTitle).toBeInTheDocument();
      expect(completedTitle).toBeInTheDocument();

      const todos = screen.getAllByRole('listitem');
      expect(todos).toHaveLength(3);
    });
  });
});
