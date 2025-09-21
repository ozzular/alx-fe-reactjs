import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username"
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {userData && (
        <div className="user-result">
          <div className="user-card">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`}
              className="user-avatar"
            />
            <div className="user-info">
              <h3>{userData.name || userData.login}</h3>
              <p className="username">@{userData.login}</p>
              {userData.bio && <p className="bio">{userData.bio}</p>}
              <a 
                href={userData.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
