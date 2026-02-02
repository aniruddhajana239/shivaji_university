import { useState, useEffect } from "react";
import BannerImage from "../../assets/images/quickLinks/banner.png";
import ChevronDown from "../../assets/icons/chevron_down.png";
import { useDispatch, useSelector } from "react-redux";
import { QuickLinksActions } from "../../redux/reducer/slice/home/quickLinks";
import { QuickLinksSelector } from "../../redux/selectors/home/QuickLinks";
import { NoticeBoardActions } from "../../redux/reducer/slice/home/NoticeBoard";
import { NoticeBoardSelector } from "../../redux/selectors/home/NoticeBoard";

export const QuickLinks = () => {
    const dispatch = useDispatch();
    const LinkList = useSelector(QuickLinksSelector);
    const NoticeList = useSelector(NoticeBoardSelector);
    
    const [quickLinksData, setQuickLinksData] = useState([]);
    const [noticeBoardData, setNoticeBoardData] = useState([]);

    useEffect(() => {
        dispatch(QuickLinksActions?.getAll());
        dispatch(NoticeBoardActions?.getAll());
    }, [dispatch]);

    useEffect(() => {
        console.log("Quick Links Data:", LinkList);
        
        if (LinkList?.data && !LinkList.isFetching) {
            const dynamicLinks = [];
            
            // Get all keys from the data object except metadata keys
            const allKeys = Object.keys(LinkList.data);
            
            // Define keys to exclude (metadata keys that don't contain content)
            const excludeKeys = [
                "layout", 
                "menu_title", 
                "message", 
                "status",
                "isFetching"
            ];
            
            // Process all keys that are not excluded
            allKeys.forEach((key) => {
                if (!excludeKeys.includes(key)) {
                    const categoryData = LinkList.data[key];
                    
                    // Check if this key contains content_details
                    if (categoryData?.content_details?.[0]) {
                        dynamicLinks.push({
                            title: key,
                            description: categoryData.content_details[0]?.description || "Click for more details",
                            image: categoryData.content_details[0]?.image || "",
                            backgroundColor: categoryData.view_details?.color || "#ffffff",
                            link: categoryData.content_details[0]?.link || "#",
                            redirect_to: categoryData.content_details[0]?.redirect_to || ""
                        });
                    }
                }
            });

            setQuickLinksData(dynamicLinks);
        }
    }, [LinkList]);

    useEffect(() => {
        console.log("Notice Board Data:", NoticeList);
        
        if (NoticeList?.data && !NoticeList.isFetching) {
            // Look for "Notice Board" key in the data
            const noticeBoardKey = "Notice Board";
            const noticeBoardContent = NoticeList.data?.[noticeBoardKey]?.content_details;
            
            if (noticeBoardContent && Array.isArray(noticeBoardContent)) {
                const formattedNotices = noticeBoardContent.map((notice) => {
                    // Format date from "22 Oct, 2025" to "SEP 15, 2025" format
                    let formattedDate = notice?.date_formate2 || notice?.date_formate1 || "";
                    
                    // Convert "22 Oct, 2025" to "OCT 22, 2025" format
                    if (formattedDate) {
                        const dateParts = formattedDate.split(' ');
                        if (dateParts.length >= 2) {
                            const day = dateParts[0]?.replace(',', '') || '';
                            const month = dateParts[1]?.toUpperCase() || '';
                            const year = dateParts[2] || '';
                            formattedDate = `${month} ${day}, ${year}`;
                        }
                    }
                    
                    return {
                        category: "Academic", // You can update this if category is available in your data
                        date: formattedDate || "JAN 01, 2025",
                        description: notice?.title || notice?.description || "No description available",
                        rawDescription: notice?.description || "" // Keep original for potential use
                    };
                });
                
                setNoticeBoardData(formattedNotices);
            } else {
                // Fallback: check for any key containing notice data
                const allKeys = Object.keys(NoticeList.data || {});
                const noticeKey = allKeys.find(key => 
                    key.toLowerCase().includes('notice') || 
                    NoticeList.data?.[key]?.content_details?.[0]?.title
                );
                
                if (noticeKey) {
                    const noticeContent = NoticeList.data?.[noticeKey]?.content_details;
                    if (noticeContent && Array.isArray(noticeContent)) {
                        const formattedNotices = noticeContent.map((notice) => {
                            let formattedDate = notice?.date_formate2 || notice?.date_formate1 || "";
                            
                            if (formattedDate) {
                                const dateParts = formattedDate.split(' ');
                                if (dateParts.length >= 2) {
                                    const day = dateParts[0]?.replace(',', '') || '';
                                    const month = dateParts[1]?.toUpperCase() || '';
                                    const year = dateParts[2] || '';
                                    formattedDate = `${month} ${day}, ${year}`;
                                }
                            }
                            
                            return {
                                category: noticeKey,
                                date: formattedDate || "JAN 01, 2025",
                                description: notice?.title || notice?.description || "No description available",
                                rawDescription: notice?.description || ""
                            };
                        });
                        
                        setNoticeBoardData(formattedNotices);
                    } else {
                        // No notice data found, set empty array
                        setNoticeBoardData([]);
                    }
                } else {
                    // No notice key found, set empty array
                    setNoticeBoardData([]);
                }
            }
        } else {
            // If data fetching is done and no data, set empty array
            if (!NoticeList?.isFetching) {
                setNoticeBoardData([]);
            }
        }
    }, [NoticeList]);

    // If data is loading
    if (LinkList?.isFetching || NoticeList?.isFetching) {
        return null;
    }

    // If no quick links data, return null (as per your original logic)
    if (!quickLinksData.length) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center gap-[60px] px-8 py-12">
            <div className="w-full aspect-5/3 md:aspect-3/1 lg:aspect-4/1 rounded-[30px] relative overflow-hidden">
                <img src={BannerImage} className="w-full h-full rounded-[30px] object-cover no-repeat position-center" alt="Banner" />
                <div className="absolute top-0 left-0 p-6 xl:p-12 w-full h-full bg-linear-to-b from-transparent to-black flex items-end justify-start">
                    <div className="flex flex-col items-start justify-center gap-4 w-full md:w-3/4 xl:w-1/3">
                        <h2 className="text-white text-[18px] md:text-[32px] 2xl:text-[48px] font-[700] text-left">Empower Your Journey, Shape Your Future</h2>
                        <p className="text-white text-[14px] xl:text-[18px]">Your Student Journey Starts Here</p>
                        <div className="w-full flex items-center justify-start gap-4">
                            <button className="cursor-pointer p-3 md:px-6 py-2 text-[12px] xl:text-[16px] bg-[#FFFFFF] text-[#093D81] rounded-full flex items-center justify-center">
                                Create An Account
                            </button>
                            <button className="cursor-pointer p-3 md:px-6 py-2 text-[12px] xl:text-[16px] bg-[#093D81] text-[#FFFFFF] rounded-full flex items-center justify-center">
                                Create An Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8">
                <div className="w-full xl:w-2/3 flex flex-col items-start justify-center gap-4">
                    <h3 className="text-[#001F51] font-[600] text-[14px] xl:text-[20px]">Quick Links</h3>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                        {quickLinksData?.map((link, index) => (
                            <div
                                key={index}
                                className={`w-full flex items-center justify-between gap-1 p-4 px-6 pr-0 rounded-[20px]`}
                                style={{ backgroundColor: link?.backgroundColor }}
                            >
                                <div className="flex flex-col gap-3 w-[55%]">
                                    <span className="text-[#001F51] font-[600] text-[16px]">{link?.title}</span>
                                    {/* Show truncated description or placeholder */}
                                    <div className="text-[#000000] font-[400] text-[14px] line-clamp-2">
                                        {link?.description ? (
                                            <div 
                                                dangerouslySetInnerHTML={{ 
                                                    __html: link.description.length > 100 
                                                        ? link.description.substring(0, 100) + "..." 
                                                        : link.description 
                                                }} 
                                            />
                                        ) : (
                                            "Click for more details"
                                        )}
                                    </div>
                                    <a 
                                        href={link?.link || "#"} 
                                        target={link?.redirect_to === "open_in_another_link" ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="bg-white rounded-full w-fit px-3 py-2 text-[#002147] text-[12px] hover:bg-gray-100 transition-colors"
                                    >
                                        {"Know More >"}
                                    </a>
                                </div>
                                <div className="h-[80px] w-[80px] flex items-center justify-center">
                                    {link?.image ? (
                                        <img 
                                            src={link.image} 
                                            className="h-auto w-full object-contain" 
                                            alt={link.title}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                    <div class="h-[80px] w-[80px] flex items-center justify-center bg-white/50 rounded-lg">
                                                        <span class="text-[#001F51] text-xs font-semibold">${link.title.substring(0, 2)}</span>
                                                    </div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div className="h-[80px] w-[80px] flex items-center justify-center bg-white/50 rounded-lg">
                                            <span className="text-[#001F51] text-xs font-semibold">{link.title.substring(0, 2)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full xl:w-1/3 flex flex-col items-start justify-center gap-4">
                    <div className="w-full flex flex-col rounded-[10px] shadow-md relative pb-[40px]">
                        <div className="w-full p-4 bg-[#EDFAFE] rounded-t-[10px]">
                            <span className="text-[#001F51] font-[700] text-[20px]">Notice Board</span>
                        </div>
                        <div className="w-full p-4 flex flex-col gap-2 pb-8 h-[380px] overflow-y-auto">
                            {noticeBoardData?.length > 0 ? (
                                noticeBoardData?.map((event, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg bg-white grid grid-cols-5 ${index !== noticeBoardData.length - 1 ? "border-b-2 border-[#D8D8D8]" : ""}`}
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
                                                {event?.description}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Empty state when no notice board data
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center py-8">
                                        <div className="text-gray-400 text-[16px] font-[400]">
                                            No notices available
                                        </div>
                                        <div className="text-gray-300 text-[14px] font-[400] mt-2">
                                            Check back later for updates
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <button className="absolute -bottom-5 left-1/2 cursor-pointer w-fit bg-white text-[#000000] text-[14px] font-[400] p-2 gap-3 flex items-center justify-center border-2 border-[#C0F0FF] rounded-full shadow-md transform -translate-x-1/2 hover:bg-blue-50 transition-colors">
                            show more
                            <div className="h-[25px] w-[25px] rounded-full bg-[#EDFAFE] flex justify-center items-center">
                                <img src={ChevronDown} className="h-3 w-3 object-contain" alt="down arrow" />
                            </div>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};