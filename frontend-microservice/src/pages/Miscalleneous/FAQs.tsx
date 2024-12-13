export const FAQs = () => {
  const faqList = [
    {
      question: "Why Should I Use Hamro Hostel Mate?",
      answer:
        "Our platform offers AI-powered recommendations, roommate matching, and verified hostel listings. It saves time by suggesting hostels near your college that fit your lifestyle and preferences.",
    },
    {
      question: "How Do I Register?",
      answer:
        "Click 'Sign Up' on the homepage, fill in your details, verify your email, and complete your profile to access all features, including hostel search and roommate matching.",
    },
    {
      question: "How Do I Search for My Preferred Hostel?",
      answer:
        "Use the search bar to enter details like college name or budget, apply filters, and get AI recommendations. Compare hostels and contact owners directly for further details or to schedule a visit.",
    },
    {
      question: "What Documents Are Required for Approval?",
      answer:
        "Students need a valid student ID and government ID. Hostel owners need proof of ownership and other legal documents such as property registration.",
    },
    {
      question: "How Do I Approach Hostels?",
      answer:
        "Check hostel details, contact the owner, ask key questions (availability, pricing, rules), and submit necessary documents. You can either visit the hostel or book online.",
    },
    {
      question: "What Should I Do if There Are Issues with the Hostel?",
      answer:
        "Contact the hostel owner, leave a review if necessary, or reach out to our support team for help in resolving issues.",
    },
    {
      question: "How Does Roommate Matching Work?",
      answer:
        "AI suggests roommates based on your profile and preferences, including study field and lifestyle compatibility.",
    },
    {
      question: "Can Hostel Owners Modify Their Listings?",
      answer:
        "Yes, hostel owners can update listings anytime via their dashboard, including room availability, pricing, and amenities.",
    },
    {
      question: "Is There a Refund Policy?",
      answer:
        "Refund policies vary by hostel. Contact the hostel owner for details on refunds and cancellations before booking.",
    },
    {
      question: "Is My Personal Information Safe?",
      answer:
        "Yes, your personal data is securely stored and encrypted. Refer to our Privacy Policy for more details.",
    },
  ];

  return (
    <>
      <div className="w-full h-20 top-0 bg-[#041E42]"></div>
      <div className="px-10 bg-[#041E42] pt-8 pb-16">
        <h1
          className="text-white font-semibold text-5xl mx-auto container px-12"
          style={{ fontFamily: "Oswald" }}
        >
          Frequently Asked Questions
        </h1>
      </div>
      <div className="dynamic-renderer container mx-auto px-12 mt-16">
        {faqList.map((faq, index) => (
          <div key={index} className="mb-12">
            <h1 className="text-2xl font-medium my-4">{`${index + 1}. ${
              faq.question
            }`}</h1>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
};
