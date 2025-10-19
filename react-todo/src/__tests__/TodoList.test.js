import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders the TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText('My Todo List')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByRole('button', { name: /add todo/i });

    await user.type(input, 'Test Todo');
    await user.click(button);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const checkboxes = screen.getAllByRole('checkbox');
    const checkbox = checkboxes[1]; // Get second checkbox

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const deleteButtons = screen.getAllByRole('button', { name: /×/ });
    const deleteButton = deleteButtons[0];

    await user.click(deleteButton);

    const todos = screen.queryAllByRole('checkbox');
    expect(todos).toHaveLength(2); // Should have 2 todos left
  });
});
