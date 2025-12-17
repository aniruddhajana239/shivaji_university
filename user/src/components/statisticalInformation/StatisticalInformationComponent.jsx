import React from "react";
import information_arrow from "../../assets/icons/Information/information_arrow.png";
import years_icon from "../../assets/icons/Information/years.png";
import departments_icon from "../../assets/icons/Information/departments.png";
import chairs_icon from "../../assets/icons/Information/chairs.png";
import centers_icon from "../../assets/icons/Information/centers.png";
import campus_icon from "../../assets/icons/Information/campus.png";
import colleges_icon from "../../assets/icons/Information/colleges.png";
import { useSelector } from "react-redux";
import { settingsSelector } from "../../redux/selectors/settings/Settings";

const StatisticalInformationComponent = ({ data }) => {
  const settingsData = useSelector(settingsSelector)
  const isLoading = settingsData?.isFetching;

  return (
    <div className="w-full bg-[#077394]">
      {/* Top Statistical Grid */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-[60px] xl:px-[80px] 2xl:px-[48px] py-[22px] border-b border-white/18">
        <ul className="grid 2xl:gap-[52px] grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-y-6 lg:gap-y-0 text-white">
          {isLoading ? (
            // Skeleton loading state
            <>
              {[...Array(6)].map((_, index) => (
                <li key={index} className="flex flex-col gap-[17px] 2xl:flex-row 2xl:first:pl-[24px] items-center text-center lg:border-r-[1px] lg:border-white/16 lg:last:border-0 animate-pulse">
                  {/* Icon circle skeleton */}
                  <div className="bg-[#0a8bad] rounded-full p-4 flex items-center justify-center">
                    <div className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px] bg-[#077394] rounded-full"></div>
                  </div>
                  
                  {/* Text content skeleton */}
                  <div className="lg:text-left">
                    {/* Number skeleton */}
                    <div className="text-[26px] sm:text-[30px] md:text-[32px] font-[600] leading-tight 2xl:text-start text-center">
                      <div className="h-8 bg-[#0a8bad] rounded w-16 mx-auto lg:mx-0"></div>
                    </div>
                    
                    {/* Label skeleton */}
                    <div className="text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-tight 2xl:text-start text-center mt-2">
                      <div className="h-5 bg-[#0a8bad] rounded w-24 mx-auto lg:mx-0"></div>
                    </div>
                  </div>
                </li>
              ))}
            </>
          ) : (
            // Actual content
            <>
              <li className="flex flex-col gap-[17px] 2xl:flex-row 2xl:first:pl-[24px] items-center text-center lg:border-r-[1px] lg:border-white/16 lg:last:border-0">
                <div className="bg-white/16 rounded-full p-4 flex items-center justify-center">
                  <img
                    src={years_icon}
                    alt="icon"
                    className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]"
                  />
                </div>
                <div className="lg:text-left">
                  <p className="text-[26px] sm:text-[30px] md:text-[32px] font-[600] leading-tight 2xl:text-start text-center">
                    {data?.year ?? 0}
                  </p>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-tight 2xl:text-start text-center">
                    Years
                  </p>
                </div>
              </li>
              
              <li className="flex flex-col gap-[17px] 2xl:flex-row 2xl:first:pl-[24px] items-center text-center lg:border-r-[1px] lg:border-white/16 lg:last:border-0">
                <div className="bg-white/16 rounded-full p-4 flex items-center justify-center">
                  <img
                    src={departments_icon}
                    alt="icon"
                    className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]"
                  />
                </div>
                <div className="lg:text-left">
                  <p className="text-[26px] sm:text-[30px] md:text-[32px] font-[600] leading-tight 2xl:text-start text-center">
                    {data?.departments ?? 0}
                  </p>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-tight 2xl:text-start text-center">
                    Departments
                  </p>
                </div>
              </li>
              
              <li className="flex flex-col gap-[17px] 2xl:flex-row 2xl:first:pl-[24px] items-center text-center lg:border-r-[1px] lg:border-white/16 lg:last:border-0">
                <div className="bg-white/16 rounded-full p-4 flex items-center justify-center">
                  <img
                    src={chairs_icon}
                    alt="icon"
                    className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]"
                  />
                </div>
                <div className="lg:text-left">
                  <p className="text-[26px] sm:text-[30px] md:text-[32px] font-[600] leading-tight 2xl:text-start text-center">
                    {data?.no_of_chair ?? 0}
                  </p>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-tight 2xl:text-start text-center">
                    Chairs
                  </p>
                </div>
              </li>
              
              <li className="flex flex-col gap-[17px] 2xl:flex-row 2xl:first:pl-[24px] items-center text-center lg:border-r-[1px] lg:border-white/16 lg:last:border-0">
                <div className="bg-white/16 rounded-full p-4 flex items-center justify-center">
                  <img
                    src={centers_icon}
                    alt="icon"
                    className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]"
                  />
                </div>
                <div className="lg:text-left">
                  <p className="text-[26px] sm:text-[30px] md:text-[32px] font-[600] leading-tight 2xl:text-start text-center">
                    {data?.centers ?? 0}
                  </p>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-tight 2xl:text-start text-center">
                    Centers
                  </p>
                </div>
              </li>
              
              <li className="flex flex-col gap-[17px] 2xl:flex-row 2xl:first:pl-[24px] items-center text-center lg:border-r-[1px] lg:border-white/16 lg:last:border-0">
                <div className="bg-white/16 rounded-full p-4 flex items-center justify-center">
                  <img
                    src={campus_icon}
                    alt="icon"
                    className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]"
                  />
                </div>
                <div className="lg:text-left">
                  <p className="text-[26px] sm:text-[30px] md:text-[32px] font-[600] leading-tight 2xl:text-start text-center">
                    {data?.campus_in_acre ?? 0}
                  </p>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-tight 2xl:text-start text-center">
                    Campus in Acre
                  </p>
                </div>
              </li>
              
              <li className="flex flex-col gap-[17px] 2xl:flex-row 2xl:first:pl-[24px] items-center text-center lg:border-r-[1px] lg:border-white/16 lg:last:border-0">
                <div className="bg-white/16 rounded-full p-4 flex items-center justify-center">
                  <img
                    src={colleges_icon}
                    alt="years"
                    className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px]"
                  />
                </div>
                <div className="lg:text-left">
                  <p className="text-[26px] sm:text-[30px] md:text-[32px] font-[600] leading-tight 2xl:text-start text-center">
                    {data?.affilated_collages ?? 0}
                  </p>
                  <p className="text-[16px] sm:text-[18px] md:text-[20px] font-[400] leading-tight 2xl:text-start text-center">
                    Affiliated Colleges
                  </p>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="w-full bg-[#077394] py-[24px] px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row gap-3 sm:gap-[7px] items-center justify-center text-center">
        {isLoading ? (
          // Bottom section skeleton
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-[7px] items-center justify-center animate-pulse">
            <div className="h-6 bg-[#0a8bad] rounded w-64"></div>
            <div className="bg-[#0a8bad] rounded-full w-[22px] h-[22px] sm:w-[24px] sm:h-[24px]"></div>
          </div>
        ) : (
          // Actual bottom section content
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticalInformationComponent;