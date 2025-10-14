import React from "react";
import chevron_right_arrow from "../../assets/icons/chevron_right_dark.png";
import CommonTable from "../../components/tables/CommonTable";

const ContactComposite = ({ content, title }) => {
  if (!content || !content.sections) return null;

  // Helper function to render table rows for CommonTable
  const renderTableRows = (tableData) => {
    if (!tableData?.columns || !tableData?.rows) return null;

    return tableData.rows.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className={`${
          rowIndex !== tableData.rows.length - 1 && "border-b border-[#D8D8D8]"
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
                <ul className="text-[14px] 2xl:text-[18px] align-top" style={{ listStyleType: "none" }}>
                  {cellValue.map((phone, idx) => (
                    <li key={idx}>{phone}</li>
                  ))}
                </ul>
              );
            }

            // Links as clickable links
            if (accessor === "Links" && cellValue) {
              return (
                <a
                  href={cellValue}
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
              case "Office":
                return "w-[30%] max-w-[360px]"; // First column - Office
              case "PhoneNo":
                return "w-[25%]"; // Second column - Phone No
              case "Email":
                return "w-[25%]"; // Third column - Email
              case "Links":
                return "w-[20%]"; // Fourth column - Links
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
              {accessor === "Office" && row.Description && (
                <div className="mt-2">
                  {row.Description.title && (
                    <p className="text-[10px] 2xl:text-[14px]  text-[#333333] mb-1">
                      {row.Description.title}
                    </p>
                  )}
                  {row.Description.listItems && Array.isArray(row.Description.listItems) && (
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
      {/* Title */}
      <h3 className="m-0 text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Sections Loop */}
      {content?.sections?.map((section, index) => (
        <div key={index} className="mb-10">
          {/* Section Heading */}
          {section?.heading && (
            <h4 className="text-[18px] font-[600] text-[#001F51] mb-3">
              {section.heading}
            </h4>
          )}

          {/* Address & Contact List */}
          {section?.addressContact && (
            <div className="flex gap-[40px] mb-4 pr-[150px]">
              {section.addressContact.map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-3">
                  <div className="bg-[#2F8AA5] py-[8px] px-[11px] rounded-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt="icon"
                      className={`${
                        i === 0 ? "w-[14px] h-[18px]" : "w-[18px] h-[18px]"
                      }`}
                    />
                  </div>
                  <p className="text-[14px] text-black">{item.contact}</p>
                </div>
              ))}
            </div>
          )}

          {/* Contacts Details Table using Custom CommonTable */}
          {section?.tableData && (
            <CommonTable
              columns={section.tableData.columns}
              data={renderTableRows(section.tableData)}
              isWrappableHeader={false}
            />
          )}

          {/* Registrar Section */}
          {section?.registrarOffice && (
            <div className="mt-4 flex flex-col gap-2">
              {section.registrarOffice.map((item, i) => (
                <p key={i} className="text-[14px] text-black">
                  <span className="font-semibold">{item.boldText}</span>{" "}
                  {item.contact}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Important Notices */}
      {content?.important_notices &&
        Array.isArray(content.important_notices) &&
        content.important_notices.length > 0 && (
          <div className="w-full flex flex-col gap-4 p-3 py-4 rounded-[15px] bg-[#FA8F21]/10 mt-4">
            <ul className="w-full flex flex-col gap-2">
              {content.important_notices.map((notice, idx) => (
                <li
                  key={idx}
                  className="text-[14px] 2xl:text-[18px] text-justify text-[#000000] font-[400] flex flex-col gap-2 items-start"
                >
                  {notice?.title && (
                    <span
                      className={`font-[600] text-[#000000] py-2 ${
                        idx === 0 ? "text-[#001F51]" : ""
                      }`}
                    >
                      {notice.title}
                    </span>
                  )}
                  {notice?.content && (
                    <span className="text-[14px] 2xl:text-[18px] text-justify">
                      {notice.content}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Additional Links */}
      <div className="w-full">
        <ul className="flex flex-col gap-2 text-[16px] text-[400]">
          <li className="border border-[#C0F0FF] rounded-[12px] p-[15px] flex justify-between items-center">
            <p>Holidays in 2025</p>
            <div className="p-2 bg-[#EDFAFE] rounded-full">
              <img
                src={chevron_right_arrow}
                alt="chevron_right_arrow"
                className="h-[10px] w-[10px]"
              />
            </div>
          </li>
          <li className="border border-[#C0F0FF] rounded-[12px] p-[15px] flex justify-between items-center">
            <p>Google Maps</p>
            <div className="p-2 bg-[#EDFAFE] rounded-full">
              <img
                src={chevron_right_arrow}
                alt="chevron_right_arrow"
                className="h-[10px] w-[10px]"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactComposite;