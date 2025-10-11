import React from "react";

const KolhapurCityComposite = ({ content, title }) => {
  if (!content || !content.sections) return null;

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Page Title */}
      <h3 className="m-0 text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/*  all sections */}
      <div className="w-full flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
        {content?.sections?.map((section, index) => (
          <div key={index} className="space-y-4">
            {/* Section Heading */}
            {section.heading && (
              <h3 className="text-[22px] font-[600] text-[#001F51] pt-[20px]">
                {section.heading}
              </h3>
            )}

            {/* Type: Paragraph */}
            {section?.type === "paragraph" && section?.content && (
              <p>{section?.content}</p>
            )}

            {/* Type: List */}
            {section?.type === "list" && section?.contentList && (
              <div className=" space-y-6">
                {section?.contentList?.map((item, i) => {
                  const [key, value] = Object.entries(item)[0];
                  return (
                    <div key={i} className="">
                      <h4 className="text-[18px] font-[600] text-[#077394] mb-1">
                        {key}
                      </h4>

                      {/* If value is a string */}
                      {typeof value === "string" && (
                        <p className="text-[15px] text-[#555] leading-relaxed">
                          {value}
                        </p>
                      )}

                      {/* If value is an array */}
                      {Array.isArray(value) && (
                        <ul className="list-disc ml-6 space-y-2 text-[15px] text-[#555]">
                          {value.map((li, liIndex) => (
                            <li key={liIndex}>{li}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Type: Image List */}
            {section?.type === "Images-list" && section?.images && (
              <div className="grid grid-cols-3  gap-[26px] mt-6">
                {section.images.map((item, i) => (
                  <div
                    key={i}
                    className="w-full h-[200px] flex flex-col item-center  bg-white overflow-hidden rounded-[10px] shadow-sm border border-gray-100  ]"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-6/3  rounded-[10px]"
                    />

                    {/* Title */}

                    <p className="text-[16px] text-[#000000] font-[500] text-center flex items-center justify-center h-[70px]">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Important Notices (if available) */}
        {content?.important_notices && content?.important_notices?.length > 0 && (
          <div className="w-full grid-col-3 gap-4 p-3 py-4 rounded-[15px] bg-[#FA8F21]/10 mt-4">
            {content.important_notices?.map((notice, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-[20px] font-[600] text-[#001F51]">
                  {notice.title}
                </h4>
                <ul className="list-disc ml-6 space-y-1 text-[15px] text-[#555]">
                  {notice.listItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KolhapurCityComposite;
