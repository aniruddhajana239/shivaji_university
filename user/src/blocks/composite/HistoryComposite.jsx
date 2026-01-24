import React from "react";

const HistoryComposite = ({ content, title }) => {
  console.log("content in history:", content);
  
  if (!content || typeof content !== "object") return null;

  // Function to parse HTML description safely
  const parseHtmlDescription = (htmlString) => {
    if (!htmlString) return null;
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // Extract sections from content
  const sections = Object.entries(content || {}).map(([key, value]) => ({
    key,
    ...value
  }));

  // Get all content details as sections
  const getContentSections = () => {
    const allSections = [];
    
    sections?.forEach((section) => {
      if (section?.content_details && Array.isArray(section.content_details)) {
        section.content_details.forEach((item, index) => {
          allSections.push({
            ...item,
            // Use section key as a fallback for imageTitle
            sectionKey: section?.key
          });
        });
      }
    });
    
    return allSections;
  };

  const contentSections = getContentSections();

  return (
    <div className="w-full flex flex-col gap-8 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Page Title */}
      <h3 className="text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Sections (Paragraph + Image) */}
      {contentSections?.length > 0 && contentSections?.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            section?.image ? "md:flex-row md:items-start md:gap-6" : ""
          }`}
        >
          {/* Paragraph */}
          <div className={`text-[15px] leading-relaxed text-[#000000] ${index===0&&"md:w-[65%]"} text-justify`}>
            {section?.description ? parseHtmlDescription(section.description) : section?.paraContent}
          </div>

          {/* Image (optional) */}
          {section?.image && (
            <div className="rounded-b-md bg-white shadow-md mt-4 md:mt-0 md:w-[35%] flex flex-col items-center">
              <img
                src={section.image}
                alt={section?.title || section?.sectionKey || "History image"}
                className="rounded-[12px]  w-full object-cover"
              />
              {section?.title && (
                <p className="text-[13px]  rounded-b-md pb-2 text-[#333333] mt-2 text-center font-medium">
                  {section.title}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Additional Paragraphs - for backward compatibility */}
      {content?.paragraph?.length > 0 && (
        <div className="flex flex-col gap-4">
          {content?.paragraph?.map((para, i) => (
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