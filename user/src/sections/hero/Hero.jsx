import HeroCarousel from "../../components/carousel/hero/Hero";
import facebook_icon from "../../assets/icons/socialMedia/Facebook.png";
import instagram_icon from "../../assets/icons/socialMedia/Instagram.png";
import linkedin_icon from "../../assets/icons/socialMedia/Linkedin.png";
import xHandel_icon from "../../assets/icons/socialMedia/X_handel.png";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="w-full relative">
      <HeroCarousel />

      {/* Social Media Sidebar + Rotated Quick Links */}
      <div className="absolute -bottom-[200px] right-0 flex flex-col items-end gap-[16px]">
        {/* Social Icons */}
        <div className="">
          <div className="bg-[#001F51] rounded-l-[14px] p-3 lg:p-4 shadow-lg">
            <ul className="flex flex-col gap-3 items-center justify-center">
              <li>
                <Link>
                  <img
                    src={xHandel_icon}
                    alt="X"
                    className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link>
                  <img
                    src={linkedin_icon}
                    alt="LinkedIn"
                    className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link>
                  <img
                    src={instagram_icon}
                    alt="Instagram"
                    className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link>
                  <img
                    src={facebook_icon}
                    alt="Facebook"
                    className="h-[20px] w-[20px] lg:h-[26px] lg:w-[26px] hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Rotated Quick Links Button */}
        <div className="">
          <Link
            to="/quick-links"
            className="bg-[#ED3236] text-white text-[14px] lg:text-[18px] font-[500] p-2 rounded-l-[10px] hover:bg-[c0272c] transition-all block writing-mode-vertical-lr text-center "
          >
            Quick Links
          </Link>
        </div>
      </div>
    </div>
  );
};
