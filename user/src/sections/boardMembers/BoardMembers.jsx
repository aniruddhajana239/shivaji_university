import { useState, useRef, useEffect } from "react";
import ChevronRight from "../../assets/icons/chevron_right.png";

export const BoardMembers = ({ loading = false, data = [] }) => {
    const [loadedImages, setLoadedImages] = useState({});
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    const handleOpenModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 300); // Delay clearing to allow fade out
    };

    // Close modal on ESC key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") handleCloseModal();
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleCloseModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

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

    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }

    const displayMembers = data.slice(0, 4);

    return (
        <>
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
                                    className={`absolute inset-0 bg-gradient-to-br from-[#C0F0FF] to-[#A0E0FF] rounded-[7px] border-[2.5px] border-[#C0F0FF] transition-opacity duration-300 ${loadedImages[index] ? "opacity-0" : "opacity-100"
                                        }`}
                                />

                                <img
                                    src={member?.image}
                                    alt={member?.title || `Board Member ${index + 1}`}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(index)}
                                    className={`h-full w-full object-cover rounded-[7px] border-[2.5px] border-[#C0F0FF] transition-opacity duration-300 ${loadedImages[index] ? "opacity-100" : "opacity-0"
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
                                    <button 
                                        onClick={() => handleOpenModal(member)}
                                        className="cursor-pointer mt-2 flex items-center gap-2 w-fit text-[14px] text-white bg-[#001F51] px-3 py-2 rounded-[5px] hover:bg-[#003080] transition-colors"
                                    >
                                        More Details
                                        <img
                                            src={ChevronRight}
                                            alt="arrow"
                                            className="h-[10px] w-[8px]"
                                            loading="lazy"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-[15px] max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100"
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 bg-white rounded-t-[15px]">
                            <h2 className="text-[20px] font-[600] text-[#333333]">
                                Board Member Details
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700 text-[24px] leading-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Image Section */}
                                <div className="md:w-1/3 flex-shrink-0">
                                    <div className="relative rounded-[10px] overflow-hidden border-[3px] border-[#C0F0FF] bg-gradient-to-br from-[#C0F0FF] to-[#A0E0FF]">
                                        <img
                                            src={selectedMember?.image}
                                            alt={selectedMember?.title}
                                            className="w-full h-auto object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="md:w-2/3">
                                    <h3 className="text-[24px] font-[600] text-[#333333] mb-4">
                                        {selectedMember?.title}
                                    </h3>
                                    
                                    {selectedMember?.description && (
                                        <div className="prose max-w-none">
                                            <div 
                                                className="text-[16px] text-[#4B5563] leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: selectedMember.description }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional content can be added here */}
                            {selectedMember?.additional_info && (
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h4 className="text-[18px] font-[600] text-[#333333] mb-3">
                                        Additional Information
                                    </h4>
                                    <div 
                                        className="text-[15px] text-[#4B5563]"
                                        dangerouslySetInnerHTML={{ __html: selectedMember.additional_info }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 p-6 border-t border-gray-200 bg-white rounded-b-[15px]">
                            <div className="flex justify-end">
                                <button
                                    onClick={handleCloseModal}
                                    className="cursor-pointer px-6 py-2 text-[14px] font-[500] text-white bg-[#001F51] rounded-[5px] hover:bg-[#003080] transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};