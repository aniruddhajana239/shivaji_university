import HeroCarousel from "../../components/carousel/hero/Hero";
import facebook_icon from "../../assets/icons/socialMedia/Facebook.png";
import instagram_icon from "../../assets/icons/socialMedia/Instagram.png";
import linkedin_icon from "../../assets/icons/socialMedia/Linkedin.png";
import xHandel_icon from "../../assets/icons/socialMedia/X_handel.png";
import { Link } from "react-router-dom";

export const Hero = ({ externalData, banners, bannerLoading, externalLoading }) => {
  const isLoading = bannerLoading || externalLoading;

  return (
    <div className="w-full relative">
      {/* Hero Carousel with Skeleton */}
      {isLoading ? (
        <div className="w-full h-auto aspect-[16/6] lg:aspect-[16/5] lg:h-fit bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-none">
          {/* Social Media Sidebar Skeleton */}
          <div className="fixed top-1/2 -translate-y-1/2 right-0 flex flex-col items-end gap-[16px] z-50">
            {/* Social Icons Skeleton */}
            <div className="">
              <div className="bg-gray-300 rounded-l-[14px] p-3 lg:p-4 shadow-lg">
                <ul className="flex flex-col gap-3 items-center justify-center">
                  {[...Array(4)].map((_, i) => (
                    <li key={i}>
                      <div className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] bg-gray-400 rounded-full"></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rotated Quick Links Button Skeleton */}
            <div className="flex justify-end w-full">
              <div className="bg-gray-400 text-white text-[14px] lg:text-[18px] font-[500] p-2 rounded-l-[10px] flex items-center justify-center writing-mode-vertical-lr text-center h-32 w-[32px] lg:w-[40px]"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <HeroCarousel banners={banners ?? []} />

          {/* Social Media Sidebar + Rotated Quick Links */}
          <div className="fixed top-1/2 -translate-y-1/2 right-0 flex flex-col items-end gap-[16px] z-50">
            {/* Social Icons */}
            <div className="">
              <div className="bg-[#001F51] rounded-l-[14px] p-3 lg:p-4 shadow-lg">
                <ul className="flex flex-col gap-3 items-center justify-center">
                  <li>
                    <a
                      href={externalData?.data?.twitter_link ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={xHandel_icon}
                        alt="X"
                        className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] hover:scale-110 transition-transform duration-200"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href={externalData?.data?.linkedin_link ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={linkedin_icon}
                        alt="LinkedIn"
                        className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] hover:scale-110 transition-transform duration-200"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href={externalData?.data?.instragram_link ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={instagram_icon}
                        alt="Instagram"
                        className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] hover:scale-110 transition-transform duration-200"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href={externalData?.data?.facebook_link ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={facebook_icon}
                        alt="Facebook"
                        className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] hover:scale-110 transition-transform duration-200"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Rotated Quick Links Button */}
            <div className="flex justify-end w-full">
              <Link
                to="/quick-links"
                className="bg-[#ED3236] text-white text-[14px] lg:text-[18px] font-[500] p-2 rounded-l-[10px] hover:bg-[#c0272c] transition-all flex items-center justify-center writing-mode-vertical-lr text-center min-h-[120px] w-[32px] lg:w-[40px]"
              >
                Quick Links
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};