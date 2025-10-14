import ChevronRight from "../../assets/icons/chevron_right_dark.png";
export const FormalComposite = ({ content, title }) => {
  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
      <h3 className="m-0 text-[#001F51] text-[20px] font-[600] 2xl:text-[24px]">
        {title??""}
      </h3>
      <div className="w-full flex flex-col gap-2 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
        {content?.sections &&
        Array.isArray(content?.sections) &&
        content?.sections?.length > 0
          ? content?.sections?.map((section, index) => (
              <div
                key={index}
                className={`w-full flex flex-col gap-2 pb-6 mb-2 border-b-2 border-b-[#D8D8D8] last-of-type:border-0 ${
                  index === content?.sections?.length - 1 && "border-none"
                }`}
              >
                {section?.heading && (
                  <h4 className="m-0 text-[#001F51] text-[18px] font-[600] 2xl:text-[20px]">
                    {section?.heading}
                  </h4>
                )}
                {section?.type === "paragraph" && section?.content && (
                  <p className="m-0">{section?.content}</p>
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
                        className={`font-[600] text-[#000000] ${
                          idx === 0 && "text-[#001F51]"
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