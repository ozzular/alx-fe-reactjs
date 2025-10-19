import PropTypes from 'prop-types';
import UserCard from './UserCard';

const UserList = ({ users, variant = "default", showLoadMore = false, onLoadMore, loading = false }) => {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-6">
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No users found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try adjusting your search criteria or search for different terms to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Cards */}
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          variant={variant}
        />
      ))}
      
      {/* Load More Button */}
      {showLoadMore && (
        <div className="text-center mt-10">
          <button 
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Load more'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      login: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired,
    })
  ),
  variant: PropTypes.oneOf(['default', 'detailed']),
  showLoadMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
  loading: PropTypes.bool,
};

export default UserList;
