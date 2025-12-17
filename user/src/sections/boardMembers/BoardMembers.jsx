import ChevronRight from "../../assets/icons/chevron_right.png";
import { useDispatch, useSelector } from "react-redux";
import { facultiesActions } from "../../redux/reducer/slice/home/facultiesSlice";
import { useEffect, useState } from "react";
import { facultySelector } from "../../redux/selectors/home/Faculty";

export const BoardMembers = () => {
    const facultyData = useSelector(facultySelector);
    const dispatch = useDispatch();
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        if (!facultyData?.data?.content || facultyData.data.content.length === 0) {
            dispatch(facultiesActions.getFaculties());
        }
    }, [dispatch, facultyData?.data?.content]);

    // If no faculty data, show loading
    if (facultyData?.isFetching) {
        return (
            <div className="w-full bg-white px-6 lg:px-[48px] py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full p-4 rounded-[10px] bg-[#EEFBFF] p-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex gap-4 justify-start items-start bg-white rounded-[5px] p-3 animate-pulse">
                            <div className="h-[130px] w-[100px] bg-gray-300 rounded-[7px] border-[2.5px] border-[#C0F0FF]"></div>
                            <div className="flex flex-col items-start justify-between gap-1 py-2 h-full w-full">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                                <div className="h-8 bg-gray-300 rounded-[5px] w-32 mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!facultyData?.data?.content || facultyData.data.content.length === 0) {
        return null;
    }

    const displayMembers = facultyData.data.content.slice(0, 4);

    const handleImageLoad = (index) => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
    };

    return (
        <div className="w-full bg-white px-6 lg:px-[48px] py-8 flex flex-col gap-6 justify-start items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 w-full p-4 rounded-[10px] bg-[#EEFBFF] p-6">
                {displayMembers.map((member, index) => (
                    <div key={index} className="flex gap-4 justify-start items-start bg-white rounded-[5px] p-3 hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-[130px] w-[100px] flex-shrink-0">
                            {/* Low quality placeholder */}
                            <div 
                                className={`absolute inset-0 bg-gradient-to-br from-[#C0F0FF] to-[#A0E0FF] rounded-[7px] border-[2.5px] border-[#C0F0FF] transition-opacity duration-300 ${
                                    loadedImages[index] ? 'opacity-0' : 'opacity-100'
                                }`}
                            />
                            
                            {/* Main image with lazy loading */}
                            <img
                                src={member?.image}
                                alt={member?.title || `Board Member ${index + 1}`}
                                loading="lazy"
                                onLoad={() => handleImageLoad(index)}
                                className={`h-full w-full object-cover rounded-[7px] border-[2.5px] border-[#C0F0FF] transition-opacity duration-300 ${
                                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                                }`}
                                width="100"
                                height="130"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-between gap-1 py-2 h-full">
                            <div className="flex flex-col gap-1">
                                <span className="text-[15px] font-[600] text-[#333333] line-clamp-2">
                                    {member?.title}
                                </span>
                                <span className="text-[13px] font-[400] text-[#6B7280] italic line-clamp-2">
                                    {member?.designation}
                                </span>
                            </div>
                            {member?.redirect_to === 'open_details_page' && (
                                <button className="cursor-pointer text-[14px] font-[400] text-white bg-[#001F51] px-3 py-2 rounded-[5px] mt-2 flex items-center gap-2 hover:bg-[#003080] transition-colors duration-200">
                                    More Details
                                    <img 
                                        src={ChevronRight} 
                                        alt="arrow" 
                                        className="h-[12px] w-[12px] object-contain"
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