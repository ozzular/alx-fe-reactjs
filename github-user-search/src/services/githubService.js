import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} - Promise that resolves to user data
 */
export async function fetchUserData(username) {
  return axios.get(`https://api.github.com/users/${username}`);
}

export const enrichUserData = async (users) => {
  try {
    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        try {
          const detailedUser = await fetchUserData(user.login);
          return {
            ...user,
            name: detailedUser.data.name,
            bio: detailedUser.data.bio,
            location: detailedUser.data.location,
            public_repos: detailedUser.data.public_repos,
            followers: detailedUser.data.followers,
            following: detailedUser.data.following,
            company: detailedUser.data.company,
            blog: detailedUser.data.blog,
            created_at: detailedUser.data.created_at
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

export async function fetchAdvancedUsers(query) {
  return axios.get(`https://api.github.com/search/users?q=${query}`);
}

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
