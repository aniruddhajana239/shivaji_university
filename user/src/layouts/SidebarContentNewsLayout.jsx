import { useState } from "react";
import { LeftSidebarNavigation } from "../components/navigation/LeftSidebarNavigation";
import { RightSidebarNavigation } from "../components/navigation/RightSidebarNavigation";
import { PersonalFigure } from "../blocks/single/PersonalFigure";
import { ImageGrid } from "../blocks/grid/ImageGrid";
import { FormalComposite } from "../blocks/composite/FormalComposite";
import { SimpleBreadCrumb } from "../components/breadcrumb/SimpleBreadcrumb";

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
            <div className="w-full lg:w-[55%] flex flex-col gap-2 items-center">
                <SimpleBreadCrumb
                parent={{"title":title,"path":parentPath}}
                current={content?.title||""}
                />
                {content?.layout_type === "formal-composite" && <FormalComposite title={content?.title || ""} content={content ||{}}/>}
                 {content?.layout_type === "personal-figured" && <PersonalFigure title={content?.title || ""} content={content ||{}}/>}
                 {content?.layout_type === "image-grid" && <ImageGrid title={content?.title || ""} content={content ||{}}/>}
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