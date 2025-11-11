import { useState, useEffect } from "react";
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
  const [slidesToShow, setSlidesToShow] = useState(9);

  // Update slidesToShow based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setSlidesToShow(3); // Mobile: 3 cards
      } else if (width < 768) {
        setSlidesToShow(3); // Small screens: 3 cards
      } else if (width < 1024) {
        setSlidesToShow(5); // Medium screens: 5 cards
      } else if (width < 1280) {
        setSlidesToShow(7);
      } else if (width < 1536) {
        setSlidesToShow(9);
      } else {
        setSlidesToShow(9); // Default
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 -right-6 lg:-right-10 h-4 w-4 lg:h-8 lg:w-8 flex justify-center items-center cursor-pointer z-10"
    >
      <img src={RightArrow} alt="Next" className="w-4 h-4 lg:w-6 md:h-6" />
    </div>
  );

  // Custom Prev Arrow
  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 -left-6 lg:-left-10 h-4 w-4 lg:h-8 lg:w-8 flex justify-center items-center cursor-pointer z-10"
    >
      <img src={LeftArrow} alt="Previous" className="w-4 h-4 lg:w-6 md:h-6" />
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
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
    centerMode: true, // Enable center mode for better spacing
    centerPadding: "0px", // Remove extra padding
    variableWidth: false, // Use fixed width for consistent spacing
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 9,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6, // 768px: 6 cards
          slidesToScroll: 6,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3, // 480px: 3 cards
          slidesToScroll: 3,
          centerMode: true,
          centerPadding: "0px",
        },
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
    <div className="w-full flex flex-col items-center justify-center px-6 lg:px-[48px]">
      <div className="w-full relative px-8 sm:px-8 md:px-8 lg:px-12 md:py-6 py-2 bg-[#EFFFFC] rounded-[10px]">
        <Slider
          {...settings}
          afterChange={(index) => {
            setCurrentSlide(index);
          }}
        >
          {logos.map((logo, index) => {
            return (
              <div
                key={logo.id}
                className="flex justify-center items-center py-4" // Removed horizontal padding
              >
                <div className="relative bg-white rounded-[8px] flex items-center justify-center w-24 h-24  md:w-26 md:h-26 lg:w-32 lg:h-32 xl:w-36 xl:h-36 overflow-hidden group transition-all duration-300"> {/* Removed margin */}
                  {/* Logo */}
                  <img
                    src={logo.src}
                    alt={logo.title}
                    className="max-w-[70%] max-h-[70%] sm:max-w-[75%] sm:max-h-[75%] md:max-w-[80%] md:max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#007C9D]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-2 sm:p-3 text-center">
                    <h4 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 px-1">
                      {logo.title}
                    </h4>
                    <button className="cursor-pointer text-white text-[12px] sm:text-[14px] px-2 sm:px-3 py-1 border border-white font-[500] rounded-[4px] sm:rounded-[5px] flex items-center gap-1 sm:gap-2 transition-all">
                      Details
                      <img
                        src={ChevronRight}
                        alt="arrow"
                        className="w-2 h-2 sm:w-3 sm:h-3 object-contain"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default AffiliatedCarousel;