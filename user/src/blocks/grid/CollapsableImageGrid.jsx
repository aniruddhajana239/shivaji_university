import React from "react";
import downarrow_icom from "../../assets/icons/chevron_down.png";

const CollapsableImageGrid = ({ content, title }) => {
    // Convert content object to array for mapping
    const contentEntries = content ? Object.entries(content) : [];

    return (
        <div className="w-full flex flex-col gap-4 bg-white rounded-[20px] p-6 2xl:p-8 shadow-sm">
            {/* Page Title */}
            <h3 className="text-[#001F51] text-[24px] font-[600]">{title??""}</h3>

            {/* Image Sections */}
            {contentEntries?.map(([sectionKey, sectionData], index) => {
                const contentDetails = sectionData?.content_details || [];

                return (
                    <div key={index} className="">
                        {/* Section Heading - use section key as heading */}
                        <div className="w-full  text-[#001F51] font-[600] text-left text-[18px] mb-2">
                            {sectionKey}
                        </div>

                        {/* Image Grid (Always Visible) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white transition-all duration-300">
                            {contentDetails?.map((item, i) => (
                                item?.image && (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center bg-[#F9FAFB] p-2 rounded-lg shadow-sm hover:shadow-md transition"
                                    >
                                        <img
                                            src={item?.image}
                                            alt={item?.title || `Gallery Image ${i + 1}`}
                                            className="rounded-[10px] w-full aspect-4/3 object-cover"
                                        />
                                        {item?.title && (
                                            <p className="mt-2 text-[14px] text-center font-[500] text-black">
                                                {item?.title??""}
                                            </p>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>

                        {/* Show More Button Section */}
                        <div className="relative flex items-center justify-center text-[14px] text-black font-[400] my-6">
                            {/* Left line */}
                            <div className="before:content-[''] before:absolute before:left-4 before:top-1/2 before:-translate-y-1/2 before:w-[40%] before:h-[1px] before:bg-[#D8D8D8]" />

                            {/* Center button */}
                            {/* <div className="flex gap-[12px] justify-center items-center py-[9px] px-[14px] border border-[#C0F0FF] rounded-[38px] bg-white relative z-10">
                                <p>Show More</p>
                                <div className="h-[20px] w-[20px] bg-[#EDFAFE] rounded-full flex justify-center items-center">
                                    <img
                                        src={downarrow_icom}
                                        alt="downarrow_icom"
                                        className="h-[6px] w-[10px] object-cover"
                                    />
                                </div>
                            </div> */}

                            {/* Right line */}
                            <div className="after:content-[''] after:absolute after:right-4 after:top-1/2 after:-translate-y-1/2 after:w-[40%] after:h-[1px] after:bg-[#D8D8D8] " />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CollapsableImageGrid;