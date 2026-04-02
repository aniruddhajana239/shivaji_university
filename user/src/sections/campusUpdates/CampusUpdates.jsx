import { HomeCard } from "../../components/cards/HomeCard";

export const CampusUpdates = ({ data }) => {
  console.log("data in Campus Update:", data)
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-12 px-6 lg:px-[48px]">
      {Array.isArray(data) && data.map((item, index) => (
        <HomeCard key={item.id || index} menuId={item.id} title={item.name} />
      ))}
    </div>
  );
}