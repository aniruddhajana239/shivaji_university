import React from "react";

const NccComposite = ({ content, title }) => {
  if (!content || !content.sections) return null;

  return (
    <div className="w-full flex flex-col gap-8 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Page Title */}
      <h3 className="text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Sections */}
      {content.sections.map((section, index) => {
        // Assign background based on heading
        let bgColor = "bg-transparent";
        if (section.heading === "Vision") bgColor = "bg-[#f7eadc]";
        else if (section.heading === "Mission") bgColor = "bg-[#e6e3fb]";
        else if (section.heading === "Motto Of NCC") bgColor = "bg-[#daeef9]";

        // Check if it's the first section with paraContent (no padding needed)
        const isFirstParaContent = index === 0 && section.paraContent;
        
        return (
          <div
            key={index}
            className={`flex flex-col md:flex-row md:items-start md:gap-3 ${
              section.images && section.images.length > 0 
                ? (index % 2 !== 0 ? "md:flex-row-reverse" : "") 
                : ""
            }`}
          >
            {/* Text + Heading Section */}
            <div
              className={`flex-1 flex flex-col gap-3 ${
                isFirstParaContent ? "" : "p-4 rounded-[16px]"
              } ${bgColor} ${
                section.images && section.images.length > 0 ? "md:w-3/4" : "w-full"
              }`}
            >
              {section?.heading && (
                <h4 className="text-[#001F51] text-[20px] font-[600]">
                  {section.heading}
                </h4>
              )}

              {/* Paragraph Content */}
              {section?.paraContent && (
                <div className="flex flex-col gap-3">
                  {section.paraContent.map((para, i) => (
                    <p
                      key={i}
                      className="text-[15px] leading-relaxed text-[#000000] text-justify"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {/* Text Content */}
              {section?.textContent && (
                <div className="flex flex-col">
                  {section.textContent.map((text, i) => (
                    <p
                      key={i}
                      className="text-[15px] font-[400] text-[#000000] text-justify"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Image Section (Only for sections with images) */}
            {section.images && section.images.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4 md:mt-0 md:w-1/4 justify-center md:justify-end">
                {section.images.map((imgSrc, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center w-full md:w-auto"
                  >
                    <img
                      src={imgSrc}
                      alt={`ncc-image-${i}`}
                      className="h-[158px] w-[150px] rounded-[12px] shadow-md object-contain border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NccComposite;