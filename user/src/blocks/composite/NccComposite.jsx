import React from "react";

const NccComposite = ({ content, title }) => {
  console.log("content in ncc:", content);
  
  if (!content || typeof content !== 'object') return null;

  // Function to parse HTML description safely
  const parseHtmlDescription = (htmlString) => {
    if (!htmlString) return null;
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  // Transform content to sections format
  const getSections = () => {
    const sections = [];
    
    Object.entries(content || {}).forEach(([sectionKey, sectionData]) => {
      if (!sectionData?.content_details || !Array.isArray(sectionData.content_details)) return;
      
      const section = {
        heading: sectionKey.replace(/([A-Z])/g, ' $1').trim(), // Convert camelCase to readable
        paraContent: [],
        images: [],
        bgColor: "bg-transparent",
        hasDescription: false
      };
      
      // Extract content from content_details
      sectionData.content_details.forEach(item => {
        // Check for images
        if (item?.image) {
          section.images.push(item.image);
        }
        
        // Check for descriptions
        if (item?.description) {
          section.hasDescription = true;
        }
      });
      
      // Set background color based on section title or view_details
      const lowerCaseSectionKey = sectionKey.toLowerCase();
      if (lowerCaseSectionKey.includes('vision') || sectionData?.view_details?.color === "#fa8f21") {
        section.bgColor = "bg-[#f7eadc]"; // Vision orange background
      } else if (lowerCaseSectionKey.includes('mission') || sectionData?.view_details?.color === "#5f52b7") {
        section.bgColor = "bg-[#e6e3fb]"; // Mission purple background
      } else if (lowerCaseSectionKey.includes('motto') || sectionData?.view_details?.color === "#138ed2") {
        section.bgColor = "bg-[#daeef9]"; // Motto blue background
      }
      
      sections.push(section);
    });
    
    return sections;
  };

  const sections = getSections();

  return (
    <div className="w-full flex flex-col gap-8 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Page Title */}
      <h3 className="text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Sections */}
      {sections?.map((section, index) => {
        // Check if it's the first section with paraContent (no padding needed)
        const isFirstSection = index === 0;
        const hasImages = section?.images?.length > 0;
        const hasDescription = section?.hasDescription;
        
        return (
          <div
            key={index}
            className={`flex flex-col md:flex-row md:items-start md:gap-3 ${
              hasImages 
                ? (index % 2 !== 0 ? "md:flex-row-reverse" : "") 
                : ""
            }`}
          >
            {/* Text + Heading Section */}
            <div
              className={`flex-1 flex flex-col gap-3 ${
                isFirstSection ? "" : "p-4 rounded-[16px]"
              } ${section?.bgColor || "bg-transparent"} ${
                hasImages ? "md:w-3/4" : "w-full"
              }`}
            >
              {section?.heading && (
                <h4 className="text-[#001F51] text-[20px] font-[600]">
                  {section.heading}
                </h4>
              )}

              {/* Content from all content_details */}
              {Object.entries(content || {})?.[index]?.[1]?.content_details?.map((item, i) => {
                if (!item?.description) return null;
                
                return (
                  <div key={i} className="text-[15px] leading-relaxed text-[#000000] text-justify">
                    {parseHtmlDescription(item.description)}
                  </div>
                );
              })}
            </div>

            {/* Image Section (Only for sections with images) */}
            {hasImages && (
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