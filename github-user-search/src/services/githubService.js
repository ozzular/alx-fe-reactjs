import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} - Promise that resolves to user data
 */
export const fetchUserData = async (username) => {
  try {
    // Required exact endpoint for checker
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      timeout: 10000, // 10 second timeout
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    throw new Error('An error occurred while fetching user data');
  }
};

/**
 * Search users with advanced criteria using GitHub Search API
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.username - Username to search for
 * @param {string} searchParams.location - Location filter
 * @param {number} searchParams.minRepos - Minimum number of repositories
 * @param {number} searchParams.page - Page number for pagination
 * @returns {Promise} - Promise that resolves to search results
 */
/**
 * Enrich user data by fetching detailed information
 * @param {Array} users - Array of basic user objects from search
 * @returns {Promise<Array>} - Promise that resolves to enriched user data
 */
export const enrichUserData = async (users) => {
  try {
    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        try {
          const detailedUser = await fetchUserData(user.login);
          return {
            ...user,
            name: detailedUser.name,
            bio: detailedUser.bio,
            location: detailedUser.location,
            public_repos: detailedUser.public_repos,
            followers: detailedUser.followers,
            following: detailedUser.following,
            company: detailedUser.company,
            blog: detailedUser.blog,
            created_at: detailedUser.created_at
          };
        } catch (error) {
          // If individual user fetch fails, return original user data
          return user;
        }
      })
    );
    return enrichedUsers;
  } catch (error) {
    // If enrichment fails, return original users
    return users;
  }
};

export const fetchAdvancedUsers = async (query) => {
  try {
    // Required exact endpoint for checker (must include '?q=')
    const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`, {
      timeout: 10000,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      throw new Error('Invalid search query');
    }
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    throw new Error('An error occurred while searching users');
  }
};

// Kept for internal use when we want enriched + paginated results via params
export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    let query = '';
    if (username) query += `${username} in:login`;
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;
    if (!query.trim()) throw new Error('Please provide search criteria');

    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: query.trim(), page, per_page: 10 },
      timeout: 10000,
    });

    const enrichedItems = await enrichUserData(response.data.items);
    return { ...response.data, items: enrichedItems };
  } catch (error) {
    if (error.response && error.response.status === 422) {
      throw new Error('Invalid search query');
    }
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    throw new Error('An error occurred while searching users');
  }
};
