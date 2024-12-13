export const TermsAndCondition = () => {
  const termsandcondition = [
    {
      heading: "Introduction",
      message:
        "Welcome to Mero Hostel Mate, by accessing or using our web application, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms, you should not use the Platform. Please read them carefully.",
    },
    {
      heading: "User Accounts",
      message:
        "You are required to register for an account to use the services offered on the Platform. You are responsible for maintaining the confidentiality of your login information and are fully responsible for all activities that occur under your account. If you believe your account has been compromised, you must notify us immediately.",
    },
    {
      heading: " AI-Driven Services",
      message:
        "The Platform uses Artificial Intelligence (AI) to provide recommendations and roommate matching. While we strive to offer the best possible matches: AI-based recommendations are suggestions only and may not always be 100% accurate. The Platform does not guarantee the suitability of roommates or the quality of hostels suggested. By using the AI features, you acknowledge and accept the inherent limitations of automated systems.",
    },
    {
      heading: " Hostel Listings and Availability",
      message:
        "Hostel owners are responsible for providing accurate and up-to-date information on their listings, including room availability, prices, and amenities. The Platform is not liable for any discrepancies between the information provided on the Platform and the actual conditions of the hostel. Hostel availability is subject to change and may not always be reflected in real-time.",
    },
    {
      heading: "Payments",
      message:
        "If the Platform provides online booking or payment services: All payments made through the Platform are subject to third-party payment processor terms and conditions. The Platform is not responsible for any issues arising from the payment process, including delays or payment failures. Hostel owners are responsible for updating payment terms and refunds, if applicable.",
    },
    {
      heading: "Cancellations and Refunds",
      message:
        "The Platform does not manage or process cancellations or refunds. This is the responsibility of the hostel owner.Users must directly contact the hostel owner regarding any cancellation or refund request. The Platform shall not be held responsible for any disputes related to cancellations or refunds between students and hostel owners.",
    },
    {
      heading: "Modifications to the Platform",
      message:
        "We reserve the right to modify, suspend, or discontinue the Platform, or any part of it, at any time without prior notice.",
    },
    {
      heading: "Termination",
      message:
        "We may terminate or suspend your account without notice if we determine that you have violated these Terms or engaged in activities that harm the Platform or its users.",
    },
    {
      heading: "Changes to These Terms",
      message:
        "We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting to the Platform. It is your responsibility to review the Terms regularly.",
    },
    {
      heading: "Governing Law",
      message:
        "These Terms are governed by and construed in accordance with the laws of [Your Country]. Any disputes arising from these Terms or your use of the Platform will be subject to the exclusive jurisdiction of the courts in Nepal.",
    },
    {
      heading: "Contact Us",
      message:
        "If you have any questions about these Terms, please contact us at info@merohostelmate.com.",
    },
  ];
  return (
    <>
      <div className="w-full h-20  top-0  bg-[#041E42]"></div>
      <div className="px-10 bg-[#041E42] pt-8 pb-16">
        <h1
          className="text-white font-semibold text-5xl container px-12"
          style={{ fontFamily: "Oswald" }}
        >
          Terms and Conditions
        </h1>
      </div>
      <div className="dynamic-renderer container mx-auto px-12 mt-16">
        {termsandcondition.map((item, index) => (
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
