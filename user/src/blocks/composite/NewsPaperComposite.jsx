import React from "react";

const NewsPaperComposite = ({ content, title }) => {
  if (!content || !content.sections) return null;

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      {/* Title */}
      <h3 className="m-0 text-[#001F51] text-[24px] font-[600]">{title}</h3>

      {/* Sections */}
      <div className="w-full flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
        {content?.sections?.map((section, index) => (
          <div key={index} className="mb-10">
            {/* Section Heading
            {section?.heading && (
              <h3 className="">
                {section.heading}
              </h3>
            )} */}

            {/* Paragraph List */}
            {section?.paragraphs && (
              <div className="space-y-3">
                {section?.paragraphs?.map((text, i) => (
                  <>
                    <p
                      key={i}
                      className="text-[16px] font-[400] leading-relaxed text-black"
                    >
                      {text}
                    </p>
                    {i === 0 &&
                      section?.images &&
                      section?.images?.twoColumns &&
                      Array.isArray(section?.images?.twoColumns) && (
                        <div className="grid grid-cols-1 lg:grid-cols-2  gap-[29px] py-4">
                          {section?.images?.twoColumns.map((image, index) => {
                            return (
                              <img
                                key={index}
                                src={image}
                                alt={index}
                                className="w-full aspect-5/3 rounded-[10px]"
                              />
                            );
                          })}
                        </div>
                      )}
                    {i === 1 &&
                      section?.images &&
                      section?.images?.threeColumns &&
                      Array.isArray(section?.images?.threeColumns) && (
                        <div className="grid grid-cols-1 lg:grid-cols-3  gap-[19px] py-4">
                          {section?.images?.threeColumns.map((image, index) => {
                            return (
                              <img
                                key={index}
                                src={image}
                                alt={index}
                                className="w-full aspect-4/3 rounded-[10px]"
                              />
                            );
                          })}
                        </div>
                      )}
                  </>
                ))}
              </div>
            )}

            {content?.important_notices &&
              Array.isArray(content?.important_notices) &&
              content?.important_notices?.length > 0 && (
                <div className="w-full flex flex-col gap-4 p-3 py-4 rounded-[15px] bg-[#FA8F21]/10 mt-4">
                  <ul className="w-full flex flex-col gap-2">
                    {content?.important_notices?.map((notice, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400] flex flex-col gap-2 itms-start"
                      >
                        {notice?.title && (
                          <span
                            className={`font-[600] text-[#000000] ${
                              idx === 0 && "text-[#001F51]"
                            }`}
                          >
                            {notice?.title}
                          </span>
                        )}
                        {notice?.content && (
                          <span className="text-[12px] text-justify">
                            {notice?.content}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPaperComposite;
