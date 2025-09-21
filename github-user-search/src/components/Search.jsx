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

      // Enrich each result with detailed user info (bio, location, public_repos)
      const details = await Promise.all(
        (data.items || []).map((u) =>
          fetchUserData(u.login).catch(() => null)
        )
      );

      const enriched = {
        ...data,
        items: (data.items || []).map((u, i) => ({ ...u, ...(details[i] || {}) })),
      };

      setSearchResults(enriched);
    } catch {
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

      const details = await Promise.all(
        (data.items || []).map((u) =>
          fetchUserData(u.login).catch(() => null)
        )
      );
      const enrichedItems = (data.items || []).map((u, i) => ({
        ...u,
        ...(details[i] || {}),
      }));

      setSearchResults(prev => ({
        ...data,
        items: [...prev.items, ...enrichedItems]
      }));
      setCurrentPage(prev => prev + 1);
    } catch {
      setError('Error loading more results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Search Mode Toggle */}
      <div className="mb-6">
        <div className="flex space-x-4 justify-center">
          <button
            type="button"
            onClick={() => setSearchMode('basic')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchMode === 'basic'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Basic Search
          </button>
          <button
            type="button"
            onClick={() => setSearchMode('advanced')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              searchMode === 'advanced'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Advanced Search
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={searchMode === 'basic' ? handleBasicSearch : handleAdvancedSearch}>
          <div className="space-y-4">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={searchParams.username}
                onChange={handleInputChange}
                placeholder="Enter GitHub username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Advanced Search Fields */}
            {searchMode === 'advanced' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={searchParams.location}
                      onChange={handleInputChange}
                      placeholder="e.g., San Francisco, CA"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Repositories
                    </label>
                    <input
                      type="number"
                      id="minRepos"
                      name="minRepos"
                      value={searchParams.minRepos}
                      onChange={handleInputChange}
                      placeholder="e.g., 5"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

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
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-6">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-20 h-20 rounded-full border-2 border-gray-200"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{userData.name || userData.login}</h3>
              <p className="text-gray-600">@{userData.login}</p>
              {userData.bio && <p className="text-gray-700 mt-2">{userData.bio}</p>}
              {userData.location && (
                <p className="text-gray-600 mt-1">📍 {userData.location}</p>
              )}
              <div className="flex space-x-4 mt-2 text-sm text-gray-600">
                <span>📚 {userData.public_repos} repositories</span>
                <span>👥 {userData.followers} followers</span>
                <span>👤 {userData.following} following</span>
              </div>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Results */}
      {searchResults && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar (Filters) */}
          <aside className="md:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Filters</h4>
              <a
                href="https://github.com/search/advanced"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Advanced search
              </a>
            </div>
          </aside>

          {/* Results List */}
          <section className="md:col-span-9">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {searchResults.total_count?.toLocaleString?.() || searchResults.total_count} user results
              </h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
              {searchResults.items.map((user) => (
                <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <img
                      src={user.avatar_url}
                      alt={`${user.login}'s avatar`}
                      className="w-12 h-12 rounded-full ring-1 ring-gray-200"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2">
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {user.login}
                        </a>
                        {user.name && <span className="text-gray-500">· {user.name}</span>}
                      </div>

                      {user.bio && (
                        <p className="text-gray-700 mt-1 break-words">{user.bio}</p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                        {user.location && <span>📍 {user.location}</span>}
                        {typeof user.public_repos === 'number' && (
                          <span>📦 {user.public_repos} repos</span>
                        )}
                      </div>
                    </div>

                    <div className="ml-4">
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                      >
                        View
                      </a>
                    </div>
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
                  className="px-6 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Search;
