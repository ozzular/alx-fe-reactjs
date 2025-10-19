import { Link, Outlet } from 'react-router-dom';

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
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
