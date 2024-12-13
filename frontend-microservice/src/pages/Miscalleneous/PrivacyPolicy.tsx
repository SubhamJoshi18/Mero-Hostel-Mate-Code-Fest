export const PrivacyPolicy = () => {
  const privacyPolicy = [
    {
      heading: "Introduction",
      message:
        "Welcome to Hamro Hostel Mate, a platform designed to help students find hostels and compatible roommates. By accessing or using our web application, you agree to abide by our Privacy Policy and Terms and Conditions. Please read this document carefully before using our services.",
    },
    {
      heading: "User Data Collection",
      message:
        "To provide personalized hostel recommendations and roommate matching services, Hamro Hostel Mate collects certain personal data from users, including their name, contact information, academic background, preferences, and location. By using the Platform, you consent to the collection and use of this information for improving your experience.",
    },
    {
      heading: "AI-Powered Services and Data Usage",
      message:
        "Hamro Hostel Mate integrates AI to offer personalized hostel and roommate recommendations based on your profile. While we strive to provide accurate matches, AI predictions are not always perfect. The Platform may use your data, such as study preferences, location, and interests, to enhance AI-driven recommendations. By using these features, you agree to let us use your data to improve our AI systems.",
    },
    {
      heading: "Roommate Matching and Preferences",
      message:
        "Our Platform uses the data you provide (faculty, study habits, lifestyle) to recommend potential roommates. These recommendations are based on preferences, but the final decision is up to the user. Hamro Hostel Mate does not guarantee the success or compatibility of any roommate matches.",
    },
    {
      heading: "Hostel Listings and Owner Responsibilities",
      message:
        "Hostel owners are responsible for keeping their listings accurate and up-to-date, including room availability, prices, and facilities. While we aim to provide students with accurate hostel options, Hamro Hostel Mate is not liable for any discrepancies between the information provided on the Platform and the actual conditions of the hostel.",
    },
    {
      heading: "Geolocation and Proximity-Based Recommendations",
      message:
        "Hamro Hostel Mate may use your location data to provide proximity-based hostel recommendations. You can enable or disable location services in your device settings, but disabling it may affect the accuracy of our suggestions for hostels near your university or college.",
    },
    {
      heading: "Data Security",
      message:
        "We take the security of your personal information seriously and use industry-standard practices to protect your data. However, no system can be completely secure, and we cannot guarantee the security of your information. You are responsible for keeping your login credentials safe and secure.",
    },
    {
      heading: "Payment and Financial Information",
      message:
        "If you make a payment through Hamro Hostel Mate, it is processed by a third-party payment gateway. We do not store your financial information. Any issues related to payment disputes, cancellations, or refunds should be addressed with the hostel owner directly, as we do not manage payment-related activities.",
    },
    {
      heading: "Cancellations, Refunds, and Disputes",
      message:
        "Hamro Hostel Mate does not handle cancellations or refunds for hostel bookings. These must be addressed between the student and the hostel owner directly. We are not liable for any disputes or financial disagreements between users and hostel owners.",
    },
    {
      heading: "Modifications to the Platform and Privacy Policy",
      message:
        "We reserve the right to modify, suspend, or discontinue any part of Hamro Hostel Mate at any time. We may also update this Privacy Policy periodically to reflect changes in our practices or legal requirements. It is your responsibility to review these changes regularly.",
    },
    {
      heading: "Third-Party Links and Services",
      message:
        "Our Platform may contain links to third-party websites, such as payment processors or external resources. We are not responsible for the privacy practices or content of these external websites, and we encourage you to review their privacy policies before providing any personal information.",
    },
    {
      heading: "Your Rights",
      message:
        "As a user, you have the right to access, update, or delete your personal data at any time. If you wish to exercise these rights, please contact us at privacy@hamrohostelmate.com.",
    },
    {
      heading: "Governing Law",
      message:
        "This Privacy Policy is governed by the laws of Nepal. Any disputes arising from your use of the Platform will be subject to the jurisdiction of the courts of Nepal.",
    },
    {
      heading: "Contact Us",
      message:
        "If you have any questions or concerns about this Privacy Policy, please feel free to reach out to us at privacy@hamrohostelmate.com.",
    },
  ];
  return (
    <>
      <div className="w-full h-20  top-0  bg-[#041E42]"></div>
      <div className="px-10 bg-[#041E42] pt-8 pb-16">
        <h1
          className="text-white font-semibold text-5xl container mx-auto px-12"
          style={{ fontFamily: "Oswald" }}
        >
          Privacy Policy
        </h1>
      </div>
      <div className="dynamic-renderer container mx-auto px-12 mt-16">
        {privacyPolicy.map((item, index) => (
          <div key={index} className="mb-12">
            <h1 className="text-2xl font-medium my-4">
              {`${index + 1}. ${item.heading}`}
            </h1>
            <p className="text-gray-700">{item.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};
