import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick-theme.css";

import LeftArrow from "../../../assets/icons/left_circle_dark.png";
import RightArrow from "../../../assets/icons/right_circle_dark.png";
import ChevronRight from "../../../assets/icons/chevron_right.png";
import { useSelector } from "react-redux";
import { HomeSelector } from "../../../redux/selectors/home/HomeSelector";

const AffiliatedCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(9);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const HomeData = useSelector(HomeSelector);

  // Handle opening modal
  const handleOpenModal = (logo) => {
    setSelectedLogo(logo);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLogo(null), 300);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

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
    centerMode: true,
    centerPadding: "0px",
    variableWidth: false,
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
          slidesToShow: 6,
          slidesToScroll: 6,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
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
    <>
      <div className="w-full flex flex-col items-center justify-center px-6 lg:px-[48px]">
        {HomeData?.isfetching ? null : (
          <div className="w-full relative px-8 sm:px-8 md:px-8 lg:px-12 md:py-6 py-2 bg-[#EFFFFC] rounded-[10px]">
            <Slider
              {...settings}
              afterChange={(index) => {
                setCurrentSlide(index);
              }}
            >
              {HomeData?.data?.["First Testimonial"]?.content_details?.map((logo, index) => {
                return (
                  <div
                    key={logo.index}
                    className="flex justify-center items-center py-4"
                  >
                    <div className="relative bg-white rounded-[8px] flex items-center justify-center w-24 h-24 md:w-26 md:h-26 lg:w-32 lg:h-32 xl:w-36 xl:h-36 overflow-hidden group transition-all duration-300">
                      {/* Logo */}
                      <img
                        src={logo.image ?? ""}
                        alt={logo.title ?? ""}
                        className="max-w-[70%] max-h-[70%] sm:max-w-[75%] sm:max-h-[75%] md:max-w-[80%] md:max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#007C9D]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white p-2 sm:p-3 text-center">
                        <h4 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2 px-1">
                          {logo.title ?? ""}
                        </h4>
                        <button 
                          onClick={() => handleOpenModal(logo)}
                          className="cursor-pointer text-white text-[12px] sm:text-[14px] px-2 sm:px-3 py-1 border border-white font-[500] rounded-[4px] sm:rounded-[5px] flex items-center gap-1 sm:gap-2 transition-all hover:bg-white/10"
                        >
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
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
          <div
            ref={modalRef}
            className="bg-white rounded-[15px] max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
          >
         
            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Image Section */}
                <div className="lg:w-2/5 flex-shrink-0 flex flex-col items-center">
                 <img
                      src={selectedLogo?.image}
                      alt={selectedLogo?.title}
                      className="w-full h-auto max-h-[300px] object-contain"
                      loading="lazy"
                    />
                </div>

                {/* Details Section */}
                <div className="lg:w-3/5">
                  <div className="space-y-6">
                    {selectedLogo?.description && (
                      <div>
                        <h3 className="text-[20px] font-[600] text-[#333333] mb-4">
                         {selectedLogo?.title??""}
                        </h3>
                        <div 
                          className="prose max-w-none text-[16px] text-[#4B5563] leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: selectedLogo.description }}
                        />
                      </div>
                    )}

                    {/* Additional Information Section */}
                    {selectedLogo?.additional_info && (
                      <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-[18px] font-[600] text-[#333333] mb-4">
                          Additional Information
                        </h4>
                        <div 
                          className="text-[15px] text-[#4B5563] leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: selectedLogo.additional_info }}
                        />
                      </div>
                    )}

                    {/* Other Info Section - if needed */}
                    {selectedLogo?.other_info && (
                      <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-[18px] font-[600] text-[#333333] mb-4">
                          Other Details
                        </h4>
                        <div 
                          className="text-[15px] text-[#4B5563] leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: selectedLogo.other_info }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 p-6 border-t border-gray-200 bg-white rounded-b-[15px]">
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="cursor-pointer px-6 py-2 text-[14px] font-[500] text-white bg-[#001F51] rounded-[5px] hover:bg-[#003080] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AffiliatedCarousel;