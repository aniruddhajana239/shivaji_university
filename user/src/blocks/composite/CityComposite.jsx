import React, { useEffect } from "react";

const CityComposite = ({ content }) => {

  useEffect(() => {
    console?.log?.("🏙️ CityComposite - Received content:", content);
    if (content) {
      console?.log?.("🏙️ CityComposite - Content data keys:", Object?.keys(content));
    }
  }, [content]);

  // Check if content exists and has data
  if (!content || !content || Object?.keys(content)?.length === 0) return null;

  // Extract data from content prop
  const data = content;
  const dataKeys = Object?.keys(data) || [];

  return (
    <div className="w-full flex flex-col gap-6 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">

      {/* Render all data sections */}
      <div className="w-full flex flex-col gap-6 text-[14px] 2xl:text-[16px] text-justify text-[#000000] font-[400]">
        {dataKeys?.map?.((sectionKey, index) => {
          const sectionItems = data?.[sectionKey] || [];

          return (
            <div key={index} className="space-y-4">
              {/* Section Heading */}
              {/* <p>{sectionKey}</p> */}
              <h3 className="text-[22px] font-[600] text-[#001F51] pt-[20px]">
                {data?.[sectionKey]?.view_details?.view_type !== "background_color" ? sectionKey || "" : ""}
              </h3>

              {sectionItems?.content_details
                ?.map?.((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-4">
                    {/* Item Title (if exists) */}
                    {/* {item?.title?.trim?.() && (
                    <h4 className="text-[20px] font-[600] text-[#077394]">
                      {item?.title || ""}
                    </h4>
                  )} */}

                    {/* Item Description (HTML content) */}
                    {item?.description?.trim?.() && (
                      <div
                        className="text-[15px] text-[#555] leading-relaxed prose prose-p:my-2"
                        dangerouslySetInnerHTML={{ __html: item?.description || "" }}
                      />
                    )}


                  </div>
                ))}

              {/* Grid layout for Prime Attractions */}
              {sectionKey === "Prime Attractions" && sectionItems?.content_details?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {sectionItems?.content_details?.map?.((item, itemIndex) => (


                    <div
                      key={itemIndex}
                      className="w-full flex flex-col item-center  bg-white overflow-hidden rounded-[10px] shadow-sm border border-gray-100  ]"
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full aspect-6/3 object-cover rounded-[10px]" />
                      <div className="h-full flex items-center justify-center ">
                        <p className="text-[12px] 2xl:text-[16px] text-[#000000] font-[500] text-center bg-white py-[10px] px-2 ">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {data?.[sectionKey]?.view_details?.view_type === "background_color" &&
                data?.[sectionKey]?.content_details?.length > 0 && (
                  <div
                    className="w-full gap-4 p-6 rounded-[15px] mt-6"
                    style={{
                      backgroundColor: `${data?.[sectionKey]?.view_details?.color}1A`, // 10% opacity
                    }}
                  >
                    <h3 className="text-[24px] font-[600] text-[#001F51] mb-4">
                      {sectionKey || "Important Notices"}
                    </h3>

                    <div key={index} className="space-y-3 mb-6 last:mb-0">
                      {/* {notice?.title && (
                        <h4 className="text-[20px] font-[600] text-[#001F51]">
                          {notice?.title || ""}
                        </h4>
                      )} */}
                      {data?.[sectionKey]?.content_details && (

                        <ul className={`list-disc ml-6 space-y-2 text-[15px] text-[#555] ${data?.[sectionKey]?.content_details?.length <= 6
                          ? "columns-1"
                          : data?.[sectionKey]?.content_details?.length > 6 && data?.[sectionKey]?.content_details?.length <= 12
                            ? "columns-2"
                            : "columns-3"
                          }`}>
                          {data?.[sectionKey]?.content_details?.map?.((item, i) => (
                            <li key={i} className="mb-1">{item?.title || ""}</li>
                          ))}
                        </ul>

                      )}

                    </div>

                  </div>
                )}
            </div>
          );
        })}

        {/* Important Notices (if available in content) */}

      </div>
    </div>
  );
};

export default CityComposite;