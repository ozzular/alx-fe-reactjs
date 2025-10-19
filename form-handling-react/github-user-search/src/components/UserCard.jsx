import PropTypes from 'prop-types';

const UserCard = ({ user, variant = "default" }) => {
  if (!user) return null;

  const isDetailed = variant === "detailed";
  const avatarSize = isDetailed ? "w-24 h-24" : "w-20 h-20";
  const titleSize = isDetailed ? "text-2xl" : "text-xl";
  const spacing = isDetailed ? "space-y-6 md:space-y-0 md:space-x-6" : "space-y-6 md:space-y-0 md:space-x-6";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 fade-in">
      <div className={`flex flex-col md:flex-row items-start ${spacing}`}>
        {/* User Avatar */}
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className={`${avatarSize} rounded-full ${isDetailed ? 'border-4 border-gray-100 shadow' : 'border-2 border-gray-100'}`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://github.com/identicons/${user.login}.png`;
          }}
        />
        
        {/* User Information */}
        <div className="flex-1 min-w-0">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${titleSize} font-bold text-blue-600 hover:underline transition-colors`}
              >
                {user.login}
              </a>
              {user.name && (
                <p className={`text-gray-700 mt-1 ${isDetailed ? 'text-lg' : 'text-base'}`}>
                  {user.name}
                </p>
              )}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isDetailed 
                ? 'bg-blue-50 text-blue-800' 
                : 'bg-green-50 text-green-800'
            }`}>
              Public
            </div>
          </div>
          
          {/* Bio Section */}
          {user.bio && (
            <p className={`text-gray-700 mt-4 ${isDetailed ? 'text-lg' : 'text-base'}`}>
              {user.bio}
            </p>
          )}
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {user.location && (
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{user.location}</span>
              </div>
            )}
            
            {user.public_repos !== null && user.public_repos !== undefined && (
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>{user.public_repos} repositories</span>
              </div>
            )}
            
            {user.followers !== null && user.followers !== undefined && (
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{user.followers} followers</span>
              </div>
            )}
            
            {/* Score for search results */}
            {user.score && (
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Score: {user.score.toFixed(1)}</span>
              </div>
            )}
          </div>
          
          {/* Action Button */}
          <div className="mt-6">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md font-medium ${
                isDetailed ? 'text-base' : 'text-sm'
              }`}
            >
              {isDetailed ? 'View on GitHub' : 'View Profile'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    name: PropTypes.string,
    bio: PropTypes.string,
    location: PropTypes.string,
    public_repos: PropTypes.number,
    followers: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'detailed']),
};

export default UserCard;
