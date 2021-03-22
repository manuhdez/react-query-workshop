import { render, screen } from '@testing-library/react';
import { useGetTodos } from 'hooks/useTodosCRUD';
import { mockTodos } from 'mocks/todos';
import TodosList from './TodosList';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('hooks/useTodosCRUD');

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

      render(<TodosList />);
    });

    test('user can see a loading message while fetching todos', () => {
      expect(useGetTodos as jest.Mock).toHaveBeenCalledTimes(1);
      const loadingMessage = screen.getByText(/Loading/);
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

      render(<TodosList />);
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

      render(<TodosList />);
    });

    test('user can see a message if the list of todos is empty', () => {
      expect(useGetTodos as jest.Mock).toHaveBeenCalledTimes(1);
      const emptyMessage = screen.getByText('No todos yet');
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

      render(<TodosList />);
    });

    test('user can see a list of todos', () => {
      expect(useGetTodos as jest.Mock).toHaveBeenCalledTimes(1);

      const title = screen.getByRole('heading', { level: 1, name: 'Todos' });
      expect(title).toBeInTheDocument();
      const todos = screen.getAllByRole('listitem');
      expect(todos).toHaveLength(3);
    });
  });
});
