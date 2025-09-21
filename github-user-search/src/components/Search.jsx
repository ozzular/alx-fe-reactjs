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
          {/* Search Form */}
          <form onSubmit={handleFormSubmit} className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <label className="sr-only" htmlFor="username">Username</label>
                <input id="username" type="text" placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="col-span-12 md:col-span-3">
                <label className="sr-only" htmlFor="location">Location</label>
                <input id="location" type="text" placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="col-span-12 md:col-span-3">
                <label className="sr-only" htmlFor="minRepos">Minimum repos</label>
                <input id="minRepos" type="number" placeholder="Minimum repos"
                  value={minRepos}
                  onChange={(e) => setMinRepos(e.target.value)}
                  min="0"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="col-span-12 md:col-span-3 flex md:justify-end">
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm w-full md:w-auto">Search</button>
              </div>
            </div>
          </form>
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
              <div className="py-6 border-t border-gray-200 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <img
                      src={userData.avatar_url}
                      alt={`${userData.login}'s avatar`}
                      className="w-12 h-12 rounded-full border border-gray-200"
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
                  <button className="px-4 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Search Results */}
          {searchResults && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <button type="button" className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700">
                  Filters <span className="ml-1">▾</span>
                </button>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {searchResults.total_count.toLocaleString()} user results
                </h3>
              </div>

              <div className="space-y-3">
                {searchResults.items.map((user) => (
                  <div key={user.id} className="py-6 border-t border-gray-200 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <img
                          src={user.avatar_url}
                          alt={`${user.login}'s avatar`}
                          className="w-12 h-12 rounded-full border border-gray-200"
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
                        className="px-4 py-1.5 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors"
                      >
                        Follow
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
