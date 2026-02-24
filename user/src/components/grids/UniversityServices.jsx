import { useNavigate } from "react-router-dom";
import ChevronRightDark from "../../assets/icons/chevron_right_dark.png";

export const UniversityServicesGrid = ({ services }) => {
    const navigate = useNavigate();

    // Generate URL path from name — same logic as QuickLinksBar / header courses
    const getPathFromName = (name) => {
        if (!name) return '/';
        return `/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
    };

    const handleItemClick = (item) => {
        if (item?.extend_to === true) {
            const path = getPathFromName(item?.name);
            navigate(`${path}?menu_id=${item?.id}`);
        } else if (item?.external_link && item.external_link !== "") {
            window.open(item.external_link, '_blank', 'noopener,noreferrer');
        } else if (item?.file && item.file !== "") {
            window.open(item.file, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <>
            {services?.map((item, index) => (
                <div
                    key={item?.id ?? index}
                    onClick={() => handleItemClick(item)}
                    className="w-full grid cursor-pointer grid-cols-8 gap-2 items-center border-2 border-[#C0F0FF] bg-white p-4 py-2 rounded-[8px] duration-300 ease-in-out h-full hover:bg-[#EDFAFE] transition-colors"
                >
                    <span className="text-[#000000] text-[14px] font-[400] col-span-7">{item?.name ?? ""}</span>
                    <div className="col-span-1 h-[24px] w-[24px] bg-[#EDFAFE] rounded-fill flex justify-center items-center rounded-full">
                        <img src={ChevronRightDark} className="h-[10px] w-[10px] object-contain col-span-1" alt="arrow" />
                    </div>
                </div>
            ))}
        </>
    );
}