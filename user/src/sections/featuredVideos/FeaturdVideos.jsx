import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { latestNewsActions } from "../../redux/reducer/slice/home/latestNewsSlice";
import { HomeSelector } from "../../redux/selectors/home/HomeSelector";

export const FeaturedVideos = () => {
    const HomeData = useSelector(HomeSelector);
    const dispatch = useDispatch();
    const [youtubeEmbed, setYoutubeEmbed] = useState(null);

    // Fetch latest news only once if empty
    useEffect(() => {
        if (!HomeData?.data?.content || HomeData.data.content.length === 0) {
            dispatch(latestNewsActions.getLatestNews());
        }
    }, [dispatch]);

    // Prepare YouTube embed URL
    useEffect(() => {
        const link =
            HomeData?.data?.["Youtube Video"]?.content_details?.[0]?.link;

        if (!link) {
            setYoutubeEmbed(null);
            return;
        }

        // Convert Shorts → normal embed
        const cleanedLink = link.replace("/shorts/", "/embed/");

        const videoId = extractVideoId(cleanedLink);

        if (videoId) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&playsinline=1&rel=0&modestbranding=1`;
            setYoutubeEmbed(embedUrl);
        }
    }, [HomeData]);

    // Extract YouTube Video ID safely
    const extractVideoId = (url) => {
        if (!url) return null;

        const regex =
            /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className="w-full bg-[#FFFFFF] grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 px-6 lg:px-[48px]">
            {/* Video Section */}
            <div className="w-full rounded-[10px] relative aspect-5/3">
                {HomeData?.isFetching ? (
                    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-[10px]" />
                ) : youtubeEmbed ? (
                    <iframe
                        src={youtubeEmbed}
                        title="Featured Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full rounded-[10px]"
                        frameBorder="0"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 rounded-[10px] flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                            No video available
                        </span>
                    </div>
                )}
            </div>

            {/* Side Content */}
            <div className="w-full flex flex-col gap-4">
                {HomeData?.isFetching ? (
                    [...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-full flex gap-4 items-center animate-pulse"
                        >
                            <div className="w-1/5 aspect-4/3 bg-gray-200 rounded-[10px]" />
                            <div className="flex-1">
                                <div className="h-5 bg-gray-200 rounded mb-2" />
                                <div className="h-4 bg-gray-100 rounded w-3/4" />
                            </div>
                        </div>
                    ))
                ) : HomeData?.data?.["Side content of youtube video"]
                      ?.content_details?.length > 0 ? (
                    HomeData.data["Side content of youtube video"].content_details.map(
                        (item, index) => (
                            <div
                                key={index}
                                className={`w-full flex gap-4 items-center ${
                                    item.link ? "cursor-pointer" : ""
                                }`}
                                onClick={() => {
                                    if (item.link) {
                                        window.open(item.link, "_blank");
                                    }
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-1/5 aspect-4/3 object-cover rounded-[10px]"
                                />
                                <span className="text-[12px] lg:text-[16px] font-medium">
                                    {item.title}
                                </span>
                            </div>
                        )
                    )
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500 text-sm">
                            No latest news available
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
