import { useEffect, useState } from "react";
import ChevronRight from "../../assets/icons/chevron_right_dark.png";
import CommonTable from "../../components/tables/CommonTable";

export const FormalComposite = ({ title, content }) => {

  useEffect(() => {
    console?.log?.("📋 FormalComposite content:", content, title);
  }, [content]);

  const [filteredContentCount, setFilteredContentCount] = useState(0);
  // Check if content exists and has data
  if (!content || !Object?.keys?.(content)?.length) return null;

  // Get the content keys
  const contentKeys = Object?.keys?.(content) || [];

  // Check if any section has a table
  const hasTableSection = contentKeys.some(key => 
    content?.[key]?.table_data || content?.[key]?.table_heading
  );

  useEffect(() => {
    // Calculate the number of non-empty content sections
    const count = contentKeys.reduce((acc, key) => {
      const section = content?.[key];
      const hasTable = section?.table_data || section?.table_heading;
      const hasContentDetails = section?.content_details && section?.content_details.length > 0;
      const hasValidViewType = section?.view_details?.view_type !== "background_color";
      
      if (section && ((!hasTable && hasContentDetails && hasValidViewType) || hasTable)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setFilteredContentCount(count);
  }, [content, contentKeys]);

  // Helper function to handle \n in text
  const handleNewLines = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    return text.split('\\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  // Helper function to render table rows
  const renderTableRows = (sectionData) => {
    if (!sectionData?.table_data || !Array.isArray(sectionData.table_data)) return null;

    return sectionData.table_data.map((row, rowIndex) => {
      const data = row?.data || {};
      const dataValues = Object.values(data);
      
      return (
        <tr
          key={rowIndex}
          className={`${
            rowIndex !== sectionData.table_data.length - 1 && "border-b border-[#D8D8D8]"
          } text-[#000000] text-[16px] mx-2 hover:bg-[#f5f5f5]`}
        >
          {sectionData.table_heading?.map((heading, colIndex) => {
            const cellValue = dataValues[colIndex] || '';
            
            return (
              <td
                key={colIndex}
                className="py-3 px-4 align-top"
              >
                <span className="text-[14px] 2xl:text-[18px] align-top">
                  {handleNewLines(cellValue)}
                </span>
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Title would come from parent component if needed, but using first key as fallback */}
      <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
        {title || ""}
      </h3>

      <div className="w-full flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
        {contentKeys?.map?.((sectionKey, index) => {
          const sectionItems = content?.[sectionKey] || [];
          const hasTable = sectionItems?.table_data || sectionItems?.table_heading;
          const hasContentDetails = sectionItems?.content_details && sectionItems.content_details.length > 0;
          
          // Skip empty sections
          if (!hasTable && !hasContentDetails) return null;

          return (
            <div
              key={index}
              className={`w-full flex flex-col gap-2 pb-6 mb-2 ${index !== filteredContentCount - 1 && "border-b-2 border-b-[#D8D8D8]"} last-of-type:border-0 ${index === contentKeys?.length - 1 && "border-none"}`}
            >
              {/* Section Heading - Only show if no table section exists OR this is not a table section */}
              {/* {!hasTableSection || !hasTable ? (
                <h4 className="m-0 text-[#001F51] text-[18px] font-[600] 2xl:text-[20px]">
                  {sectionItems?.view_details?.view_type !== "background_color" ? sectionKey || "" : ""}
                </h4>
              ) : null} */}

              {/* Render table if exists */}
              {hasTable && sectionItems?.table_heading && (
                <CommonTable
                  columns={sectionItems.table_heading.map((heading, idx) => ({
                    heading: heading?.title || `Column ${idx + 1}`,
                    accessor: `col_${idx}`
                  }))}
                  data={renderTableRows(sectionItems)}
                  isWrappableHeader={false}
                />
              )}

              {/* Render background color section */}
              {sectionItems?.view_details?.view_type === "background_color" && hasContentDetails ? (
                <div 
                  className="w-full flex flex-col gap-4 p-3 py-4 rounded-[15px]"
                  style={{
                    backgroundColor: `${sectionItems?.view_details?.color}1A`,
                  }}
                >
                  <ul className="w-full flex flex-col gap-2">
                    {sectionItems.content_details.map?.((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-[14px] 2xl:text-[18px] text-justify text-[#000000] font-[400] flex flex-col gap-2 items-start"
                      >
                        {item?.title && (
                          <span
                            className={`font-[600] text-[#000000] ${itemIndex === 0 && "text-[#001F51]"}`}
                          >
                            {sectionKey || ""}
                          </span>
                        )}
                        {item?.description && (
                          <div
                            className="text-[14px] 2xl:text-[18px] text-justify"
                            dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Render regular content details (if not a table section) */}
              {!hasTable && hasContentDetails && sectionItems?.content_details.map?.((item, itemIndex) => (
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
      </div>
    </div>
  );
};