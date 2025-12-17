import Slider from 'react-slick';
import './slick-theme.css'; // Optional: for basic styles

// Import your custom arrow images
import LeftArrow from '../../../assets/icons/left_circle.png';
import RightArrow from '../../../assets/icons/right_circle.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroCarouselComponent = ({banners}) => {
  // Custom Next Arrow Component
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          right: '25px',
          zIndex: 1,
          width: '24px',
          height: '24px',
        }}
        onClick={onClick}
      >
        <img 
          src={RightArrow} 
          alt="next" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  };

  // Custom Previous Arrow Component
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'block',
          left: '25px',
          zIndex: 1,
          width: '24px',
          height: '24px',
        }}
        onClick={onClick}
      >
        <img 
          src={LeftArrow} 
          alt="previous" 
          className="w-full h-full object-contain"
        />
      </div>
    );
  };

  // Slider configuration
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <ul className="flex items-center justify-center space-x-2 m-0 cursor-pointer">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className="dot-indicator" />
    ),
    dotsClass: "dots-container"
  };

  // Use banners from props if available, otherwise show empty state
  const slides = banners && banners.length > 0 
    ? banners.map((banner, index) => ({
        id: index,
        image: banner.image,
        alt: banner.title || `Slide ${index + 1}`,
        title: banner.title,
        description: banner.description,
        link: banner.link,
        redirect_to: banner.redirect_to
      }))
    : [];

  return (
    <div className="w-full hero-carousel relative">
      {slides.length > 0 ? (
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="carousel-slide">
              {/* If there's a valid link and redirect is enabled, make the image clickable */}
              {slide.link && slide.redirect_to !== 'no_redirect' ? (
                <a 
                  href={slide.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img 
                    src={slide.image} 
                    alt={slide.alt}
                    className="w-full h-[45vh] lg:h-fit object-cover"
                  />
                </a>
              ) : (
                <img 
                  src={slide.image} 
                  alt={slide.alt}
                  className="w-full h-[45vh] lg:h-fit object-cover"
                />
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full h-[45vh] lg:h-fit bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No banners available</p>
        </div>
      )}
    </div>
  );
};

export default HeroCarouselComponent;