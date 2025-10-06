import { MainNavgationBar } from "../../../components/header/mainNavigation/MainNavigationBar";
import { UtilityBar } from "../../../components/header/utility/UtilityBar";
import { BoardMembers } from "../../boardMembers/BoardMembers";
import { Hero } from "../../Hero/Hero";
import { UniversityPortal } from "../../portal/UniversityPortal";

export const Header = () => {
    return (
       <div className="flex flex-col w-full sticky top-0 z-50 ">
        <UtilityBar />
        <MainNavgationBar/>
        <Hero/>
        <UniversityPortal/>
        <BoardMembers/>
       </div>
    );
}