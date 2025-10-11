import { aboutSidebarNavItems } from "../../constants/AboutUs";
import { SidebarContentNewsLayout } from "../../layouts/SidebarContentNewsLayout";

export const AboutUs = () => {
    return (
        <div className="w-full  bg-white py-0">
           <SidebarContentNewsLayout navItems={aboutSidebarNavItems} parentPath="/about" title="About Us"/>
        </div>
    );
}