import Email from "../../../assets/icons/email.png";
import Phone from "../../../assets/icons/phone.png";
import DownCircle from "../../../assets/icons/down_circle.png";
import Content from "../../../assets/icons/content.png";
import AudioDoc from "../../../assets/icons/aud_doc.png";
import Globe from "../../../assets/icons/globe.png";
export const UtilityBar = () => {
    return (
        <div className="w-full bg-[#077394] text-white px-[48px] py-[8px] flex justify-between text-[14px]">
            {/* left section */}
            <div className="flex gap-4">
                <a href="tel:(0231) 2609000" className="flex items-center gap-[5px]">
                    <img src={Phone} alt="phone" className="w-[14px] h-[14px]" />
                    <span className="text-white font-[200] text-[12px]">(0231) 2609000</span>
                </a>
                <a href="mailto:contact@shivajiuniversity.com" className="flex items-center gap-[5px]">
                    <img src={Email} alt="email" className="w-[15px] h-[12px]" />
                    <span className="text-white font-[200] text-[12px]">contact@shivajiuniversity.com</span>
                </a>
            </div>
            {/* right section */}
            <div className="flex items-center">
                <button className="cursor-pointer flex items-center text-[12px] ">
                    <img src={DownCircle} className="h-[17px] w-[17px]" />
                    <span className="ml-1 font-[200]">To Navigation</span>
                </button>
                <div className="h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                <button className="cursor-pointer flex items-center text-[12px] ">
                    <img src={Content} className="h-[15px] w-[15px]" />
                    <span className="ml-1 font-[200]">To Content</span>
                </button>
                <div className="h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                <button className="cursor-pointer flex items-center text-[12px] ">
                    <img src={AudioDoc} className="h-[15px] w-[15px]" />
                    <span className="ml-1 font-[200]">Screen Reader</span>
                </button>
                <div className="h-[20px] w-[1px] bg-white opacity-18 mx-4"></div>
                <div className="flex items-center gap-2">
                    <button className="cursor-pointer flex items-center justfify-center text-[14px]  border-[1px] border-white rounded-[4px] px-[4px] py-[3px]">
                        <span className="text-[10px] font-semibold text-white">A+</span>
                    </button>
                    <button className="cursor-pointer flex items-center justfify-center text-[14px] text-white border-[1px] border-white rounded-[4px] px-[4px] py-[3px]">
                        <span className="text-[10px] font-semibold text-white">A-</span>
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
        </div>
    );
}