import { BoardMembers } from "../../sections/boardMembers/BoardMembers";
import { Hero } from "../../sections/Hero/Hero";
import { UniversityPortal } from "../../sections/portal/UniversityPortal";

const HomePage = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <Hero />
        <UniversityPortal />
        <BoardMembers />
      </div>
    </>
  );
};

export default HomePage;
