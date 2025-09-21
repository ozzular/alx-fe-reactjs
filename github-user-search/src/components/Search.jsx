import { useState } from 'react';
import { fetchUserData, fetchAdvancedUsers } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [sortBy, setSortBy] = useState('best-match');

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults(null);

    try {
      const response = await fetchUserData(username.trim());
      setUserData(response.data);
    } catch {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    
    if (!username.trim() && !location.trim()) {
      setError('Please enter a username or location');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults(null);

    try {
      // Build query string for advanced search
      const queryParams = [];
      if (username.trim()) queryParams.push(username.trim());
      if (location.trim()) queryParams.push(`location:${location.trim()}`);
      if (minRepos) queryParams.push(`repos:>${minRepos}`);
      
      const query = queryParams.join('+');
      const response = await fetchAdvancedUsers(query);
      setSearchResults(response.data);
    } catch {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Discover and explore GitHub users with our powerful search tool.
            </h1>
            <p className="text-gray-600">Find developers by username, location, or repository count.</p>
          </div>

          {/* Main Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleBasicSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search GitHub users"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Search Mode Toggle */}
            <div className="flex justify-center mt-4">
              <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                <button
                  onClick={() => setIsAdvancedSearch(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    !isAdvancedSearch
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Basic Search
                </button>
                <button
                  onClick={() => setIsAdvancedSearch(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isAdvancedSearch
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Advanced Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Search Form */}
      {isAdvancedSearch && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <form onSubmit={handleAdvancedSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Repositories</label>
                  <input
                    type="number"
                    placeholder="Min repos"
                    value={minRepos}
                    onChange={(e) => setMinRepos(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Advanced Search'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-3 text-gray-600">Searching...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Results Header and Sort */}
        {(userData || (searchResults && searchResults.items && searchResults.items.length > 0)) && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {searchResults ? `${searchResults.total_count.toLocaleString()} users` : '1 user'}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-600">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="best-match">Best match</option>
                <option value="followers">Most followers</option>
                <option value="repositories">Most repositories</option>
                <option value="joined">Recently joined</option>
              </select>
            </div>
          </div>
        )}

        {/* Single User Result */}
        {userData && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                className="w-16 h-16 rounded-full"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://github.com/identicons/${userData.login}.png`;
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {userData.login}
                  </a>
                </div>
                {userData.name && (
                  <p className="text-gray-600 mt-1">{userData.name}</p>
                )}
                {userData.bio && (
                  <p className="text-gray-700 mt-2">{userData.bio}</p>
                )}
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                  {userData.location && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.public_repos !== null && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>{userData.public_repos} repositories</span>
                    </div>
                  )}
                  {userData.followers !== null && (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{userData.followers} followers</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Multiple Users Results */}
        {searchResults && searchResults.items && searchResults.items.length > 0 && (
          <div className="space-y-4">
            {searchResults.items.map((user) => (
              <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="w-16 h-16 rounded-full"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://github.com/identicons/${user.login}.png`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-blue-600 hover:underline"
                      >
                        {user.login}
                      </a>
                    </div>
                    {user.name && (
                      <p className="text-gray-600 mt-1">{user.name}</p>
                    )}
                    {user.bio && (
                      <p className="text-gray-700 mt-2">{user.bio}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                      {user.location && (
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{user.location}</span>
                        </div>
                      )}
                      {user.public_repos !== null && (
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <span>{user.public_repos} repositories</span>
                        </div>
                      )}
                      {user.followers !== null && (
                        <div className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{user.followers} followers</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {searchResults && searchResults.items && searchResults.total_count > searchResults.items.length && (
          <div className="text-center mt-8">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Load more
            </button>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && !userData && searchResults && searchResults.items && searchResults.items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or search for different terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;