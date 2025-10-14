import { aboutSidebarNavItems, aboutUsContents } from "../../constants/AboutUs";
import { SidebarContentNewsLayout } from "../../layouts/SidebarContentNewsLayout";

export const AboutUs = () => {
    return (
        <div className="w-full  bg-white py-0">
           <SidebarContentNewsLayout contentList={aboutUsContents} navItems={aboutSidebarNavItems} parentPath="/about" title="About Us"/>
        </div>
    );
}