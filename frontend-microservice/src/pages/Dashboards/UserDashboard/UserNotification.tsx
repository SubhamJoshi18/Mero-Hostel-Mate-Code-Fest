import React, { useState } from 'react';

const UserNotification: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      description:
        'The platform will be down for maintenance on December 16th, 2024, from 12:00 AM to 6:00 AM.',
      timestamp: '2024-12-14 10:30 AM',
    },
    {
      id: 2,
      title: 'New Feature: Hostel Comparison',
      description:
        'We’ve added a new feature that allows users to compare hostels side by side.',
      timestamp: '2024-12-13 03:45 PM',
    },
    {
      id: 3,
      title: 'Updated Privacy Policy',
      description:
        'Our privacy policy has been updated. Please review the changes to understand how we handle your data.',
      timestamp: '2024-12-12 09:00 AM',
    },
    {
      id: 4,
      title: 'Important: Verification Reminder',
      description:
        'Complete your account verification before December 20th to avoid service interruptions.',
      timestamp: '2024-12-10 04:15 PM',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter notifications based on search query
  const filteredNotifications = notifications.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#ff4f18] p-4 rounded-xl text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Notifications</h1>
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
          />
        </div>
      </header>

      {/* Notification Section */}
      <main className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4">Recent Notices</h2>
        {filteredNotifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotifications.map((notice) => (
              <div
                key={notice.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold mb-2">{notice.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {notice.description}
                </p>
                <span className="text-xs text-gray-400">
                  Posted on: {notice.timestamp}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No notifications found for "{searchQuery}".
          </p>
        )}
      </main>
    </div>
  );
};

export default UserNotification;
