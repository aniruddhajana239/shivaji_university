import Email from "../../../assets/icons/email.png";
import Phone from "../../../assets/icons/phone.png";
import DownCircle from "../../../assets/icons/down_circle.png";
import Content from "../../../assets/icons/content.png";
import AudioDoc from "../../../assets/icons/aud_doc.png";
import Globe from "../../../assets/icons/globe.png";

export const UtilityBar = ({ data, loading }) => {
    return (
        <div className="w-full bg-[#077394] text-white px-[14px] lg:px-[48px] py-[8px] flex justify-between text-[14px]">
            {loading ? (
                // Skeleton loading state
                <>
                    {/* Left section skeleton */}
                    <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4 animate-pulse">
                        <div className="flex items-center gap-[5px]">
                            <div className="w-[10px] lg:w-[14px] h-[10px] lg:h-[14px] bg-[#0a8bad] rounded"></div>
                            <div className="w-24 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                        <div className="flex items-center gap-[5px]">
                            <div className="w-[10px] lg:w-[15px] h-[8px] lg:h-[12px] bg-[#0a8bad] rounded"></div>
                            <div className="w-32 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                    </div>
                    
                    {/* Right section skeleton */}
                    <div className="flex items-center animate-pulse">
                        {/* Hidden buttons skeleton */}
                        <div className="hidden lg:flex items-center">
                            <div className="h-[17px] w-[17px] bg-[#0a8bad] rounded-full"></div>
                            <div className="ml-1 w-24 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-[#0a8bad] mx-4"></div>
                        
                        <div className="hidden lg:flex items-center">
                            <div className="h-[15px] w-[15px] bg-[#0a8bad] rounded"></div>
                            <div className="ml-1 w-20 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-[#0a8bad] mx-4"></div>
                        
                        <div className="hidden lg:flex items-center">
                            <div className="h-[15px] w-[15px] bg-[#0a8bad] rounded"></div>
                            <div className="ml-1 w-28 h-3 bg-[#0a8bad] rounded"></div>
                        </div>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-[#0a8bad] mx-4"></div>
                        
                        {/* A+ A- buttons skeleton */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-6 bg-[#0a8bad] rounded-[4px] border-[1px] border-[#0a8bad]"></div>
                            <div className="w-8 h-6 bg-[#0a8bad] rounded-[4px] border-[1px] border-[#0a8bad]"></div>
                        </div>
                        
                        <div className="h-[20px] w-[1px] bg-[#0a8bad] mx-4"></div>
                        
                        {/* Language selector skeleton */}
                        <div className="flex items-center">
                            <div className="h-[17px] w-[17px] bg-[#0a8bad] rounded-full"></div>
                            <div className="ml-1 w-20 h-6 bg-[#0a8bad] rounded"></div>
                        </div>
                    </div>
                </>
            ) : (
                // Actual content
                <>
                    {/* left section */}
                    <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-4">
                        <a href="tel:(0231) 2609000" className="flex items-center gap-[5px]">
                            <img src={Phone} alt="phone" className="w-[10px] lg:w-[14px] h-[10px] lg:h-[14px]" />
                            <span className="text-white font-[200] text-[8px] lg:text-[12px]">{data?.contact_no ?? ""}</span>
                        </a>
                        <a href={`mailto:${data?.email ?? ""}`} className="flex items-center gap-[5px]">
                            <img src={Email} alt="email" className="w-[10px] lg:w-[15px] h-[8px] lg:h-[12px]" />
                            <span className="text-white font-[200] text-[8px] lg:text-[12px]">{data?.email ?? ""}</span>
                        </a>
                    </div>
                    
                    {/* right section */}
                    <div className="flex items-center">
                        <button className="hidden cursor-pointer lg:flex items-center text-[12px]">
                            <img src={DownCircle} className="h-[17px] w-[17px]" />
                            <span className="ml-1 font-[200]">To Navigation</span>
                        </button>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                        
                        <button className="cursor-pointer hidden lg:flex items-center text-[12px]">
                            <img src={Content} className="h-[15px] w-[15px]" />
                            <span className="ml-1 font-[200]">To Content</span>
                        </button>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                        
                        <button className="cursor-pointer hidden lg:flex items-center text-[12px]">
                            <img src={AudioDoc} className="h-[15px] w-[15px]" />
                            <span className="ml-1 font-[200]">Screen Reader</span>
                        </button>
                        <div className="hidden lg:flex h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                        
                        <div className="flex items-center gap-2">
                            <button className="cursor-pointer flex items-center justify-center text-[14px] border-[1px] border-white rounded-[4px] px-[4px] py-[3px]">
                                <span className="text-[8px] lg:text-[10px] font-[600] text-white">A+</span>
                            </button>
                            <button className="cursor-pointer flex items-center justify-center text-[14px] text-white border-[1px] border-white rounded-[4px] px-[4px] py-[3px]">
                                <span className="text-[8px] lg:text-[10px] font-[600] text-white">A-</span>
                            </button>
                        </div>
                        
                        <div className="h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                        
                        <div className="flex items-center">
                            <img src={Globe} className="h-[17px] w-[17px]" />
                            <select className="ml-1 cursor-pointer text-white text-[12px] font-[200] outline-none">
                                <option className="px-2 bg-[#077394] text-white" value="en">English</option>
                                <option className="px-2 bg-[#077394] text-white" value="mr">मराठी</option>
                                <option className="px-2 bg-[#077394] text-white" value="hi">Hindi</option>
                            </select>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};