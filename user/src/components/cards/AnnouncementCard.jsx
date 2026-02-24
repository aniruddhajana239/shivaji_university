import { useEffect, useState } from "react";
import ChevronDown from "../../assets/icons/chevron_down.png";
import { useDispatch, useSelector } from "react-redux";
import { AnnouncementSelector } from "../../redux/selectors/home/Announcement"
import { AnnouncementActions } from "../../redux/reducer/slice/home/announcement"

export const AnnouncementsCard = ({ data }) => {
    const announcementData = useSelector(AnnouncementSelector)
    const dispatch = useDispatch()

    // Toggle category expansion (if categories exist in real data)
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    useEffect(() => {
        if (data && data[0]?.id) {
            dispatch(AnnouncementActions?.getAll({ menu_id: data[0]?.id }))
        }
    }, [data, dispatch])

    const rawData = announcementData?.data || {};
    const isFetching = announcementData?.isFetching;

    // Filter out metadata keys to get actual categories
    const categoryKeys = Object.keys(rawData).filter(key =>
        !['layout', 'menu_title', 'message', 'status'].includes(key) &&
        typeof rawData[key] === 'object' &&
        rawData[key] !== null
    );

    // Only show categories that have content_details
    const categoriesWithData = categoryKeys.filter(key =>
        rawData[key]?.content_details?.length > 0
    );

    return (
        <div className="w-full flex flex-col rounded-[10px] shadow-md relative">
            <div className="w-full p-4 bg-[#EDFAFE] rounded-t-[10px]">
                <span className="text-[#001F51] font-[700] text-[20px]">Announcements</span>
            </div>
            <div className="w-full p-4 flex flex-col gap-2 pb-8 h-[290px] overflow-y-auto">
                {isFetching ? (
                    // Loading skeleton
                    [...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col animate-pulse">
                            <div className="w-full flex items-center justify-between gap-2 p-2 border-b-[2px] border-[#D8D8D8]">
                                <div className="h-5 bg-gray-200 rounded w-32"></div>
                                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    ))
                ) : categoriesWithData.length > 0 ? (
                    categoriesWithData.map((categoryKey, index) => {
                        const categoryData = rawData[categoryKey];
                        const events = categoryData?.content_details || [];
                        const isExpanded = expandedCategory === categoryKey;

                        return (
                            <div key={categoryKey} className="flex flex-col">
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(categoryKey)}
                                    className={`cursor-pointer w-full flex items-center justify-between gap-2 p-2 ${index !== categoriesWithData.length - 1 && "border-b-[2px] border-[#D8D8D8]"}`}
                                >
                                    <span className="text-[#001F51] text-[16px] font-[600]">{categoryKey}</span>
                                    <img
                                        src={ChevronDown}
                                        className={`h-[15px] w-[15px] object-contain transition-transform ${isExpanded ? 'rotate-180' : ''
                                            }`}
                                        alt="toggle"
                                    />
                                </button>

                                {/* Category Events - Collapsible Content */}
                                {isExpanded && (
                                    <div className="mt-2 flex flex-col gap-2">
                                        {events.map((event, eventIndex) => (
                                            <div
                                                key={eventIndex}
                                                className="p-3 rounded-lg border-b-2 rounded-lg border-[#2F8AA5] bg-white grid grid-cols-5 hover:bg-blue-50 transition-colors duration-200"
                                            >
                                                <div className="col-span-1 flex flex-col items-start">
                                                    <span className="text-[#001F51] text-[16px] font-[600]">
                                                        {event?.date_formate2?.split(",")[0] || ""},
                                                    </span>
                                                    <span className="text-[#001F51] text-[14px] font-[600]">
                                                        {event?.date_formate2?.split(",")[1] || ""}
                                                    </span>
                                                </div>
                                                <div className="col-span-4">
                                                    <span className="text-[#000000] text-[16px] font-[400] text-left">
                                                        {event?.title || event?.description}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-10">
                        <div className="text-center">
                            <div className="text-gray-400 text-4xl mb-4">
                                📢
                            </div>
                            <h3 className="text-[18px] font-[600] text-gray-500 mb-2">
                                No Announcements
                            </h3>
                            <p className="text-[14px] text-gray-400 max-w-xs">
                                There are no announcements at the moment.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
