import { useState, useEffect } from 'react';
import { fetchUserData, fetchAdvancedUsers, enrichUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  // Listen to global header search submission and trigger a basic search
  useEffect(() => {
    const onHeaderSearch = (e) => {
      const q = (e.detail?.query || '').trim();
      if (!q) return;
      setUsername(q);
      setLocation('');
      setMinRepos('');

      (async () => {
        setLoading(true);
        setError('');
        setUserData(null);
        setSearchResults(null);
        try {
          const data = await fetchUserData(q);
          setUserData(data);
        } catch {
          setError('Looks like we cant find the user');
        } finally {
          setLoading(false);
        }
      })();
    };

    window.addEventListener('app:search', onHeaderSearch);
    return () => window.removeEventListener('app:search', onHeaderSearch);
  }, []);



  const handleBasicSearch = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults(null);

    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
    } catch {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const buildAdvancedQuery = () => {
    const parts = [];
    if (username.trim()) parts.push(username.trim());
    if (location.trim()) parts.push(`location:${location.trim()}`);
    if (minRepos) parts.push(`repos:>${minRepos}`);
    return parts.join('+');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (location.trim() || (minRepos && String(minRepos).trim() !== '')) {
      await handleAdvancedSearch();
    } else {
      await handleBasicSearch();
    }
  };

  const handleAdvancedSearch = async () => {
    const query = buildAdvancedQuery();
    if (!query) {
      setError('Please enter a username or location');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);
    setSearchResults(null);
    setCurrentPage(1);

    try {
      const data = await fetchAdvancedUsers(query);
      const enriched = await enrichUserData(data.items || []);
      setSearchResults({ ...data, items: enriched });
      setLastQuery(query);
    } catch {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = async () => {
    if (!searchResults || loading || !lastQuery) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const data = await fetchAdvancedUsers(`${lastQuery}&page=${nextPage}`);
      const enriched = await enrichUserData(data.items || []);
      setSearchResults(prev => ({
        ...data,
        items: [...prev.items, ...enriched]
      }));
      setCurrentPage(prev => prev + 1);
    } catch {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-6">
        <h1 className="text-3xl font-bold text-gray-900">Search</h1>
      </div>
      <hr className="border-gray-200 my-6" />
      <div className="grid grid-cols-12 gap-8">
        {/* Left Sidebar - 3 columns */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900">Repositories</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-gray-700">Code</span>
                <span className="text-gray-500">8K</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-gray-700">Commits</span>
                <span className="text-gray-500">1M</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-gray-700">Issues</span>
                <span className="text-gray-500">2M</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-gray-700">Discussions</span>
                <span className="text-gray-500">101K</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span className="text-gray-700">Packages</span>
                <span className="text-gray-500">243</span>
              </div>
            </div>
            <div className="p-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Advanced search</a>
            </div>
          </div>
        </div>

        {/* Right Main Content - 9 columns */}
        <div className="col-span-12 lg:col-span-9">
          {/* Basic Search Form - Only visible when no results */}
          {!userData && !searchResults && !loading && !error && (
            <form onSubmit={handleFormSubmit} className="mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Search
                </button>
              </div>
            </form>
          )}

          {/* Advanced Search Form - Only visible when needed */}
          {(location.trim() || minRepos) && (
            <form onSubmit={handleFormSubmit} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Min repos"
                  value={minRepos}
                  onChange={(e) => setMinRepos(e.target.value)}
                  min="0"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          )}
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
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">1 user result</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <img
                      src={userData.avatar_url}
                      alt={`${userData.login}'s avatar`}
                      className="w-16 h-16 rounded-full"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://github.com/identicons/${userData.login}.png`; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <a
                          href={userData.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {userData.login}
                        </a>
                        {userData.name && (
                          <span className="text-gray-600 text-lg">{userData.name}</span>
                        )}
                      </div>
                      {userData.bio && (
                        <p className="text-gray-700 text-sm mb-2 leading-relaxed">{userData.bio}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {userData.location && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {userData.location}
                          </span>
                        )}
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                          {userData.public_repos} repositories
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Search Results */}
          {searchResults && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button type="button" className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700">
                    Filters <span className="ml-1">▾</span>
                  </button>
                  <span className="text-sm text-gray-600">
                    {searchResults.total_count.toLocaleString()} user results
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Sort:</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option>Best match</option>
                    <option>Most followers</option>
                    <option>Fewest followers</option>
                    <option>Most recently joined</option>
                    <option>Least recently joined</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {searchResults.items.map((user) => (
                  <div key={user.id} className="py-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <img
                          src={user.avatar_url}
                          alt={`${user.login}'s avatar`}
                          className="w-16 h-16 rounded-full"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://github.com/identicons/${user.login}.png`; }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <a
                              href={user.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                            >
                              {user.login}
                            </a>
                            {user.name && (
                              <span className="text-gray-600 text-lg">{user.name}</span>
                            )}
                          </div>
                          {user.bio && (
                            <p className="text-gray-700 text-sm mb-2 leading-relaxed">{user.bio}</p>
                          )}
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {user.location && (
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {user.location}
                              </span>
                            )}
                            {user.public_repos !== undefined && (
                              <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                                {user.public_repos} repositories
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
                        Follow
                      </button>
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
