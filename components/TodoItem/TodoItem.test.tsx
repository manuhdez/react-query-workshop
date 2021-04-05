import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useUpdateTodo from 'hooks/todos/useUpdateTodo';
import useDeleteTodo from 'hooks/todos/useDeleteTodo';
import TodoItem from './TodoItem';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock('hooks/todos/useUpdateTodo');
jest.mock('hooks/todos/useDeleteTodo');

describe('<TodoItem />', () => {
  const mockItem = { id: 208, title: 'mock todo item', done: false };
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    (useUpdateTodo as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: null,
      updateTodo: mockUpdate,
    });

    (useDeleteTodo as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: null,
      deleteTodo: mockDelete,
    });

    render(<TodoItem todo={mockItem} />);
  });

  afterEach(() => {
    mockUpdate.mockClear();
    mockDelete.mockClear();
  });

  function editTodoInputValue(input: HTMLElement, newTitle = 'updated title') {
    userEvent.clear(input);
    userEvent.type(input, newTitle);
  }

  function getTodoTitle() {
    return screen.getByText(mockItem.title);
  }

  function getTitleInput() {
    return screen.getByRole('textbox');
  }
  function getCheckbox() {
    return screen.getByRole('checkbox');
  }

  function getButton(text: string) {
    return screen.queryByRole('button', { name: text });
  }

  test('user can see the todo title, a checkbox field and an Edit button', () => {
    const title = getTodoTitle();
    const checkbox = getCheckbox();
    const editButton = getButton('Edit');
    expect(title).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  test('A todo that is being edited shows "Save" and "Cancel" buttons', () => {
    let editButton = null;
    let saveButton = null;
    let cancelButton = null;

    editButton = getButton('Edit');
    saveButton = getButton('Save');
    cancelButton = getButton('Cancel');
    expect(editButton).toBeInTheDocument();
    expect(saveButton).not.toBeInTheDocument();
    expect(cancelButton).not.toBeInTheDocument();

    userEvent.click(editButton);

    editButton = getButton('Edit');
    saveButton = getButton('Save');
    cancelButton = getButton('Cancel');
    expect(editButton).not.toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('user can click the edit button and update the todo title', async () => {
    const editButton = getButton('Edit');
    userEvent.click(editButton);

    const titleInput = screen.getByRole('textbox');
    expect(titleInput).toHaveValue(mockItem.title);

    const newTitle = 'Clean the car';
    editTodoInputValue(titleInput, newTitle);
    expect(titleInput).toHaveValue(newTitle);

    userEvent.click(getButton('Save'));
    await waitFor(() => expect(editButton).toHaveTextContent('Edit'));
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith({
      ...mockItem,
      title: newTitle,
    });
  });

  test('a user can discard the changes made to the title by clicking the cancel button', () => {
    const editButton = getButton('Edit');
    const todoTitle = screen.getByText(mockItem.title);
    expect(todoTitle).toBeInTheDocument();

    userEvent.click(editButton);

    const titleInput = getTitleInput();
    expect(titleInput).toHaveValue(mockItem.title);
    editTodoInputValue(titleInput, 'new todo title');
    expect(titleInput).toHaveValue('new todo title');

    const cancelButton = getButton('Cancel');
    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);
    const updatedTitle = screen.queryByTitle('new todo title');
    expect(updatedTitle).not.toBeInTheDocument();
    const restartedTitle = screen.getByText(mockItem.title);
    expect(restartedTitle).toBeInTheDocument();
  });

  test('user can toggle the todo as done by clicking the checkbox', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith({ ...mockItem, done: true });
  });

  test('A "done" task shows a button to delete it', () => {
    const checkbox = getCheckbox();
    expect(checkbox).not.toBeChecked();
    expect(getButton('Delete')).not.toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(getButton('Delete')).toBeInTheDocument();
  });

  test('user can delete a "done" task', () => {
    const checkbox = getCheckbox();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const deleteButton = getButton('Delete');
    expect(deleteButton).toBeInTheDocument();
  });
});
