import { useState } from "react";
import ChevronRight from "../../assets/icons/chevron_right.png";

export const BoardMembers = ({ loading = false, data = [] }) => {
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    /* =======================
       Skeleton Loader
    ======================== */
    if (loading) {
        return (
            <div className="w-full bg-white px-6 lg:px-[48px] py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full rounded-[10px] bg-[#EEFBFF] p-6">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="flex gap-4 bg-white rounded-[5px] p-3 animate-pulse"
                        >
                            <div className="h-[130px] w-[100px] bg-gray-300 rounded-[7px] border-[2.5px] border-[#C0F0FF]" />
                            <div className="flex flex-col justify-between py-2 w-full">
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                                <div className="h-8 bg-gray-300 rounded-[5px] w-32 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    /* =======================
       No Data → Render Nothing
    ======================== */
    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    const displayMembers = data.slice(0, 4);

    return (
        <div className="w-full bg-white px-6 lg:px-[48px] py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full rounded-[10px] bg-[#EEFBFF] p-6">
                {displayMembers.map((member, index) => (
                    <div
                        key={index}
                        className="flex gap-4 bg-white rounded-[5px] p-3 hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Image Section */}
                        <div className="relative h-[130px] w-[100px] flex-shrink-0">
                            {/* Placeholder */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br from-[#C0F0FF] to-[#A0E0FF] rounded-[7px] border-[2.5px] border-[#C0F0FF] transition-opacity duration-300 ${
                                    loadedImages[index] ? "opacity-0" : "opacity-100"
                                }`}
                            />

                            <img
                                src={member?.image}
                                alt={member?.title || `Board Member ${index + 1}`}
                                loading="lazy"
                                onLoad={() => handleImageLoad(index)}
                                className={`h-full w-full object-cover rounded-[7px] border-[2.5px] border-[#C0F0FF] transition-opacity duration-300 ${
                                    loadedImages[index] ? "opacity-100" : "opacity-0"
                                }`}
                                width={100}
                                height={130}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-between py-2 h-full flex-1">
    <div className="flex flex-col gap-1 items-start">
        <span className="text-[15px] font-[600] text-[#333333] line-clamp-2">
            {member?.title}
        </span>

        {member?.description && (
            <div
                className="text-[13px] font-[400] text-[#6B7280] italic line-clamp-2"
                dangerouslySetInnerHTML={{ __html: member.description }}
            />
        )}
    </div>

    {member?.redirect_to === "open_in_another_link" && (
        <button className="mt-2 flex items-center gap-2 text-[14px] text-white bg-[#001F51] px-3 py-2 rounded-[5px] hover:bg-[#003080] transition-colors w-fit">
            More Details
            <img
                src={ChevronRight}
                alt="arrow"
                className="h-[12px] w-[8px]"
                loading="lazy"
            />
        </button>
    )}
</div>

                    </div>
                ))}
            </div>
        </div>
    );
};
