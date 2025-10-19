import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to React Router Advanced Demo</h1>
        <p>This application demonstrates advanced routing techniques in React including:</p>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🏠 Basic Routing</h3>
            <p>Navigate between different pages using React Router</p>
            <Link to="/blog" className="feature-link">View Blog Posts</Link>
          </div>

          <div className="feature-card">
            <h3>🔒 Protected Routes</h3>
            <p>Secure pages that require authentication</p>
            <Link to="/profile" className="feature-link">View Profile (Login Required)</Link>
          </div>

          <div className="feature-card">
            <h3>🗂️ Nested Routes</h3>
            <p>Organize related routes under a parent route</p>
            <Link to="/profile" className="feature-link">Profile Sections</Link>
          </div>

          <div className="feature-card">
            <h3>🔗 Dynamic Routes</h3>
            <p>Handle variable paths and parameters</p>
            <Link to="/blog/1" className="feature-link">View Post #1</Link>
          </div>
        </div>
      </div>

      <div className="demo-info">
        <h2>How to Test the Features:</h2>
        <ol>
          <li><strong>Basic Routing:</strong> Use the navigation menu to move between pages</li>
          <li><strong>Protected Routes:</strong> Try accessing the Profile page without logging in</li>
          <li><strong>Nested Routes:</strong> Login and navigate to Profile to see nested sections</li>
          <li><strong>Dynamic Routes:</strong> Visit the Blog page and click on any post title</li>
        </ol>
      </div>
    </div>
  );
}

export default Home;
