import { useEffect } from "react";
import AffiliatedCarousel from "../../components/carousel/affiliated/AffiliatedCarousel";
import { settingsSelector } from "../../redux/selectors/settings/Settings";
import { BoardMembers } from "../../sections/boardMembers/BoardMembers";
import { CampusUpdates } from "../../sections/campusUpdates/CampusUpdates";
import { FeaturedVideos } from "../../sections/featuredVideos/FeaturdVideos";
import { UniversityPortal } from "../../sections/portal/UniversityPortal";
import { Recognitions } from "../../sections/recognitions/Recognitions";
import StatisticalInformation from "../../sections/statisticalInformation/StatisticalInformation";
import { UniversityServices } from "../../sections/universityServices/UniversityServices";
import { useDispatch, useSelector } from 'react-redux';
import { heroSelector } from "../../redux/selectors/home/Hero";
import { heroActions } from "../../redux/reducer/slice/home/heroSlice";
import { HomeSelector } from "../../redux/selectors/home/HomeSelector";
import { HomeActions } from "../../redux/reducer/slice/home/homeSlice";
import { Hero } from "../../sections/hero/Hero";
const HomePage = () => {
  const settingsData = useSelector(settingsSelector)
  const heroData = useSelector(heroSelector)
  const homeData = useSelector(HomeSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object?.keys(heroData?.data)?.length === 0) {
      dispatch(heroActions?.getBanners())
    }
  }, [])
  useEffect(() => {
    if (Object?.keys(homeData?.data)?.length === 0) {
      dispatch(HomeActions?.getAll())
    }
  }, [])

  useEffect(() => { console.log("Home data:", homeData) }, [homeData])
  return (
    <>
      <div className="w-full flex flex-col bg-white">

        <Hero bannerLoading={homeData?.isFetching} externalLoading={settingsData?.isFetching} banners={homeData?.data?.Banner?.content_details ?? []} externalData={settingsData ?? {}} />
        {homeData?.isFetching === false && Array.isArray(homeData?.data?.home_university_portal) && homeData?.data?.
          home_university_portal?.length > 0 && < UniversityPortal isloading={homeData?.isLoading} contents={homeData?.data?.
            home_university_portal
            ?? []} />}
        <BoardMembers loading={homeData?.isFetching} data={homeData?.data?.Faculty?.content_details ?? []} />
        <CampusUpdates loading={homeData?.isFetching} data={homeData?.data?.home_card_box ?? []} />
        <UniversityServices services={homeData?.data?.home_box ?? []} />
        <AffiliatedCarousel />
        <FeaturedVideos />
        <Recognitions />
        <StatisticalInformation data={settingsData?.data ?? {}} />
      </div>
    </>
  );
};

export default HomePage;
