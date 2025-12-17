import Share from "../../assets/icons/share.png";
import YoutubePlay from "../../assets/icons/youtube.png";
import WatchYoutube from "../../assets/images/logos/youtube_white.png"
import { useDispatch, useSelector } from "react-redux";
import { youtubeVideoSelector } from "../../redux/selectors/home/YoutubeVideo";
import { youtubeVideoActions } from "../../redux/reducer/slice/home/youtubeVideoSlice";
import { useEffect, useState } from "react";
import { latestNewsSelector } from "../../redux/selectors/home/LatestNews";
import { latestNewsActions } from "../../redux/reducer/slice/home/latestNewsSlice";

export const FeaturedVideos = () => {
    const youtubeVideoData = useSelector(youtubeVideoSelector);
    const latestNewsData = useSelector(latestNewsSelector);
    const dispatch = useDispatch();
    const [youtubeEmbed, setYoutubeEmbed] = useState(null);

    // Dispatch actions for both YouTube video and Latest News
    useEffect(() => {
        // Fetch YouTube video if not available
        if (!youtubeVideoData?.data?.content?.description || youtubeVideoData.data.content.description.trim() === "") {
            dispatch(youtubeVideoActions.getYoutubeVideo());
        }
        
        // Fetch Latest News if not available
        if (!latestNewsData?.data?.content || latestNewsData.data.content.length === 0) {
            dispatch(latestNewsActions.getLatestNews());
        }
    }, [dispatch, youtubeVideoData?.data?.content?.description, latestNewsData?.data?.content]);

    useEffect(() => {
        console.log("youtube Video Data:", youtubeVideoData);
        console.log("latestNewsData:", latestNewsData);
        
        // Extract YouTube embed information
        if (youtubeVideoData?.data?.content?.description) {
            const html = youtubeVideoData.data.content.description;
            
            // Parse the iframe from HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const iframe = doc.querySelector('iframe');
            
            if (iframe) {
                const src = iframe.getAttribute('src');
                const title = iframe.getAttribute('title') || 'YouTube Video';
                const allow = iframe.getAttribute('allow');
                const referrerPolicy = iframe.getAttribute('referrerpolicy');
                const allowFullscreen = iframe.getAttribute('allowfullscreen');
                
                setYoutubeEmbed({
                    src,
                    title,
                    allow,
                    referrerPolicy,
                    allowFullscreen
                });
            }
        }
    }, [youtubeVideoData]);

    const handleShare = () => {
        if (youtubeEmbed?.src) {
            const embedUrl = youtubeEmbed.src;
            const videoIdMatch = embedUrl.match(/embed\/([^?]+)/);
            if (videoIdMatch) {
                const videoId = videoIdMatch[1];
                const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
                
                if (navigator.share) {
                    navigator.share({
                        title: youtubeEmbed.title || 'Shivaji University Video',
                        text: 'Check out this video from Shivaji University',
                        url: watchUrl,
                    }).catch(console.error);
                } else {
                    window.open(watchUrl, '_blank');
                }
            }
        }
    };

    return (
        <div className="w-full bg-[#FFFFFF] grid grid-cols-1 lg:grid-cols-2 gap-4 py-8 px-6 lg:px-[48px]">
            {/* YouTube Video Section */}
            <div className="w-full rounded-[10px] h-full relative aspect-5/3">
                {youtubeVideoData?.isFetching ? (
                    // Loading skeleton matching your original aspect ratio
                    <div className="w-full h-full relative rounded-[10px] overflow-hidden">
                        {/* Main video skeleton */}
                        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-[10px]"></div>
                        
                        {/* Overlay skeleton matching your layout */}
                        <div className="absolute w-full h-full top-0 left-0 rounded-[10px]">
                            <div className="w-full h-full relative rounded-[10px]">
                                {/* Top text and share button skeleton */}
                                <div className="absolute top-0 left-0 right-0 px-6 py-2 flex justify-between items-center animate-pulse">
                                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                                    <div className="flex flex-col gap-1 items-center justify-center ml-4">
                                        <div className="h-[18px] w-[18px] bg-gray-300 rounded-full"></div>
                                        <div className="h-3 bg-gray-300 rounded w-10"></div>
                                    </div>
                                </div>
                                
                                {/* Center play button skeleton */}
                                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] animate-pulse">
                                    <div className="h-[40px] w-[40px] bg-gray-300 rounded-full"></div>
                                </div>
                                
                                {/* Bottom youtube logo skeleton */}
                                <div className="absolute bottom-6 left-0 animate-pulse">
                                    <div className="w-32 h-10 bg-gray-300 rounded-r-[10px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : youtubeEmbed?.src ? (
                    // YouTube Embed with overlay
                    <div className="w-full h-full relative rounded-[10px] overflow-hidden group">
                        {/* YouTube iframe container */}
                        <div className="relative w-full h-full">
                            <iframe
                                src={youtubeEmbed.src}
                                title={youtubeEmbed.title}
                                allow={youtubeEmbed.allow}
                                referrerPolicy={youtubeEmbed.referrerPolicy}
                                allowFullScreen={youtubeEmbed.allowFullscreen}
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px]"
                                frameBorder="0"
                            />
                        </div>
                        
                        {/* ORIGINAL OVERLAY DESIGN */}
                        <div className="absolute w-full h-full top-0 left-0 rounded-[10px]">
                            <div className="w-full h-full relative bg-black/50 rounded-[10px]">
                                {/* Top text and share button */}
                                <div className="text-white text-[16px] px-6 py-2 flex justify-between items-center">
                                    <span className="text-white text-[10px] lg:text-[14px] font-[500]">
                                        शिवाजी विद्यापीठाच्या मास कम्युनिकेशन विभागाच्या विद्यार्थ्यांनी 'क्रांती वन' वर केलेली डॉक्युमेंटरी
                                    </span>
                                    <button 
                                        onClick={handleShare}
                                        className="flex flex-col gap-1 items-center justify-center ml-4 hover:opacity-80 transition-opacity"
                                    >
                                        <img src={Share} alt="share" className="h-[18px] w-[18px] object-contain" />
                                        <span className="text-white text-[10px] font-[300]">Share</span>
                                    </button>
                                </div>
                                
                                {/* Center play button */}
                                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer">
                                    <img src={YoutubePlay} alt="play button" className="h-[40px] w-[40px] object-contain" />
                                </div>
                                
                                {/* Bottom youtube logo */}
                                <div className="absolute bottom-6 flex items-center left-0 w-fit bg-[#001F51A8] rounded-r-[10px] p-3 lg:p-4 py-2 lg:py-3">
                                    <span className="text-white text-[10px] lg:text-[14px] font-[400]">Watch on</span>
                                    <img src={WatchYoutube} alt="watch" className="h-[16px] lg:h-[24px] w-auto object-contain inline-block ml-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Fallback when no video
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-[10px] flex flex-col items-center justify-center text-center p-4">
                        <img src={YoutubePlay} alt="play button" className="h-[40px] w-[40px] object-contain mb-3 opacity-50" />
                        <span className="text-gray-500 text-sm">No video available</span>
                    </div>
                )}
            </div>

            {/* Latest News List - Replacing featuredVideos with latestNewsData */}
            <div className="w-full rounded-[10px] aspect-video flex flex-col gap-4">
                {latestNewsData?.isFetching ? (
                    // Loading skeleton for latest news matching your layout
                    [...Array(3)].map((_, index) => (
                        <div key={index} className="w-full flex items-center gap-4 px-0 lg:px-4 flex-shrink-0 animate-pulse">
                            <div className="w-1/5 aspect-4/3 bg-gray-200 rounded-[10px]"></div>
                            <div className="flex-grow">
                                <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))
                ) : latestNewsData?.data?.content && latestNewsData.data.content.length > 0 ? (
                    // Show latest news from API
                    latestNewsData.data.content.map((news, index) => (
                        <div 
                            key={index} 
                            className="w-full flex items-center gap-4 px-0 lg:px-4 flex-shrink-0"
                        >
                            <img 
                                src={news?.image} 
                                alt={news?.title} 
                                className="w-1/5 aspect-4/3 object-cover rounded-[10px]"
                                loading="lazy"
                            />
                            <span className="text-[12px] lg:text-[16px] font-[500] text-[#000000]">
                                {news?.title ?? ""}
                            </span>
                        </div>
                    ))
                ) : (
                    // No news available
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm">No latest news available</span>
                    </div>
                )}
            </div>
        </div>
    );
};