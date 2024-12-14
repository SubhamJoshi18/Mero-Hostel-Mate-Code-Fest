import { useState } from "react";
import { RenderStar } from "../Cards/RenderStar";

export default function FeedBacks() {
  const feedbacks = [
    {
      name: "Suman Shrestha",
      gmail: "suman.shrestha25@gmail.com",
      rating: 4,
      feedback:
        "Mero Hostel Mate made finding a budget-friendly hostel near my college easy. I was even matched with a great roommate. Highly recommended!",
    },
    {
      name: "Anisha Karki",
      gmail: "anisha.karki87@gmail.com",
      rating: 5,
      feedback:
        "Moving to a new city was daunting, but Mero Hostel Mate helped me find a safe, verified hostel with ease. The student reviews were super helpful!",
    },
    {
      name: "Pratik Adhikari",
      gmail: "pratik.adhikari91@gmail.com",
      rating: 3,
      feedback:
        "Thanks to Mero Hostel Mate, I found a hostel and a roommate that fit my lifestyle perfectly. The process was quick and easy!",
    },
    {
      name: "Sneha Rai",
      gmail: "sneha.rai15@gmail.com",
      rating: 4,
      feedback:
        "I found a clean, nearby hostel in no time with Mero Hostel Mate. The flexible payment options and easy booking made my experience stress-free.",
    },
    {
      name: "Ramesh Lama",
      gmail: "ramesh.lama47@gmail.com",
      rating: 3,
      feedback:
        "Mero Hostel Mate saved me so much time! I booked a hostel online after checking out the virtual tours, and it was exactly what I needed.",
    },
    {
      name: "Bikram Thapa",
      gmail: "bikram.thapa34@gmail.com",
      rating: 5,
      feedback:
        "Great platform for students! The reviews and virtual tours made it super easy to pick the right hostel for me.",
    },
    {
      name: "Pooja Shahi",
      gmail: "pooja.shahi22@gmail.com",
      rating: 4,
      feedback:
        "Mero Hostel Mate made relocating simple. Found a clean, affordable hostel with helpful amenities near my university.",
    },
    {
      name: "Kiran Joshi",
      gmail: "kiran.joshi78@gmail.com",
      rating: 5,
      feedback:
        "Loved the roommate matching feature! Mero Hostel Mate connected me with someone who shares my interests.",
    },
    {
      name: "Ashmita Khadka",
      gmail: "ashmita.khadka19@gmail.com",
      rating: 4,
      feedback:
        "Very convenient platform for students. I loved the verified listings and easy booking process.",
    },
    {
      name: "Rajiv Poudel",
      gmail: "rajiv.poudel45@gmail.com",
      rating: 3,
      feedback:
        "The platform is good, but I wish there were more hostels listed in my area. Overall, a decent experience.",
    },
    {
      name: "Manisha Sharma",
      gmail: "manisha.sharma56@gmail.com",
      rating: 5,
      feedback:
        "Highly recommend Mero Hostel Mate! Found a wonderful hostel with excellent facilities in just a few clicks.",
    },
    {
      name: "Roshan KC",
      gmail: "roshan.kc91@gmail.com",
      rating: 4,
      feedback:
        "Great experience overall. Booking a hostel online was seamless, and the reviews helped me make an informed decision.",
    },
    {
      name: "Alisha Tamang",
      gmail: "alisha.tamang65@gmail.com",
      rating: 5,
      feedback:
        "The roommate-matching feature is amazing! Found a great friend while securing an affordable hostel.",
    },
    {
      name: "Bimal Gurung",
      gmail: "bimal.gurung12@gmail.com",
      rating: 4,
      feedback:
        "The platform is student-friendly and offers verified hostels. Would love to see more options in rural areas.",
    },
    {
      name: "Shreya Subedi",
      gmail: "shreya.subedi48@gmail.com",
      rating: 3,
      feedback:
        "Decent platform for hostel search, but I had to contact the hostel directly for some clarifications.",
    },
    {
      name: "Suraj Bhandari",
      gmail: "suraj.bhandari63@gmail.com",
      rating: 5,
      feedback:
        "Amazing service! Mero Hostel Mate made moving to a new city stress-free with their verified listings.",
    },
    {
      name: "Nisha Lama",
      gmail: "nisha.lama29@gmail.com",
      rating: 4,
      feedback:
        "The reviews and ratings helped me find a safe and clean hostel for my first semester in college.",
    },
    {
      name: "Keshav Acharya",
      gmail: "keshav.acharya53@gmail.com",
      rating: 5,
      feedback:
        "Thanks to Mero Hostel Mate, I found a hostel that feels like home! The virtual tours were a great help.",
    },
    {
      name: "Priya Pokharel",
      gmail: "priya.pokharel37@gmail.com",
      rating: 4,
      feedback:
        "Good experience overall. Booking was simple, and the hostel met all my expectations.",
    },
    {
      name: "Dipesh Shrestha",
      gmail: "dipesh.shrestha80@gmail.com",
      rating: 5,
      feedback:
        "Mero Hostel Mate is a lifesaver! Found a budget-friendly hostel near my campus in no time.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Total number of cards visible at once (3)
  const visibleCards = 3;

  // Handle next slide
  const nextSlide = () => {
    if (currentIndex < feedbacks.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle previous slide
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <div className="px-12 container mx-auto ">
        <div className="relative rounded-xl  bg-gray-300 px-4 py-12 mb-10">
          <div className="relative flex flex-col items-center justify-center ">
            <h1
              data-aos="fade-up"
              className="text-[120px] text-white font-mono font-semibold uppercase"
              style={{ fontFamily: "Oswald" }}
            >
              Testimonial
            </h1>
            <h2
              data-aos="fade-up"
              className="absolute tracking-widest text-center text-xl top-[47%] text-[--primary-color] font-sans uppercase"
            >
              Take a look at our
            </h2>
          </div>
          {/* Wrapper for feedback cards */}
          <div data-aos="fade-up" className="py-8 px-4 overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCards)
                }%)`,
              }}
            >
              {feedbacks.map((feedback, index) => (
                <div
                  key={index}
                  className="bg-[#fff] rounded-2xl p-8 relative overflow-hidden shadow-xl cursor-pointer w-[33.333%] flex-shrink-0"
                >
                  <div data-aos="fade-up">{RenderStar(feedback.rating)}</div>
                  <p data-aos="fade-up" className="mt-4 mb-4">
                    {feedback.feedback}
                  </p>
                  <div className="gmail mt-4">
                    <h3
                      data-aos="fade-up"
                      className="text-[20px] text-[--primary-color] font-semibold"
                    >
                      {feedback.name}
                    </h3>
                    <p data-aos="fade-up" className="text-[#a7a7a7]">
                      {feedback.gmail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="absolute -left-7 top-[60%] z-30">
            <span
              className="text-[40px] hover:cursor-pointer active:translate-y-1  rounded-full bg-[--btn-primary] text-white p-3 flex items-center justify-center w-[60px] h-[60px]"
              onClick={prevSlide}
            >
              &lt;
            </span>
          </div>
          <div className="absolute -right-7 top-[60%]">
            <span
              className="text-[40px] hover:cursor-pointer active:translate-y-1 rounded-full bg-[--btn-primary] text-white p-3 flex items-center justify-center w-[60px] h-[60px]"
              onClick={nextSlide}
            >
              &gt;
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
