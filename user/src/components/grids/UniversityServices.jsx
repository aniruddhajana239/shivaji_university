import { Link } from "react-router-dom";
import { UniversityServicesLinks } from "../../constants/UniversityServices";
import ChevronRightDark from "../../assets/icons/chevron_right_dark.png";

export const UniversityServicesGrid = ({ services }) => {
    console.log("serviecs in grid::", services)
    return (
        <>
            {services?.map((item, index) => {
                return (
                    item?.external_link !== "" ?
                        <Link
                            to={item?.link}
                            key={index}
                            className="w-full grid cursor-pointer grid-cols-8 gap-2 items-center border-2 border-[#C0F0FF] bg-white p-4 py-2 rounded-[8px] duration-300 ease-in-out h-full"
                        >
                            <span className="text-[#000000] text-[14px] font-[400] col-span-7">{item?.name ?? ""}</span>
                            <div className="col-span-1 h-[24px] w-[24px] bg-[#EDFAFE] rounded-fill flex justify-center items-center rounded-full">
                                <img src={ChevronRightDark} className="h-[10px] w-[10px] object-contain col-span-1" />
                            </div>
                        </Link> :
                        <div
                            key={index}
                            className="w-full grid grid-cols-8 gap-2 items-center border-2 border-[#C0F0FF] bg-white p-4 py-2 rounded-[8px] duration-300 ease-in-out h-full"
                        >
                            <span className="text-[#000000] text-[14px] font-[400] col-span-7">{item?.name ?? ""}</span>
                            <div className="col-span-1 h-[24px] w-[24px] bg-[#EDFAFE] rounded-fill flex justify-center items-center rounded-full">
                                <img src={ChevronRightDark} className="h-[10px] w-[10px] object-contain col-span-1" />
                            </div>
                        </div>

                )


            })}
        </>
    );
}