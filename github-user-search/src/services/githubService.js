import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} - Promise that resolves to user data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
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
export const searchUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    let query = '';

    if (username) {
      query += `${username} in:login`;
    }

    if (location) {
      query += ` location:${location}`;
    }

    if (minRepos) {
      query += ` repos:>=${minRepos}`;
    }

    // Ensure we have at least some search criteria
    if (!query.trim()) {
      throw new Error('Please provide search criteria');
    }

    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: query.trim(),
        page,
        per_page: 10
      },
      timeout: 10000, // 10 second timeout
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
