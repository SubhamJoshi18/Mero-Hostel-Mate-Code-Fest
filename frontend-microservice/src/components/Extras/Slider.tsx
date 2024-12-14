import Marquee from "react-fast-marquee";

export default function Slider() {
  const items = [
    { src: "/assets/1.webp" },
    { src: "/assets/2.webp" },
    { src: "/assets/3.webp" },
    { src: "/assets/4.webp" },
    { src: "/assets/5.webp" },
    { src: "/assets/6.webp" },
    { src: "/assets/11.webp" },
    { src: "/assets/8.webp" },
    { src: "/assets/9.webp" },
    { src: "/assets/10.webp" },
  ];

  return (
    <section className=" bg-no-repeat bg-cover bg-center text-white py-8 lg:py-12">
      <Marquee
        className="h-max overflow-hidden gap-4"
        speed={50}
        pauseOnHover={true}
        gradient={false}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="mx-3 flex flex-col items-center justify-center"
          >
            <img
              src={item.src}
              className="lg:h-40 h-20 w-auto object-contain hover:scale-110 transition-all"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
