import React from "react";

const HistoryComposite = ({ content, title }) => {
  if (!content || !content.sections) return null;

  return (
    <div className="w-full flex flex-col gap-8 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Page Title */}
      <h3 className="text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Sections (Paragraph + Image) */}
      {content.sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            section.image ? "md:flex-row md:items-start md:gap-6" : ""
          }`}
        >
          {/* Paragraph */}
          <p className="text-[15px] leading-relaxed text-[#000000] md:w-[65%] text-justify">
            {section.paraContent}
          </p>

          {/* Image (optional) */}
          {section.image && (
            <div className="mt-4 md:mt-0 md:w-[35%] flex flex-col items-center">
              <img
                src={section.image}
                alt={section.imageTitle}
                className="rounded-[12px] shadow-md w-full object-cover"
              />
              {section.imageTitle && (
                <p className="text-[13px] text-[#333333] mt-2 text-center font-medium">
                  {section.imageTitle}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Additional Paragraphs */}
      {content.paragraph?.length > 0 && (
        <div className="flex flex-col gap-4">
          {content.paragraph.map((para, i) => (
            <p
              key={i}
              className="text-[15px] leading-relaxed text-[#000000] text-justify"
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryComposite;
