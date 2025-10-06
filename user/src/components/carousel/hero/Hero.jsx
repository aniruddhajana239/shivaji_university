import Slider from 'react-slick';
import './slick-theme.css'; // Optional: for basic styles

// Import your custom arrow images
import LeftArrow from '../../../assets/icons/left_circle.png';
import RightArrow from '../../../assets/icons/right_circle.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Sample images - replace with your actual images
import Slide1 from '../../../assets/images/hero/slide1.png';
import Slide2 from '../../../assets/images/hero/slide2.png';
import Slide3 from '../../../assets/images/hero/slide1.png';
import Slide4 from '../../../assets/images/hero/slide2.png';

const HeroCarouselComponent = () => {
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

  // Sample slides data
  const slides = [
    { id: 1, image: Slide1, alt: 'Slide 1' },
    { id: 2, image: Slide2, alt: 'Slide 2' },
    { id: 3, image: Slide3, alt: 'Slide 3' },
    { id: 4, image: Slide4, alt: 'Slide 4' },
  ];

  return (
    <div className="w-full hero-carousel relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="w-full h-fit object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarouselComponent;