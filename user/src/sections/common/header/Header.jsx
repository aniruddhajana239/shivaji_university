import { useSelector } from "react-redux";
import { MainNavigationBar } from "../../../components/header/mainNavigation/MainNavigationBar";
import { QuickLinksBar } from "../../../components/header/quickLinks/QuickLinksBar";
import { UtilityBar } from "../../../components/header/utility/UtilityBar";
import { HomeSelector } from "../../../redux/selectors/home/HomeSelector";

export const Header = ({ data, loading }) => {
  const homeData = useSelector(HomeSelector);
  const homeHeader = homeData?.data?.home_header ?? [];

  return (
    <div className="flex flex-col w-full sticky top-0 z-50 ">
      <UtilityBar data={data} loading={loading} />
      <MainNavigationBar loading={loading} data={data} coursesLoading={homeData?.isFetching} courses={homeHeader} />
      <QuickLinksBar />
      {/* Add an anchor for navigation */}
      <div id="quick-links-anchor" className="absolute -top-20"></div>
      {/* Add an anchor for content */}
      <div id="content-anchor" className="absolute -top-20"></div>
    </div>
  );
}