import { quickLinksList } from "../../constants/QuickLinks";
import BannerImage from "../../assets/images/quickLinks/banner.png";
import ChevronDown from "../../assets/icons/chevron_down.png";
const noticeList = [
    {
        category: "School/Sports",
        date: "SEP 15, 2025",
        description: "Annual sports day competition with various track and field events"
    },
    {
        category: "School/Sports",
        date: "SEP 18, 2025",
        description: "Inter college basketball tournament featuring top university teams"
    },
    {
        category: "School/Sports",
        date: "SEP 22, 2025",
        description: "Swimming championship finals for all college swimming team members"
    },
    {
        category: "Academic",
        date: "SEP 25, 2025",
        description: "Research paper presentation by final year postgraduate research scholars"
    },
    {
        category: "Academic",
        date: "SEP 28, 2025",
        description: "National science symposium with keynote speakers from leading institutions"
    },
    {
        category: "Academic",
        date: "OCT 02, 2025",
        description: "Faculty development program focusing on innovative teaching methodologies"
    },
]
export const QuickLinks = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-[60px] px-8 py-12">
            <div className="w-full aspect-5/3 md:aspect-3/1 lg:aspect-4/1 rounded-[30px] relative overflow-hidden">
                <img src={BannerImage} className="w-full h-full rounded-[30px] object-cover no-repeat position-center" />
                <div className="absolute top-0 left-0 p-6 xl:p-12  w-full h-full bg-linear-to-b from-trasparent to-black flex items-end justify-start">
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
                        {
                            quickLinksList?.map((link, index) => (
                                <div
                                    key={index}
                                    className={`w-full flex items-center justify-between gap-1 p-4 px-6 pr-0 rounded-[20px] ${link?.bacgroundColor}`}
                                >
                                    {/* <div className={`h-[50px] w-[50px] rounded-full flex items-center justify-center ${link?.bacgroundColor}`}>
                                    <img src={link?.icon} className="h-[24px] w-[24px] object-contain" />
                                </div> */}
                                    <div className="flex flex-col gap-3 w-[55%]">
                                        <span className="text-[#001F51] font-[600] text-[16px]">{link?.title}</span>
                                        <p className="text-[#000000] font-[400] text-[14px]">{link?.description}</p>
                                        <a href="#" className="bg-white rounded-full w-fit px-3 py-2 text-[#002147] text-[12px]">{"Know More >"}</a>
                                    </div>
                                    <div className={`h-[80px] w-[80px] flex items-center justify-center `}>
                                        <img src={link?.icon} className="h-auto w-full object-contain" />
                                    </div>
                                </div>
                            ))

                        }

                    </div>
                </div>
                <div className="w-full xl:w-1/3 flex flex-col items-start justify-center gap-4">
                    <div className="w-full flex flex-col rounded-[10px] shadow-md relative pb-[40px]">
                        <div className="w-full p-4 bg-[#EDFAFE] rounded-t-[10px]">
                            <span className="text-[#001F51] font-[700] text-[20px]">Notice Board</span>
                        </div>
                        <div className="w-full p-4 flex flex-col gap-2 pb-8 h-[380px] overflow-y-auto ">
                            {noticeList?.map((event, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg bg-white grid grid-cols-5 ${index !== noticeList.length - 1 ? "border-b-2 border-[#D8D8D8]" : ""}`}
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
                        <button className="absolute -bottom-5 left-1/2 cursor-pointer w-fit bg-white text-[#000000]  text-[14px] font-[400] p-2 gap-3 flex items-center justify-center border border-2 border-[#C0F0FF] rounded-full shadow-md transform -translate-x-1/2">
                            show more
                            <div className="h-[25px] w-[25px] rounded-full bg-[#EDFAFE] flex justify-center items-center">
                                <img src={ChevronDown} className="h-3 w-3 object-contain" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}