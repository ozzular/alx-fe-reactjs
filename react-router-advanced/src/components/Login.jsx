import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple demo authentication - in real app, this would be an API call
    if (credentials.username && credentials.password) {
      // Simulate successful login
      onLogin();
      setIsLoggedIn(true);
    }
  };

  // Redirect to profile if already logged in
  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1>Login</h1>
        <p>Please log in to access your profile</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials:</h3>
          <p><strong>Username:</strong> demo</p>
          <p><strong>Password:</strong> password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
