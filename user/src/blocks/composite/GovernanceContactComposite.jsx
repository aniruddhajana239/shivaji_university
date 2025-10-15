import React from "react";

const GovernanceContactComposite = ({ content, title }) => {
  if (!content || !content.sections) return null;

  return (
    <div className="w-full flex flex-col gap-8 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Page Title */}
      <h3 className="text-[#001F51] text-[24px] font-[600] ">{title}</h3>

      {/* Sections */}
      {content?.sections?.map((section, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 "
        >
          {/* Heading */}
          <h4 className="text-[#001F51] text-[18px] font-[600]">
            {section?.heading}
          </h4>

          {/* Address */}
          {section?.addressContact && (
            <div className="flex flex-col gap-1 text-[14px] text-black">
              {section?.addressContact?.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}

          {/* Email & Telephone */}
          {section?.emailTalephone && (
            <div className="flex flex-col gap-3 md:flex-row my-5 2xl:pr-[150px]">
              {section.emailTalephone.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 flex-1 min-w-0 "
                >
                  <div className="flex-shrink-0 bg-[#2F8AA5] p-3 rounded-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt="icon"
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                  <p className="text-[14px] text-black   flex-1">
                    {item.contact}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GovernanceContactComposite;
