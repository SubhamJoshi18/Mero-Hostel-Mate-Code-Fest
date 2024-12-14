import React from 'react';

const UserSupport: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#ff4f18] p-4 rounded-xl text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold">Support Center</h1>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <a
                href="#faq"
                className="hover:text-blue-300 transition duration-200"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-blue-300 transition duration-200"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#tickets"
                className="hover:text-blue-300 transition duration-200"
              >
                Manage Tickets
              </a>
            </li>
            <li>
              <a
                href="#livechat"
                className="hover:text-blue-300 transition duration-200"
              >
                Live Chat
              </a>
            </li>
          </ul>

          {/* Hamburger Menu (Mobile) */}
          <button className="md:hidden flex items-center">
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Support Content */}
      <main className="container mx-auto py-6 px-4">
        {/* FAQs Section */}
        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Find answers to commonly asked questions about our services and
            platform.
          </p>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Need assistance? Reach out to us via email, phone, or our contact
            form.
          </p>
        </section>

        {/* Manage Tickets Section */}
        <section id="tickets" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Manage Tickets</h2>
          <p className="text-gray-600">
            View and manage your support tickets to keep track of your requests.
          </p>
        </section>

        {/* Live Chat Section */}
        <section id="livechat" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Live Chat</h2>
          <p className="text-gray-600">
            Chat live with our support team for quick assistance.
          </p>
        </section>
      </main>
    </div>
  );
};

export default UserSupport;
