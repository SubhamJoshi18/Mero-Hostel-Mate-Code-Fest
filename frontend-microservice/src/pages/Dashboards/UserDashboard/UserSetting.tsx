import React from 'react';

const UserSettings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#ff4f18] p-4 rounded-xl text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      {/* Settings Section */}
      <main className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-6">User Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <button className="text-blue-500 hover:underline">
                  Change Password
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Update Email
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Delete Account
                </button>
              </li>
            </ul>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Notification Settings</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    defaultChecked
                  />
                  Enable Email Notifications
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                  />
                  Enable SMS Notifications
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    defaultChecked
                  />
                  Enable Push Notifications
                </label>
              </li>
            </ul>
          </div>

          {/* Preferences */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Preferences</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <label className="flex items-center">
                  <span className="mr-3">Language</span>
                  <select className="p-2 border rounded">
                    <option>English</option>
                    <option>Nepali</option>
                    <option>Hindi</option>
                  </select>
                </label>
              </li>
              <li>
                <label className="flex items-center">
                  <span className="mr-3">Theme</span>
                  <select className="p-2 border rounded">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System Default</option>
                  </select>
                </label>
              </li>
            </ul>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Privacy Settings</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <button className="text-blue-500 hover:underline">
                  Manage Data Sharing
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  View Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-blue-500 hover:underline">
                  Clear Browsing Data
                </button>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserSettings;
