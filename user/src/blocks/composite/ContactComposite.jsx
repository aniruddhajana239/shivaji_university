import React from "react";
import chevron_right_arrow from "../../assets/icons/chevron_right_dark.png";

const ContactComposite = ({ content, title }) => {
  if (!content || !content.sections) return null;

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

          {/* Contacts Details Table */}
          {section?.ContactsDetails?.length > 0 && (
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse shadow-[0px_0px_38.43px_0px_#0000000F] rounded-[10px]">
                <thead className="bg-[#EDFAFE] h-[75px] text-[#001F51] text-[18px] font-[600] rounded-lg">
                  <tr>
                    <th className="text-left px-4 py-2 w-[30%]">Office</th>
                    <th className="text-left px-4 py-2">Phone No</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Link</th>
                  </tr>
                </thead>

                <tbody>
                  {section.ContactsDetails.map((detail, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#D8D8D8] hover:bg-[#f5f5f5]"
                    >
                      <td className="px-4 py-3 w-[30%] text-[16px] font-normal">
                        {detail.Office}
                        {/* {detail?.Description && (
                <p className="text-sm text-gray-600 mt-1">{detail.Description}</p>
              )} */}
                      </td>

                      <td className="px-4 py-3">
                        {Array.isArray(detail.PhoneNo)
                          ? detail.PhoneNo.join(", ")
                          : detail.PhoneNo}
                      </td>

                      <td className="px-4 py-3">{detail.Email}</td>

                      <td className="px-4 py-3">
                        <a
                          href={detail.Links}
                          className="text-blue-600 underline whitespace-nowrap"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click here
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      {content?.important_notices?.length > 0 && (
        <div className="w-full flex flex-col gap-4 p-4 rounded-[15px] bg-[#FA8F21]/10">
          {content.important_notices.map((notice, i) => (
            <div key={i} className="flex flex-col gap-1 py-2">
              <h5
                className={`text-[16px] font-semibold ${
                  i === content.important_notices.length - 1
                    ? "text-black "
                    : "text-[#001F51]"
                }`}
              >
                {notice.title}
              </h5>
              <p className="text-[14px] leading-relaxed text-justify text-[#000000] pt-2">
                {notice.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/*  */}
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
