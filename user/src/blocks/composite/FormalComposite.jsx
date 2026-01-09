import { useEffect } from "react";
import ChevronRight from "../../assets/icons/chevron_right_dark.png";
import CommonTable from "../../components/tables/CommonTable";

export const FormalComposite = ({title, content }) => {
  
  useEffect(() => {
    console?.log?.("📋 FormalComposite content:", content);
  }, [content]);

  // Check if content exists and has data
  if (!content || !Object?.keys?.(content)?.length) return null;

  // Get the content keys
  const contentKeys = Object?.keys?.(content) || [];

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Title would come from parent component if needed, but using first key as fallback */}
      <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
        {title ||""}
      </h3>

      <div className="w-full flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
        {contentKeys?.map?.((sectionKey, index) => {
          const sectionItems = content?.[sectionKey] || [];
          
          return (
            <div
              key={index}
              className={`w-full flex flex-col gap-2 pb-6 mb-2 ${index !== contentKeys?.length - 1 && "border-b-2 border-b-[#D8D8D8]"} last-of-type:border-0 ${index === contentKeys?.length - 1 && "border-none"}`}
            >
              {/* Section Heading */}
              <h4 className="m-0 text-[#001F51] text-[18px] font-[600] 2xl:text-[20px]">
                {sectionKey || ""}
              </h4>

              {/* Render all items in this section */}
              {sectionItems?.map?.((item, itemIndex) => (
                <div key={itemIndex}>
                  {/* Item Title if exists */}
                  {item?.title?.trim?.() && (
                    <h5 className="text-[16px] font-[600] text-[#077394] mt-2 mb-1">
                      {item?.title || ""}
                    </h5>
                  )}

                  {/* Item Description (HTML content) */}
                  {item?.description?.trim?.() && (
                    <div 
                      className="m-0"
                      dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                    />
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {/* Important Notices (if available in this structure) */}
        {content?.important_notices &&
          Array?.isArray?.(content?.important_notices) &&
          content?.important_notices?.length > 0 && (
            <div className="w-full flex flex-col gap-4 p-3 py-4 rounded-[15px] bg-[#FA8F21]/10 mt-4">
              <ul className="w-full flex flex-col gap-2">
                {content?.important_notices?.map?.((notice, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] 2xl:text-[18px] text-justify text-[#000000] font-[400] flex flex-col gap-2 itms-start"
                  >
                    {notice?.title && (
                      <span
                        className={`font-[600] text-[#000000] ${idx === 0 && "text-[#001F51]"
                          }`}
                      >
                        {notice?.title || ""}
                      </span>
                    )}
                    {notice?.content && (
                      <span className="text-[14px] 2xl:text-[18px] text-justify">
                        {notice?.content || ""}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};