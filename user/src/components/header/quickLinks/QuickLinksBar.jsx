import ChevronDown from "../../../assets/icons/chevron_down_small.png";
import {Link, useLocation } from "react-router-dom";
import { navItems } from "../../../constants/NavItems";
export const QuickLinksBar = () => {
    const location = useLocation();
    
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.includes(path);
    };

    return (
        <div className="w-full bg-[#001F51] px-6 lg:px-[48px]">
            <div className="w-full flex items-center justify-center">
                {navItems?.map((item, index) => (
                    <Link 
                        to={item?.path} 
                        key={index} 
                        className={`cursor-pointer flex items-center gap-3 text-[12px] lg:text-[12px] font-[500] px-2 py-4 text-white ${
                            isActive(item?.path) ? 'bg-[#07739445]' : 'bg-transparent'
                        }`}
                    >
                        {item?.title??""}   
                        <img src={ChevronDown} alt="chevron down" className="h-[10px] w-[10px] object-contain" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

