import { render, screen } from '@testing-library/react';
import * as hook from 'hooks/useFetchTodos';
import { mockTodos } from 'mocks/todos';
import TodosList from './TodosList';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

const mockUseGetTodos = jest.spyOn(hook, 'useGetTodos');

describe('<TodosList />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('while loading todos', () => {
    beforeEach(() => {
      mockUseGetTodos.mockReturnValue({
        isLoading: true,
        isError: false,
        data: [],
      });

      render(<TodosList />);
    });

    test('user can see a loading message while fetching todos', () => {
      expect(mockUseGetTodos).toHaveBeenCalledTimes(1);
      const loadingMessage = screen.getByText(/Loading/);
      expect(loadingMessage).toBeInTheDocument();
    });
  });

  describe('with an error loading todos', () => {
    beforeEach(() => {
      mockUseGetTodos.mockReturnValue({
        isLoading: false,
        isError: true,
        data: [],
      });

      render(<TodosList />);
    });

    test('user can see a message if there is an error fetching todos', () => {
      expect(mockUseGetTodos).toHaveBeenCalledTimes(1);
      const errorMessage = screen.getByText(/error/);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('with an empty list of todos', () => {
    beforeEach(() => {
      mockUseGetTodos.mockReturnValue({
        isLoading: false,
        isError: false,
        data: [],
      });

      render(<TodosList />);
    });

    test('user can see a message if the list of todos is empty', () => {
      expect(mockUseGetTodos).toHaveBeenCalledTimes(1);
      const emptyMessage = screen.getByText('No todos yet');
      expect(emptyMessage).toBeInTheDocument();
    });
  });

  describe('with a list of todos loaded', () => {
    beforeEach(() => {
      mockUseGetTodos.mockReturnValue({
        isLoading: false,
        isError: false,
        data: mockTodos,
      });

      render(<TodosList />);
    });

    test('user can see a list of todos', () => {
      expect(mockUseGetTodos).toHaveBeenCalledTimes(1);

      const title = screen.getByRole('heading', { level: 1, name: 'Todos' });
      expect(title).toBeInTheDocument();
      const todos = screen.getAllByRole('listitem');
      expect(todos).toHaveLength(3);
    });
  });
});
