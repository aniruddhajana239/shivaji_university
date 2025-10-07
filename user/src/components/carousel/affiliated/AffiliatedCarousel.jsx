import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick-theme.css";

import LeftArrow from "../../../assets/icons/left_circle_dark.png";
import RightArrow from "../../../assets/icons/right_circle_dark.png";
import ChevronRight from "../../../assets/icons/chevron_right.png";
import Logo1 from "../../../assets/images/affiliated/slide1.png";
import Logo2 from "../../../assets/images/affiliated/slide2.png";
import Logo3 from "../../../assets/images/affiliated/slide3.png";
import Logo4 from "../../../assets/images/affiliated/slide4.png";
import Logo5 from "../../../assets/images/affiliated/slide5.png";
import Logo6 from "../../../assets/images/affiliated/slide6.png";
import Logo7 from "../../../assets/images/affiliated/slide7.png";
import Logo8 from "../../../assets/images/affiliated/slide8.png";

const AffiliatedCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(9); // default visible count

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 right-0 h-6 w-6 flex justify-center items-center lg:-right-8 cursor-pointer z-10 contain"
    >
      <img src={RightArrow} alt="Next" className="w-6 h-6 contain" />
    </div>
  );

  // Custom Prev Arrow
  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-8 h-6 w-6 flex justify-center items-center cursor-pointer z-10 contain"
    >
      <img src={LeftArrow} alt="Previous" className="w-6 h-6 contain" />
    </div>
  );

  const logos = [
    { id: 1, src: Logo1, title: "Solar Energy" },
    { id: 2, src: Logo2, title: "National Academic Depository" },
    { id: 3, src: Logo3, title: "SUK-AR" },
    { id: 4, src: Logo4, title: "Shivaji University" },
    { id: 5, src: Logo5, title: "Shodh Ganga" },
    { id: 6, src: Logo6, title: "Govt of India" },
    { id: 7, src: Logo7, title: "e-Gov Project" },
    { id: 8, src: Logo8, title: "Digital India" },
    { id: 9, src: Logo1, title: "Solar Energy" },
    { id: 10, src: Logo2, title: "National Academic Depository" },
    { id: 11, src: Logo3, title: "SUK-AR" },
    { id: 12, src: Logo4, title: "Shivaji University" },
    { id: 13, src: Logo5, title: "Shodh Ganga" },
    { id: 14, src: Logo6, title: "Govt of India" },
    { id: 15, src: Logo7, title: "e-Gov Project" },
    { id: 16, src: Logo8, title: "Digital India" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: visibleCount,
    slidesToScroll: visibleCount,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 9, slidesToScroll: 9, beforeChange: (_, next) => setCurrentSlide(next) },
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 7, slidesToScroll: 7, beforeChange: (_, next) => setCurrentSlide(next) },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5, slidesToScroll: 5, beforeChange: (_, next) => setCurrentSlide(next) },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 3, beforeChange: (_, next) => setCurrentSlide(next) },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 2, beforeChange: (_, next) => setCurrentSlide(next) },
      },
    ],
    appendDots: dots => (
      <div className="mt-6">
        <ul className="flex justify-center items-center space-x-2 m-0">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="affiliated-dot-indicator" />,
    dotsClass: "affiliated-dots-container",
  };

  return (
    <div className=" w-full relative px-6 lg:px-12 py-8 bg-[#EFFFFC]">
      <Slider
        {...settings}
        afterChange={(index) => {
          setCurrentSlide(index);
        }}
      >
        {logos.map((logo, index) => {
          // Determine which cards are visible in current slide
          const isFirstVisible = index === currentSlide * visibleCount;
          const isLastVisible =
            index === currentSlide * visibleCount + visibleCount - 1;

          return (
            <div
              key={logo.id}
              className={`flex justify-center items-center ${
                isFirstVisible ? "pl-0" : "pl-2"
              } ${isLastVisible ? "pr-0" : "pr-2"} py-4`}
            >
              <div className="relative bg-white rounded-[10px] flex items-center justify-center w-32 h-32 lg:w-36 lg:h-36 overflow-hidden group transition-all duration-300">
                {/* Logo */}
                <img
                  src={logo.src}
                  alt={logo.title}
                  className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#007C9D]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                  <h4 className="text-sm font-semibold mb-2">{logo.title}</h4>
                  <button className="cursor-pointer text-white text-[14px] px-3 py-1 border border-white font-[500]  rounded-[5px] flex items-center gap-2 transition-all">
                    Details
                    <img
                      src={ChevronRight}
                      alt="arrow"
                      className="w-3 h-3 object-contain"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default AffiliatedCarousel;
