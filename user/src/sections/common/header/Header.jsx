import { MainNavgationBar } from "../../../components/header/mainNavigation/MainNavigationBar";
import { UtilityBar } from "../../../components/header/utility/UtilityBar";

export const Header = () => {
    return (
       <div className="flex flex-col w-full sticky top-0 z-50 ">
        <UtilityBar />
        <MainNavgationBar/>
       </div>
    );
}