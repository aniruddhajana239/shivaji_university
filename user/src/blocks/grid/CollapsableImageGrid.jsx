import React from "react";
import downarrow_icom from "../../assets/icons/chevron_down.png";

const CollapsableImageGrid = ({ content, title }) => {
  if (!content || !content.sections) return null;

  return (
    <div className="w-full flex flex-col gap-1 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Page Title */}
      <h3 className="text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Always Visible Image Sections */}
      {content.sections.map((section, index) => {
        const images =
          section.gridOne ||
          section.gridTwo ||
          section.gridThree ||
          section.gridFour ||
          section.gridFive ||
          section.gridSix ||
          section.gridSeven ||
          [];

        return (
          <div key={index} className="">
            {/* Section Heading */}
            <div className="w-full px-4  text-[#001F51] font-[600] text-left text-[18px]">
              {section.heading}
            </div>

            {/* Image Grid (Always Visible) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-white transition-all duration-300">
              {images.map((img, i) =>
                typeof img === "object" ? (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-[#F9FAFB] p-2 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={img.image}
                      alt={img.title || `Gallery Image ${i + 1}`}
                      className="rounded-[10px] w-full h-[180px] object-cover"
                    />
                    {img.title && (
                      <p className="mt-2 text-[14px] text-center font-[500] text-black">
                        {img.title}
                      </p>
                    )}
                  </div>
                ) : (
                  <img
                    key={i}
                    src={img}
                    alt={`Gallery Image ${i + 1}`}
                    className="rounded-[10px] w-full h-[180px] object-cover shadow-sm hover:shadow-md transition"
                  />
                )
              )}
            </div>
            <div className="relative flex items-center justify-center text-[14px] text-black font-[400] my-6">
              {/* Left line */}
              <div className="before:content-[''] before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:w-[40%] before:h-[1px] before:bg-[#D8D8D8]" />

              {/* Center button */}
              <div className="flex gap-[12px] justify-center items-center py-[9px] px-[14px] border border-[#C0F0FF] rounded-[38px] bg-white relative z-10">
                <p>Show More</p>
                <div className="h-[20px] w-[20px] bg-[#EDFAFE] rounded-full flex justify-center items-center">
                  <img
                    src={downarrow_icom}
                    alt="downarrow_icom"
                    className="h-[6px] w-[10px] object-cover"
                  />
                </div>
              </div>

              {/* Right line */}
              <div className="after:content-[''] after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:w-[40%] after:h-[1px] after:bg-[#D8D8D8] " />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollapsableImageGrid;
