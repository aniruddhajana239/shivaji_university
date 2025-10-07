import { UpcomingEventsCard } from "../../components/cards/UpcomingEvents";
import { NewsUpdatesCard } from "../../components/cards/NewsUpdatesCard";
import { AnnouncementsCard } from "../../components/cards/AnnouncementCard";

export const CampusUpdates = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-12 px-6 lg:px-[48px]">
        <AnnouncementsCard/>
        <UpcomingEventsCard/>
        <NewsUpdatesCard/>
    </div>
  );
}