import React from "react";
import ChevronRightIcon from "../../assets/icons/chevron_right.png";
import { Link } from "react-router-dom";

const FooterButton = () => {
  return (
    <>
      <div className="w-full bg-[#353535] text-[#FFFFFF] text-[15px] font-[400] py-6 px-6 md:px-[48px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Left Section */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <Link
            className="flex items-center gap-[12px] hover:text-white"
          >
            <img
              src={ChevronRightIcon}
              alt="icon"
              className="w-[6.75px] h-[11.67px]"
            />
            Terms of Use
          </Link>
          <Link
            className="flex items-center gap-[12px] hover:text-white"
          >
            <img
              src={ChevronRightIcon}
              alt="icon"
              className="w-[6.75px] h-[11.67px]"
            />
            Privacy Policy
          </Link>
          <Link
            className="flex items-center gap-[12px] hover:text-white"
          >
            <img
              src={ChevronRightIcon}
              alt="icon"
              className="w-[6.75px] h-[11.67px]"
            />
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="text-left md:text-left w-full md:w-auto 2xl:pr-[9%]">
          <p className="text-[15px] md:text-[17px] font-[500]">
            Visitors : 4965968
          </p>
          <p className="mt-3 text-[15px] md:text-[17px] font-[500]">
            Last Updated : June 08, 2025 – 3:50 pm
          </p>
          <p className="mt-4 text-[14px] font-[400]">Copyrights © 2025</p>
        </div>
      </div>
    </>
  );
};

export default FooterButton;
