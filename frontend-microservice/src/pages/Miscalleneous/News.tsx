export const News = () => {
  const newsArticles = [
    {
      title: "New Hostel Booking System Revolutionizes Student Accommodation",
      date: "September 22, 2024",
      content:
        "A new platform, Hamro Hostel Mate, is set to transform how students find accommodation in Kathmandu Valley. Designed specifically for students arriving from outside the valley, the platform addresses the challenges of locating hostels and compatible roommates, making it easier for newcomers to settle in.",
    },
    {
      title: "AI Integration Enhances Roommate Matching in Hostel Systems",
      date: "September 20, 2024",
      content:
        "Hamro Hostel Mate has integrated artificial intelligence to provide personalized recommendations for hostels and roommates based on user profiles. This innovation ensures that students are paired with compatible roommates from similar faculties, enhancing their living experience.",
    },
    {
      title: "Hostel Owners Benefit from Increased Visibility on New Platform",
      date: "September 18, 2024",
      content:
        "The launch of Hamro Hostel Mate not only assists students but also provides hostel owners with a unique opportunity to reach a wider audience. By listing their properties on the platform, owners can reduce vacancies and connect directly with potential tenants.",
    },
    {
      title: "Students Welcome Proximity-Based Hostel Recommendations",
      date: "September 15, 2024",
      content:
        "Students have expressed enthusiasm for the proximity-based recommendations offered by Hamro Hostel Mate. The platform allows users to find hostels close to their educational institutions, significantly reducing commute times and enhancing their overall experience.",
    },
    {
      title: "Safety First: Verified Profiles on Hamro Hostel Mate",
      date: "September 12, 2024",
      content:
        "In a bid to ensure safety and trust, Hamro Hostel Mate implements a verification process for both students and hostel owners. This measure aims to create a secure environment for all users, helping to build confidence in the platform.",
    },
    {
      title: "Student Community Forum Launches with Hostel Booking Platform",
      date: "September 10, 2024",
      content:
        "As part of its commitment to fostering community, Hamro Hostel Mate has introduced a forum where students can share experiences, seek advice, and connect with potential roommates. This feature aims to create a supportive network for students new to Kathmandu Valley.",
    },
  ];

  return (
    <>
      <div className="w-full h-20 bg-[--tertiary-color]"></div>
      <div className="px-10 bg-[--tertiary-color] pt-8 pb-16">
        <h1
          className="text-white font-semibold text-5xl container mx-auto px-12"
          style={{ fontFamily: "Oswald" }}
        >
          Latest News
        </h1>
      </div>
      <div className="dynamic-renderer container mx-auto px-12 mt-16">
        {newsArticles.map((article, index) => (
          <div key={index} className="mb-12">
            <h1 className="text-2xl font-medium text-[--primary-color] my-4">{article.title}</h1>
            <p className="text-gray-500 italic">{article.date}</p>
            <p className="text-gray-700">{article.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};
