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
      <div className=" absolute -bottom-[20px] right-0 flex flex-col  items-end ">
        {/* Social Icons */}
        <div className="h-[220px] ">
          <div className=" bg-[#001F51] rounded-l-[14px] py-4 px-4 shadow-lg">
            <ul className="flex flex-col gap-3 items-center justify-center">
              <li>
                <Link>
                  <img
                    src={xHandel_icon}
                    alt="X"
                    className="h-[26px] w-[26px] hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link>
                  <img
                    src={linkedin_icon}
                    alt="LinkedIn"
                    className="h-[26px] w-[26px] hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link>
                  <img
                    src={instagram_icon}
                    alt="Instagram"
                    className="h-[26px] w-[26px] hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              </li>
              <li>
                <Link>
                  <img
                    src={facebook_icon}
                    alt="Facebook"
                    className="h-[26px] w-[26px] hover:scale-110 transition-transform duration-200"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Rotated Quick Links Button */}
        <div className="h-auto w-[180px] mt-5 transform -rotate-90">
          <Link
            to="/quick-links"
            className="bg-[#ED3236] text-white text-[18px] font-[600] px-5 py-2 rounded-t-[10px] shadow-md hover:bg-[#c0272c] transition-all"
          >
            Quick Links
          </Link>
        </div>
      </div>
    </div>
  );
};
