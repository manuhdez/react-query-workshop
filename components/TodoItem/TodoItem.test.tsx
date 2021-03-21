import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as todos from 'api/todos';
import TodoItem from './TodoItem';

const mockUpdateTodo = jest.spyOn(todos, 'updateTodo');

describe('<TodoItem />', () => {
  const mockItem = { id: 208, title: 'mock todo item', done: false };

  beforeEach(() => {
    render(<TodoItem todo={mockItem} />);

    mockUpdateTodo.mockResolvedValue({
      status: 200,
      data: mockItem,
    });
  });

  afterEach(() => {
    mockUpdateTodo.mockClear();
  });

  function editTodoInputValue(input: HTMLElement, newTitle = 'updated title') {
    userEvent.clear(input);
    userEvent.type(input, newTitle);
  }

  function getEditButton(): HTMLElement {
    const editButton = screen.getByRole('button', { name: 'Edit' });
    return editButton;
  }

  test('display item title', () => {
    const title = screen.getByText(mockItem.title);
    expect(title).toBeInTheDocument();
  });

  test('user can use the checkbox to update the "done" property of the todo', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(mockUpdateTodo).toHaveBeenCalledTimes(1);
    expect(mockUpdateTodo).toHaveBeenCalledWith({ ...mockItem, done: true });
  });

  test('user can edit and save the new title of the todo', async () => {
    const editButton = getEditButton();
    userEvent.click(editButton);
    expect(editButton).toHaveTextContent('Save');

    const titleInput = screen.getByRole('textbox');
    expect(titleInput).toHaveValue(mockItem.title);

    const newTitle = 'Clean the car';
    editTodoInputValue(titleInput, newTitle);
    expect(titleInput).toHaveValue(newTitle);

    userEvent.click(editButton);
    await waitFor(() => expect(editButton).toHaveTextContent('Edit'));
    expect(mockUpdateTodo).toHaveBeenCalledTimes(1);
    expect(mockUpdateTodo).toHaveBeenCalledWith({
      ...mockItem,
      title: newTitle,
    });
  });
});
