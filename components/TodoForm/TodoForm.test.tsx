import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { specialChars } from '@testing-library/user-event';
import usePostTodo from 'hooks/todos/usePostTodo';
import { useState } from 'react';
import { Todo } from 'types/todo';
import TodoForm from './TodoForm';

jest.mock('react-query', () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock('hooks/todos/usePostTodo');

describe('<TodoForm />', () => {
  const mockUpdateTodo = jest.fn();

  (usePostTodo as jest.Mock).mockImplementation(() => {
    const [isLoading, setIsLoading] = useState(false);

    interface Options {
      onSuccess?: () => void;
    }

    const postTodo = (data: Todo, options: Options) => {
      setIsLoading(true);
      mockUpdateTodo(data);
      if (options.onSuccess) {
        options.onSuccess();
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    return { isLoading, isError: false, data: null, postTodo };
  });

  beforeEach(() => {
    render(<TodoForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function getFormInput() {
    return screen.getByRole('textbox');
  }

  function getSaveButton() {
    return screen.getByRole('button', { name: /save/i });
  }

  test('user can focus the todo title input by clicking the label', () => {
    const todoInput = getFormInput();
    const inputLabel = screen.getByText(/add todo/i);

    expect(inputLabel).toHaveTextContent(/add todo/i);
    expect(todoInput).toHaveProperty('placeholder', 'Cleaning the desk...');
    expect(todoInput).not.toHaveFocus();

    userEvent.click(inputLabel);
    expect(todoInput).toHaveFocus();
  });

  test('user can introduce a new todo', () => {
    const todoInput = getFormInput();
    expect(todoInput).toHaveValue('');

    userEvent.type(todoInput, 'new todo title');
    expect(todoInput).toHaveValue('new todo title');
  });

  test('user can see a "saving" message while the todo is being saved', async () => {
    const todoInput = getFormInput();
    const saveButton = getSaveButton();

    userEvent.type(todoInput, 'test todo');
    userEvent.click(saveButton);
    expect(saveButton).toHaveTextContent(/saving/i);

    //wait until the todo is saved to see the button shows the "save" text again
    await waitFor(() => expect(saveButton).toHaveTextContent(/save/i));
  });

  test('user can save the new todo by clicking the save button', () => {
    const todoInput = getFormInput();
    const saveButton = getSaveButton();

    userEvent.type(todoInput, 'clean the desk');
    userEvent.click(saveButton);

    expect(mockUpdateTodo).toHaveBeenCalledTimes(1);
    expect(mockUpdateTodo).toHaveBeenCalledWith({
      title: 'clean the desk',
      done: false,
    });
  });

  test('user can save the new todo by pressing the ENTER button', () => {
    const todoInput = getFormInput();

    userEvent.type(todoInput, 'new task');
    userEvent.type(todoInput, specialChars.enter);

    expect(mockUpdateTodo).toHaveBeenCalledTimes(1);
    expect(mockUpdateTodo).toHaveBeenCalledWith({
      title: 'new task',
      done: false,
    });
  });

  test('user can see the input value cleared after saving a todo', async () => {
    const todoInput = getFormInput();

    userEvent.type(todoInput, `hello task ${specialChars.enter}`);

    expect(mockUpdateTodo).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(todoInput).toHaveValue(''));
  });
});
