import { useEffect } from "react";
import AffiliatedCarousel from "../../components/carousel/affiliated/AffiliatedCarousel";
import { settingsSelector } from "../../redux/selectors/settings/Settings";
import { BoardMembers } from "../../sections/boardMembers/BoardMembers";
import { CampusUpdates } from "../../sections/campusUpdates/CampusUpdates";
import { FeaturedVideos } from "../../sections/featuredVideos/FeaturdVideos";
import { Hero } from "../../sections/Hero/Hero";
import { UniversityPortal } from "../../sections/portal/UniversityPortal";
import { Recognitions } from "../../sections/recognitions/Recognitions";
import StatisticalInformation from "../../sections/statisticalInformation/StatisticalInformation";
import { UniversityServices } from "../../sections/universityServices/UniversityServices";
import { useDispatch, useSelector } from 'react-redux';
import { heroSelector } from "../../redux/selectors/home/Hero";
import { heroActions } from "../../redux/reducer/slice/home/heroSlice";
const HomePage = () => {
  const settingsData = useSelector(settingsSelector)
  const heroData = useSelector(heroSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object?.keys(heroData?.data)?.length === 0) {
      dispatch(heroActions?.getBanners())
    }
  }, [])
  return (
    <>
      <div className="w-full flex flex-col bg-white">

        <Hero bannerLoading={heroData?.isFetching} externalLoading={settingsData?.isFetching} banners={heroData?.data?.content??[]} externalData={settingsData??{}}/>
        <UniversityPortal />
        <BoardMembers />
        <CampusUpdates />
        <UniversityServices />
        <AffiliatedCarousel />
        <FeaturedVideos />
        <Recognitions />
        <StatisticalInformation data={settingsData?.data??{}}/>
      </div>
    </>
  );
};

export default HomePage;
