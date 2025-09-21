import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} - Promise that resolves to user data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
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

    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: query.trim(),
        page,
        per_page: 10
      }
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      throw new Error('Invalid search query');
    }
    throw new Error('An error occurred while searching users');
  }
};
