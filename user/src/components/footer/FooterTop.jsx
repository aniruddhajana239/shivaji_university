import React from "react";
import ChevronRightIcon from "../../assets/icons/chevron_right.png";
import { Link } from "react-router-dom";
import { footerData } from "../../constants/FooterService";
 

const FooterTop = () => {
  return (
    <div className="w-full bg-[#3B3B3B] text-[#FFFFFF] py-6 px-6 md:px-[48px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {footerData.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`space-y-4 ${
              colIndex !== footerData.length - 1
                ? "xl:border-r border-[#5C5C5C]"
                : ""
            }`}
          >
            <ul className="text-sm text-[#CCCCCC] pr-0 xl:pr-[24px]">
              {column.links.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center hover:text-white cursor-pointer px-[20px] py-5 border-b border-[#5C5C5C] last:border-none first:pt-0 last:pb-0"
                >
                  <Link to={item.link} className="flex items-center gap-2">
                    <img
                      src={ChevronRightIcon}
                      alt="icon"
                      className="w-[6px] h-[10px]"
                    />
                    <span className="text-[14px] font-[400]">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterTop;
