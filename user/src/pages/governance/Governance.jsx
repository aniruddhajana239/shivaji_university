import { governanceContents, governanceSidebarNavItems } from "../../constants/Governance";
import { SidebarContentNewsLayout } from "../../layouts/SidebarContentNewsLayout";

export const Governance = () => {
    return (
        <div className="w-full  bg-white py-0">
           <SidebarContentNewsLayout navItems={governanceSidebarNavItems} contentList={governanceContents} parentPath="/governance" title="Governance"/>
        </div>
    );
}