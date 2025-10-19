import { useState } from 'react';
import AddTodoForm from './AddTodoForm';

function TodoList() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Learn React basics',
      completed: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      text: 'Build a todo app',
      completed: false,
      createdAt: new Date('2024-01-16')
    },
    {
      id: 3,
      text: 'Write tests for the todo app',
      completed: false,
      createdAt: new Date('2024-01-17')
    }
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };

    if (newTodo.text) {
      setTodos(prev => [newTodo, ...prev]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>My Todo List</h1>
        <p className="todo-stats">
          {completedCount} of {totalCount} tasks completed
        </p>
      </div>

      <AddTodoForm onAddTodo={addTodo} />

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Add one above to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <span className="todo-date">
                  {todo.createdAt.toLocaleDateString()}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
                aria-label={`Delete todo: ${todo.text}`}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="todo-footer">
          <button
            onClick={() => setTodos([])}
            className="clear-all-button"
          >
            Clear All Todos
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
