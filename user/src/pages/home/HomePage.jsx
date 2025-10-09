import AffiliatedCarousel from "../../components/carousel/affiliated/AffiliatedCarousel";
import { BoardMembers } from "../../sections/boardMembers/BoardMembers";
import { CampusUpdates } from "../../sections/campusUpdates/CampusUpdates";
import { FeaturedVideos } from "../../sections/featuredVideos/FeaturdVideos";
import { Hero } from "../../sections/Hero/Hero";
import { UniversityPortal } from "../../sections/portal/UniversityPortal";
import { Recognitions } from "../../sections/recognitions/Recognitions";
import StatisticalInformation from "../../sections/statisticalInformation/StatisticalInformation";
import { UniversityServices } from "../../sections/universityServices/UniversityServices";

const HomePage = () => {
  return (
    <>
      <div className="w-full flex flex-col bg-white">

        <Hero />
        <UniversityPortal />
        <BoardMembers />
        <CampusUpdates />
        <UniversityServices />
        <AffiliatedCarousel />
        <FeaturedVideos />
        <Recognitions/>
        <StatisticalInformation/>
      </div>
    </>
  );
};

export default HomePage;
