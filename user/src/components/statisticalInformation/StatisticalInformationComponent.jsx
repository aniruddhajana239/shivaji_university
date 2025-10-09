import React from "react";
import { statisticalInformationData } from "../../constants/StatisticalInformation";
import information_arrow from "../../assets/icons/Information/information_arrow.png";

const StatisticalInformationComponent = () => {
  return (
    <div className="w-full bg-[#077394]">
      {/* Top Statistical Grid */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-[60px] xl:px-[80px] 2xl:px-[48px] py-[22px] border-b border-white/18">

        <ul className="grid 2xl:gap-[52px] grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 
        xl:grid-cols-6 gap-y-6 lg:gap-y-0 text-white ">

          {statisticalInformationData.map((item, index) => (
            <li key={index} className="flex flex-col gap-[17px] 2xl:flex-row 2xl:first:pl-[24px]  items-center  text-center lg:border-r-[1px] lg:border-white/16 lg:last:border-0 ">
              {/* Icon */}
              <div className="bg-white/16 rounded-full p-4  flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]"
                />
              </div>

              {/* Text */}
              <div className="lg:text-left ">
                <p className="text-[26px] sm:text-[30px] md:text-[32px] font-[600] leading-tight 2xl:text-start text-center">
                  {item.volume}
                </p>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-tight 2xl:text-start text-center">
                  {item.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-[#077394] py-[24px] px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row gap-3 sm:gap-[7px] items-center justify-center text-center">
        <p className="text-[16px] sm:text-[18px] font-[500] text-white">
          See More Shivaji University Statistical Information
        </p>
        <div className="bg-white rounded-full w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] flex items-center justify-center">
          <img
            src={information_arrow}
            alt="information_arrow"
            className="h-[10px] w-[6px]"
          />
        </div>
      </div>
    </div>
  );
};

export default StatisticalInformationComponent;
