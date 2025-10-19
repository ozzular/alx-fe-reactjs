import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          className="todo-input"
          autoFocus
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="add-button"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default AddTodoForm;
