import React, { useState } from 'react';
import img1 from '../../../../public/edu.jpeg';
import img2 from '../../../../public/schoolarship.png';
import img3 from '../../../../public/exam.jpg';
import img4 from '../../../../public/NPC.jpg';
import img5 from '../../../../public/What-are-the-role-and-importance-of-Education-Consultancy.webp';
import img6 from '../../../../public/texas.jpeg';

const UserNews: React.FC = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      img: img1,
      title: 'Government Launches New Education Policy',
      description: 'The government has introduced a new education policy focusing on digital learning and skill development.',
      date: '2024-12-14',
    },
    {
      id: 2,
      img: img2,
      title: 'Scholarship Program Announced',
      description: 'Educational institutes announce scholarship programs for underprivileged students.',
      date: '2024-12-10',
    },
    {
      id: 3,
      img: img3,
      title: 'Upcoming Examination Schedule Released',
      description: 'The examination schedule for 2024 has been released by the Education Board.',
      date: '2024-12-08',
    },
    {
      id: 4,
      img: img4,
      title: 'Government Launches New Education Policy',
      description: 'The government has introduced a new education policy focusing on digital learning and skill development.',
      date: '2024-12-14',
    },
    {
      id: 5,
      img: img5,
      title: 'Scholarship Program Announced',
      description: 'Educational institutes announce scholarship programs for underprivileged students.',
      date: '2024-12-10',
    },
    {
      id: 6,
      img: img6,
      title: 'Upcoming Examination Schedule Released',
      description: 'The examination schedule for 2024 has been released by the Education Board.',
      date: '2024-12-08',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter news based on search query
  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#ff4f18] p-4 rounded-xl text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">News Portal</h1>
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
          />
        </div>
      </nav>

      {/* News Section */}
      <main className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNews.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No news found for "{searchQuery}".</p>
        )}
      </main>
    </div>
  );
};

export default UserNews;
