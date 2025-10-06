import React from "react";
import greaterthan_arrow_icon from "../../assets/icon/greaterthan_arrow_icon.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#3B3B3B] text-[#FFFFFF] text-[16px] font-[400]">
      {/* Top Section */}
      <div className="py-6 border-b border-[#5C5C5C]">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">

            {/* Column 1 */}
            <div className="flex-1">
              <ul className="border-r border-[#5C5C5C] pr-5">
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Quick Links
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Placement Cell
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Students' Council Election
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Madhyamvidhya / Media Spectrum
                  </a>
                </li>
                <li className="m-[12px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Special Cell
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex-1">
              <ul className="border-r border-[#5C5C5C] pr-4">
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Compiled online literature on Chhatrapati Shivaji Maharaj
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Intranet
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Online Receipt Portal
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    University Publications
                  </a>
                </li>
                <li className="m-[12px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    शैक्षणिक गीत
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex-1">
              <ul className="border-r border-[#5C5C5C] pr-4">
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Photo Gallery
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Right To Services
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Grievance Redressal
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Other Tenders / Quotations
                  </a>
                </li>
                <li className="m-[12px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    शैक्षणिक गीत विडीओ
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="flex-1">
              <ul>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Right to Information
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Recruitments
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Mobile Apps
                  </a>
                </li>
                <li className="m-[12px] border-b border-[#5C5C5C] pb-[8px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Archive
                  </a>
                </li>
                <li className="m-[12px] px-[20px] whitespace-nowrap">
                  <a className="flex items-center gap-[12px] hover:underline" href="#">
                    <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
                    Anti Ragging Information
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/*  Bottom Section  */}
      <div className="bg-[#2A2A2A] py-4 text-[16px]">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-[#FFFFFF]">
          <div className="flex flex-col gap-4 mb-2 md:mb-0">
            <a className="flex items-center gap-[12px] hover:text-white" href="#">
              <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
              Terms of Use
            </a>
            <a className="flex items-center gap-[12px] hover:text-white" href="#">
              <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
              Privacy Policy
            </a>
            <a className="flex items-center gap-[12px] hover:text-white" href="#">
              <img src={greaterthan_arrow_icon} alt="icon" className="w-[6.75px] h-[11.67px]" />
              Contact
            </a>
          </div>
          <div className="text-center md:text-left pr-40">
            <p className="text-[18px] font-[500]">Visitors : 4965968</p>
            <p className="mt-3 text-[18px] font-[500]">Last Updated : June 08, 2025 – 3:50 pm</p>
            <p className="mt-4 text-[14px] font-[400]">Copyrights © 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
