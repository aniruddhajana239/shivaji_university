import React from "react";
import ChevronRightIcon from "../../assets/icons/chevron_right.png";

const FooterButton = () => {
  return (
    <>
      <footer className="w-full bg-[#3B3B3B] text-[#FFFFFF] text-[16px] font-[400]">
        {/*  Bottom Section  */}
        <div className="bg-[#2A2A2A] py-4 text-[16px]">
          <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-[#FFFFFF]">
            <div className="flex flex-col gap-4 mb-2 md:mb-0">
              <a
                className="flex items-center gap-[12px] hover:text-white"
                href="#"
              >
                <img
                  src={ChevronRightIcon}
                  alt="icon"
                  className="w-[6.75px] h-[11.67px]"
                />
                Terms of Use
              </a>
              <a
                className="flex items-center gap-[12px] hover:text-white"
                href="#"
              >
                <img
                  src={ChevronRightIcon}
                  alt="icon"
                  className="w-[6.75px] h-[11.67px]"
                />
                Privacy Policy
              </a>
              <a
                className="flex items-center gap-[12px] hover:text-white"
                href="#"
              >
                <img
                  src={ChevronRightIcon}
                  alt="icon"
                  className="w-[6.75px] h-[11.67px]"
                />
                Contact
              </a>
            </div>
            <div className="text-center md:text-left pr-40">
              <p className="text-[18px] font-[500]">Visitors : 4965968</p>
              <p className="mt-3 text-[18px] font-[500]">
                Last Updated : June 08, 2025 – 3:50 pm
              </p>
              <p className="mt-4 text-[14px] font-[400]">Copyrights © 2025</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterButton;
