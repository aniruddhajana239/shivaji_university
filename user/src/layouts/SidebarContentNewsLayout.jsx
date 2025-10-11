import { useState } from "react";
import { LeftSidebarNavigation } from "../components/navigation/LeftSidebarNavigation";
import { RightSidebarNavigation } from "../components/navigation/RightSidebarNavigation";
import { aboutUsContents } from "../constants/AboutUs";
import { FormalComposite } from "../blocks/composite/FormalComposite";
import { SimpleBreadCrumb } from "../components/breadcrumb/SimpleBreadcrumb";
import NewsPaperComposite from "../blocks/composite/NewsPaperComposite";
import KolhapurCityComposite from "../blocks/composite/KolhapurCityComposite";


export const SidebarContentNewsLayout = ({navItems,parentPath,title}) => {
    const [activeId, setActiveId] = useState(1);
    const activeNavItem = navItems[activeId] || {};
    const [content, setContent] = useState(aboutUsContents?.filter(c=>c?.content_id===activeId)?.[0]||{});
    const handleClick = (id) => {
        setActiveId(id);
        setContent(aboutUsContents?.filter(c=>c?.content_id===id)?.[0]||{});   
    }
    return (
        <div className="w-full bg-white px-6 lg:px-[48px] py-8 flex flex-col lg:flex-row items-start justify-between gap-5">
            {/* Sidebar content can be added here in the future */}
            <div className="w-full lg:w-[20%]">
                <LeftSidebarNavigation
                    activeId={activeId} 
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

                {content?.layout_type === "news-composite" && <NewsPaperComposite title={content?.title || ""} content={content ||{}}/>}

                {content?.layout_type === "city-composite" && <KolhapurCityComposite title={content?.title || ""} content={content ||{}}/>}

                 
            </div>
            <div className="w-full lg:w-[25%]">
            <RightSidebarNavigation
            title="Updates/News"
            listItems={activeNavItem?.updates || []}
            />
            </div>
        </div>
    );
}   