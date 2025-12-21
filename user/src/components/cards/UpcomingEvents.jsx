import { useState, useEffect } from "react";
import ChevronDown from "../../assets/icons/chevron_down.png";
import { HomeApi } from "../../api/home/HomeApi";

export const UpcomingEventsCard = () => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [events, setEvents] = useState({
        sports: { data: [], loading: true, error: null },
        academic: { data: [], loading: true, error: null },
        cultural: { data: [], loading: true, error: null },
        workshop: { data: [], loading: true, error: null },
        testimonials: { data: [], loading: true, error: null }
    });
    const [loading, setLoading] = useState(true);

    // Define categories with their API data and display names
    const categories = [
        {
            id: "sports",
            name: "School/Sports",
            data: events.sports.data,
            loading: events.sports.loading,
            error: events.sports.error
        },
        {
            id: "academic",
            name: "Academic",
            data: events.academic.data,
            loading: events.academic.loading,
            error: events.academic.error
        },
        {
            id: "cultural",
            name: "Cultural",
            data: events.cultural.data,
            loading: events.cultural.loading,
            error: events.cultural.error
        },
        {
            id: "workshop",
            name: "Workshop",
            data: events.workshop.data,
            loading: events.workshop.loading,
            error: events.workshop.error
        },
        {
            id: "testimonials",
            name: "Testimonials",
            data: events.testimonials.data,
            loading: events.testimonials.loading,
            error: events.testimonials.error
        }
    ];

    // Fetch data from all APIs
    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                setLoading(true);
                
                // Create an array of promises for all API calls
                const apiCalls = [
                    { key: 'sports', apiCall: () => HomeApi.getUpcomingSports({}) },
                    { key: 'academic', apiCall: () => HomeApi.getUpcomingAcademic({}) },
                    { key: 'cultural', apiCall: () => HomeApi.getUpcomingCultural({}) },
                    { key: 'workshop', apiCall: () => HomeApi.getUpcomingWorkshop({}) },
                    { key: 'testimonials', apiCall: () => HomeApi.getUpcomingTestimonials({}) }
                ];

                // Execute all API calls in parallel
                const promises = apiCalls.map(async ({ key, apiCall }) => {
                    try {
                        const response = await apiCall();
                        return {
                            key,
                            data: response.data?.data?.content || [],
                            error: null
                        };
                    } catch (error) {
                        console.error(`Error fetching ${key}:`, error);
                        return {
                            key,
                            data: [],
                            error: error.message || `Failed to load ${key} events`
                        };
                    }
                });

                const results = await Promise.all(promises);
                
                // Update state with all results
                setEvents(prev => {
                    const newState = { ...prev };
                    results.forEach(result => {
                        newState[result.key] = {
                            ...newState[result.key],
                            data: result.data,
                            loading: false,
                            error: result.error
                        };
                    });
                    return newState;
                });

            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllEvents();
    }, []);

    const toggleCategory = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    // Helper function to format date from API response
    const formatEventDate = (dateString) => {
        if (!dateString) return "Date TBD";
        
        try {
            // Handle different date formats from API
            if (dateString.includes('/')) {
                // Format: "15/12/2025"
                const [day, month, year] = dateString.split('/');
                const date = new Date(`${year}-${month}-${day}`);
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }).toUpperCase();
            } else if (dateString.includes(',')) {
                // Format: "15 Dec, 2025"
                return dateString.toUpperCase();
            }
            
            // Fallback: try to parse as Date
            const date = new Date(dateString);
            if (!isNaN(date)) {
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }).toUpperCase();
            }
            
            return "Date TBD";
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Date TBD";
        }
    };

    // Calculate loading state for the entire component
    const overallLoading = loading || categories.some(cat => cat.loading);

    return (
        <div className="w-full flex flex-col rounded-[10px] shadow-md relative">
            <div className="w-full p-4 bg-[#EDFAFE] rounded-t-[10px]">
                <span className="text-[#001F51] font-[700] text-[20px]">Upcoming Events</span>
            </div>
            
            <div className="w-full p-4 flex flex-col gap-2 pb-8 h-[290px] overflow-y-auto">
                {overallLoading ? (
                    // Loading skeleton
                    [...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col animate-pulse">
                            <div className="w-full flex items-center justify-between gap-2 p-2 border-b-[2px] border-[#D8D8D8]">
                                <div className="h-5 bg-gray-200 rounded w-32"></div>
                                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    ))
                ) : categories.map((category, index) => {
                    const isExpanded = expandedCategory === category.id;
                    const hasData = category.data && category.data.length > 0;

                    return (
                        <div key={category.id} className="flex flex-col">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className={`cursor-pointer w-full flex items-center justify-between gap-2 p-2 ${
                                    (index !== categories.length - 1 && !isExpanded) && "border-b-[2px] border-[#D8D8D8]"
                                } ${hasData ? '' : 'opacity-60 cursor-not-allowed'}`}
                                disabled={!hasData}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-[#001F51] text-[16px] font-[600]">
                                        {category.name}
                                    </span>
                                    {category.loading && (
                                        <span className="text-xs text-gray-500">(Loading...)</span>
                                    )}
                                    {/* {category.error && (
                                        <span className="text-xs text-red-500">(Error)</span>
                                    )} */}
                                    {/* {!category.loading && !hasData && (
                                        <span className="text-xs text-gray-500">(No events)</span>
                                    )} */}
                                    {/* {hasData && (
                                        <span className="text-xs text-gray-500">
                                            ({category.data.length} events)
                                        </span>
                                    )} */}
                                </div>
                                {hasData && (
                                    <img
                                        src={ChevronDown}
                                        className={`h-[15px] w-[15px] object-contain transition-transform ${
                                            isExpanded ? 'rotate-180' : ''
                                        }`}
                                        alt="toggle"
                                    />
                                )}
                            </button>

                            {/* Category Events - Collapsible Content */}
                            {isExpanded && hasData && (
                                <div className="mt-2 flex flex-col gap-2">
                                    {category.data.map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className="p-3 rounded-lg border-b-2 border-[#2F8AA5] bg-white grid grid-cols-5 hover:bg-blue-50 transition-colors duration-200"
                                        >
                                            <div className="col-span-1 flex flex-col items-start">
                                                {event.date_formate2 ? (
                                                    <>
                                                        <span className="text-[#001F51] text-[16px] font-[600]">
                                                            {formatEventDate(event.date_formate2).split(',')[0]},
                                                        </span>
                                                        <span className="text-[#001F51] text-[14px] font-[600]">
                                                            {formatEventDate(event.date_formate2).split(',')[1]?.trim()}
                                                        </span>
                                                    </>
                                                ) : event.date_formate1 ? (
                                                    <span className="text-[#001F51] text-[14px] font-[600]">
                                                        {formatEventDate(event.date_formate1)}
                                                    </span>
                                                ) : (
                                                    <span className="text-[#001F51] text-[14px] font-[600]">
                                                        Date TBD
                                                    </span>
                                                )}
                                            </div>
                                            <div className="col-span-4">
                                                <span className="text-[#000000] text-[16px] font-[400] text-left">
                                                    {event.title || event.description || "No description available"}
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
            
            <button 
                className="absolute -bottom-5 left-1/2 cursor-pointer w-fit bg-white text-[#000000] text-[14px] font-[400] p-2 gap-3 flex items-center justify-center border-2 border-[#C0F0FF] rounded-full shadow-md transform -translate-x-1/2 hover:bg-blue-50 transition-colors duration-200"
                onClick={() => {
                    // You can implement "Show more" functionality here
                    console.log("Show more clicked");
                }}
            >
                show more
                <div className="h-[25px] w-[25px] rounded-full bg-[#EDFAFE] flex justify-center items-center">
                    <img src={ChevronDown} className="h-3 w-3 object-contain" alt="down arrow" />
                </div>
            </button>
        </div>
    );
};