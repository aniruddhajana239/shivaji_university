import { useState } from "react";
import { LeftSidebarNavigation } from "../components/navigation/LeftSidebarNavigation";
import { RightSidebarNavigation } from "../components/navigation/RightSidebarNavigation";

export const SidebarContentNewsLayout = ({navItems}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeNavItem = navItems[activeIndex] || {};
    const handleClick = (index) => {
        setActiveIndex(index);
    }
    return (
        <div className="w-full bg-white px-6 lg:px-[48px] py-8 flex flex-col lg:flex-row items-start justify-between gap-3 justify-start items-start">
            {/* Sidebar content can be added here in the future */}
            <div className="w-full lg:w-[20%]">
                <LeftSidebarNavigation
                    activeIndex={activeIndex} 
                    handleClick={handleClick} 
                    title="Related Pages"
                    navItems={navItems}
                />
            </div>
            <div className="w-full lg:w-[53%]">
            </div>
            <div className="w-full lg:w-[27%]">
            <RightSidebarNavigation
            title="Updates/News"
            listItems={activeNavItem?.updates || []}
            />
            </div>
        </div>
    );
}   