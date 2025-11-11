import ChevronRight from "../../assets/icons/chevron_right_dark.png";
import CommonTable from "../../components/tables/CommonTable";
export const FormalComposite = ({ content, title }) => {
  const renderTableRows = (tableData) => {
    if (!tableData?.columns || !tableData?.rows) return null;

    return tableData.rows.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className={`${rowIndex !== tableData.rows.length - 1 && "border-b border-[#D8D8D8]"
          } text-[#000000] text-[16px] mx-2 hover:bg-[#f5f5f5]`}
      >
        {tableData.columns.map((column, colIndex) => {
          const accessor = column.accessor;
          const cellValue = row[accessor];

          // Render cell content based on column type
          const renderCellContent = () => {
            // Phone numbers as unordered list
            if (accessor === "PhoneNo" && Array.isArray(cellValue)) {
              return (
                <ul
                  className="text-[14px] 2xl:text-[18px] align-top"
                  style={{ listStyleType: "none" }}
                >
                  {cellValue?.map((phone, idx) => (
                    <li key={idx}>{phone ?? ""}</li>
                  ))}
                </ul>
              );
            }

            // Links as clickable links
            if (accessor === "Links" && cellValue) {
              return (
                <a
                  href={cellValue ?? "#"}
                  className="text-blue-600 underline whitespace-nowrap"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here
                </a>
              );
            }

            // Default text rendering
            return (
              <span className="text-[14px] 2xl:text-[18px] align-top">
                {cellValue ?? ""}
              </span>
            );
          };

          // Determine width classes based on column accessor
          const getWidthClass = () => {
            switch (accessor) {
              case "date":
                return "w-[40%] lg:w-[20%] max-w-[150px]"; // First column - Office
              // case "PhoneNo":
              //   return "w-[25%]"; // Second column - Phone No
              // case "Email":
              //   return "w-[25%]"; // Third column - Email
              // case "Links":
              //   return "w-[20%]"; // Fourth column - Links
              default:
                return "";
            }
          };

          return (
            <td
              key={colIndex}
              className={`py-3 px-4 align-top ${getWidthClass()}`}
            >
              {renderCellContent()}

              {/* Show description with title and list items if available */}
              {accessor === "Office" && row?.Description && (
                <div className="mt-2">
                  {row.Description.title && (
                    <p className="text-[10px] 2xl:text-[14px]  text-[#333333] mb-1">
                      {row.Description.title}
                    </p>
                  )}
                  {row.Description.listItems &&
                    Array.isArray(row.Description.listItems) && (
                      <ul className="text-[10px] 2xl:text-[14px] text-wrap text-[#333333] list-none list-inside space-y-1">
                        {row.Description.listItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                </div>
              )}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
        {title ?? ""}
      </h3>
      <div className="w-full flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
        {content?.sections &&
          Array.isArray(content?.sections) &&
          content?.sections?.length > 0
          ? content?.sections?.map((section, index) => (
            <div
              key={index}
              className={`w-full flex flex-col gap-2 pb-6 mb-2 ${section?.type !== "table" && "border-b-2 border-b-[#D8D8D8]"} last-of-type:border-0 ${index === content?.sections?.length - 1 && "border-none"
                }`}
            >
              {section?.heading && (
                <h4 className="m-0 text-[#001F51] text-[18px] font-[600] 2xl:text-[20px]">
                  {section?.heading}
                </h4>
              )}
              {section?.type === "full-width-card" &&
                <div className="w-full flex min-w-[350px] overflow-x-auto">
                  {section?.content?.cardItems && Array?.isArray(section?.content?.cardItems) && section?.cardItems?.length > 0 && section?.content?.cardItems?.map((card, idx) => (

                    <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-[10px] p-4 border-2 border-[#D8D8D8]">
                      {card?.title ?? ""}
                    </div>))
                  }

                </div>
              }
              {section?.type === "table" &&
                <CommonTable
                  columns={section.content.columns}
                  data={renderTableRows(section.content)}
                  isWrappableHeader={false}
                />
              }
              {section?.type === "paragraph" && section?.content && (
                <p className="m-0">{section?.content}</p>
              )}
              {section?.type === "mixed" &&
                section?.content &&
                Array.isArray(section?.content) &&
                section?.content?.length > 0 && section?.content?.map((con, index) => (
                  con?.type === "bullet-list" ?
                    <ul className="w-full flex flex-col gap-1 list-disc list-inside ml-4">
                      {con?.content?.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]"
                        >
                          {item}
                        </li>
                      )
                      )
                      }
                    </ul>
                    : <p className="text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">{con?.content}</p>
                )
                )}
              {section?.type === "bullet-list" &&
                section?.listItems &&
                Array.isArray(section?.listItems) &&
                section?.listItems?.length > 0 && (
                  <ul className="w-full flex flex-col gap-1 list-disc list-inside ml-4">
                    {section?.listItems?.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              {section?.type === "order-list" &&
                section?.listItems &&
                Array.isArray(section?.listItems) &&
                section?.listItems?.length > 0 && (
                  <ol className="w-full flex flex-col gap-1 list-decimal list-inside ml-4">
                    {section?.listItems?.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]"
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                )}
              {section?.type === "arrow-list" &&
                section?.listItems &&
                Array.isArray(section?.listItems) &&
                section?.listItems?.length > 0 && (
                  <ul className="w-full flex flex-col gap-2">
                    {section?.listItems?.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400] flex items-start gap-2"
                      >
                        <div className="h-4 w-4 rounded-full flex justify-center items-center bg-[#EDFAFE] flex-shrink-0 ">
                          <img
                            src={ChevronRight}
                            alt="chevron right"
                            className="h-2 w-2 object-contain"
                          />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              {section?.highlights &&
                <div className={`rounded-[10px] p-2 text-12px lg:text-14px my-2 ${section?.highlights?.color === "primary"
                  ? "bg-[#FA8F21]/10"
                  : "bg-[#5F52B7]/10"
                  }`}>
                  {section?.highlights?.type === "paragraph" &&
                    <>
                      <p>{section?.highlights?.content}</p>
                    </>
                  }
                </div>
              }
            </div>
          ))
          : null}
        {content?.important_notices &&
          Array.isArray(content?.important_notices) &&
          content?.important_notices?.length > 0 && (
            <div className="w-full flex flex-col gap-4 p-3 py-4 rounded-[15px] bg-[#FA8F21]/10 mt-4">
              <ul className="w-full flex flex-col gap-2">
                {content?.important_notices?.map((notice, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] 2xl:text-[18px] text-justify text-[#000000] font-[400] flex flex-col gap-2 itms-start"
                  >
                    {notice?.title && (
                      <span
                        className={`font-[600] text-[#000000] ${idx === 0 && "text-[#001F51]"
                          }`}
                      >
                        {notice?.title}
                      </span>
                    )}
                    {notice?.content && (
                      <span className="text-[14px] 2xl:text-[18px] text-justify">
                        {notice?.content}
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