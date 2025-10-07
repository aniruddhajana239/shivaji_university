import { useState } from "react";
import ChevronDown from "../../assets/icons/chevron_down.png";
import { UpcomingEvents } from "../../constants/CampusUpdates";

export const NewsUpdatesCard = () => {
    // Get unique categories
    const uniqueCategories = [...new Set(UpcomingEvents.map(event => event.category))];

    // State to track which category is expanded (first one by default)
    const [expandedCategory, setExpandedCategory] = useState();

    // Toggle category expansion
    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    return (
        <div className="w-full flex flex-col rounded-[10px] shadow-md relative">
            <div className="w-full p-4 bg-[#EDFAFE] rounded-t-[10px]">
                <span className="text-[#001F51] font-[700] text-[20px]">Upcoming Events</span>
            </div>
            <div className="w-full p-4 flex flex-col gap-2 pb-8 h-[290px] overflow-y-auto">
                {uniqueCategories?.map((category, index) => {
                    const categoryEvents = UpcomingEvents.filter(event => event.category === category);
                    const isExpanded = expandedCategory === category;

                    return (
                        <div key={category} className="flex flex-col">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category)}
                                className={`cursor-pointer w-full flex items-center justify-between gap-2 p-2 ${index !== uniqueCategories.length - 1 && "border-b-[2px] border-[#D8D8D8]"}`}
                            >
                                <span className="text-[#001F51] text-[16px] font-[600]">{category}</span>
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
                                    {categoryEvents.map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className="p-3 rounded-lg border-b-2 rounded-lg border-[#2F8AA5] bg-white grid grid-cols-5"
                                        >
                                            <div className="col-span-1 flex flex-col items-start">
                                                <span className="text-[#001F51] text-[16px] font-[600]">
                                                    {event?.date?.split(",")[0]},
                                                </span>
                                                <span className="text-[#001F51] text-[14px] font-[600]">
                                                    {event?.date?.split(",")[1]}
                                                </span>
                                            </div>
                                            <div className="col-span-4">
                                                <span className="text-[#000000] text-[16px] font-[400] text-left">
                                                    {event.description}
                                                </span>
                                               
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <button className="absolute -bottom-5 left-1/2 cursor-pointer w-fit bg-white text-[#000000]  text-[14px] font-[400] p-2 gap-3 flex items-center justify-center border border-2 border-[#C0F0FF] rounded-full shadow-md transform -translate-x-1/2">
                show more
                <div className="h-[25px] w-[25px] rounded-full bg-[#EDFAFE] flex justify-center items-center">
                    <img src={ChevronDown} className="h-3 w-3 object-contain" />
                </div>
            </button>
        </div>
    );
};