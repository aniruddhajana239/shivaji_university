import ChevronRight from "../../assets/icons/chevron_right_dark.png";
export const LeftSidebarNavigation = ({ activeId, handleClick, title, navItems }) => {
    return (
        <div className="w-full flex flex flex-col gap-3 p-4 rounded-[20px] bg-[#EEFBFF]">
            <h3 className="m-0 p-0 text-[#001F51] text-[18px] font-[600]">{title ?? ""}</h3>
            <ul className="w-full flex flex-col">
                {navItems?.map((item) => (
                    <li key={item?.id} onClick={() => handleClick(item?.id)} className={`cursor-pointer w-full text-left flex-shrink-0 text-[#000000] text-[14px] font-[400] py-1 rounded-[10px] ${activeId === item?.id && 'font-[600] flex items-center gap-1'}`}>
                        {item?.id===activeId && <div className="w-5 h-5 rounded-full bg-[#C0F0FF] flex justify-center items-center">
                                <img src={ChevronRight} alt="chevron right" className="h-2.5 w-2.5 object-contain" />
                            </div>}
                        {item?.itemText ?? ""}
                    </li>
                ))

                }
            </ul>
        </div>
    )
}