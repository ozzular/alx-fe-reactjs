import { useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    timezone: 'UTC'
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving settings
    console.log('Saving settings:', settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>

      {isSaved && (
        <div className="success-message">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h3>Notifications</h3>

          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Email Notifications
            </label>
            <p className="setting-description">Receive email updates about your account activity</p>
          </div>

          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={settings.pushNotifications}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Push Notifications
            </label>
            <p className="setting-description">Receive push notifications in your browser</p>
          </div>
        </div>

        <div className="settings-section">
          <h3>Appearance</h3>

          <div className="setting-item">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Dark Mode
            </label>
            <p className="setting-description">Use dark theme for the interface</p>
          </div>
        </div>

        <div className="settings-section">
          <h3>Localization</h3>

          <div className="setting-item">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="settings-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="setting-item">
            <label htmlFor="timezone">Timezone:</label>
            <select
              id="timezone"
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="settings-select"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">Greenwich Mean Time</option>
            </select>
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-button">
            Save Settings
          </button>
          <Link to="details" className="cancel-button">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ProfileSettings;
