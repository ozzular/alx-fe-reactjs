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
