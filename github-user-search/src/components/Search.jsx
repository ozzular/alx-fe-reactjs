import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchMode, setSearchMode] = useState('basic'); // 'basic' or 'advanced'
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    
    if (!searchParams.username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults(null);

    try {
      const data = await fetchUserData(searchParams.username.trim());
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    
    if (!searchParams.username.trim() && !searchParams.location.trim()) {
      setError('Please enter a username or location');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults(null);
    setCurrentPage(1);

    try {
      const data = await searchUsers({
        username: searchParams.username.trim(),
        location: searchParams.location.trim(),
        minRepos: searchParams.minRepos ? parseInt(searchParams.minRepos) : null,
        page: 1
      });
      setSearchResults(data);
    } catch (err) {
      setError('Looks like we cant find any users matching your criteria');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = async () => {
    if (!searchResults || loading) return;

    setLoading(true);
    try {
      const data = await searchUsers({
        username: searchParams.username.trim(),
        location: searchParams.location.trim(),
        minRepos: searchParams.minRepos ? parseInt(searchParams.minRepos) : null,
        page: currentPage + 1
      });
      
      setSearchResults(prev => ({
        ...data,
        items: [...prev.items, ...data.items]
      }));
      setCurrentPage(prev => prev + 1);
    } catch (err) {
      setError('Error loading more results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar - 3 columns */}
        <div className="col-span-12 lg:col-span-3">
          <div className="space-y-6">
            {/* Search Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Filters</h3>
              
              {/* Search Mode Toggle */}
              <div className="mb-4">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setSearchMode('basic')}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      searchMode === 'basic'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Basic
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode('advanced')}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      searchMode === 'advanced'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              
              <form onSubmit={searchMode === 'basic' ? handleBasicSearch : handleAdvancedSearch} className="space-y-3">
                {/* Username Input */}
                <div>
                  <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={searchParams.username}
                    onChange={handleInputChange}
                    placeholder="Enter GitHub username"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Advanced Search Fields */}
                {searchMode === 'advanced' && (
                  <>
                    <div>
                      <label htmlFor="location" className="block text-xs font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={searchParams.location}
                        onChange={handleInputChange}
                        placeholder="e.g., San Francisco, CA"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="minRepos" className="block text-xs font-medium text-gray-700 mb-1">
                        Min Repositories
                      </label>
                      <input
                        type="number"
                        id="minRepos"
                        name="minRepos"
                        value={searchParams.minRepos}
                        onChange={handleInputChange}
                        placeholder="e.g., 5"
                        min="0"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-3 text-sm rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </form>
            </div>
            
            {/* Advanced search link */}
            <div className="text-center">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Advanced search
              </a>
            </div>
          </div>
        </div>

        {/* Right Main Content - 9 columns */}
        <div className="col-span-12 lg:col-span-9">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Basic Search Result */}
          {userData && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <img
                      src={userData.avatar_url}
                      alt={`${userData.login}'s avatar`}
                      className="w-12 h-12 rounded-[12px] border border-gray-200"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://github.com/identicons/${userData.login}.png`; }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <a 
                          href={userData.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          {userData.login}
                        </a>
                        {userData.name && (
                          <>
                            <span className="text-gray-500">·</span>
                            <span className="text-gray-500">{userData.name}</span>
                          </>
                        )}
                      </div>
                      {userData.bio && (
                        <p className="text-gray-700 text-sm mt-1">{userData.bio}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        {userData.location && (
                          <span className="flex items-center">
                            📍 {userData.location}
                          </span>
                        )}
                        <span className="flex items-center">
                          📦 {userData.public_repos} repositories
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Search Results */}
          {searchResults && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {searchResults.total_count.toLocaleString()} user results
                </h3>
              </div>

              <div className="space-y-3">
                {searchResults.items.map((user) => (
                  <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <img
                          src={user.avatar_url}
                          alt={`${user.login}'s avatar`}
                          className="w-12 h-12 rounded-[12px] border border-gray-200"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://github.com/identicons/${user.login}.png`; }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <a
                              href={user.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                              {user.login}
                            </a>
                            {user.name && (
                              <>
                                <span className="text-gray-500">·</span>
                                <span className="text-gray-500">{user.name}</span>
                              </>
                            )}
                          </div>
                          {user.bio && (
                            <p className="text-gray-700 text-sm mt-1">{user.bio}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            {user.location && (
                              <span className="flex items-center">
                                📍 {user.location}
                              </span>
                            )}
                            {user.public_repos !== undefined && (
                              <span className="flex items-center">
                                📦 {user.public_repos} repositories
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {searchResults.items.length < searchResults.total_count && (
                <div className="text-center mt-6">
                  <button
                    onClick={loadMoreResults}
                    disabled={loading}
                    className="px-6 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
