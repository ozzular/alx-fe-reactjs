import { Routes, Route, Link } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Welcome to your profile dashboard</p>
      </div>

      <div className="profile-content">
        <nav className="profile-nav">
          <ul className="profile-nav-links">
            <li>
              <Link to="details" className="profile-nav-link">
                Profile Details
              </Link>
            </li>
            <li>
              <Link to="settings" className="profile-nav-link">
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <div className="profile-outlet">
          <Routes>
            <Route path="details" element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Profile;
