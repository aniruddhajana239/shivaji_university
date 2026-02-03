import { useDispatch, useSelector } from "react-redux";
import { MainNavigationBar } from "../../../components/header/mainNavigation/MainNavigationBar";
import { QuickLinksBar } from "../../../components/header/quickLinks/QuickLinksBar";
import { UtilityBar } from "../../../components/header/utility/UtilityBar";
import { headerSelector } from "../../../redux/selectors/settings/Header";
import { useEffect } from "react";
import { headerActions } from "../../../redux/reducer/slice/settings/getHeaderCoursesSlice";

export const Header = ({data,loading}) => {
    const headerData = useSelector(headerSelector)
    const dispatch = useDispatch()
    useEffect(() => {
      if (Object?.keys(headerData?.data)?.length===0) {
        dispatch(headerActions?.getHeaderCouses())
      }
    }, [])
    return (
       <div className="flex flex-col w-full sticky top-0 z-50 ">
        <UtilityBar data={data}  loading={loading}/>
        <MainNavigationBar loading={loading} data={data} coursesLoading={headerData?.isFeching} courses={headerData?.data?.others??[]}/>
        <QuickLinksBar/>
        {/* Add an anchor for navigation */}
        <div id="quick-links-anchor" className="absolute -top-20"></div>
        {/* Add an anchor for content */}
        <div id="content-anchor" className="absolute -top-20"></div>
       </div>
    );
}