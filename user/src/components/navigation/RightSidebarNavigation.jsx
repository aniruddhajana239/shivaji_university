export const RightSidebarNavigation = ({ title, listItems }) => {
    return (
        <div className="w-full flex flex-col bg-white shadow-md rounded-[10px]">
            <div className="w-full bg-[#EDFAFE] p-4 mb-4 rounded-t-[10px]">
                <h3 className="text-[18px] font-[600] text-[#001F51]">{title ?? ""}</h3>
            </div>
            {listItems&&Array.isArray(listItems)&&listItems?.length>0?<ul className="w-full flex flex-col gap-3 p-3">
                {
                    listItems?.map((item, index) => (
                        <li key={index} className="cursor-pointer w-full text-left text-[14px] flex-shrink-0 text-[#000000] font-[400] p-2 rounded-[10px] border-b-2 border-b-[#2F8AA5]">
                            {item?.text ?? ""}
                        </li>
                    ))
                }
            </ul>:
            <div className="w-full flex justify-center items-center p-6 pt-2">
                <span className="text-[#000000] text-[14px] font-[400]">No updates available</span>
            </div>
            }
        </div>
    );
}