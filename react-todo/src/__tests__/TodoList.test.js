import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

// Mock Date for consistent testing
const mockDate = new Date('2024-01-20T10:00:00Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

describe('TodoList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders initial todos correctly', () => {
    render(<TodoList />);

    expect(screen.getByText('My Todo List')).toBeInTheDocument();
    expect(screen.getByText('1 of 3 tasks completed')).toBeInTheDocument();

    // Check initial todos
    expect(screen.getByText('Learn React basics')).toBeInTheDocument();
    expect(screen.getByText('Build a todo app')).toBeInTheDocument();
    expect(screen.getByText('Write tests for the todo app')).toBeInTheDocument();

    // Check that the completed todo is checked
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // First todo should be completed
    expect(checkboxes[1]).not.toBeChecked(); // Second todo should not be completed
    expect(checkboxes[2]).not.toBeChecked(); // Third todo should not be completed
  });

  test('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');

    await user.type(input, 'New test todo');
    await user.click(addButton);

    // Check that the new todo appears
    expect(screen.getByText('New test todo')).toBeInTheDocument();

    // Check that the stats are updated
    expect(screen.getByText('1 of 4 tasks completed')).toBeInTheDocument();

    // Check that input is cleared
    expect(input.value).toBe('');
  });

  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const addButton = screen.getByText('Add Todo');

    await user.click(addButton);

    // Should still have 3 todos
    expect(screen.getByText('1 of 3 tasks completed')).toBeInTheDocument();
  });

  test('toggles todo completion status', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const checkboxes = screen.getAllByRole('checkbox');
    const secondCheckbox = checkboxes[1]; // "Build a todo app" - initially unchecked

    // Initially should show 1 of 3 completed
    expect(screen.getByText('1 of 3 tasks completed')).toBeInTheDocument();

    // Click to complete the todo
    await user.click(secondCheckbox);

    // Should now show 2 of 3 completed
    expect(screen.getByText('2 of 3 tasks completed')).toBeInTheDocument();
    expect(secondCheckbox).toBeChecked();

    // Click again to uncomplete
    await user.click(secondCheckbox);

    // Should show 1 of 3 completed again
    expect(screen.getByText('1 of 3 tasks completed')).toBeInTheDocument();
    expect(secondCheckbox).not.toBeChecked();
  });

  test('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // Initially should have 3 todos
    expect(screen.getByText('1 of 3 tasks completed')).toBeInTheDocument();

    // Find and click the delete button for the first todo
    const deleteButtons = screen.getAllByLabelText(/Delete todo/);
    await user.click(deleteButtons[0]);

    // Should now have 2 todos and still 1 completed
    expect(screen.getByText('1 of 2 tasks completed')).toBeInTheDocument();
    expect(screen.queryByText('Learn React basics')).not.toBeInTheDocument();
  });

  test('clears all todos when clear all button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const clearAllButton = screen.getByText('Clear All Todos');
    await user.click(clearAllButton);

    // Should show empty state
    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument();
    expect(screen.queryByText('Clear All Todos')).not.toBeInTheDocument();
  });

  test('shows correct dates for todos', () => {
    render(<TodoList />);

    // Check that dates are displayed (should be in a readable format)
    const dateElements = screen.getAllByText(/\d{1,2}\/\d{1,2}\/\d{4}/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  test('displays empty state when no todos exist', () => {
    // Mock TodoList with empty initial state
    jest.mock('../components/TodoList', () => {
      return function MockTodoList() {
        const [todos, setTodos] = useState([]);

        return (
          <div className="todo-container">
            <div className="todo-header">
              <h1>My Todo List</h1>
              <p className="todo-stats">0 of 0 tasks completed</p>
            </div>
            <div className="add-todo-form">
              <input placeholder="Add a new todo..." />
              <button>Add Todo</button>
            </div>
            <div className="empty-state">
              <p>No todos yet. Add one above to get started!</p>
            </div>
          </div>
        );
      };
    });

    render(<TodoList />);

    expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument();
  });

  test('add button is disabled when input is empty', () => {
    render(<TodoList />);

    const addButton = screen.getByText('Add Todo');
    expect(addButton).toBeDisabled();
  });

  test('add button is enabled when input has text', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');

    expect(addButton).toBeDisabled();

    await user.type(input, 'Test todo');

    expect(addButton).not.toBeDisabled();
  });

  test('can add todo by pressing Enter key', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a new todo...');

    await user.type(input, 'Enter key todo{enter}');

    expect(screen.getByText('Enter key todo')).toBeInTheDocument();
    expect(screen.getByText('1 of 4 tasks completed')).toBeInTheDocument();
  });

  test('trims whitespace from new todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');

    await user.type(input, '   Todo with spaces   ');
    await user.click(addButton);

    expect(screen.getByText('Todo with spaces')).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('maintains todo order when adding new todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');

    // Add first new todo
    await user.type(input, 'First new todo');
    await user.click(addButton);

    // Add second new todo
    await user.type(input, 'Second new todo');
    await user.click(addButton);

    const todoItems = screen.getAllByRole('checkbox');
    const todoTexts = screen.getAllByText(/new todo/);

    // New todos should appear at the top (most recent first)
    expect(todoTexts[0]).toHaveTextContent('Second new todo');
    expect(todoTexts[1]).toHaveTextContent('First new todo');
  });

  test('updates completion count correctly when toggling multiple todos', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const checkboxes = screen.getAllByRole('checkbox');

    // Initially 1 of 3 completed
    expect(screen.getByText('1 of 3 tasks completed')).toBeInTheDocument();

    // Complete second todo
    await user.click(checkboxes[1]);
    expect(screen.getByText('2 of 3 tasks completed')).toBeInTheDocument();

    // Complete third todo
    await user.click(checkboxes[2]);
    expect(screen.getByText('3 of 3 tasks completed')).toBeInTheDocument();

    // Uncomplete first todo
    await user.click(checkboxes[0]);
    expect(screen.getByText('2 of 3 tasks completed')).toBeInTheDocument();
  });
});
