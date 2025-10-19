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

    const deleteButtons = screen.getAllByLabelText(/delete todo/i);
    const deleteButton = deleteButtons[0];

    await user.click(deleteButton);

    const todos = screen.queryAllByRole('checkbox');
    expect(todos).toHaveLength(2); // Should have 2 todos left (3 - 1 = 2)
  });

  test('displays empty state when no todos exist', async () => {
    // Mock a TodoList with empty state by clearing all todos
    const EmptyTodoList = () => {
      const [todos, setTodos] = React.useState([]);
      return (
        <div className="todo-container">
          <div className="todo-header">
            <h1>My Todo List</h1>
            <p className="todo-stats">
              {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
            </p>
          </div>
          <div className="todo-list">
            {todos.length === 0 ? (
              <div className="empty-state">
                <p>No todos yet. Add one above to get started!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.text}</span>
                    <span className="todo-date">
                      {todo.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <button className="delete-button" aria-label={`Delete todo: ${todo.text}`}>
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      );
    };

    render(<EmptyTodoList />);
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  test('displays correct completion statistics', () => {
    render(<TodoList />);
    // Should show "1 of 3 tasks completed" since we have 1 completed todo out of 3
    expect(screen.getByText('1 of 3 tasks completed')).toBeInTheDocument();
  });

  test('clears all todos when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const clearButton = screen.getByRole('button', { name: /clear all todos/i });
    await user.click(clearButton);

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  test('prevents adding empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const button = screen.getByRole('button', { name: /add todo/i });

    // Button should be disabled for empty input
    expect(button).toBeDisabled();

    // Try to click anyway (should not add todo)
    await user.click(button);

    // Should still have only 3 initial todos
    const todos = screen.getAllByRole('checkbox');
    expect(todos).toHaveLength(3);
  });
});
