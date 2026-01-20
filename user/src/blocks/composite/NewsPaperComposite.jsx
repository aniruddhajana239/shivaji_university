import React from "react";

const NewsPaperComposite = ({ content, title, data }) => {
  // Convert content object to array for mapping
  const contentEntries = content ? Object.entries(content) : [];

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Title */}
      <h3 className="m-0 text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Content sections */}
      <div className="w-full flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
        {contentEntries?.map(([sectionKey, sectionData], sectionIndex) => {
          const viewType = sectionData?.view_details?.view_type;
          const bgColor = sectionData?.view_details?.color;
          const contentDetails = sectionData?.content_details || [];

          // Determine if it's a grid based on key name
          const isTwoImageGrid = sectionKey?.toLowerCase()?.includes("two image");
          const isThreeImageGrid = sectionKey?.toLowerCase()?.includes("three image");

          // Render based on view type
          if (viewType === "background_color") {
            return (
              <div 
                key={sectionIndex} 
                className={`w-full flex flex-col gap-0 p-3 py-4 rounded-[15px] mt-4`}
                style={{ backgroundColor: bgColor ? `${bgColor}10` : "#FA8F2110" }}
              >
                {contentDetails?.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4 last:mb-0">
                    {item?.title && (
                      <h4 className={`text-[16px] 2xl:text-[18px] font-[600] ${itemIndex===0?"text-[#001F51]":"text-black"} mb-2`}>
                        {item?.title}
                      </h4>
                    )}
                    {item?.description && (
                      <div 
                        className="text-[14px] 2xl:text-[16px] font-[400] leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            );
          }

          // Regular content section
          return (
            <div key={sectionIndex} className="">
              {/* Render images in grid if it's an image grid section */}
              {isTwoImageGrid && contentDetails?.some(item => item?.image) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[29px] py-4">
                  {contentDetails?.map((item, index) => (
                    item?.image && (
                      <img
                        key={index}
                        src={item?.image}
                        alt={`Image ${index + 1}`}
                        className="w-full aspect-5/3 rounded-[10px] object-cover"
                      />
                    )
                  ))}
                </div>
              )}

              {isThreeImageGrid && contentDetails?.some(item => item?.image) && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[19px] py-4">
                  {contentDetails?.map((item, index) => (
                    item?.image && (
                      <img
                        key={index}
                        src={item?.image}
                        alt={`Image ${index + 1}`}
                        className="w-full aspect-4/3 rounded-[10px] object-cover"
                      />
                    )
                  ))}
                </div>
              )}

              {/* Render regular content (titles and descriptions) */}
              {!isTwoImageGrid && !isThreeImageGrid && contentDetails?.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-6 last:mb-0">
                  

                  {/* Description if exists */}
                  {item?.description && (
                    <div 
                      className="text-[14px] 2xl:text-[16px] font-[400] leading-relaxed text-black"
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                  )}

                  {/* Single image if exists (for non-grid sections) */}
                  {item?.image && !isTwoImageGrid && !isThreeImageGrid && (
                    <div className="mt-4">
                      <img
                        src={item?.image}
                        alt={item?.title || `Image ${itemIndex}`}
                        className="w-full max-w-2xl rounded-[10px] object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsPaperComposite;