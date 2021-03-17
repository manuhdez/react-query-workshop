import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { updateTodo } from 'api/todos';
import TodoItem from './TodoItem';

jest.mock('api/todos');

describe('TodoItem', () => {
  const mockItem = { id: 208, title: 'mock todo item', done: false };

  beforeEach(() => {
    render(<TodoItem todo={mockItem} />);
    (updateTodo as jest.Mock).mockResolvedValue(() =>
      Promise.resolve({ status: 200 })
    );
  });

  test('display item title', () => {
    const title = screen.getByText(mockItem.title);
    expect(title).toBeInTheDocument();
  });

  test('display the done status as a checkbox that can be toggled to update its value', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('user can edit the title of the todo', () => {
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveTextContent('Edit');

    userEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent('Save');

    const titleInput = screen.getByRole('textbox');
    expect(titleInput).toBeEnabled();
    expect(titleInput).toHaveValue(mockItem.title);

    userEvent.clear(titleInput);
    userEvent.type(titleInput, 'updated title');
    expect(titleInput).toHaveValue('updated title');
  });
});
