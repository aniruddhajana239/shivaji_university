import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const UniversityPortal = ({
  contents = [],
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const cards = useMemo(() => {
    return Array.isArray(contents) ? contents : [];
  }, [contents]);

  const handleCardClick = useCallback(
    (item) => {
      if (!item?.external_link) return;

      if (item.extend_to === false) {
        window.open(item.external_link, "_blank", "noopener,noreferrer");
      } else {
        navigate(item.external_link);
      }
    },
    [navigate]
  );

  /* 🔹 Skeleton count (responsive friendly) */
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="w-full bg-[#001F42] px-[48px] py-12 flex flex-col gap-6 -mt-[8px]">
      <span className="text-white text-[30px] font-[500]">
        University Portal
      </span>

      {/* ✅ Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
          {skeletons.map((_, index) => (
            <div
              key={index}
              className="flex flex-col bg-white/10 rounded-lg p-6 gap-4 animate-pulse"
            >
              <div className="h-[40px] w-[40px] bg-white/20 rounded-md mx-auto" />
              <div className="h-[16px] w-[70%] bg-white/20 rounded mx-auto" />
            </div>
          ))}
        </div>
      ) : cards.length === 0 ? (
        /* ✅ Empty State */
        <div className="w-full text-center text-white text-[18px] opacity-80 py-12">
          No data available
        </div>
      ) : (
        /* ✅ Cards */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
          {cards.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="flex flex-col bg-white justify-center items-center gap-3 cursor-pointer
                         hover:shadow-lg hover:scale-[1.02] transition-all duration-200
                         border-b-2 border-[#2F8AA5] rounded-lg p-6 px-2"
            >
              <img
                src={item.file}
                alt={item.name}
                className="h-[40px] w-[40px] object-contain"
              />
              <div className="text-[18px] font-[500] text-center text-[#333333]">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
