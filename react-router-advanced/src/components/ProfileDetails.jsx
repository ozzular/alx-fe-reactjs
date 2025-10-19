import { Link } from 'react-router-dom';

function ProfileDetails() {
  const userDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Full-stack developer passionate about React and modern web technologies.',
    location: 'San Francisco, CA',
    joinDate: 'January 2020',
    website: 'https://johndoe.dev'
  };

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>

      <div className="details-card">
        <div className="detail-item">
          <label>Name:</label>
          <span>{userDetails.name}</span>
        </div>

        <div className="detail-item">
          <label>Email:</label>
          <span>{userDetails.email}</span>
        </div>

        <div className="detail-item">
          <label>Bio:</label>
          <span>{userDetails.bio}</span>
        </div>

        <div className="detail-item">
          <label>Location:</label>
          <span>{userDetails.location}</span>
        </div>

        <div className="detail-item">
          <label>Member Since:</label>
          <span>{userDetails.joinDate}</span>
        </div>

        <div className="detail-item">
          <label>Website:</label>
          <span>
            <a href={userDetails.website} target="_blank" rel="noopener noreferrer">
              {userDetails.website}
            </a>
          </span>
        </div>
      </div>

      <div className="profile-actions">
        <Link to="settings" className="action-button">
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default ProfileDetails;
