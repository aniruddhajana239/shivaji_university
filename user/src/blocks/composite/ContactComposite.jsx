import React from "react";
import chevron_right_arrow from "../../assets/icons/chevron_right_dark.png";
import CommonTable from "../../components/tables/CommonTable";

const ContactComposite = ({ content, title }) => {
  console.log("content in contact composite:", content);
  
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

  // Find the table section (looking for table_data property)
  const tableSectionIndex = sections.findIndex(section => 
    section?.table_data || section?.table_heading
  );
  
  const tableSection = tableSectionIndex >= 0 ? sections[tableSectionIndex] : null;
  
  // Filter out table section from other sections
  const otherSections = sections.filter((_, index) => index !== tableSectionIndex);

  // Helper function to render table rows for CommonTable
  const renderTableRows = (sectionData) => {
    if (!sectionData?.table_data || !Array.isArray(sectionData?.table_data)) return null;

    return sectionData.table_data.map((row, rowIndex) => {
      const data = row?.data || {};
      
      return (
        <tr
          key={rowIndex}
          className={`${
            rowIndex !== sectionData.table_data.length - 1 && "border-b border-[#D8D8D8]"
          } text-[#000000] text-[16px] mx-2`}
        >
          {/* Office Column */}
          <td className="py-3 px-4 align-top">
            <span className="text-[14px] 2xl:text-[18px] align-top">
              {data?.office ?? ""}
            </span>
          </td>

          {/* Phone No Column */}
          <td className="py-3 px-4 align-top">
            {data?.["phone-no"] && (
              <ul
                className="text-[14px] 2xl:text-[18px] align-top"
                style={{ listStyleType: "none" }}
              >
                {data["phone-no"].split('\\n').map((phone, idx) => (
                  <li key={idx}>{phone.trim()}</li>
                ))}
              </ul>
            )}
          </td>

          {/* Email Column */}
          <td className="py-3 px-4 align-top">
            <span className="text-[14px] 2xl:text-[18px] align-top">
              {data?.email ?? ""}
            </span>
          </td>

          {/* Link for contact Column */}
          <td className="py-3 px-4 align-top">
            {data?.["link-for-contact"] ? (
              <a
                href={data["link-for-contact"]}
                className="text-[#2F8AA5] underline whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here
              </a>
            ) : (
              <span className="text-[14px] 2xl:text-[18px] align-top">
                {data?.["link-for-contact"] ?? ""}
              </span>
            )}
          </td>
        </tr>
      );
    });
  };

  // Check if section has images
  const hasImages = (section) => {
    return section?.content_details?.some(item => item?.image);
  };

  // Determine if section has background color style
  const hasBackgroundStyle = (section) => {
    return section?.view_details?.view_type === "background_color" || 
           section?.view_details?.color;
  };

  // Determine if section is an external cards section
  const isExternalCardsSection = (section) => {
    return section?.content_details?.some(item => 
      item?.redirect_to === "open_file" || item?.redirect_to === "open_in_another_link"
    );
  };
   const prepareTableColumns = (tableSection) => {
    if (!tableSection?.table_heading) return [];
    
    // Map width classes based on column index
    const widthClasses = [
      "w-[30%] max-w-[360px]",  // First column
      "w-[25%]",               // Second column
      "w-[25%]",               // Third column
      "w-[20%]"                // Fourth column
    ];
    
    return tableSection.table_heading.map((heading, index) => ({
      ...heading,
      // Convert title to heading for CommonTable component
      heading: heading?.title || "",
      // Add width class based on index
      className: widthClasses[index] || ""
    }));
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Title */}
      <h3 className="m-0 text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Render first non-table section if exists */}
      {otherSections?.length > 0 && (
        <div className="">
          {hasImages(otherSections[0]) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherSections[0]?.content_details?.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {item?.image && (
                    <div className="flex-shrink-0 bg-[#2F8AA5] p-3 rounded-full flex items-center justify-center mt-1">
                      <img
                        src={item.image}
                        alt="icon"
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {item?.title && (
                      <p className="text-[16px] font-[600] text-black mb-1">
                        {item.title}
                      </p>
                    )}
                    {item?.description && (
                      <div className="text-[14px] text-black">
                        {parseHtmlDescription(item.description)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            otherSections[0]?.content_details?.map((item, index) => (
              <div key={index} className="mb-4">
                {item?.title && (
                  <p className="text-[16px] font-[600] text-black mb-2">
                    {item.title}
                  </p>
                )}
                {item?.description && (
                  <div className="text-[14px] text-black">
                    {parseHtmlDescription(item.description)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Always render table section in second position if it exists */}
      {tableSection && (
        <div className="">
          {/* Contacts Details Table using Custom CommonTable */}
          {tableSection?.table_heading && (
            <CommonTable
              columns={prepareTableColumns(tableSection)}
              data={renderTableRows(tableSection)}
              isWrappableHeader={false}
            />
          )}
        </div>
      )}

      {/* Render remaining sections after table */}
      {otherSections?.slice(1).map((section, index) => {
        if (!section?.content_details) return null;

        // Skip if it's an external cards section (will be rendered separately at the end)
        if (isExternalCardsSection(section)) return null;

        return (
          <div key={index} className="mb-0">
            {/* Content Details */}
            {hasImages(section) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section?.content_details?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {item?.image && (
                      <div className="flex-shrink-0 bg-[#2F8AA5] p-3 rounded-full flex items-center justify-center mt-1">
                        <img
                          src={item.image}
                          alt="icon"
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      {item?.title && !hasBackgroundStyle(section) && (
                        <p className="text-[16px] font-[600] text-black mb-1">
                          {item.title}
                        </p>
                      )}
                      {item?.description && (
                        <div className="text-[14px] text-black">
                          {parseHtmlDescription(item.description)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Sections with background color */}
            {hasBackgroundStyle(section) && section?.content_details && (
              <div 
                className="w-full flex flex-col gap-4 p-3 py-4 rounded-[15px] mt-4"
                style={{ 
                  backgroundColor: section?.view_details?.view_type!=="" 
                    ? `${section.view_details.color}1A` 
                    : undefined 
                }}
              >
                {section.content_details.map((notice, idx) => (
                  <div
                    key={idx}
                    className="text-[14px] 2xl:text-[18px] text-justify text-[#000000] font-[400] flex flex-col gap-2 items-start"
                  >
                    {section?.view_details?.view_type!=="" &&notice?.title && (
                      <span className={`font-[600] ${idx===0?"text-[#001F51]":"text-[#000000]"} py-2`}>
                        {notice.title}
                      </span>
                    )}
                    {notice?.description && (
                      <div className="text-[14px] 2xl:text-[18px] text-justify">
                        {parseHtmlDescription(notice.description)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* External Cards Sections (always at the end) */}
      {sections.filter(isExternalCardsSection).map((section, index) => (
        <div key={index} className="w-full">
          <ul className="flex flex-col gap-2 text-[16px] text-[400]">
            {section?.content_details?.map((card, cardIndex) => (
              <li 
                key={cardIndex}
                className="border border-[#C0F0FF] rounded-[12px] p-[15px] flex justify-between items-center cursor-pointer hover:bg-[#f5f5f5]"
                onClick={() => {
                  if (card?.link) {
                    window.open(card.link, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <p>{parseHtmlDescription(card?.description)}</p>
                <div className="p-2 bg-[#EDFAFE] rounded-full">
                  <img
                    src={chevron_right_arrow}
                    alt="chevron_right_arrow"
                    className="h-[10px] w-[10px]"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ContactComposite;